# Recalcula summary/countries a partir de los retiros DEMO de data.json (nada copiado del sitio original) y regenera data.js
import json,statistics,datetime as dt,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
d=json.load(open('data.json'))
firms={};
def F(n):
    if n in ('—','',None): return n
    if n not in firms: firms[n]=f'(PROP FIRM {len(firms)+1})'
    return firms[n]
d['propFirms']=[F(n) for n in d['propFirms']]
for p in d['payouts']: p['propFirm']=F(p['propFirm'])
for t in d['traders']:
    for a in t['accounts']: a['propFirm']=F(a['propFirm'])
today=dt.date.fromisoformat(d['today']); P=d['payouts']
day=lambda s:(today-dt.date.fromisoformat(s)).days
l30=[p['amountValue'] for p in P if day(p['date'])<=30]
T={t['slug']:t for t in d['traders']}
acc=[a for t in d['traders'] for a in t['accounts']]
last=min(day(p['date']) for p in P)
d['updated']='Actualizado '+('hoy' if last==0 else 'ayer' if last==1 else f'hace {last} días')
d['summary']={'traders':len({p['trader'] for p in P}),'payouts':len(P),'total':sum(p['amountValue'] for p in P),'since':'(FECHA INICIO)',
 'avg':round(statistics.mean(l30)),'median':round(statistics.median(l30)),'max':max(l30),'last30':len(l30),
 'every':(lambda h:f'{int(h//24)}d {int(h%24)}h' if h>=24 else f'{int(h)}h {int(h*60%60)}m')(30*24/max(len(l30),1)),
 'funded':'$150,000','fundedDelta':'(VARIACIÓN 30 DÍAS)','activeAccounts':sum(a['status'] in('Activa','Fondeada') for a in acc),'boughtAccounts':len(acc)}
for c in d['countries']:
    ps=[p for p in P if T[p['trader']]['country']==c['name']]
    c['total']=sum(p['amountValue'] for p in ps); c['count']=len(ps)
d['countries']=sorted([c for c in d['countries'] if c['count']],key=lambda c:-c['total'])
d['_nota']='Datos FALSOS de ejemplo. summary y countries se CALCULAN con _derive_summary.py a partir de los retiros demo (amountValue inventado); reemplaza los retiros con tus datos y vuelve a ejecutarlo.'
json.dump(d,open('data.json','w'),ensure_ascii=False,indent=1)
open('data.js','w').write('window.PAYOUTS_DATA='+json.dumps(d,ensure_ascii=False)+';\n')
print(d['summary'],[(c['name'],c['total'],c['count']) for c in d['countries']],firms)
