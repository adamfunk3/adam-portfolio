/**
 * download-logos.js
 * Run once with: npm run download-logos
 *
 * Downloads all external company logos to public/logos/ so they are
 * permanently bundled with the portfolio and never break due to expired URLs.
 */

import https from 'https'
import http  from 'http'
import fs    from 'fs'
import path  from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = path.join(__dirname, '..', 'public', 'logos')

const LOGOS = [
  {
    name: 'goldman.png',
    url:  'https://assets.stickpng.com/images/613f625b16381700041030e5.png',
  },
  {
    name: 'sorenson.png',
    url:  'https://cdn.prod.website-files.com/6107b1111d4d3e4f9b43f258/68c985e4a33bacdc99f9781e_Sorenson-thumb.png',
  },
  {
    name: 'byu.png',
    url:  'https://www.pngmart.com/files/23/Byu-Logo-PNG-Photo.png',
  },
  {
    name: 'accelkkr.png',
    url:  'https://lh7-us.googleusercontent.com/WdCmm8Vjn9Xkg-64Kcv9mLyYn9SaVSO7Z7YiUHq9j2UAjaL10ZK2520A2FKbnDodzuMh3SFB0l-U9uyajd8_ItdHXJo5SumNnwmpyHL_7YtuVpbBTYsL5yHIzpCFXePkdr9kRhfxLNum48_SY9Cbf9U',
  },
  {
    name: 'vector.png',
    url:  'https://media.licdn.com/dms/image/v2/D560BAQEkwzJPlJJxOA/company-logo_200_200/company-logo_200_200/0/1718848414281/vector_capital_logo?e=2147483647&v=beta&t=rNzj1kKmYREG47fae8JXuY_GC17ZiroWFfOdIv1CJ-I',
  },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file    = fs.createWriteStream(dest)
    const protocol = url.startsWith('https') ? https : http
    const options  = { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-downloader/1.0)' } }

    const req = protocol.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(dest)
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    })
    req.on('error', (err) => { file.close(); try { fs.unlinkSync(dest) } catch {} reject(err) })
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
  console.log(`Downloading logos to ${OUT_DIR}\n`)

  let ok = 0, fail = 0
  for (const { name, url } of LOGOS) {
    const dest = path.join(OUT_DIR, name)
    if (fs.existsSync(dest)) {
      console.log(`  ✓ ${name} (already exists, skipping)`)
      ok++
      continue
    }
    process.stdout.write(`  ↓ ${name} … `)
    try {
      await download(url, dest)
      const size = fs.statSync(dest).size
      console.log(`done (${(size/1024).toFixed(1)} KB)`)
      ok++
    } catch (e) {
      console.log(`FAILED: ${e.message}`)
      fail++
    }
  }
  console.log(`\nDone: ${ok} downloaded, ${fail} failed`)
  if (fail > 0) {
    console.log('Note: failed logos will fall back to external URLs in the browser.')
  }
}

main()
