import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function mediumArticlesDevPlugin() {
  return {
    name: 'medium-articles-api',
    configureServer(server) {
      server.middlewares.use('/api/articles', async (req, res) => {
        try {
          const response = await fetch('https://medium.com/feed/@sa8103339')
          if (!response.ok) {
            res.statusCode = response.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Failed to fetch Medium RSS feed' }))
            return
          }
          const xml = await response.text()
          const items = xml.match(/<item>[\s\S]*?<\/item>/g) || []
          
          const articles = items.map(it => {
            const titleMatch = it.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || it.match(/<title>([\s\S]*?)<\/title>/)
            const rawTitle = titleMatch ? titleMatch[1].trim() : 'Untitled'
            const title = rawTitle
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&#x27;/g, "'")
              .replace(/&nbsp;/g, ' ')
            const linkMatch = it.match(/<link>([\s\S]*?)<\/link>/)
            const pubDateMatch = it.match(/<pubDate>([\s\S]*?)<\/pubDate>/)
            const creatorMatch = it.match(/<dc:creator><!\[CDATA\[([\s\S]*?)\]\]><\/dc:creator>/) || it.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/)
            const contentMatch = it.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) || it.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)
            const categories = [...it.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map(m => m[1])
            
            const content = contentMatch ? contentMatch[1] : ''
            const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/)
            const thumbnail = imgMatch ? imgMatch[1] : null
            
            const cleanText = content.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
            const excerpt = cleanText.length > 180 ? cleanText.slice(0, 177) + '...' : cleanText
            
            let link = linkMatch ? linkMatch[1].trim() : ''
            if (link.includes('?source=')) {
              link = link.split('?source=')[0]
            }
            
            const wordCount = cleanText.split(/\s+/).filter(Boolean).length
            const readingTime = Math.max(1, Math.ceil(wordCount / 200))
            
            return {
              title,
              link,
              pubDate: pubDateMatch ? pubDateMatch[1].trim() : '',
              author: creatorMatch ? creatorMatch[1].trim() : 'Samir',
              thumbnail,
              excerpt,
              categories,
              readingTime
            }
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ articles }))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mediumArticlesDevPlugin(),
  ],
})
