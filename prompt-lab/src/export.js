const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const data=await p.evaluate(()=>{
 const ser=v=>JSON.parse(JSON.stringify(v,(k,x)=>x instanceof RegExp?{__re:[x.source,x.flags]}:x));
 const keep=['top','mid','bottom','dress','robe','shoes','stock','tights','socks','bra','panty','leo','baby','swim','corset','garter','bags','belt','scarf','gloves','head','jewel','choker','spec','scene','light'];
 const cards={};
 for(const c of CARDS){if(!keep.includes(c.k))continue;
  cards[c.k]={t:c.t,sep:c.sep??null,pre:c.pre,post:c.post,rules:ser(c.rules||[]),merge:c.merge||null,fixed:c.fixed||null,ax:ser(c.ax)};}
 const used=new Set();for(const c of Object.values(cards))for(const v of Object.values(c.ax)){(Array.isArray(v)?v:Object.values(v.map).flat()).forEach(x=>used.add(x))}
 const gloss={};for(const [k,v] of Object.entries(GLOSS))if(used.has(k))gloss[k]=v;
 return {cards,axlab:AXLAB,gloss,neutral:COLORS.filter(c=>c[2]).map(c=>c[0]),fam:Object.fromEntries(COLORS.map(c=>[c[0],c[1]])),
  styleCat:STYLE_CAT,styleM:STYLE_M,styleF:ser(STYLE_F),frame:FRAME,photo:STYLE};
});
fs.writeFileSync(process.argv[3],JSON.stringify(data));console.log('bytes',fs.statSync(process.argv[3]).size,Object.keys(data.cards).length,'gloss',Object.keys(data.gloss).length);
console.log(JSON.stringify(data.styleF['1990s grunge']||Object.entries(data.styleF)[0]).slice(0,300));
console.log(JSON.stringify(data.cards.shoes.ax.form).slice(0,200));
await b.close();})();
