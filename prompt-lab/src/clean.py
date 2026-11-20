import re,sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
lines=s.split('\n')
# data region: script start .. KARTEN header
start=next(i for i,l in enumerate(lines) if l.startswith('<script>'))
end=next(i for i,l in enumerate(lines) if 'KARTEN ═' in l)
head='\n'.join(lines[:start]); data='\n'.join(lines[start:end]); tail='\n'.join(lines[end:])

def find_close(t,i):
    # i at opening [ or {; return index after matching close, skipping strings
    depth=0;q=None;j=i
    while j<len(t):
        c=t[j]
        if q:
            if c=='\\': j+=2; continue
            if c==q: q=None
        elif c in '"\'': q=c
        elif c in '[{': depth+=1
        elif c in ']}':
            depth-=1
            if depth==0: return j+1
        j+=1
    raise Exception('unbalanced')

removed=[]
# 1) whole school constants emptied
for name,empty in [('SCENE_CAT_SCHOOL','[]'),('SPOTS_SCHOOL','{}'),('FURN_SCHOOL','{}')]:
    i=data.index('const '+name+'=')+len('const '+name+'=')
    j=find_close(data,i); removed.append(name+' (ganzer Block)'); data=data[:i]+empty+data[j:]
# 2) object keys with school/child categories
KEYRX=re.compile(r'"(Schule|Kindergarten & Kita|Grundschule|Internat|Aula & Schulbühne|Lehrerzimmer & Sekretariat|Schulhof|Mensa & Schulkantine|Turnhalle & Umkleide|Schulbus & Schulweg|Berufsschule & Ausbildung)"\s*:\s*(?=[\[{])')
while True:
    m=KEYRX.search(data)
    if not m: break
    j=find_close(data,m.end())
    k=j
    while k<len(data) and data[k] in ' \t\n': k+=1
    if k<len(data) and data[k]==',': j=k+1
    removed.append('Schlüssel '+m.group(1)); data=data[:m.start()]+data[j:]
# 3) array string items
BAD=re.compile(r"""(\bschool|\bschul(?!ter)|kindergarten|\bkita\b|nursery|nappy|\bchild(?!hood scar)|(?<!club )\bkids?\b|pupil|classroom|playground|teacher|lehrer|teenager|\bteens?\b|toddler|baby products|sixth-form|detention|parents' evening|caretaker|class register|\blesson|exercise books|counting blocks|circle time|tiny chairs|^young$|^youthful$|^fresh-faced$|younger than her|reads much younger|reads a little younger|^young face|^noticeably younger$|^a girl$|young figure|^Dutch girl costume$|^a boy$)""",re.I)
out=[];i=0;n=len(data)
STR=re.compile(r'"((?:[^"\\\n]|\\.)*)"')
pos=0;res=[]
for m in STR.finditer(data):
    a,b=m.span()
    if a<pos: continue
    # following char
    k=b
    while k<n and data[k] in ' \t': k+=1
    nxt=data[k] if k<n else ''
    p=a-1
    while p>=0 and data[p] in ' \t\n': p-=1
    prv=data[p] if p>=0 else ''
    if nxt==':' or prv==':' : continue   # object key / value
    if prv not in '[,' : continue          # not an array item
    if not BAD.search(m.group(1)): continue
    # remove item + one adjacent comma
    if nxt==',':
        e=k+1
        res.append((a,e))
    elif nxt==']' and prv==',':
        res.append((p,b))
    else:
        res.append((a,b))
    removed.append(m.group(1)); pos=b
for a,b in reversed(res): data=data[:a]+data[b:]
out=head+'\n'+data+'\n'+tail
# 4) rules referencing removed people
out=out.replace('   {when:{role:rx("\\\\bchild\\\\b")},restrict:{age:/small child|child of about eight|younger|— /i}},\n','')
out=out.replace('   {when:{role:rx("teenager|pupil")},restrict:{age:/young teenager|late teens|younger|— /i}},\n','')
# version tag
out=out.replace('<span class="version">07.11</span>','<span class="version">07.12</span>')
open(dst,'w',encoding='utf-8').write(out)
print(len(removed),'entfernt');print('\n'.join(removed))
