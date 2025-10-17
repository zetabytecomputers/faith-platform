import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Testimonies of Jesus Christ',
  description: 'A community-built library of living testimonies of Jesus Christ.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily:'ui-sans-serif,system-ui'}}> 
        <header style={{maxWidth:960,margin:'0 auto',padding:'16px',display:'flex',gap:16,justifyContent:'space-between'}}>
          <a href="/" style={{fontWeight:600}}>Share Light</a>
          <nav style={{display:'flex',gap:12}}>
            <a href="/testimonies">Testimonies</a>
            <a href="/about">About</a>
          </nav>
        </header>
        <main style={{maxWidth:800,margin:'0 auto',padding:'16px'}}>{children}</main>
        <footer style={{maxWidth:960,margin:'0 auto',padding:'16px',color:'#64748b',fontSize:14}}>
          “I am the light of the world.” — John 8:12
        </footer>
      </body>
    </html>
  )
}
