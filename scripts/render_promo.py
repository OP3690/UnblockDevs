"""
unblockdevs.com — 40-second MARKETING reel
1080×1920  30 fps  H.264
"""

import math, random, textwrap
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from moviepy import VideoClip

# ── Config ──────────────────────────────────────────────────────────────────────
W, H     = 1080, 1920
FPS      = 30
DURATION = 40.0
OUT      = Path(__file__).parent.parent / "public" / "promo-reel.mp4"

# ── Brand palette ────────────────────────────────────────────────────────────────
C = dict(
    bg       = (7,  9, 16),
    bg2      = (11, 14, 24),
    card     = (16, 20, 34),
    card2    = (21, 26, 44),
    glass    = (255,255,255),          # used at low alpha for glassmorphism
    emerald  = (16, 185, 129),
    em_light = (52, 211, 153),
    em_dark  = (6,  95,  70),
    em_bg    = (6,  78,  59),
    sky      = (56, 189, 248),
    sk_dark  = (14, 116, 144),
    violet   = (167, 139, 250),
    rose     = (251,  82, 100),
    amber    = (251, 191,  36),
    white    = (255, 255, 255),
    g100     = (240, 242, 248),
    g300     = (180, 186, 210),
    g400     = (130, 140, 168),
    g500     = ( 90,  98, 128),
    g600     = ( 55,  62,  88),
    zinc900  = ( 18,  20,  30),
)

# ── Fonts ────────────────────────────────────────────────────────────────────────
def _font(size, bold=False):
    paths = (["/System/Library/Fonts/Supplemental/Arial Bold.ttf",
               "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf",
               "/System/Library/Fonts/Helvetica.ttc"]
             if bold else
             ["/System/Library/Fonts/Supplemental/Arial.ttf",
              "/System/Library/Fonts/Helvetica.ttc"])
    for p in paths:
        try: return ImageFont.truetype(p, size)
        except: pass
    return ImageFont.load_default()

def _mono(size):
    for p in ["/System/Library/Fonts/Supplemental/Courier New.ttf",
              "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"]:
        try: return ImageFont.truetype(p, size)
        except: pass
    return ImageFont.load_default()

# preload common sizes
FB = {s: _font(s, True)  for s in [14,16,18,20,22,24,28,32,36,40,44,52,60,64,72,80,88,108]}
FR = {s: _font(s, False) for s in [14,16,18,20,22,24,26,28,32,36,40,44]}
FM = {s: _mono(s)        for s in [16,18,20,22,24,26,28]}

# Convenience aliases (some scene code uses bare names)
WHITE    = C['white']
ZINC_900 = C['zinc900']
BG_PAGE  = (250, 250, 250)

# ── Easing ───────────────────────────────────────────────────────────────────────
def eo(t):  t=max(0,min(1,t)); return 1-(1-t)**3       # ease-out cubic
def ei(t):  t=max(0,min(1,t)); return t**3             # ease-in  cubic
def eio(t): t=max(0,min(1,t)); return t*t*(3-2*t)      # ease-in-out
def spring(t):
    t=max(0,min(1,t))
    return 1 - math.exp(-6*t)*math.cos(10*t)
def c01(t): return max(0.0, min(1.0, t))
def lerp(a,b,t): return a+(b-a)*t
def lerpC(ca,cb,t): return tuple(int(lerp(a,b,t)) for a,b in zip(ca,cb))

# ── Drawing helpers ───────────────────────────────────────────────────────────────
def new_layer(img):
    lay = Image.new("RGBA", img.size, (0,0,0,0))
    return lay, ImageDraw.Draw(lay)

def paste(img, lay): img.alpha_composite(lay)

def tw(draw,text,font):
    bb=draw.textbbox((0,0),text,font=font); return bb[2]-bb[0]

