async (page) => {
  const urls = {collection:'collections/mong-doi-thuong', product:'products/dung-dress', page:'pages/chinh-sach-doi-hang', contact:'pages/lien-he', brand:'pages/thuong-hieu', size:'pages/bang-kich-co', cart:'cart', search:'search?q=dam&type=product', blog:'blogs/news', article:'blogs/news/triangle-dress-version-sangria-red-for-christmas'};
  const o = await page.context().newPage();
  const out = {};
  for (const [w,h] of [[1440,900],[390,844]]) {
    await o.setViewportSize({width:w,height:h});
    for (const [k,u] of Object.entries(urls)) {
      await o.goto('https://mauvevn.com/'+u, {waitUntil:'domcontentloaded'}); await o.waitForTimeout(1500);
      out[k+'@'+w] = await o.evaluate(()=>{
        const root = document.querySelector('.main-layout') || document.body;
        const P=['display','position','fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','textTransform','textAlign','backgroundColor','padding','margin','border','borderBottom','borderRadius','gridTemplateColumns','gap','flexWrap','justifyContent','alignItems','top','maxWidth','fontStyle','textDecorationLine'];
        const def={display:'block',position:'static',fontWeight:'400',letterSpacing:'normal',textTransform:'none',textAlign:'start',backgroundColor:'rgba(0, 0, 0, 0)',padding:'0px',margin:'0px',border:'',borderBottom:'',borderRadius:'0px',gridTemplateColumns:'none',gap:'normal',flexWrap:'nowrap',justifyContent:'normal',alignItems:'normal',top:'auto',maxWidth:'none',fontStyle:'normal',textDecorationLine:'none'};
        const lines=[]; let n=0;
        const walk=(el,d)=>{ if(n>260||d>9) return; const cs=getComputedStyle(el); if(cs.display==='none') return; const r=el.getBoundingClientRect(); if(r.width===0&&r.height===0) return;
          const s=P.filter(p=>{const v=cs[p]; if(p==='border'||p==='borderBottom') return !/^0px/.test(v); return v!==def[p];}).map(p=>p+':'+cs[p]).join('; ');
          const txt=[...el.childNodes].filter(c=>c.nodeType===3).map(c=>c.textContent.trim()).join(' ').slice(0,60);
          lines.push('  '.repeat(d)+el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\s+/).slice(0,3).join('.'):'')+' ['+[r.x,r.y+scrollY,r.width,r.height].map(Math.round)+'] '+s+(txt?' "'+txt+'"':''));
          n++; if(['SVG','svg','SELECT','P','H1','H2','H3','LABEL','BUTTON'].includes(el.tagName)) return;
          let i=0; for(const c of el.children){ if(i++>12) break; walk(c,d+1);} };
        walk(root,0); return lines.join('\n');
      });
    }
  }
  await o.close();
  return Object.entries(out).map(([k,v])=>'##### '+k+'\n'+v).join('\n\n');
}
