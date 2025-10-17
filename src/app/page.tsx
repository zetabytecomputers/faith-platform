import Link from 'next/link'
export default function Home() {
  return (
    <section style={{textAlign:'center',display:'grid',gap:12}}>
      <h1 style={{fontSize:34,fontWeight:800}}>Share Light. Strengthen Faith in Jesus Christ.</h1>
      <p style={{color:'#475569'}}>Add your testimony and help build a living library that uplifts the world.</p>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        <Link href="/submit" style={{background:'#4f46e5',color:'#fff',padding:'8px 12px',borderRadius:8}}>Share Your Testimony</Link>
        <Link href="/testimonies" style={{border:'1px solid #cbd5e1',padding:'8px 12px',borderRadius:8}}>Browse Stories</Link>
      </div>
    </section>
  )
}
