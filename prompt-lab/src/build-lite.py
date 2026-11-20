import sys,json
tpl,data,out=sys.argv[1:4]
d=open(data,encoding='utf-8').read().replace('</','<\\/')
open(out,'w',encoding='utf-8').write(open(tpl,encoding='utf-8').read().replace('__DATA__',d))