def tc(draw,text,cx,y,font,col,a=255):
    w=tw(draw,text,font); draw.text((cx-w//2,y),text,font=font,fill=col+(a,))

def tl(draw,text,x,y,font,col,a=255):
    draw.text((x,y),text,font=font,fill=col+(a,))

def rr(d,x0,y0,x1,y1,r,fill,alpha=255,outline=None,ow=1):
    d.rounded_rectangle([x0,y0,x1,y1],radius=r,fill=fill+(alpha,),
                        outline=(outline+(alpha,) if outline else None), width=ow)

def glow_rect(img,x0,y0,x1,y1,color,blur=40,alpha=100,r=20):
    lay=Image.new("RGBA",img.size,(0,0,0,0))
    d=ImageDraw.Draw(lay)
    d.rounded_rectangle([x0-blur//3,y0-blur//3,x1+blur//3,y1+blur//3],
                        radius=r+blur//3,fill=color+(alpha,))
    lay=lay.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(lay)

def glow_circle(img,cx,cy,r,color,blur=30,alpha=100):
    lay=Image.new("RGBA",img.size,(0,0,0,0))
    d=ImageDraw.Draw(lay)
    d.ellipse([cx-r-blur//2,cy-r-blur//2,cx+r+blur//2,cy+r+blur//2],fill=color+(alpha,))
    lay=lay.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(lay)

# ── Background helpers ────────────────────────────────────────────────────────────
def grad_bg(img, top=None, bot=None, horizontal=False):
    top = top or C['bg']; bot = bot or C['bg2']
    arr = np.zeros((H,W,4),dtype=np.uint8)
    if not horizontal:
        for row in range(H):
            f=row/H; arr[row,:]=list(lerpC(top,bot,f))+[255]
    else:
        for col in range(W):
            f=col/W; arr[:,col]=list(lerpC(top,bot,f))+[255]
    img.alpha_composite(Image.fromarray(arr,"RGBA"))

def dot_grid(img,spacing=60,color=None,alpha=18,t_offset=0):
    color=color or C['emerald']
    lay,d=new_layer(img)
    off_x=int((t_offset*20)%spacing); off_y=int((t_offset*8)%spacing)
    for x in range(-spacing+off_x,W+spacing,spacing):
        for y in range(-spacing+off_y,H+spacing,spacing):
            d.ellipse([x-1.5,y-1.5,x+1.5,y+1.5],fill=color+(alpha,))
    paste(img,lay)

def grid_lines(img,spacing=80,color=None,alpha=10):
    color=color or C['g600']
    lay,d=new_layer(img)
    for x in range(0,W,spacing):
        d.line([x,0,x,H],fill=color+(alpha,),width=1)
    for y in range(0,H,spacing):
        d.line([0,y,W,y],fill=color+(alpha,),width=1)
    paste(img,lay)

# ── Particles ─────────────────────────────────────────────────────────────────────
random.seed(99)
PTCLS=[{"x":random.uniform(.03,.97),"y":random.uniform(.03,.97),
         "r":random.uniform(1,3.5),"sx":random.uniform(.003,.014),
         "sy":random.uniform(.002,.01),"ph":random.uniform(0,math.tau),
         "c":random.choice([C['emerald'],C['sky'],C['violet'],C['amber']])}
        for _ in range(32)]

def particles(img,t,a_mul=1.0):
    lay,od=new_layer(img)
    for p in PTCLS:
        px=p["x"]*W+math.sin(t*p["sx"]*math.tau+p["ph"])*50
        py=p["y"]*H+math.cos(t*p["sy"]*math.tau+p["ph"]*.6)*70
        a=int(70*a_mul); r=p["r"]
        od.ellipse([px-r,py-r,px+r,py+r],fill=p["c"]+(a,))
    paste(img,lay)

# ── Progress bar ──────────────────────────────────────────────────────────────────
def progress_bar(draw,tg):
    pct=tg/DURATION
    draw.rectangle([0,H-4,W,H],fill=C['g600']+(60,))
    draw.rectangle([0,H-4,int(W*pct),H],fill=C['emerald']+(200,))

# ── Cross-fade transition ─────────────────────────────────────────────────────────
def fade_alpha(t, fade_in=0.12, fade_out=0.88):
    """Global scene opacity: fade in at start, fade out at end."""
    a_in  = c01(t / fade_in)
    a_out = c01((1-t) / (1-fade_out)) if fade_out < 1 else 1.0
    return eo(min(a_in, a_out))

# ── Scene timeline ─────────────────────────────────────────────────────────────────
#  0: Hook         0–5s
#  1: Problem      5–10s
#  2: Browser      10–16s
#  3: Masker       16–24s
#  4: Tools grid   24–30s
#  5: Stats        30–35s
#  6: CTA          35–40s
SCENES=[( 0, 5),( 5,10),(10,16),(16,24),(24,30),(30,35),(35,40)]

def slocal(tg,i):
    s,e=SCENES[i]
    if s<=tg<e: return (tg-s)/(e-s)
    return None

# ════════════════════════════════════════════════════════════════════════════════
#  SCENE 0 — HOOK  (0–5s)
#  Big cinematic statement: "Are you leaking secrets to AI?"
#  Code leak animation, then brand reveal
# ════════════════════════════════════════════════════════════════════════════════
LEAK_LINES=[
    ('api_key  = "sk-prod-xK9mN2pL8rT4yZ"',  C['rose']),
    ('db_pass  = "SuperSecret@ProdDB2024"',    C['rose']),
    ('ssn      = "523-44-8821"',              C['rose']),
    ('jwt      = "eyJhbGciOiJSUzI1NiJ9..."',  C['amber']),
    ('stripe   = "sk_live_4xTn8mKp..."',       C['rose']),
]

def scene_hook(img,t):
    # Dark cinematic bg
    grad_bg(img,(7,9,16),(4,6,14))
    grid_lines(img,alpha=12)
    particles(img,t*5,a_mul=c01(t*3)*0.5)

    draw=ImageDraw.Draw(img)
    fa=fade_alpha(t, fade_in=0.1, fade_out=0.92)

    # ── Phase 1 (0→0.4): Question appears word by word ───────────────────────
    words1=["Are","you","pasting"]
    words2=["this","into","ChatGPT?"]
    if t < 0.45:
        wt = c01(t/0.38)
        # Line 1
        line1_parts = [("Are you ", C['white']), ("pasting", C['amber'])]
        x_cur = W//2 - 280
        line_y = 340
        for i,(word,col) in enumerate(line1_parts):
            delay=i*0.12
            wa=int(eo(c01((wt-delay)*5))*255*fa)
            tl(draw,word,x_cur,line_y,FB[52],col,wa)
            x_cur+=tw(draw,word,FB[52])+4

        # Line 2
        line2_parts=[("this","",C['white']),("into","",C['white']),("ChatGPT?","",C['rose'])]
        words_str=["this ","into ","ChatGPT?"]
        x_parts=[W//2-200, W//2-200+tw(draw,"this ",FB[52])+4,
                  W//2-200+tw(draw,"this ",FB[52])+tw(draw,"into ",FB[52])+8]
        for i,(word,col) in enumerate([(w,c) for (w,_,c) in line2_parts]):
            delay=0.18+i*0.1
            wa=int(eo(c01((wt-delay)*5))*255*fa)
            tl(draw,word,x_parts[i],line_y+72,FB[52],col,wa)

    # ── Phase 2 (0.35→0.72): Leaked code card rises up ───────────────────────
    if t > 0.30:
        ct=c01((t-0.30)/0.30)
        ca=int(eo(ct)*255*fa)
        slide_y=int(lerp(200,0,eo(ct)))

        # Card bg with red glow
        glow_rect(img,80,520+slide_y,W-80,840+slide_y,C['rose'],blur=50,alpha=int(ct*80))
        lay,d=new_layer(img)
        rr(d,80,520+slide_y,W-80,840+slide_y,20,C['card'],ca)
        # Red left border
        rr(d,80,520+slide_y,96,840+slide_y,4,C['rose'],ca)
        paste(img,lay)
        draw=ImageDraw.Draw(img)

        # Header
        tl(draw,"# Paste into ChatGPT for help...",100,530+slide_y,FM[20],C['g400'],ca)

        for i,(line,col) in enumerate(LEAK_LINES):
            delay=i*0.06
            la=int(eo(c01((ct-delay)*5))*ca/255*255)
            # Line number
            tl(draw,f"{i+1}",94,572+slide_y+i*50,FM[18],C['g500'],la)
            tl(draw,line,116,572+slide_y+i*50,FM[20],col,la)

    # ── Phase 3 (0.68→1.0): WARNING badge slams in ───────────────────────────
    if t > 0.62:
        wt=c01((t-0.62)/0.18)
        # Spring scale
        sc=spring(wt)
        badge_a=int(sc*255*fa)

        glow_rect(img,W//2-240,880,W//2+240,980,C['rose'],blur=60,alpha=int(wt*140))

        lay2,d2=new_layer(img)
        rr(d2,W//2-240,880,W//2+240,980,50,C['rose'],badge_a)
        paste(img,lay2)
        draw=ImageDraw.Draw(img)
        tc(draw,"⚠️  You're leaking secrets!",W//2,904,FB[36],C['white'],badge_a)

    # ── Brand reveal at end (t > 0.78) ────────────────────────────────────────
    if t > 0.76:
        bt=c01((t-0.76)/0.24)
        ba=int(eo(bt)*255*fa)
        glow_rect(img,W//2-280,1040,W//2+280,1140,C['emerald'],blur=60,alpha=int(bt*100))
        lay3,d3=new_layer(img)
        rr(d3,W//2-280,1040,W//2+280,1140,50,C['em_bg'],ba)
        paste(img,lay3)
        draw=ImageDraw.Draw(img)
        tc(draw,"unblockdevs.com has a fix →",W//2,1064,FB[32],C['em_light'],ba)


# ════════════════════════════════════════════════════════════════════════════════
#  SCENE 1 — THE PROBLEM  (5–10s)
#  "Every secret you paste could be logged…"
# ════════════════════════════════════════════════════════════════════════════════
RISKS=[
    ("🔴","Logged by AI providers",   C['rose']),
    ("🟠","Used in future training",  C['amber']),
    ("🟡","Exposed in data breaches", C['amber']),
    ("🔴","Seen by thousands of devs",C['rose']),
]

def scene_problem(img,t):
    grad_bg(img,(12,6,14),(7,4,18))
    grid_lines(img,alpha=14)
    particles(img,t*5+5,a_mul=0.4)
    draw=ImageDraw.Draw(img)
    fa=fade_alpha(t)

    # Big headline
    ah=int(eo(c01(t*6))*255*fa)
    tc(draw,"Every secret you paste",W//2,200,FB[52],C['white'],ah)
    tc(draw,"into an AI chat...",W//2,272,FB[52],C['g300'],ah)

    sub_a=int(eo(c01((t-0.12)*5))*255*fa)
    tc(draw,"...could be:",W//2,360,FR[32],C['g400'],sub_a)

    # Risk cards appear staggered
    for i,(em,text,col) in enumerate(RISKS):
        delay=0.18+i*0.12
        at=c01((t-delay)*5); aa=int(eo(at)*255*fa)
        slide=int(lerp(60,0,eo(c01((t-delay)*4))))
        cy=440+i*160

        glow_rect(img,70,cy+slide,W-70,cy+120+slide,col,blur=20,alpha=int(at*50))
        lay,d=new_layer(img)
        rr(d,70,cy+slide,W-70,cy+120+slide,18,C['card'],aa)
        rr(d,70,cy+slide,90,cy+120+slide,6,col,aa)
        paste(img,lay)
        draw=ImageDraw.Draw(img)
        tl(draw,em,100,cy+30+slide,FR[40],C['white'],aa)
        tl(draw,text,158,cy+38+slide,FB[32],col,aa)

    # Bottom call-to-action teaser
    if t>0.78:
        ta=int(eo(c01((t-0.78)*8))*255*fa)
        lay2,d2=new_layer(img)
        rr(d2,60,1120,W-60,1220,28,C['em_bg'],ta)
        rr(d2,60,1120,W-60,1220,28,(0,0,0),0,outline=C['emerald'],ow=2)
        paste(img,lay2)
        draw=ImageDraw.Draw(img)
        tc(draw,"There's a smarter way →",W//2,1148,FB[40],C['emerald'],ta)


# ════════════════════════════════════════════════════════════════════════════════
#  SCENE 2 — BROWSER REVEAL  (10–16s)
#  unblockdevs.com browser slides up with homepage
# ════════════════════════════════════════════════════════════════════════════════
def draw_browser(img, t, bx0,by0,bx1,by1, content_reveal, url_glow=0.0, opacity=255):
    """Draw the browser chrome + homepage content."""
    draw=ImageDraw.Draw(img)
    s=(bx1-bx0)/1080   # scale factor

    # Outer shadow
    glow_rect(img,bx0-20,by0-20,bx1+20,by1+20,C['emerald'],blur=60,alpha=int(opacity*0.3))

    lay,d=new_layer(img)
    # Window frame
    d.rounded_rectangle([bx0,by0,bx1,by1],radius=int(18*s),fill=C['bg2']+(opacity,))
    d.rounded_rectangle([bx0,by0,bx1,by1],radius=int(18*s),
                        outline=C['g600']+(opacity//2,),width=1)
    paste(img,lay)
    draw=ImageDraw.Draw(img)

    # Title bar
    tbar_h=int(44*s)
    lay2,d2=new_layer(img)
    d2.rounded_rectangle([bx0,by0,bx1,by0+tbar_h],radius=int(18*s),fill=(28,33,52,opacity))
    paste(img,lay2)
    draw=ImageDraw.Draw(img)

    # Traffic lights
    tl_y=by0+tbar_h//2
    for xi,cc in [(bx0+int(16*s),(236,78,64)),(bx0+int(32*s),(255,189,46)),(bx0+int(48*s),(40,200,64))]:
        lay3,d3=new_layer(img)
        r=int(7*s)
        d3.ellipse([xi-r,tl_y-r,xi+r,tl_y+r],fill=cc+(opacity,))
        paste(img,lay3)
    draw=ImageDraw.Draw(img)

    tc(draw,"unblockdevs.com — Free Developer Tools",
       (bx0+bx1)//2,by0+int(12*s),_font(int(12*s)),C['g500'],opacity)

    # URL bar
    nav_h=int(48*s); nav_y0=by0+tbar_h
    lay4,d4=new_layer(img)
    d4.rectangle([bx0,nav_y0,bx1,nav_y0+nav_h],fill=(22,26,42,opacity))
    paste(img,lay4)
    draw=ImageDraw.Draw(img)

    url_x0=bx0+int(70*s); url_x1=bx1-int(70*s)
    url_y=nav_y0+int(8*s); url_h=int(30*s)

    if url_glow>0:
        glow_rect(img,url_x0-4,url_y-2,url_x1+4,url_y+url_h+2,
                  C['sky'],blur=18,alpha=int(url_glow*180))

    lay5,d5=new_layer(img)
    rr(d5,url_x0,url_y,url_x1,url_y+url_h,8,C['g600'],opacity//3)
    rr(d5,url_x0,url_y,url_x1,url_y+url_h,8,(0,0,0),0,
       outline=C['g500'] if url_glow<0.1 else C['sky'],ow=1)
    paste(img,lay5)
    draw=ImageDraw.Draw(img)

    # Lock + URL
    lk_col=C['emerald']
    lkx=url_x0+int(8*s); lky=url_y+int(7*s)
    lay6,d6=new_layer(img)
    d6.ellipse([lkx,lky+int(4*s),lkx+int(11*s),lky+int(14*s)],fill=lk_col+(opacity,))
    paste(img,lay6)
    draw=ImageDraw.Draw(img)

    url_col=C['sky'] if url_glow>0.3 else C['g300']
    tl(draw,"unblockdevs.com",lkx+int(18*s),url_y+int(7*s),
       _font(int(14*s),True),url_col,opacity)

    # Divider
    lay7,d7=new_layer(img)
    d7.line([bx0,nav_y0+nav_h,bx1,nav_y0+nav_h],fill=C['g600']+(opacity//2,),width=1)
    paste(img,lay7)

    # ── Page content ─────────────────────────────────────────────────────────
    pg_y0=nav_y0+nav_h
    pg_y1=by1
    pg_x0=bx0; pg_x1=bx1

    lay8,d8=new_layer(img)
    d8.rectangle([pg_x0,pg_y0,pg_x1,pg_y1],fill=(250,250,250,int(opacity*content_reveal)))
    paste(img,lay8)
    draw=ImageDraw.Draw(img)

    if content_reveal>0.05:
        cr=content_reveal
        cx2=(pg_x0+pg_x1)//2
        lx=pg_x0+int(22*s)
        cra=int(cr*opacity)

        # Site navbar
        lay9,d9=new_layer(img)
        d9.rectangle([pg_x0,pg_y0,pg_x1,pg_y0+int(44*s)],fill=WHITE+(cra,))
        d9.line([pg_x0,pg_y0+int(44*s),pg_x1,pg_y0+int(44*s)],
                fill=C['g300']+(cra,),width=1)
        paste(img,lay9)
        draw=ImageDraw.Draw(img)

        tl(draw,"unblock",lx,pg_y0+int(12*s),_font(int(17*s),True),(24,24,27),cra)
        tl(draw,"devs",lx+int(67*s),pg_y0+int(12*s),_font(int(17*s),True),C['em_dark'],cra)
        for ni,nl in enumerate(["Tools","SQL Masker","Docs"]):
            nx=pg_x1-int((260-ni*90)*s)
            tl(draw,nl,nx,pg_y0+int(14*s),_font(int(13*s)),(90,98,128),cra)

        # Badge
        hero_y=pg_y0+int(54*s)
        ba2=int(eo(c01((cr-0.1)*5))*cra/255*cra)
        lay10,d10=new_layer(img)
        rr(d10,lx,hero_y,lx+int(300*s),hero_y+int(26*s),14,(236,253,245),ba2)
        d10.ellipse([lx+int(8*s),hero_y+int(8*s),lx+int(18*s),hero_y+int(18*s)],
                    fill=C['emerald']+(ba2,))
        paste(img,lay10)
        draw=ImageDraw.Draw(img)
        tl(draw,"100% client-side — nothing leaves your browser",
           lx+int(24*s),hero_y+int(6*s),_font(int(10*s)),C['em_dark'],ba2)

        # Headline
        hy=hero_y+int(34*s)
        ha=int(eo(c01((cr-0.15)*5))*cra/255*cra)
        tl(draw,"Developer tools",lx,hy,_font(int(28*s),True),(24,24,27),ha)
        tl(draw,"that ",lx,hy+int(36*s),_font(int(28*s),True),(24,24,27),ha)
        tl(draw,"respect your data",lx+int(38*s),hy+int(36*s),
           _font(int(28*s),True),C['em_dark'],ha)

        # Sub-copy
        sa3=int(eo(c01((cr-0.25)*5))*cra/255*cra)
        sub_y2=hy+int(82*s)
        tl(draw,"50+ free browser-based tools — JSON, SQL,",lx,sub_y2,
           _font(int(13*s)),(113,113,122),sa3)
        tl(draw,"APIs, AI, and more. Zero data sent to servers.",lx,sub_y2+int(18*s),
           _font(int(13*s)),(113,113,122),sa3)

        # CTAs
        cta_y=sub_y2+int(46*s)
        ca2=int(eo(c01((cr-0.35)*5))*cra/255*cra)
        lay11,d11=new_layer(img)
        rr(d11,lx,cta_y,lx+int(160*s),cta_y+int(32*s),8,(24,24,27),ca2)
        paste(img,lay11)
        draw=ImageDraw.Draw(img)
        tl(draw,"Explore all tools",lx+int(12*s),cta_y+int(8*s),_font(int(12*s),True),WHITE,ca2)
        lay12,d12=new_layer(img)
        rr(d12,lx+int(168*s),cta_y,lx+int(328*s),cta_y+int(32*s),8,(0,0,0),0,
           outline=(212,212,216),ow=1)
        paste(img,lay12)
        draw=ImageDraw.Draw(img)
        tl(draw,"+ Mask SQL for AI",lx+int(178*s),cta_y+int(8*s),_font(int(12*s)),(24,24,27),ca2)

        # Trust badges
        tb_y=cta_y+int(40*s)
        tba=int(eo(c01((cr-0.45)*5))*cra/255*cra)
        badges=[("🛡","No signup",(236,253,245),C['em_dark']),
                ("🔒","Zero data",(240,249,255),(14,116,144)),
                ("⚡","Free",(255,251,235),(180,83,9))]
        tx2=lx
        for em2,lbl2,bg2,tc2 in badges:
            bw2=int(96*s)
            lay13,d13=new_layer(img)
            rr(d13,tx2,tb_y,tx2+bw2,tb_y+int(28*s),8,bg2,tba)
            paste(img,lay13)
            draw=ImageDraw.Draw(img)
            tl(draw,f"{em2} {lbl2}",tx2+int(6*s),tb_y+int(6*s),_font(int(11*s),True),tc2,tba)
            tx2+=bw2+int(8*s)

        # Right side: mini code preview
        rw_x0=pg_x0+int(490*s); rw_y0=hero_y; rw_x1=pg_x1-int(8*s)
        code_a2=int(eo(c01((cr-0.22)*4))*cra/255*cra)

        lay14,d14=new_layer(img)
        d14.rounded_rectangle([rw_x0,rw_y0,rw_x1,rw_y0+int(210*s)],radius=10,
                              fill=(22,28,42,code_a2))
        paste(img,lay14)
        draw=ImageDraw.Draw(img)

        # mini chrome
        lay15,d15=new_layer(img)
        d15.rounded_rectangle([rw_x0,rw_y0,rw_x1,rw_y0+int(22*s)],
                              radius=10,fill=(30,36,54,code_a2))
        for cxi,ccc in [(rw_x0+int(8*s),(236,78,68)),(rw_x0+int(18*s),(255,190,46)),(rw_x0+int(28*s),(40,200,64))]:
            d15.ellipse([cxi-4,rw_y0+int(7*s),cxi+4,rw_y0+int(15*s)],fill=ccc+(code_a2,))
        paste(img,lay15)
        draw=ImageDraw.Draw(img)
        tc(draw,"schema.json",(rw_x0+rw_x1)//2,rw_y0+int(5*s),
           _font(int(10*s)),C['emerald'],code_a2)

        code_rows=[('  "api": "••••••"',C['emerald']),('  "db":  "••••••"',C['emerald']),
                   ('  "id":  "<USR>',C['sky']),('  "url": "https://"',C['g400'])]
        for ci,(cl,cc) in enumerate(code_rows):
            la2=int(eo(c01((cr-0.3-ci*.05)*6))*code_a2/255*code_a2)
            tl(draw,cl,rw_x0+int(6*s),rw_y0+int(28+ci*28)*s,
               _font(int(11*s)),cc,la2)

        # Stats bar
        stats_y=rw_y0+int(220*s)
        sa4=int(eo(c01((cr-0.52)*5))*cra/255*cra)
        lay16,d16=new_layer(img)
        d16.line([pg_x0,stats_y,pg_x1,stats_y],fill=C['g300']+(sa4,),width=1)
        paste(img,lay16)
        draw=ImageDraw.Draw(img)
        stat_items=[("50+","Tools"),("0","Server calls"),("∞","Free")]
        swid=(pg_x1-pg_x0)//3
        for si,(snum,slbl) in enumerate(stat_items):
            scx=pg_x0+si*swid+swid//2
            tc(draw,snum,scx,stats_y+int(6*s),_font(int(16*s),True),(24,24,27),sa4)
            tc(draw,slbl,scx,stats_y+int(26*s),_font(int(11*s)),(113,113,122),sa4)

def scene_browser(img,t):
    grad_bg(img,(8,10,18),(12,16,26))
    grid_lines(img,alpha=10)
    particles(img,t*6+10,a_mul=0.3)
    draw=ImageDraw.Draw(img)
    fa=fade_alpha(t)

    # Headline above browser
    ha=int(eo(c01(t*6))*255*fa)
    tc(draw,"Introducing",W//2,108,FR[32],C['g400'],ha)
    tc(draw,"unblockdevs.com",W//2,152,FB[64],C['white'],ha)

    # Green dot separator
    lay,d=new_layer(img)
    d.ellipse([W//2-5,226,W//2+5,236],fill=C['emerald']+(ha,))
    paste(img,lay)

    # URL callout pill (early)
    if t<0.4:
        pa=int(eo(c01(t*6))*255*fa)
        lay2,d2=new_layer(img)
        rr(d2,W//2-220,248,W//2+220,294,24,C['em_bg'],pa)
        paste(img,lay2)
        draw=ImageDraw.Draw(img)
        tc(draw,"🌐  unblockdevs.com",W//2,260,FB[28],C['em_light'],pa)

    # Browser slides up
    bt=c01((t-0.05)/0.35)
    slide_y=int(lerp(300,0,eo(bt)))
    bop=int(eo(bt)*255*fa)

    bx0,bx1=40,W-40
    by0=320+slide_y; by1=H-120+slide_y

    url_glow=eo(c01((t-0.72)/0.28)) if t>0.72 else 0.0
    content_reveal=c01((t-0.30)/0.55)

    draw_browser(img,t,bx0,by0,bx1,by1,content_reveal,url_glow,bop)

    # URL highlight callout
    if t>0.74:
        ca=int(eo(c01((t-0.74)*8))*255*fa)
        url_mid=(by0+int(44*(bx1-bx0)/1080)+int(48*(bx1-bx0)/1080))//2 + by0+int(44*(bx1-bx0)/1080)
        arrow_y=by0+int((44+24+4)*(bx1-bx0)/1080)
        cb_w=360; cb_h2=72
        cbx0=W//2-cb_w//2; cby0=arrow_y+40

        lay3,d3=new_layer(img)
        rr(d3,cbx0,cby0,cbx0+cb_w,cby0+cb_h2,14,(10,18,38),ca)
        rr(d3,cbx0,cby0,cbx0+cb_w,cby0+cb_h2,14,(0,0,0),0,outline=C['sky'],ow=2)
        d3.polygon([(W//2-8,cby0),(W//2+8,cby0),(W//2,arrow_y+2)],fill=(10,18,38,ca))
        paste(img,lay3)
        draw=ImageDraw.Draw(img)
        tc(draw,"🔒  unblockdevs.com",W//2,cby0+8,FB[24],C['sky'],ca)
        tc(draw,"50+ tools · 100% client-side · Free forever",W//2,cby0+40,FR[20],C['g400'],ca)


# ════════════════════════════════════════════════════════════════════════════════
#  SCENE 3 — AI SCHEMA MASKER DEMO  (16–24s)
# ════════════════════════════════════════════════════════════════════════════════
BEFORE_ROWS=[
    ('  "api_key":  "sk-prod-xK9mN2pL8"', C['rose']),
    ('  "db_pass":  "SuperS3cret@Prod"',   C['rose']),
    ('  "stripe":   "sk_live_4xTn8mKp"',   C['rose']),
    ('  "user_id":  "usr_9f3a2b1c"',        C['amber']),
    ('  "endpoint": "https://api.io"',      C['g400']),
]
AFTER_ROWS=[
    ('  "api_key":  "••••••••••••••"',  C['emerald']),
    ('  "db_pass":  "••••••••••••••"',  C['emerald']),
    ('  "stripe":   "••••••••••••"',    C['emerald']),
    ('  "user_id":  "<USER_ID>"',       C['sky']),
    ('  "endpoint": "https://api.io"',  C['g400']),
]

def scene_masker(img,t):
    grad_bg(img,(7,12,18),(4,9,22))
    dot_grid(img,spacing=72,alpha=14,t_offset=t)
    particles(img,t*8+16,a_mul=0.45)
    draw=ImageDraw.Draw(img)
    fa=fade_alpha(t)

    # Tool label
    ah=int(eo(c01(t*6))*255*fa)
    # Pill tag
    lay,d=new_layer(img)
    rr(d,W//2-120,90,W//2+120,130,22,C['em_bg'],ah)
    paste(img,lay); draw=ImageDraw.Draw(img)
    tc(draw,"AI Schema Masker",W//2,98,FB[24],C['em_light'],ah)

    tc(draw,"Mask sensitive data before",W//2,150,FB[52],C['white'],ah)
    tc(draw,"sending to ChatGPT",W//2,218,FB[52],C['white'],ah)

    sub_a=int(eo(c01((t-0.07)*5))*255*fa)
    tc(draw,"Automatic field detection · Zero server contact",
       W//2,290,FR[24],C['g400'],sub_a)

    # ── BEFORE card ────────────────────────────────────────────────────────
    bca=int(eo(c01(t*5))*255*fa)
    glow_rect(img,60,330,W-60,700,C['rose'],blur=30,alpha=int(bca*0.45))
    lay2,d2=new_layer(img)
    rr(d2,60,330,W-60,700,20,C['card'],bca)
    rr(d2,60,330,80,700,4,C['rose'],bca)
    paste(img,lay2); draw=ImageDraw.Draw(img)

    # BEFORE header row
    tl(draw,"BEFORE",82,342,FB[28],C['rose'],bca)
    tl(draw,"{",82,384,FM[22],C['g400'],bca)
    for i,(ln,col) in enumerate(BEFORE_ROWS):
        la=int(eo(c01(t*5-i*.04))*bca/255*255)
        tl(draw,ln,104,422+i*52,FM[20],col,la)
    tl(draw,"}",82,690,FM[22],C['g400'],bca)

    # ── Scan beam ──────────────────────────────────────────────────────────
    if 0.32<t<0.60:
        st=c01((t-0.32)/0.28)
        beam_y=int(lerp(330,700,ei(st)))
        ba2=int((1-abs(st-0.5)*2.0)*240)
        bov,bd=new_layer(img)
        bd.rectangle([60,beam_y-2,W-60,beam_y+2],fill=C['emerald']+(ba2,))
        bd.rectangle([60,beam_y-20,W-60,beam_y+20],fill=C['emerald']+(25,))
        paste(img,bov)
        draw=ImageDraw.Draw(img)
        # scanning text
        sl=int(eo(c01(st*4))*230)
        tc(draw,f"🔍  Detecting sensitive fields…",W//2,714,FR[26],C['emerald'],sl)

    # ── AFTER card ─────────────────────────────────────────────────────────
    if t>0.52:
        at=c01((t-0.52)/0.36); aa=int(eo(at)*255*fa)
        glow_rect(img,60,768,W-60,1140,C['emerald'],blur=35,alpha=int(at*80))
        lay3,d3=new_layer(img)
        rr(d3,60,768,W-60,1140,20,C['card2'],aa)
        rr(d3,60,768,80,1140,4,C['emerald'],aa)
        paste(img,lay3); draw=ImageDraw.Draw(img)

        tl(draw,"AFTER",82,780,FB[28],C['emerald'],aa)
        # checkmark badge
        lay4,d4=new_layer(img)
        rr(d4,W-200,780,W-70,820,20,C['em_bg'],aa)
        paste(img,lay4); draw=ImageDraw.Draw(img)
        tc(draw,"✓ Safe to send",(W-200+W-70)//2,786,FB[22],C['em_light'],aa)

        tl(draw,"{",82,824,FM[22],C['g400'],aa)
        for i,(ln,col) in enumerate(AFTER_ROWS):
            delay=i*0.07
            la=int(eo(c01((at-delay)*6))*aa/255*255)
            tl(draw,ln,104,862+i*52,FM[20],col,la)
        tl(draw,"}",82,1126,FM[22],C['g400'],aa)

    # ── Bottom stat ────────────────────────────────────────────────────────
    if t>0.82:
        sa=int(eo(c01((t-0.82)*8))*255*fa)
        lay5,d5=new_layer(img)
        rr(d5,W//2-260,1168,W//2+260,1236,28,C['em_bg'],sa)
        paste(img,lay5); draw=ImageDraw.Draw(img)
        tc(draw,"🛡️  5 secrets masked · 0 bytes sent to server",
           W//2,1190,FB[28],C['em_light'],sa)


# ════════════════════════════════════════════════════════════════════════════════
#  SCENE 4 — TOOLS GRID  (24–30s)
# ════════════════════════════════════════════════════════════════════════════════
TOOLS=[
    ("{ }","JSON Formatter",   C['sky']),
    ("🔐","JWT Decoder",       C['violet']),
    ("⚡","SQL Formatter",     C['amber']),
    ("⌨️","cURL Converter",    C['emerald']),
    ("🔎","Regex Tester",      C['sky']),
    ("📦","Base64 Encoder",    C['amber']),
    ("#️⃣","Hash Generator",   C['violet']),
    ("↔","JSON Diff",          C['emerald']),
    ("🛡","Code Shield",       C['rose']),
    ("🎨","Color Picker",      C['violet']),
    ("🔑","UUID Generator",    C['sky']),
    ("📄","Markdown Preview",  C['emerald']),
]

def scene_tools(img,t):
    grad_bg(img,(8,10,20),(6,12,26))
    dot_grid(img,spacing=56,alpha=16,color=C['sky'])
    particles(img,t*6+24,a_mul=0.35)
    draw=ImageDraw.Draw(img)
    fa=fade_alpha(t)

    ah=int(eo(c01(t*5))*255*fa)
    tc(draw,"50+ developer tools",W//2,130,FB[64],C['white'],ah)
    tc(draw,"One place. Zero compromises.",W//2,212,FR[32],C['g400'],ah)

    # Grid of tool cards: 3 columns × 4 rows
    cols,rows=3,4
    pad=20; margin_x=60; top_y=290
    card_w=(W-margin_x*2-pad*(cols-1))//cols   # ~288
    card_h=160

    for i,(em,name,col) in enumerate(TOOLS):
        row_i=i//cols; col_i=i%cols
        delay=0.04+row_i*0.08+col_i*0.04
        at=c01((t-delay)*5); aa=int(eo(at)*255*fa)
        slide=int(lerp(40,0,eo(c01((t-delay)*4))))

        cx2=margin_x+col_i*(card_w+pad)
        cy2=top_y+row_i*(card_h+pad)+slide

        glow_rect(img,cx2,cy2,cx2+card_w,cy2+card_h,col,blur=18,alpha=int(at*40))
        lay,d=new_layer(img)
        rr(d,cx2,cy2,cx2+card_w,cy2+card_h,16,C['card'],aa)
        rr(d,cx2,cy2,cx2+card_w,cy2+card_h,16,(0,0,0),0,outline=col,ow=1)
        # top colour bar
        rr(d,cx2,cy2,cx2+card_w,cy2+5,4,col,aa)
        paste(img,lay); draw=ImageDraw.Draw(img)

        tc(draw,em,cx2+card_w//2,cy2+28,FB[32],col,aa)
        tc(draw,name,cx2+card_w//2,cy2+86,_font(18,True),C['g300'],aa)

    # Bottom "and many more" + CTA
    if t>0.78:
        ta=int(eo(c01((t-0.78)*7))*255*fa)
        tc(draw,"…and 38 more  →  unblockdevs.com",W//2,1780,FB[28],C['emerald'],ta)


# ════════════════════════════════════════════════════════════════════════════════
#  SCENE 5 — STATS  (30–35s)
# ════════════════════════════════════════════════════════════════════════════════
STATS=[
    ("50+",  "Developer tools",        C['emerald'], "🧰"),
    ("100%", "Client-side",            C['sky'],     "🔒"),
    ("0",    "Bytes to any server",    C['violet'],  "🛡️"),
    ("∞",    "Free — no account needed",C['amber'],  "⚡"),
]

def count_up(target, t, duration=0.6):
    """Animate a number counting up."""
    if not target[-1].isdigit() and target not in ["∞","100%"]:
        return target
    progress=c01(t/duration)
    if target=="∞": return "∞"
    if target=="100%":
        val=int(eo(progress)*100); return f"{val}%"
    if target=="50+":
        val=int(eo(progress)*50); return f"{val}+" if val==50 else str(val)
    if target=="0": return "0"
    return target

def scene_stats(img,t):
    grad_bg(img,(6,8,16),(10,12,22))
    grid_lines(img,alpha=12)
    particles(img,t*4+30,a_mul=0.6)
    draw=ImageDraw.Draw(img)
    fa=fade_alpha(t)

    ah=int(eo(c01(t*6))*255*fa)
    tc(draw,"By the numbers",W//2,160,FB[72],C['white'],ah)

    sub_a=int(eo(c01((t-0.1)*5))*255*fa)
    tc(draw,"Everything you need. Nothing you don't.",W//2,262,FR[28],C['g400'],sub_a)

    # Horizontal divider
    lay,d=new_layer(img)
    dw=int(eo(c01((t-0.15)*4))*400)
    d.line([W//2-dw,308,W//2+dw,308],fill=C['emerald']+(sub_a,),width=2)
    paste(img,lay)

    for i,(num,label,col,em) in enumerate(STATS):
        delay=0.18+i*0.14
        at=c01((t-delay)*4); aa=int(eo(at)*255*fa)
        cy=360+i*340

        glow_rect(img,60,cy,W-60,cy+280,col,blur=30,alpha=int(at*55))
        lay2,d2=new_layer(img)
        rr(d2,60,cy,W-60,cy+280,24,C['card'],aa)
        # Left accent bar
        rr(d2,60,cy,82,cy+280,8,col,aa)
        paste(img,lay2); draw=ImageDraw.Draw(img)

        # Emoji
        tl(draw,em,98,cy+80,FB[44],col,aa)

        # Animated number
        num_str=count_up(num,at-0.05)
        tc(draw,num_str,W//2+60,cy+48,FB[88],col,aa)

        # Label
        tc(draw,label,W//2+60,cy+188,FR[28],C['g400'],aa)

        # Thin bottom line
        lay3,d3=new_layer(img)
        lw=int(eo(c01((at-0.3)*3))*(W-160))
        d3.line([60+lw//2,cy+276,W-60-lw//2,cy+276],fill=col+(aa//4,),width=1)
        paste(img,lay3)


# ════════════════════════════════════════════════════════════════════════════════
#  SCENE 6 — CTA  (35–40s)
# ════════════════════════════════════════════════════════════════════════════════
def scene_cta(img,t):
    grad_bg(img,(6,8,16),(8,12,22))
    dot_grid(img,spacing=54,alpha=20,t_offset=t)
    particles(img,t*3+35,a_mul=c01(t*4)*0.7)
    draw=ImageDraw.Draw(img)
    fa=fade_alpha(t, fade_in=0.08, fade_out=1.0)

    # Big glow orb
    go=int(c01(t*3)*160)
    glow_circle(img,W//2,H//2-300,260,C['emerald'],blur=120,alpha=go)

    # Tag
    ta2=int(eo(c01(t*5))*255*fa)
    lay,d=new_layer(img)
    rr(d,W//2-140,280,W//2+140,324,24,C['em_bg'],ta2)
    paste(img,lay); draw=ImageDraw.Draw(img)
    tc(draw,"Free  ·  No signup  ·  Private",W//2,290,FB[22],C['em_light'],ta2)

    # Main headline
    ha=int(eo(c01((t-0.05)*5))*255*fa)
    tc(draw,"Build without",W//2,348,FB[80],C['white'],ha)
    tc(draw,"leaking secrets.",W//2,444,FB[80],C['emerald'],ha)

    # Sub line
    sa=int(eo(c01((t-0.18)*5))*255*fa)
    tc(draw,"50+ developer tools. 100% in your browser.",W//2,558,FR[28],C['g400'],sa)
    tc(draw,"No account. No server. No risk.",W//2,600,FR[28],C['g300'],sa)

    # URL display
    if t>0.26:
        ua=int(spring(c01((t-0.26)/0.22))*255*fa)
        glow_rect(img,W//2-280,660,W//2+280,750,C['emerald'],blur=40,alpha=int(ua*0.5))
        lay2,d2=new_layer(img)
        rr(d2,W//2-280,660,W//2+280,750,20,C['em_bg'],ua)
        rr(d2,W//2-280,660,W//2+280,750,20,(0,0,0),0,outline=C['emerald'],ow=2)
        paste(img,lay2); draw=ImageDraw.Draw(img)

        # Lock dot
        lay3,d3=new_layer(img)
        d3.ellipse([W//2-248,690,W//2-228,710],fill=C['emerald']+(ua,))
        paste(img,lay3); draw=ImageDraw.Draw(img)
        tc(draw,"unblockdevs.com",W//2+8,672,FB[44],C['em_light'],ua)

    # Big CTA button
    if t>0.42:
        bt=c01((t-0.42)/0.2)
        ba=int(spring(bt)*255*fa)
        glow_rect(img,W//2-260,790,W//2+260,890,C['emerald'],blur=40,alpha=int(ba*0.6))
        lay4,d4=new_layer(img)
        rr(d4,W//2-260,790,W//2+260,890,50,C['emerald'],ba)
        paste(img,lay4); draw=ImageDraw.Draw(img)
        tc(draw,"Start building →",W//2,820,FB[44],C['zinc900'],ba)

    # Feature chips
    if t>0.60:
        chips=[("🔒","Privacy-first"),("⚡","Instant"),("🧰","50+ tools"),("💸","Free forever")]
        ca=int(eo(c01((t-0.60)/0.20))*255*fa)
        chip_total=sum(tw(draw,f"{e} {l}",FB[24])+36 for e,l in chips)+30
        cx2=W//2-chip_total//2
        for em,lbl in chips:
            cw=tw(draw,f"{em} {lbl}",FB[24])+36
            lay5,d5=new_layer(img)
            rr(d5,cx2,930,cx2+cw,978,24,C['card2'],ca)
            rr(d5,cx2,930,cx2+cw,978,24,(0,0,0),0,outline=C['g600'],ow=1)
            paste(img,lay5); draw=ImageDraw.Draw(img)
            tc(draw,f"{em} {lbl}",cx2+cw//2,940,FB[24],C['g300'],ca)
            cx2+=cw+10

    # Floating tool cards strip
    if t>0.52:
        strip_cards=[("{ }","JSON",C['sky']),("🔐","JWT",C['violet']),
                     ("⚡","SQL",C['amber']),("🛡","Shield",C['rose']),("🔎","Regex",C['emerald'])]
        sa2=int(eo(c01((t-0.52)/0.22))*255*fa)
        sw2=160; total=len(strip_cards)*(sw2+14)-14
        sx=W//2-total//2
        for em2,nm2,col2 in strip_cards:
            float_y=int(math.sin(t*2.5+sx*.004)*8)
            lay6,d6=new_layer(img)
            rr(d6,sx,1020+float_y,sx+sw2,1100+float_y,14,C['card'],sa2)
            rr(d6,sx,1020+float_y,sx+sw2,1025+float_y,4,col2,sa2)
            paste(img,lay6); draw=ImageDraw.Draw(img)
            tc(draw,em2,sx+sw2//2,1033+float_y,FB[28],col2,sa2)
            tc(draw,nm2,sx+sw2//2,1064+float_y,_font(16,True),C['g300'],sa2)
            sx+=sw2+14

    # Final brand
    if t>0.76:
        fa2=int(eo(c01((t-0.76)/0.24))*255)
        tc(draw,"unblockdevs.com",W//2,1780,FB[32],C['g500'],fa2)


# ════════════════════════════════════════════════════════════════════════════════
#  MASTER RENDERER
# ════════════════════════════════════════════════════════════════════════════════
RENDERERS=[scene_hook, scene_problem, scene_browser,
           scene_masker, scene_tools, scene_stats, scene_cta]

def make_frame(tg):
    img=Image.new("RGBA",(W,H),(0,0,0,255))
    for i,renderer in enumerate(RENDERERS):
        s,e=SCENES[i]
        if s<=tg<e:
            renderer(img,(tg-s)/(e-s))
            break
    draw=ImageDraw.Draw(img)
    progress_bar(draw,tg)
    return np.array(img.convert("RGB"))

if __name__=="__main__":
    print(f"Rendering {DURATION}s @ {FPS}fps  {W}×{H}")
    print(f"Output → {OUT}")
    clip=VideoClip(make_frame,duration=DURATION)
    clip.write_videofile(str(OUT),fps=FPS,codec="libx264",preset="fast",
                         ffmpeg_params=["-crf","20","-pix_fmt","yuv420p"],logger="bar")
    print(f"\n✅  Done: {OUT}")
