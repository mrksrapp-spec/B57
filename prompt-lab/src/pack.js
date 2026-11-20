const fs=require('fs');const d=JSON.parse(fs.readFileSync(process.argv[2]));
const DROP=/^(mixwhere\d?|col[234]|mat[234]|emb|embtech|embplace|embthread|ground|handle|wet|wetshow)$/;
const pool=[],idx=new Map();const P=a=>{const k=JSON.stringify(a);if(!idx.has(k)){idx.set(k,pool.length);pool.push(a)}return idx.get(k)};
for(const c of Object.values(d.cards)){
 for(const x of Object.keys(c.ax))if(DROP.test(x))delete c.ax[x];
 c.post=c.post.filter(([x])=>!DROP.test(x));c.pre=c.pre.filter(x=>!DROP.test(x));
 c.rules=c.rules.filter(r=>!Object.keys(r.when).some(x=>DROP.test(x)));
 for(const r of c.rules){if(r.hide)r.hide=r.hide.filter(x=>!DROP.test(x));if(r.restrict)for(const x of Object.keys(r.restrict))if(DROP.test(x))delete r.restrict[x]}
 c.merge=null;
 for(const [x,v] of Object.entries(c.ax)){if(Array.isArray(v))c.ax[x]=P(v);else{for(const m of Object.keys(v.map))v.map[m]=P(v.map[m])}}
}
d.pool=pool;const out=JSON.stringify(d);fs.writeFileSync(process.argv[3],out);console.log('bytes',out.length,'pool',pool.length);
