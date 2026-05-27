import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Fetch Inter Bold from Google Fonts (subset: latin, weight 700 + 800)
async function getFont(weight: 700 | 800): Promise<ArrayBuffer> {
  const url =
    weight === 800
      ? 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZJhiJ-Ek-_EeA.woff'
      : 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZJhiJ-Ek-_EeA.woff';
  const res = await fetch(url, { cache: 'force-cache' });
  return res.arrayBuffer();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') ?? 'Developer Tools';
  const desc =
    searchParams.get('desc') ??
    'Free browser-based tools for JSON, API, SQL, and AI workflows';
  const emoji = searchParams.get('emoji') ?? '🛠️';

  const [interBold, interRegular] = await Promise.all([getFont(800), getFont(700)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 72px',
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top gradient accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #818cf8 100%)',
          }}
        />

        {/* Subtle grid pattern (background texture) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.08) 0%, transparent 60%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingTop: 6,
          }}
        >
          {/* Emoji */}
          <div style={{ fontSize: 72, marginBottom: 28, lineHeight: 1 }}>{emoji}</div>

          {/* Tool title */}
          <div
            style={{
              fontSize: title.length > 30 ? 54 : 64,
              fontWeight: 800,
              color: '#f0f6fc',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: '#8b949e',
              maxWidth: 820,
              lineHeight: 1.45,
            }}
          >
            {desc}
          </div>

          {/* Trust badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 40,
              background: 'rgba(16,185,129,0.12)',
              border: '1.5px solid rgba(16,185,129,0.35)',
              borderRadius: 999,
              padding: '8px 20px',
              width: 'fit-content',
            }}
          >
            <div style={{ fontSize: 16, color: '#10b981', fontWeight: 800 }}>
              🔒 100% in-browser · No signup · Free forever
            </div>
          </div>
        </div>

        {/* Bottom branding bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 72,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 72px',
          }}
        >
          <div style={{ fontSize: 20, color: '#30363d', fontWeight: 700 }}>
            unblockdevs.com
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 18,
              color: '#10b981',
              fontWeight: 800,
            }}
          >
            <span style={{ fontSize: 22 }}>⚡</span>
            UnblockDevs
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interBold, weight: 800, style: 'normal' },
        { name: 'Inter', data: interRegular, weight: 700, style: 'normal' },
      ],
    }
  );
}
