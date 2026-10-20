export default async function handler(req, res) {
  // Set cache headers (cache for 10 minutes, stale-while-revalidate for 20 minutes)
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const response = await fetch('https://medium.com/feed/@sa8103339');
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch Medium RSS feed' });
    }
    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    const articles = items.map(it => {
      const titleMatch = it.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || it.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = it.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = it.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const creatorMatch = it.match(/<dc:creator><!\[CDATA\[([\s\S]*?)\]\]><\/dc:creator>/) || it.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/);
      const contentMatch = it.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) || it.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
      const categories = [...it.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map(m => m[1]);
      
      const content = contentMatch ? contentMatch[1] : '';
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
      const thumbnail = imgMatch ? imgMatch[1] : null;
      
      const cleanText = content.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
      const excerpt = cleanText.length > 180 ? cleanText.slice(0, 177) + '...' : cleanText;
      
      let link = linkMatch ? linkMatch[1].trim() : '';
      if (link.includes('?source=')) {
        link = link.split('?source=')[0];
      }
      
      const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));
      
      return {
        title: titleMatch ? titleMatch[1].trim() : 'Untitled',
        link,
        pubDate: pubDateMatch ? pubDateMatch[1].trim() : '',
        author: creatorMatch ? creatorMatch[1].trim() : 'Samir',
        thumbnail,
        excerpt,
        categories,
        readingTime
      };
    });

    return res.status(200).json({ articles });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error while fetching articles' });
  }
}
