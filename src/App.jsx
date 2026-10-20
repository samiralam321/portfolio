import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { GitHubCalendar } from 'react-github-calendar'
import {
  Home,
  Folder,
  Sun,
  Moon,
  Globe,
  Mail,
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ExternalLink,
  Search,
  X,
  RefreshCw,
  Tag
} from 'lucide-react'

// Custom inline SVG icons for Github, Linkedin, Twitter, and Spotify
const Github = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const Linkedin = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Twitter = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const Spotify = ({ className = "size-4 text-[#1DB954]" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.358-.684.471-1.042.253-2.863-1.748-6.463-2.143-10.706-1.171-.407.094-.817-.161-.911-.567-.094-.407.161-.817.567-.911 4.647-1.064 8.625-.612 11.84 1.353.358.218.471.684.252 1.043zm1.472-3.273c-.274.446-.86.587-1.306.313-3.275-2.012-8.269-2.597-12.144-1.421-.5.152-1.026-.134-1.178-.634-.152-.5.134-1.026.634-1.178 4.426-1.343 9.924-.694 13.681 1.614.446.274.587.86.313 1.306zm.127-3.413C15.176 8.35 8.784 8.136 5.107 9.252c-.613.186-1.258-.167-1.444-.78-.186-.613.167-1.258.78-1.444 4.223-1.282 11.282-1.034 15.772 1.632.552.327.734 1.037.407 1.589-.327.552-1.037.734-1.589.407z"/>
  </svg>
)

// Medium icon SVG component
const MediumIcon = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
)

// Reusable BlurFade animation component mimicking Magic UI
const BlurFade = ({ children, delay = 0, duration = 0.4, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// macOS-style magnifying dock wrapper component using Framer Motion
const Dock = ({ children }) => {
  const mouseX = useMotionValue(Infinity)
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="w-max p-2 rounded-full border border-border z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1.5 bg-background/85 backdrop-blur-md [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-background/80 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, { mouseX })
        }
        return child
      })}
    </motion.div>
  )
}

// macOS-style magnifying dock icon component
const DockIcon = ({ children, mouseX, onClick, href, target, rel, title }) => {
  const ref = React.useRef(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // base size is 40px, magnifies up to 58px, triggers within 140px range
  const widthSize = useTransform(distance, [-140, 0, 140], [40, 58, 40], { clamp: true })

  const size = useSpring(widthSize, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  })

  const content = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className="flex aspect-square items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors duration-200"
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel} 
        title={title} 
        className="flex items-center justify-center p-0 m-0 border-none bg-transparent outline-none cursor-pointer mx-[1px]"
      >
        {content}
      </a>
    )
  }

  return (
    <button 
      onClick={onClick} 
      title={title} 
      className="flex items-center justify-center p-0 m-0 border-none bg-transparent outline-none cursor-pointer mx-[1px]"
    >
      {content}
    </button>
  )
}

// ─── Medium Articles Fetcher & Cache ─────────────────────────────────────────
const MEDIUM_USERNAME = 'sa8103339'
const ARTICLES_CACHE_KEY = 'medium_articles_cache'
const ARTICLES_CACHE_TTL = 10 * 60 * 1000 // 10 minutes

function getCachedArticles() {
  try {
    const raw = localStorage.getItem(ARTICLES_CACHE_KEY)
    if (!raw) return null
    const { articles, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > ARTICLES_CACHE_TTL) return null
    return articles
  } catch {
    return null
  }
}

function setCachedArticles(articles) {
  try {
    localStorage.setItem(ARTICLES_CACHE_KEY, JSON.stringify({ articles, timestamp: Date.now() }))
  } catch {
    // storage full — ignore
  }
}

function decodeHtmlEntities(str) {
  if (!str) return ''
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function formatTag(tag) {
  if (!tag) return ''
  return tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function parseRssXml(xmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'text/xml')
  const itemEls = Array.from(doc.querySelectorAll('item'))
  return itemEls.map((item) => {
    const rawTitle = item.querySelector('title')?.textContent || 'Untitled'
    const title = decodeHtmlEntities(rawTitle.trim())
    let link = item.querySelector('link')?.textContent || '#'
    if (link.includes('?source=')) {
      link = link.split('?source=')[0]
    }
    const pubDate = item.querySelector('pubDate')?.textContent || ''
    const author = item.getElementsByTagNameNS('*', 'creator')[0]?.textContent || MEDIUM_USERNAME
    
    // Content can be in content:encoded or description
    const content = item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent || item.querySelector('description')?.textContent || ''
    
    // Extract thumbnail
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/)
    const thumbnail = imgMatch ? imgMatch[1] : null
    
    // Extract categories
    const categories = Array.from(item.querySelectorAll('category')).map(c => c.textContent).filter(Boolean)
    
    // Clean text for excerpt
    const cleanText = content.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
    const excerpt = cleanText.length > 180 ? cleanText.slice(0, 177) + '...' : cleanText
    
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))
    
    return {
      title,
      link,
      pubDate,
      author,
      thumbnail,
      excerpt,
      categories,
      readingTime
    }
  })
}

async function fetchMediumArticles() {
  const cached = getCachedArticles()
  if (cached) return cached

  // 1. Try /api/articles (Vercel Serverless Function & Vite dev server middleware)
  try {
    const res = await fetch('/api/articles')
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data.articles) && data.articles.length > 0) {
        setCachedArticles(data.articles)
        return data.articles
      }
    }
  } catch (e) {
    console.warn('Local /api/articles unavailable, trying backup proxy...', e)
  }

  // 2. Fallback to CORS proxy with direct browser XML parsing
  try {
    const proxyRes = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://medium.com/feed/@${MEDIUM_USERNAME}`)}`)
    if (proxyRes.ok) {
      const xml = await proxyRes.text()
      const parsed = parseRssXml(xml)
      if (parsed.length > 0) {
        setCachedArticles(parsed)
        return parsed
      }
    }
  } catch (e) {
    console.warn('Backup proxy failed...', e)
  }

  throw new Error('Unable to retrieve Medium articles feed.')
}

