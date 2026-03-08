/**
 * Base64 file encoder worker. Reads file in 1MB chunks, reports progress.
 * Used for files > 5MB to avoid blocking main thread.
 */
function applyVariant(b64, variant) {
  switch (variant) {
    case 'url':
      return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    case 'mime': {
      var lines = b64.match(/.{1,76}/g) || [];
      return lines.join('\r\n');
    }
    case 'nopad':
      return b64.replace(/=/g, '');
    default:
      return b64;
  }
}

self.onmessage = async function (e) {
  var file = e.data.file;
  var variant = e.data.variant || 'standard';
  if (!file || !file.size) {
    self.postMessage({ type: 'error', message: 'No file' });
    return;
  }
  var CHUNK = 1024 * 1024;
  var offset = 0;
  var result = '';
  try {
    while (offset < file.size) {
      var blob = file.slice(offset, offset + CHUNK);
      var buffer = await blob.arrayBuffer();
      var bytes = new Uint8Array(buffer);
      var binary = '';
      for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      result += btoa(binary);
      offset += CHUNK;
      self.postMessage({ type: 'progress', percent: Math.min(100, (offset / file.size) * 100) });
    }
    self.postMessage({ type: 'complete', base64: applyVariant(result, variant) });
  } catch (err) {
    self.postMessage({ type: 'error', message: err.message || 'Encoding failed' });
  }
};
