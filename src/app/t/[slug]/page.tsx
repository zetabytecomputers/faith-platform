import { getPool } from '@/lib/db'
export const revalidate = 60

export default async function Page({ params }:{ params:{ slug:string } }){
  const pool = getPool()
  const [rows] = await pool.query<any[]>(
    "SELECT title, lead, body, status FROM Testimony WHERE slug = ? LIMIT 1",
    [params.slug]
  )
  const t = rows[0]
  if(!t || t.status !== 'PUBLISHED') return <div>Not found.</div>
  const safe = String(t.body).replace(/<script/gi,'&lt;script')
  return (
    <article>
      <h1 style={{fontSize:30,fontWeight:800}}>{t.title}</h1>
      {t.lead && <p style={{color:'#475569'}}>{t.lead}</p>}
      <div dangerouslySetInnerHTML={{ __html: safe }} />
      <div style={{marginTop:12,padding:10,border:'1px solid #e2e8f0',borderRadius:8,fontSize:14}}>
        Licensed under <b>CC BY-NC-SA</b>. Please attribute the author and link back.
      </div>
    </article>
  )
}