// ─── Article Card Skeleton Loader ────────────────────────────────────────────
const ArticleCardSkeleton = () => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse flex flex-col h-full shadow-sm">
    <div className="w-full aspect-[16/10] bg-muted/60" />
    <div className="p-4 sm:p-5 space-y-2.5 flex-1">
      <div className="h-4 bg-muted/80 rounded w-5/6" />
      <div className="h-4 bg-muted/60 rounded w-3/5" />
    </div>
  </div>
)

// ─── Article Card Component ──────────────────────────────────────────────────
const ArticleCard = ({ article, index }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <BlurFade delay={0.08 + index * 0.04} className="h-full">
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col rounded-2xl border border-border bg-card text-card-foreground overflow-hidden hover:shadow-xl hover:border-border/90 hover:-translate-y-1 transition-all duration-300 ease-out h-full"
      >
        {/* Complete cover image container - object-contain preserves entire image without cropping */}
        <div className="relative w-full aspect-[16/10] bg-white dark:bg-[#121214] flex items-center justify-center p-3 sm:p-4 border-b border-border/50 overflow-hidden">
          {article.thumbnail && !imgError ? (
            <img
              src={article.thumbnail}
              alt={article.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/40">
              <BookOpen className="size-12 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Title only below the image */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-start">
          <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </div>
      </a>
    </BlurFade>
  )
}

// ─── Articles Page View ──────────────────────────────────────────────────────
const ArticlesView = ({ onBack }) => {
  const [articles, setArticles] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'empty' | 'error'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  const loadArticles = useCallback(async () => {
    setStatus('loading')
    try {
      const data = await fetchMediumArticles()
      if (data.length === 0) {
        setStatus('empty')
      } else {
        setArticles(data)
        setStatus('success')
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set()
    articles.forEach((a) => a.categories.forEach((c) => tags.add(c)))
    return Array.from(tags).sort()
  }, [articles])

  // Filtered articles
  const filteredArticles = useMemo(() => {
    let result = articles
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.excerpt && a.excerpt.toLowerCase().includes(q))
      )
    }
    if (selectedTag) {
      result = result.filter((a) => a.categories.includes(selectedTag))
    }
    return result
  }, [articles, searchQuery, selectedTag])

  return (
    <motion.div
      key="articles-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col space-y-6 sm:space-y-8 pb-24 w-full"
    >
      {/* Breadcrumb & Header */}
      <section className="space-y-4">
        <BlurFade delay={0.04}>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
            <button
              onClick={onBack}
              className="hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
              title="Back to Home"
            >
              <Home className="size-3.5" />
              <span>HOME</span>
            </button>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground font-semibold">ARTICLES</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.08}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                My Articles
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Thoughts, learnings, and experiences from my journey in software development, AI, and technology.
              </p>
            </div>

            <a
              href={`https://medium.com/@${MEDIUM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground shadow-sm hover:bg-muted hover:border-foreground/30 active:scale-95 transition-all shrink-0"
            >
              <MediumIcon className="size-4" />
              <span>View on Medium</span>
              <ExternalLink className="size-3 text-muted-foreground" />
            </a>
          </div>
        </BlurFade>
      </section>

      {/* Search & Tag Filter Bar */}
      {status === 'success' && articles.length > 0 && (
        <BlurFade delay={0.12}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl border border-border bg-card text-foreground placeholder-muted-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer border ${
                    !selectedTag
                      ? 'bg-foreground text-background border-foreground shadow-sm'
                      : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer border ${
                      selectedTag === tag
                        ? 'bg-foreground text-background border-foreground shadow-sm'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Tag className="size-3" />
                    <span>{formatTag(tag)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </BlurFade>
      )}

      {/* Content States */}
      <section>
        {/* Loading */}
        {status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Success */}
        {status === 'success' && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.link} article={article} index={i} />
            ))}
          </div>
        )}

        {/* No search results */}
        {status === 'success' && filteredArticles.length === 0 && articles.length > 0 && (
          <BlurFade delay={0.1}>
            <div className="text-center py-16 space-y-3">
              <Search className="size-10 text-muted-foreground/40 mx-auto" />
              <p className="text-muted-foreground text-sm">No articles match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTag(null) }}
                className="text-sm font-medium text-foreground hover:text-primary/80 transition-colors cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          </BlurFade>
        )}

        {/* Empty – feed loaded but no articles */}
        {status === 'empty' && (
          <BlurFade delay={0.1}>
            <div className="text-center py-16 space-y-3">
              <BookOpen className="size-10 text-muted-foreground/40 mx-auto" />
              <p className="text-muted-foreground text-sm">No articles published yet.</p>
              <a
                href={`https://medium.com/@${MEDIUM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary/80 transition-colors"
              >
                Visit my Medium profile
                <ExternalLink className="size-3" />
              </a>
            </div>
          </BlurFade>
        )}

        {/* Error */}
        {status === 'error' && (
          <BlurFade delay={0.1}>
            <div className="text-center py-16 space-y-4">
              <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <X className="size-6 text-destructive" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground font-medium text-sm">Couldn't load articles</p>
                <p className="text-muted-foreground text-xs max-w-sm mx-auto">
                  We couldn't load the articles right now. Please try again later or visit my Medium profile directly.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    localStorage.removeItem(ARTICLES_CACHE_KEY)
                    loadArticles()
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all cursor-pointer"
                >
                  <RefreshCw className="size-3.5" />
                  Try Again
                </button>
                <a
                  href={`https://medium.com/@${MEDIUM_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg border border-border bg-background hover:bg-muted transition-all"
                >
                  View on Medium
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </BlurFade>
        )}
      </section>
    </motion.div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  const getInitialView = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase()
      if (path === '/articles' || path.startsWith('/articles/')) return 'articles'
      if (path === '/contact') return 'contact'
    }
    return 'home'
  }

  const [view, setView] = useState(getInitialView)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null) // null, 'sending', 'success'

  // Music Playlist: Blush (first) and Blue Sky, Don't Cry (second)
  const playlist = [
    {
      title: "Blush",
      artist: "Prateek Kuhad",
      cover: "/images/blush_cover.jpg",
      audio: "https://res.cloudinary.com/dxarkutme/video/upload/v1791714019/Blush_-_Prateek_Kuhad_Lyrics_ipnpmi.m4a"
    },
    {
      title: "Blue Sky, Don't Cry",
      artist: "The Sways",
      cover: "/images/blueskydontcry_cover.jpg",
      audio: "https://res.cloudinary.com/dxarkutme/video/upload/v1790876397/The_Sways_-_Blue_Sky_Don_t_Cry_Official_Video_opabdg.m4a"
    }
  ]

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = React.useRef(null)

  const currentTrack = playlist[currentTrackIndex]

  const togglePlayAudio = () => {
    if (!audioRef.current) return
    if (isPlayingAudio) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true)
      }).catch(err => {
        console.error("Audio playback error:", err)
      })
    }
  }

  const switchTrack = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentTrackIndex + 1) % playlist.length
      : (currentTrackIndex - 1 + playlist.length) % playlist.length
    setCurrentTrackIndex(newIndex)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load()
        if (isPlayingAudio) {
          audioRef.current.play().then(() => {
            setIsPlayingAudio(true)
          }).catch(err => {
            console.error("Audio playback error:", err)
          })
        }
      }
    }, 50)
  }

  const handleAudioEnded = () => {
    // When current track ends, advance to next track and continue playing
    const nextIndex = (currentTrackIndex + 1) % playlist.length
    setCurrentTrackIndex(nextIndex)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load()
        audioRef.current.play().then(() => {
          setIsPlayingAudio(true)
        }).catch(err => {
          console.error("Audio playback error:", err)
        })
      }
    }, 100)
  }

  const projectsContainerRef = React.useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const calendarScrollRef = React.useRef(null)

  const scrollToCalendarRight = () => {
    if (calendarScrollRef.current) {
      calendarScrollRef.current.scrollLeft = 0
    }
  }

  useEffect(() => {
    const container = calendarScrollRef.current
    if (!container) return

    scrollToCalendarRight()

    const mutationObserver = new MutationObserver(() => {
      scrollToCalendarRight()
    })
    mutationObserver.observe(container, { childList: true, subtree: true, attributes: true })

    let resizeObserver
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        scrollToCalendarRight()
      })
      resizeObserver.observe(container)
      const svg = container.querySelector('svg')
      if (svg) resizeObserver.observe(svg)
    }

    window.addEventListener('resize', scrollToCalendarRight)
    const t0 = setTimeout(scrollToCalendarRight, 50)
    const t1 = setTimeout(scrollToCalendarRight, 200)
    const t2 = setTimeout(scrollToCalendarRight, 600)
    const t3 = setTimeout(scrollToCalendarRight, 1200)
    const t4 = setTimeout(scrollToCalendarRight, 2500)

    return () => {
      mutationObserver.disconnect()
      if (resizeObserver) resizeObserver.disconnect()
      window.removeEventListener('resize', scrollToCalendarRight)
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [view])

  const checkScrollButtons = () => {
    if (projectsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = projectsContainerRef.current
      setCanScrollLeft(scrollLeft > 15)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener('resize', checkScrollButtons)
    return () => window.removeEventListener('resize', checkScrollButtons)
  }, [])

  const scrollProjects = (direction) => {
    if (projectsContainerRef.current) {
      const scrollAmount = projectsContainerRef.current.clientWidth * 0.85
      projectsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch("https://formsubmit.co/ajax/sa8103339@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Portfolio Message from " + formData.name
        })
      })
      
      const data = await response.json()
      if (data.success === "true") {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus('error')
    }

    setTimeout(() => {
      setFormStatus(null)
    }, 4000)
  }

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase()
      if (path === '/articles' || path.startsWith('/articles/')) {
        setView('articles')
      } else if (path === '/contact') {
        setView('contact')
      } else {
        setView('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNav = (targetView, sectionId) => {
    setView(targetView)
    if (targetView === 'home') {
      window.history.pushState(null, '', '/')
      if (sectionId) {
        setTimeout(() => {
          scrollToSection(sectionId)
        }, 100)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else if (targetView === 'articles') {
      window.history.pushState(null, '', '/articles')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (targetView === 'contact') {
      window.history.pushState(null, '', '/contact')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const contactLinks = [
    {
      name: "GitHub",
      icon: <Github className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://github.com/samiralam321"
    },
    {
      name: "Linkedin",
      icon: <Linkedin className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://www.linkedin.com/in/samir-alam-595b74328/"
    },
    {
      name: "X (Twitter)",
      icon: <Twitter className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://x.com/SamAlCse"
    },
    {
      name: "Resume",
      icon: <FileText className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "/resume.pdf"
    },
    {
      name: "Email",
      icon: <Mail className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "mailto:sa8103339@gmail.com"
    }
  ]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  useEffect(() => {
    if (view === 'contact') {
      document.body.classList.remove('py-12', 'sm:py-24', 'max-w-5xl')
      document.body.classList.add('py-2', 'sm:py-4', 'h-dvh', 'overflow-hidden', 'max-w-2xl')
    } else if (view === 'articles') {
      document.body.classList.remove('max-w-2xl', 'py-2', 'sm:py-4', 'h-dvh', 'overflow-hidden')
      document.body.classList.add('max-w-5xl', 'py-10', 'sm:py-16')
    } else {
      document.body.classList.remove('py-2', 'sm:py-4', 'h-dvh', 'overflow-hidden', 'max-w-5xl')
      document.body.classList.add('py-12', 'sm:py-24', 'max-w-2xl')
    }
  }, [view])

  // Update document title for articles page
  useEffect(() => {
    if (view === 'articles') {
      document.title = 'Articles — Samir Alam'
    } else {
      document.title = 'Samir Alam - Backend Developer & Competitive Programmer'
    }
  }, [view])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Skills Data
  const skillsData = {
    "Languages": ["C++", "Python", "JavaScript", "SQL"],
    "Web Technologies": ["HTML5", "CSS3", "JavaScript", "React.js"],
    "Backend & Databases": ["FastAPI", "REST APIs", "MySQL", "PostgreSQL", "Supabase"],
    "Developer Tools": ["Git", "GitHub", "VS Code", "PyCharm", "Postman"],
    "Core Concepts": ["Data Structures & Algorithms", "OOP", "DBMS", "Computer Networks", "Operating Systems"]
  }

  // Projects Data: Trackr & CP Master (mockups and short descriptions)
  const projects = [
    {
      title: "Trackr",
      period: "Featured Project",
      description: "Built a distraction-free space for students who actually want to get things done.",
      tech: ["Next.js 16", "React 19", "Tailwind CSS v4", "Supabase", "Vercel"],
      image: "/images/trackr_mockup.png",
      links: [
        { name: "Website", url: "https://trackr-ten-eta.vercel.app/", icon: <Globe className="size-3" /> },
        { name: "GitHub", url: "https://github.com/samiralam321/NewTrackr", icon: <Github className="size-3 text-white" /> }
      ]
    },
    {
      title: "CP Master",
      period: "2025",
      description: "Designed and developed a modern, interactive roadmap platform for Competitive Programming.",
      tech: ["React.js", "Tailwind CSS", "Competitive Programming"],
      image: "/images/cpmaster_mockup.png",
      links: [
        { name: "Website", url: "https://cpmaster.netlify.app/", icon: <Globe className="size-3" /> },
        { name: "GitHub", url: "https://github.com/samiralam321", icon: <Github className="size-3 text-white" /> }
      ]
    },
    {
      title: "Tempo Timer",
      period: "2025",
      description: "Built an aesthetic Lofi Pomodoro timer to focus better while studying and coding.",
      tech: ["React 19", "Vite 6", "Tailwind CSS", "Vercel"],
      image: "/images/tempotimer_mockup.jpg",
      links: [
        { name: "Website", url: "https://tempo-timer-five.vercel.app/", icon: <Globe className="size-3" /> },
        { name: "GitHub", url: "https://github.com/samiralam321/tempo-timer", icon: <Github className="size-3 text-white" /> }
      ]
    }
  ]

  // Experience Data matching updated resume
  const experiences = [
    {
      role: "SDE Intern",
      company: "Yuga Yatra Retail (OPC) Private Limited",
      type: "Remote",
      period: "May 2026 – Jul 2026",
      bullets: [
        "Worked primarily on frontend development and web application features.",
        "Developed responsive user interfaces using HTML5, CSS3, JavaScript, and React.js.",
        "Implemented frontend components and interactive features with a focus on responsive design; collaborated using Git and GitHub."
      ]
    },
    {
      role: "Google Student Ambassador",
      company: "Google",
      type: "Internship",
      period: "Aug 2025 – Feb 2026",
      bullets: [
        "Conducted AI awareness sessions for 50+ students, introducing them to Google Gemini and practical AI use cases.",
        "Strengthened leadership and communication skills through student engagement and AI-focused activities."
      ]
    }
  ]

  // Education Data (Only College)
  const education = [
    {
      institution: "IK Gujral Punjab Technical University",
      degree: "B.Tech - Computer Science and Engineering",
      details: "CGPA: 7.95",
      location: "Kapurthala, Punjab",
      period: "2024 – 2028"
    }
  ]

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col space-y-10 pb-20"
          >
            {/* Hero Section */}
            <section id="hero">
              <div className="mx-auto w-full max-w-2xl">
                <div className="gap-2 flex justify-between items-start">
                  <div className="flex-col flex flex-1 space-y-1.5 pt-2">
                    <BlurFade delay={0.05}>
                      <h1 className="inline-block text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Hi, I'm Samir
                      </h1>
                    </BlurFade>
                    
                    <BlurFade delay={0.1}>
                      <div className="h-[28px] flex items-center">
                        <TypeAnimation
                          sequence={[
                            'Backend Developer', 2000,
                            'AI & GenAI Learner', 2000,
                            'Competitive Programmer', 2000,
                            'Lifetime Learner', 2000,
                          ]}
                          wrapper="span"
                          speed={50}
                          repeat={Infinity}
                          className="text-lg md:text-xl font-medium text-muted-foreground"
                        />
                      </div>
                    </BlurFade>
                  </div>
                  
                  <BlurFade delay={0.1}>
                    <div className="relative flex shrink-0 overflow-hidden rounded-full size-28 border border-border bg-card">
                      <img 
                        className="aspect-square h-full w-full object-cover" 
                        alt="Samir Alam" 
                        src="/profile.png" 
                      />
                    </div>
                  </BlurFade>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about">
              <div className="space-y-3">
                <BlurFade delay={0.15}>
                  <h2 className="text-xl font-bold">About</h2>
                </BlurFade>
                
                <BlurFade delay={0.2}>
                  <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
                    <p>
                      I'm a B.Tech CSE student who loves building web applications, learning new technologies, and exploring AI-powered products. Currently, I'm focused on Backend Development and work with React, Node.js, JavaScript, Python, C++, and Go. Outside of coding, I create content for a community of 15k+ followers, where I share my thoughts, experiences, and insights to help fellow B.Tech students in their tech journey. I enjoy learning, solving problems, and building things that can make a real difference.
                    </p>
                  </div>
                </BlurFade>
              </div>
            </section>

            {/* Music / Audio Player Widget Section */}
            <section id="music">
              <BlurFade delay={0.22}>
                <audio 
                  ref={audioRef} 
                  src={currentTrack.audio} 
                  onEnded={handleAudioEnded}
                  preload="metadata"
                />
                <div className="rounded-2xl border border-border/80 bg-card p-3.5 px-4 shadow-sm hover:shadow-md transition-all duration-300 max-w-2xl mx-auto flex items-center justify-between group">
                  <div className="flex items-center gap-3.5">
                    <div className="relative size-12 rounded-xl overflow-hidden flex-shrink-0 border border-border/50 shadow-sm bg-white">
                      <img 
                        src={currentTrack.cover} 
                        alt={`${currentTrack.title} Album Cover`} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Spotify className="size-3.5 text-[#1DB954]" />
                        <span>{isPlayingAudio ? 'Now playing' : 'Last played'}</span>
                      </div>
                      <h3 className="font-bold text-sm text-foreground tracking-tight leading-tight">
                        {currentTrack.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        {currentTrack.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => switchTrack('prev')}
                      type="button"
                      className="size-8 rounded-full flex items-center justify-center hover:bg-muted active:scale-95 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Previous track"
                    >
                      <SkipBack className="size-3.5 fill-current" />
                    </button>

                    <button
                      onClick={togglePlayAudio}
                      type="button"
                      className="size-9 rounded-full bg-background border border-border/70 shadow-sm flex items-center justify-center hover:bg-muted hover:scale-105 active:scale-95 transition-all text-foreground group-hover:border-foreground/30 cursor-pointer"
                      title={isPlayingAudio ? "Pause" : "Play"}
                    >
                      {isPlayingAudio ? (
                        <Pause className="size-4 fill-current ml-0" />
                      ) : (
                        <Play className="size-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => switchTrack('next')}
                      type="button"
                      className="size-8 rounded-full flex items-center justify-center hover:bg-muted active:scale-95 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Next track"
                    >
                      <SkipForward className="size-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              </BlurFade>
            </section>

            {/* Coding Profiles Section */}
            <section id="profiles">
              <div className="space-y-3">
                <BlurFade delay={0.25}>
                  <h2 className="text-xl font-bold">Coding Profiles</h2>
                </BlurFade>
                
                <BlurFade delay={0.3}>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center rounded-lg p-2 hover:bg-muted text-foreground transition-colors duration-200" 
                      href="https://leetcode.com/u/samCPer/"
                      title="LeetCode"
                    >
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="h-5 w-5 text-[#FFA116]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"></path>
                      </svg>
                    </a>
                    
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center rounded-lg p-2 hover:bg-muted text-foreground transition-colors duration-200" 
                      href="https://codeforces.com/profile/SamCodez"
                      title="Codeforces"
                    >
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="h-5 w-5 text-[#318DFF]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h-3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"></path>
                      </svg>
                    </a>

                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center rounded-lg p-2 hover:bg-muted text-foreground transition-colors duration-200" 
                      href="https://www.codechef.com/users/samir_codez"
                      title="CodeChef"
                    >
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="h-5 w-5 text-[#5B4638]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2574.0039c-.37.0101-.7353.041-1.1003.095C9.6164.153 9.0766.4236 8.482.694c-.757.3244-1.5147.6486-2.2176.7027-1.1896.3785-1.568.919-1.8925 1.3516 0 .054-.054.1079-.054.1079-.4325.865-.4873 1.73-.325 2.5952.1621.5407.3786 1.0282.5408 1.5148.3785 1.0274.7578 2.0007.92 3.1362.1622.3244.3235.7571.4316 1.1897.2704.8651.542 1.8383 1.353 2.5952l.0057-.0028c.0175.0183.0301.0387.0482.0568.0072-.0036.0141-.0063.0213-.0099l-.0213-.5849c.6489-.9733 1.5673-1.6221 2.865-1.8925.5195-.1093 1.081-.1497 1.6625-.1278a8.7733 8.7733 0 0 1 1.7988.2357c1.4599.3785 2.595 1.1358 2.6492 1.7846.0273.3549.0398.6952.0326 1.0364-.001.064-.0046.1285-.007.193l.1362.0682c.075-.0375.1424-.107.2059-.1902.0008-.001.002-.002.0028-.0028.0018-.0023.0039-.0061.0057-.0085.0396-.0536.0747-.1236.1107-.1931.0188-.0377.0372-.0866.0554-.1292.2048-.4622.362-1.1536.538-1.9635.0541-.2703.1092-.4864.1633-.7027.4326-.9733 1.0266-1.8382 1.6213-2.6492.9733-1.3518 1.8928-2.5962 1.7846-4.0561-1.784-3.4608-4.2718-4.0017-5.5695-4.272-.2163-.0541-.3233-.0539-.4856-.108-1.3382-.2433-2.4945-.3953-3.6046-.3648zm5.0428 14.3788a9.8602 9.8602 0 0 0-.0326-.9824c-.0541-.703-1.1892-1.46-2.7032-1.8386-.588-.1336-1.1764-.2142-1.7448-.2356-.539-.0137-1.0657.0248-1.5546.1277-1.2436.2704-2.2162.9193-2.811 1.8925l.0511 1.431c.6672-.3558 1.7326-.8747 3.139-.9994.0662-.0059.1368-.0059.2044-.0099.1177-.013.2667-.044.4444-.044 1.6075 0 3.2682.5336 4.8767 1.6483.039-.2744.0611-.549.071-.8234l.044.0227c.0028-.0622.0143-.1268.0156-.1888zM11.256.0578c.1239-.0034.2538.01.379.0114-.23-.0022-.4588.0026-.6871.0156.103-.0061.2046-.0242.308-.027zm.4983.0156c.6552.014 1.3255.0711 2.0387.1803-.6834-.0987-1.3646-.1671-2.0387-.1803zm-1.3147.0554c-.076.0087-.1527.0133-.2285.0241-.8168.1167-1.7742.7015-2.75 1.045.3545-.1323.7143-.2957 1.0747-.4501C9.0765.4774 9.6705.207 10.1571.1529c.0939-.0139.1886-.0133.2825-.0241zm-.2285.24c.1622 0 .3787-.0002.5409.0539-.1425-.0357-.2595-.026-.3706-.0142a1.174 1.174 0 0 1 .3166.0681c.5796 1.0012-.4264 5.2791-.6786 8.1492.1559 1.0276.3138 1.9963.4628 2.7201-.7029-1.7843-1.4067-4.921-1.5148-7.354-.054-.9733.001-1.8386.2172-2.4874C9.401.8557 9.7244.4228 10.2111.3687zm3.1361.271c-.811 2.1088-.9184 6.1092-.9725 7.3528-.054.5407-.0001 1.73.054 2.5952 0 .2163.054.4325.054.6488 0-.2163-.054-.3786-.054-.5948-.4326-3.2442-.974-7.1362.9185-10.002zm3.352.3777c-.2704 2.1628-1.4047 3.191-1.7832 5.2998-.1081 1.6762-.325 3.6222-.379 5.2984-.0541-1.6762-.0007-3.4601.2697-5.2444.2703-1.8384.8651-3.6776 1.8925-5.3538zm-10.381.433c-.3581.1194-.632.248-.8575.3805.2317-.1358.4996-.2666.8575-.3805zm.2101.1974c.2155.0025.4384.0734.6006.2357-.0067-.004-.0078-.0033-.0142-.0071.1331.0929.2666.2093.3932.3847-.2036.9673.2553 3.0317.0398 4.6694.0763 1.5485.0717 3.1804.849 4.4594-.9796-1.5107-1.3218-5.236-.1128-1.0907-.2035-2.0969-.4642-2.9033-.144-.3047-.2684-.5745-.3833-.822-.0247-.0369-.0447-.0784-.071-.1135-.1082-.1082-.1619-.2696-.1619-.3777 0-.054.0539-.1618.108-.1618.054-.0541.1616-.0553.2157-.1094a1.013 1.013 0 0 1 .2101-.0184zm-1.3459.6133c-.0604.0201-.0923.041-.1405.061.1768-.034.3617.0339.5196.318-.1877.8916.4364 3.3685.4288 5.104.3124 1.8478.5496 3.8498 1.5716 5.1152C6.3723 11.5076 5.886 9.1286 5.5076 7.128 5.183 5.56 4.9125 4.2086 4.3718 3.776c-.054-.1081-.1079-.163-.1079-.2711 0-.1622-.0002-.3786.1079-.5949-.2772.6337-.4047 1.2673-.3706 1.901-.0445-.6487.0857-1.2905.3706-1.901 0-.054.054-.0538.054-.1079.012-.016.0314-.0349.044-.0511.0618-.0983.1308-.189.2257-.257.0557-.0615.0965-.1191.159-.1817-.0526.0555-.0872.1092-.1335.1647.0273-.018.0523-.0368.0838-.0525.1081-.1082.2154-.1633.3776-.1633zm-.3776.1633c-.0038.0075-.0076.0111-.0114.0184.0125-.0099.0242-.0208.037-.0298-.0074.0037-.0182.0077-.0256.0114zm14.7608 1.1343c-.0017.0052-.004.0104-.0057.0156.0378-.005.0751-.0173.1135-.0156-.0378-.0022-.0763.0103-.115.0199-.8634 2.6418-1.8874 5.2844-2.9118 7.9262a.0184.0184 0 0 1-.0015.0028c-.0874.4652-.234.8842-.5395 1.1898.4326-.4867.4854-1.1907.5395-2.0558.054-.811.0544-1.6761.487-2.5413 0-.0531.0012-.1058.0525-.159.0003-.0009.0012-.0019.0015-.0028.0973-.3524.202-.6885.3166-1.018.4183-1.2896 1.1396-3.1653 2.0131-3.3405.0163-.0052.034-.018.0497-.0213zM8.3726 16.2113l-.3238.1079c.1623.2163.2696.379.3777.433.1081.054.2168.108.379.108.0541 0 .1618 0 .2159-.054l.812-.2698c.0541 0 .1078-.054.1619-.054.1081 0 .1616 0 .2697.054l.2712.2698.2697-.054c-.1081-.1622-.2695-.3236-.3776-.3776-.1082-.0541-.2169-.1094-.379-.1094h-.108l-.866.3252h-.1618c-.1082 0-.2157 0-.2698-.054-.054-.054-.163-.1629-.2712-.3251zm-2.5953.541c-.2703.1621-.649.4324-1.1897.6487-.5407.2163-.9734.4325-1.1897.6488-.2163.2163-.3237.4326-.3237.6488 0 .1082.0537.1632.1618.2172.054.0541.1632.0539.2172.108.757.3244 1.5133.7019 2.2162 1.0803.1082.0541.2171.1632.2712.2173.054.054.1078.054.1618.054.1082 0 .2695-.0538.3777-.162.1081-.108.1632-.217.1632-.325 0-.1082-.055-.1618-.1632-.2158 0 0-.4328-.2165-1.1898-.541-.4866-.2162-.9179-.4326-1.1883-.5948.1623-.2704.486-.4865.9726-.7028.5407-.2163.9196-.4326 1.0818-.5948.054-.0541.054-.1078.054-.1619 0-.054-.0539-.1631-.108-.2172-.054-.054-.163-.1079-.2711-.1079zm11.247 0c-.054 0-.1618.0537-.2158.1078-.0541.1081-.1093.1632-.1093.2172v.054c.1622.1622.3797.2695.7041.3776.2704.054.5403.1632.8107.2172.3244.1082.5407.2693.6488.4856v.0553c0 .0541-.1088.1616-.3251.2698-.1082.054-.3245.2167-.5949.433-.2703.1622-.4326.3236-.5948.3776-.2163.1082-.3776.217-.4316.3252-.0541.054-.054.1077-.054.1618 0 .1081.0539.1077.108.2158.054.1081.1616.1093.2157.1093.054 0 .1078-.0554.1619-.0554.2703-.1622.6492-.3782 1.0818-.7567.4866-.3784.8655-.6484 1.0818-.8106.2163-.1082.3237-.2169.3237-.379 0-.0541.0002-.1618-.1079-.2159-.3785-.4325-.9185-.7022-1.5674-.9185-.1081-.0541-.2704-.1092-.5948-.1633-.1622-.054-.3249-.1079-.433-.1079zm-2.9743.8106c-.2704 0-.4866.055-.6488.2172-.2163.1622-.2699.4323-.2158.7567 0 .2703.1075.4865.2697.7027.1622.2163.3786.3252.5949.3252.1622 0 .2708-.0553.433-.1094.2703-.1622.379-.4319.379-.9185 0-.3785-.109-.6485-.2711-.8107-.1622-.1081-.3246-.1632-.541-.1632zm-4.4877.054c-.2704 0-.4866.055-.6488.2171-.2163.1622-.27.4323-.2158.7567 0 .2704.1075.4865.2697.7028s.3786.3251.5949.3251c.1622 0 .2708-.0552.433-.1093.2703-.1622.3776-.432.3776-.9186 0-.4325-.1075-.7025-.2697-.8106-.1622-.1082-.3247-.1633-.541-.1633zm0 .6501c.1622 0 .2711.1076.2711.2698 0 .1622-.163.2697-.2711.2697-.1622 0-.2698-.1075-.2698-.2697s.1076-.2698.2698-.2698zm4.3798.054c.1622 0 .2711.1075.2711.2697 0 .1082-.109.2698-.2711.2698-.1622 0-.2698-.1076-.2698-.2698 0-.1622.1076-.2697.2698-.2697zm-2.7032 2.1083l.1619.3237c.054.1081.1076.163.2158.2711.054.054.163.1619.2712.1619h.1078c.1082 0 .1618 0 .2158-.054.0541-.054.1632-.0538.2173-.1079l.1618-.1618c.054-.054.108-.1092.108-.1633.054-.054.0537-.1078.1078-.1618 0-.0541.054-.108.054-.108-.0541.1082-.1618.2156-.2158.3238-.1082.054-.1616.1632-.2698.1632-.1081.0541-.217.054-.3251.054s-.2157.0001-.2697-.054c-.1082 0-.1632-.0538-.2173-.1079l-.1618-.1632c-.054-.0541-.1078-.1618-.1619-.2158zm-.866 1.0278c-1.1355 0-1.8377 1.5136-3.4598.1619-.4326 2.6494 2.7583 2.866 4.11 1.7306.9192-.811.6475-1.9465-.6502-1.8925zm2.8664 0c-1.2977-.054-1.568 1.0815-.6488 1.8925 1.3518 1.1355 4.5412.9188 4.1087-1.7306-1.6221 1.3517-2.2703-.1619-3.4599-.1619z"></path>
                      </svg>
                    </a>
                  </div>
                </BlurFade>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience">
              <div className="space-y-3">
                <BlurFade delay={0.35}>
                  <h2 className="text-xl font-bold">Experience</h2>
                </BlurFade>
                
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <BlurFade key={idx} delay={0.4 + idx * 0.05}>
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                          <h3 className="font-semibold text-foreground flex items-center gap-1.5">
                            <Briefcase className="size-3.5 text-muted-foreground" />
                            {exp.role} <span className="text-xs text-muted-foreground font-normal">({exp.company})</span>
                          </h3>
                          <span className="text-xs text-muted-foreground sm:text-right font-medium">{exp.period}</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium pb-1">{exp.type}</div>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 pl-1 leading-relaxed">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="scroll-mt-12">
              <div className="w-full space-y-6">
                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                  <BlurFade delay={0.45}>
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-xs font-medium">
                      My Work
                    </div>
                  </BlurFade>
                  <BlurFade delay={0.5}>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Check out my Projects
                    </h2>
                  </BlurFade>
                  <BlurFade delay={0.55}>
                    <p className="text-muted-foreground max-w-[600px] text-sm md:text-base leading-relaxed">
                      I've built a range of frontend, backend, and full-stack applications that focus on clean design, functionality, and performance. Here are some of my favorite projects.
                    </p>
                  </BlurFade>
                </div>

                {/* Projects Carousel Container */}
                <div className="relative max-w-[800px] mx-auto group/carousel px-2 sm:px-0">
                  {/* Left Scroll Button */}
                  {canScrollLeft && (
                    <button
                      onClick={() => scrollProjects('left')}
                      className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground border border-border shadow-lg backdrop-blur hover:bg-muted hover:scale-110 transition-all duration-200"
                      aria-label="Scroll Left"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                  )}

                  {/* Right Scroll Button */}
                  {canScrollRight && (
                    <button
                      onClick={() => scrollProjects('right')}
                      className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground border border-border shadow-lg backdrop-blur hover:bg-muted hover:scale-110 transition-all duration-200 animate-pulse hover:animate-none"
                      aria-label="Scroll Right"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  )}

                  {/* Scrollable Cards Container */}
                  <div 
                    ref={projectsContainerRef}
                    onScroll={checkScrollButtons}
                    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 snap-x snap-mandatory"
                  >
                    {projects.map((project, idx) => (
                      <div key={idx} className="w-[280px] sm:w-[325px] flex-shrink-0 snap-start flex flex-col">
                        <BlurFade delay={0.6 + idx * 0.05} className="h-full flex flex-col">
                          <div className="rounded-xl bg-card text-card-foreground flex flex-col overflow-hidden border border-border hover:shadow-lg transition-all duration-300 ease-out h-full group">
                            <div className="block overflow-hidden relative h-40 bg-white">
                              <img 
                                alt={project.title} 
                                loading="lazy" 
                                className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-102" 
                                src={project.image}
                              />
                            </div>
                            
                            <div className="flex flex-col px-4 pt-3 pb-4 flex-1">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-bold tracking-tight text-base text-foreground">{project.title}</h3>
                                  <span className="font-sans text-[10px] text-muted-foreground font-semibold">{project.period}</span>
                                </div>
                                <p className="text-pretty font-sans text-xs text-muted-foreground mt-2 leading-relaxed">
                                  {project.description}
                                </p>
                              </div>
                              
                              <div className="text-pretty font-sans text-xs text-muted-foreground mt-auto pt-4 flex flex-col">
                                <div className="flex flex-wrap gap-1">
                                  {project.tech.map((t, tIdx) => (
                                    <span 
                                      key={tIdx} 
                                      className="inline-flex items-center rounded bg-secondary text-secondary-foreground px-1.5 py-0.5 text-[9px] font-semibold tracking-wide"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                                
                                {/* Project Link Buttons */}
                                <div className="flex flex-row flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-border/50">
                                  {project.links.map((link, lIdx) => (
                                    <a 
                                      key={lIdx} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      href={link.url}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all duration-200"
                                    >
                                      {link.icon}
                                      <span>{link.name}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </BlurFade>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section id="education">
              <div className="space-y-3">
                <BlurFade delay={0.65}>
                  <h2 className="text-xl font-bold">Education</h2>
                </BlurFade>
                
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <BlurFade key={idx} delay={0.7 + idx * 0.05}>
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                          <h3 className="font-semibold text-foreground flex items-center gap-1.5">
                            <GraduationCap className="size-3.5 text-muted-foreground" />
                            {edu.institution}
                          </h3>
                          <span className="text-xs text-muted-foreground sm:text-right font-medium">{edu.period}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
                          <span>{edu.degree} — <strong className="text-foreground">{edu.details}</strong></span>
                          <span className="italic">{edu.location}</span>
                        </div>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills & Technologies Section */}
            <section id="skills" className="scroll-mt-12">
              <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={0.75}>
                  <h2 className="text-xl font-bold">Skills &amp; Technologies</h2>
                </BlurFade>
                
                <div className="space-y-3">
                  {Object.entries(skillsData).map(([category, skills], idx) => (
                    <BlurFade key={idx} delay={0.8 + idx * 0.05}>
                      <div className="space-y-1.5">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{category}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((skill, sIdx) => (
                            <div 
                              key={sIdx} 
                              className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors duration-200"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>
            </section>

            {/* GitHub Contributions Heatmap Section */}
            <section id="github-heatmap" className="scroll-mt-12">
              <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={0.82}>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-xl font-normal font-serif italic text-muted-foreground/90">
                      GitHub Contributions
                    </h2>
                    <span className="text-sm font-sans font-normal text-muted-foreground/70">
                      • @samiralam321
                    </span>
                  </div>
                </BlurFade>
                
                <BlurFade delay={0.85}>
                  <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm overflow-hidden">
                    <div 
                      ref={calendarScrollRef}
                      className="overflow-x-auto no-scrollbar w-full py-1"
                      style={{ direction: 'rtl' }}
                    >
                      <div style={{ direction: 'ltr', display: 'inline-block', minWidth: 'max-content' }}>
                        <GitHubCalendar
                          username="samiralam321"
                          colorScheme={darkMode ? 'dark' : 'light'}
                          blockSize={12}
                          blockMargin={4}
                          fontSize={14}
                          theme={{
                            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </section>



            {/* Contact Section */}
            <section id="contact">
              <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
                <BlurFade delay={0.85}>
                  <div className="space-y-3">
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-xs font-medium">Contact</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground text-sm md:text-base leading-relaxed">
                      Have a question or an opportunity to discuss? Just shoot me an email at{' '}
                      <a className="text-blue-500 hover:underline font-semibold" href="mailto:sa8103339@gmail.com">
                        sa8103339@gmail.com
                      </a>{' '}
                      and I'll respond whenever I can.
                    </p>
                  </div>
                </BlurFade>
              </div>
            </section>
          </motion.div>
        ) : view === 'articles' ? (
          <ArticlesView onBack={() => handleNav('home')} />
        ) : (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex items-center justify-center py-2 pb-10"
          >
            <div className="bg-card text-card-foreground rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-border/80 p-5 md:p-8 w-full transition-all">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Get in Touch</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                {/* Left Side Links */}
                <div className="flex flex-col space-y-2 justify-center pl-1">
                  {contactLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target={link.name !== "Email" ? "_blank" : undefined}
                      rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                      whileHover={{ x: 4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground text-sm md:text-base font-medium transition-colors py-0.5 cursor-pointer group w-max"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </motion.a>
                  ))}
                </div>
                
                {/* Right Side Form */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-xs"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-xs"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg shadow hover:bg-primary/90 active:scale-[0.98] transition-all w-max text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {formStatus === 'sending' 
                      ? 'Sending...' 
                      : formStatus === 'success' 
                      ? 'Message Sent!' 
                      : formStatus === 'error' 
                      ? 'Error Sending!' 
                      : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
        {/* Backdrop Fade */}
        <div className="fixed bottom-0 inset-x-0 h-20 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] pointer-events-none z-10"></div>
        
        {/* Dock Wrapper Container */}
        <Dock>
          <DockIcon onClick={() => handleNav('home')} title="Home">
            <Home className="size-[19px]" />
          </DockIcon>
          
          <DockIcon onClick={() => handleNav('home', 'projects')} title="Projects">
            <Folder className="size-[19px]" />
          </DockIcon>
          
          {/* Divider */}
          <div role="none" className="shrink-0 bg-border w-[1px] h-6 mx-[3px]"></div>
          
          {/* External Social Links */}
          <DockIcon href="https://github.com/samiralam321" target="_blank" rel="noopener noreferrer" title="GitHub">
            <Github className="size-[19px]" />
          </DockIcon>

          <DockIcon href="https://www.linkedin.com/in/samir-alam-595b74328/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Linkedin className="size-[19px]" />
          </DockIcon>
          
          <DockIcon href="https://x.com/SamAlCse" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
            <Twitter className="size-[19px]" />
          </DockIcon>

          {/* Medium Articles Icon – after Twitter/X, before Mail */}
          <DockIcon onClick={() => handleNav('articles')} title="Medium Articles">
            <BookOpen className="size-[19px]" />
          </DockIcon>
          
          <DockIcon onClick={() => handleNav('contact')} title="Contact">
            <Mail className="size-[19px]" />
          </DockIcon>

          {/* Divider */}
          <div role="none" className="shrink-0 bg-border w-[1px] h-6 mx-[3px]"></div>
          
          {/* Theme Toggle */}
          <DockIcon onClick={toggleDarkMode} title="Toggle Theme">
            {darkMode ? <Sun className="size-[19px] text-yellow-500" /> : <Moon className="size-[19px] text-neutral-800" />}
          </DockIcon>
        </Dock>
      </div>
    </main>
  )
}

export default App
