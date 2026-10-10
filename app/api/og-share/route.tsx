import { ImageResponse } from 'next/og';

export const runtime = 'edge';

async function getFont(weight: 700 | 800): Promise<ArrayBuffer> {
  const url =
    weight === 800
      ? 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZJhiJ-Ek-_EeA.woff'
      : 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZJhiJ-Ek-_EeA.woff';
  const res = await fetch(url, { cache: 'force-cache' });
  return res.arrayBuffer();
}

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k';
  return String(n);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name   = searchParams.get('n') ?? 'Someone';
  const days   = Number(searchParams.get('d') ?? '0');
  const reels  = Number(searchParams.get('r') ?? '0');
  const ads    = Number(searchParams.get('ag') ?? '0');

  const [fontBold, fontRegular] = await Promise.all([getFont(800), getFont(700)]);

  const daysLabel = days === 1 ? '1 day' : `${days} days`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #12001f 0%, #0c1528 55%, #0a0f1e 100%)',
        }}
      >
        {/* Instagram-style gradient glow blobs */}
        <div style={{
          position: 'absolute', top: -80, left: -60,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225,48,108,0.35) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, right: -80,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(131,58,180,0.30) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', top: 120, right: 100,
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top accent bar — Instagram gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          display: 'flex',
        }} />

        {/* Main content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          flex: 1, padding: '56px 72px 0',
          position: 'relative', zIndex: 2,
        }}>
          {/* Badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 36,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 999, padding: '6px 18px',
            }}>
              <span style={{ fontSize: 18 }}>📸</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>
                INSTAGRAM SCREEN TIME REPORT
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: 28, fontWeight: 700,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 8,
          }}>
            {name} spent
          </div>

          {/* Big days number */}
          <div style={{
            fontSize: days >= 100 ? 108 : 124,
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-4px',
            background: 'linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #818cf8 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 14,
          }}>
            {daysLabel}
          </div>

          <div style={{
            fontSize: 32, fontWeight: 700,
            color: 'rgba(255,255,255,0.60)',
            marginBottom: 52,
          }}>
            on Instagram
          </div>

          {/* Stat tiles */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'Reels watched', value: fmt(reels), color: '#f472b6' },
              { label: 'Advertisers targeting', value: fmt(ads), color: '#c084fc' },
              { label: 'Total days scrolling', value: String(days), color: '#818cf8' },
            ].map(s => (
              <div key={s.label} style={{
                display: 'flex', flexDirection: 'column',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: '18px 24px',
                minWidth: 200,
              }}>
                <div style={{ fontSize: 38, fontWeight: 800, color: s.color, letterSpacing: '-1px' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontWeight: 700 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 68,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 72px',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 2,
        }}>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}>
            unblockdevs.com/social-media-time-analyzer
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, rgba(244,114,182,0.2), rgba(192,132,252,0.2))',
            border: '1px solid rgba(244,114,182,0.3)',
            borderRadius: 999, padding: '6px 18px',
          }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#f472b6' }}>
              Find out yours → Free &amp; Private
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: fontBold,    weight: 800, style: 'normal' },
        { name: 'Inter', data: fontRegular, weight: 700, style: 'normal' },
      ],
    }
  );
}
