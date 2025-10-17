import { prisma } from '@/lib/db'
export const revalidate = 60
export default async function Page(){
  const items = await prisma.testimony.findMany({
    where:{ status:'PUBLISHED' }, orderBy:{ createdAt:'desc' }, take:25
  })
  return (
    <section>
      <h1 style={{fontSize:28,fontWeight:800,marginBottom:12}}>Testimonies</h1>
      <ul style={{display:'grid',gap:10,listStyle:'none',padding:0}}>
        {items.map(t=>(
          <li key={t.id} style={{border:'1px solid #e2e8f0',borderRadius:10,padding:12}}>
            <a href={`/t/${t.slug}`} style={{fontWeight:700}}>{t.title}</a>
            {t.lead && <p style={{color:'#475569',margin:'6px 0 0'}}>{t.lead}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
