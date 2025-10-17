import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
import crypto from 'crypto'

function toSlug(input: string){
  return input.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')
}
function sanitize(html: string){
  return html.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/javascript:/gi,'')
}

export async function POST(req: NextRequest){
  try {
    const body = await req.json()
    const { title, lead, body: html, tags=[] } = body || {}
    if(!title || !html) return NextResponse.json({ error:'Missing fields' }, { status:400 })

    const id = crypto.randomUUID()
    const slug = toSlug(title)
    const now = new Date()
    const pool = getPool()

    // upsert "guest" user
    const guestEmail = 'guest@example.org'
    const [u] = await pool.query<any[]>("SELECT id FROM User WHERE email=?", [guestEmail])
    let authorId = u?.[0]?.id
    if(!authorId){
      authorId = crypto.randomUUID()
      await pool.query(
        "INSERT INTO User (id,email,displayName,createdAt,updatedAt) VALUES (?,?,?,?,?)",
        [authorId, guestEmail, 'Guest', now, now]
      )
    }

    await pool.query(
      "INSERT INTO Testimony (id, slug, title, lead, body, tags, status, authorId, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [id, slug, title, lead || null, sanitize(String(html)), JSON.stringify(Array.isArray(tags)?tags:[]), 'PUBLISHED', authorId, now, now]
    )

    return NextResponse.json({ id, slug, status: 'PUBLISHED' })
  } catch (e:any){
    return NextResponse.json({ error: e?.message || 'Server error' }, { status:500 })
  }
}
