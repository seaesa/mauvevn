async (page) => {
  const map = [[".header-top", ".header-top"], [".header-top p", ".header-top p"], [".header-bottom", ".header-bottom"], [".logo img", ".logo img"], ["[data-action=bars]", ".burger"], [".main_menu", ".nav__list"], [".main_menu > li:nth-of-type(1) > a", ".nav__item:nth-child(1) > a"], [".main_menu > li:nth-of-type(5) > a", ".nav__item:nth-child(5) > a"], [".hotnew", ".nav__hot"], [".searchclick svg", "[data-toggle=search] svg"], [".accountsave svg", "[data-toggle=account] svg"], [".cart_bar svg", "[data-toggle=cart] svg"], [".header-bottom-right-item-count", ".cart-count"], ["#slider", ".hero"], [".slick-dots", ".dots-vertical"], [".home-four-banner-wrap", ".banners__track"], [".home-four-banner-wrap-item", ".banners__item"], [".home-product-slidernew .section-title-all", ".products .section-head"], [".home-product-slidernew .section-title-all h2", ".products .section-head h2"], [".home-product-slidernew .readmorenow", ".products .btn-more"], [".home-product-slidernew .pro-loop", ".products .pro-loop"], [".home-product-slidernew .imageno1", ".products .img-1"], [".home-product-slidernew .pro-loop-name", ".products .pro-loop__name"], [".home-product-slidernew .pro-loop-name a", ".products .pro-loop__name a"], [".home-product-slidernew .pro-loop-price strong", ".products .pro-loop__price strong"], [".home-vendor .title", ".lookbook .section-head"], [".home-vendor .title > div:first-child", ".lookbook .section-head h2"], [".home-works-brandvendor-click", ".lookbook .btn-more"], [".mb-scollsi", ".lookbook__item"], [".mb-scollsi img", ".lookbook__item img"], ["#footer", ".footer"], [".list-col", ".footer__cols"], [".col-item:nth-child(1) .col-title h2", ".footer__col:nth-child(1) .footer__title h2"], [".list-menu a", ".footer__menu a"], [".item-social img", ".footer__social img"], [".list-info p", ".footer__info p"], [".box-bct img", ".footer__bct img"], [".bottom-footer", ".footer__bottom"], [".bottom-footer p", ".footer__bottom p"], [".header-bottom .flex > div:nth-child(1)", ".header-logo"], [".fixScroll", ".nav"], [".home-product-slider-wrap-body", ".products__body"], [".home-vendor-wrap-body", ".lookbook__body"], [".box-bct", ".footer__bct"], [".swatch-element label", ".swatch"]];
  const ctx = page.context();
  const orig = await ctx.newPage();
  const collect = (p, sels) => p.evaluate((sels)=>sels.map(s=>{const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return {r:[r.x,r.y+scrollY,r.width,r.height].map(v=>Math.round(v)), vis: cs.display!=='none' && r.width>0, st:[cs.fontSize,cs.fontWeight,cs.lineHeight,cs.letterSpacing,cs.color,cs.textTransform,cs.borderBottom.replace(/0px none.*/,'none')].join('|'), ff:cs.fontFamily.split(',')[0].replace(/"/g,'')};}), sels);
  const famMap = {'mauvesansserif-light':'MauveSans','mauvesansserif-re':'MauveSansRe'};
  const out = {};
  for (const [w,h] of [[1440,900],[1200,900],[1000,900],[768,1024],[390,844]]) {
    for (const p of [page, orig]) { await p.setViewportSize({width:w,height:h}); }
    await orig.goto('https://mauvevn.com/'); await page.goto('http://localhost:5500/');
    for (const p of [page, orig]) { await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);}); }
    await page.waitForTimeout(1500);
    const a = await collect(orig, map.map(m=>m[0]));
    const b = await collect(page, map.map(m=>m[1]));
    const diffs = [];
    map.forEach((m,i)=>{ const A=a[i], B=b[i];
      if(!A||!B){ if(!(A===null&&B===null)) diffs.push(m[1]+' missing '+(A?'clone':'orig')); return; }
      if(A.vis!==B.vis){ diffs.push(m[1]+' visibility orig='+A.vis+' clone='+B.vis); return; }
      if(!A.vis) return;
      const d=A.r.map((v,k)=>B.r[k]-v); if(d.some(v=>Math.abs(v)>1)) diffs.push(m[1]+' rect orig='+A.r+' clone='+B.r);
      const ffA = famMap[A.ff]||A.ff; if(A.st!==B.st || ffA!==B.ff) diffs.push(m[1]+' style orig='+A.ff+'|'+A.st+' clone='+B.ff+'|'+B.st);
    });
    out[w]=diffs;
  }
  await orig.close();
  return out;
}