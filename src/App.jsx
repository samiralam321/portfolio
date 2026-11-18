import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { flushSync } from 'react-dom'
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
  Paperclip,
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

// Custom inline SVG icons for Github, Linkedin, Twitter, and YouTubeMusic
const Github = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
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

const YouTube = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const Instagram = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const YouTubeMusic = ({ className = "size-3.5 text-[#FF0000]" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm0-13.5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-2 9l6-3-6-3v6z"/>
  </svg>
)

// Medium icon SVG component
const MediumIcon = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
)

// Minimal Editorial Tooltip Component matching reference design
const Tooltip = ({ children, content }) => {
  return (
    <div className="relative group/tooltip flex items-center justify-center">
      {children}
      <div 
        role="tooltip"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#111111] dark:bg-[#222222] border border-neutral-800 text-white text-[11px] font-medium whitespace-nowrap opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 transition-all duration-150 ease-out z-50 shadow-md"
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#111111] dark:border-t-[#222222]" />
      </div>
    </div>
  )
}

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
  <div className="rounded-xl border border-border bg-card overflow-hidden animate-pulse flex flex-col h-full shadow-sm">
    <div className="w-full aspect-[16/10] bg-muted/60" />
    <div className="p-2.5 sm:p-3 space-y-2 flex-1">
      <div className="h-3.5 bg-muted/80 rounded w-5/6" />
      <div className="h-3 bg-muted/60 rounded w-3/5" />
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
        className="group flex flex-col rounded-xl border border-border bg-card text-card-foreground overflow-hidden hover:shadow-lg hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 ease-out h-full"
      >
        {/* Complete cover image container - object-contain preserves entire image without cropping */}
        <div className="relative w-full aspect-[16/10] bg-white dark:bg-[#121214] flex items-center justify-center p-2 sm:p-2.5 border-b border-border/50 overflow-hidden">
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
              <BookOpen className="size-8 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Title only below the image */}
        <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-start">
          <h3 className="font-bold text-xs sm:text-[13px] text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-3">
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
      className="flex flex-col space-y-6 pb-20 w-full"
    >
      {/* Breadcrumb & Header */}
      <section className="space-y-3">
        <BlurFade delay={0.04}>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
            <button
              onClick={onBack}
              className="hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
              title="Back to Home"
            >
              <Home className="size-3" />
              <span>HOME</span>
            </button>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground font-semibold">ARTICLES</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.08}>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                My Articles
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Thoughts, learnings, and experiences from my journey in software development, AI, and technology.
              </p>
            </div>

            <a
              href={`https://medium.com/@${MEDIUM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-sm hover:bg-muted hover:border-foreground/30 active:scale-95 transition-all shrink-0 mt-0.5"
            >
              <MediumIcon className="size-3.5" />
              <span>View on Medium</span>
              <ExternalLink className="size-2.5 text-muted-foreground" />
            </a>
          </div>
        </BlurFade>
      </section>

      {/* Search & Tag Filter Bar */}
      {status === 'success' && articles.length > 0 && (
        <BlurFade delay={0.12}>
          <div className="space-y-2.5 pt-0.5">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer border ${
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
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all cursor-pointer border ${
                      selectedTag === tag
                        ? 'bg-foreground text-background border-foreground shadow-sm'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Tag className="size-2.5" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Success */}
        {status === 'success' && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
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

  // YouTube Music Track: Where We're Going - Hans Zimmer (Interstellar)
  const playlist = [
    {
      title: "Where We're Going (Slowed + Reverb)",
      artist: "Hans Zimmer — Interstellar",
      cover: "/images/interstellar_cover.jpg",
      audio: "/audio/where_were_going.m4a",
      youtubeUrl: "https://music.youtube.com/watch?v=UWOGg5nXiaI&list=RDAMVM9DMw0pa1rtM"
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
    if (playlist.length > 1) {
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
    } else if (audioRef.current) {
      // Single track: replay from start or seek
      if (direction === 'prev') {
        audioRef.current.currentTime = 0
      } else {
        audioRef.current.currentTime = Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + 15)
      }
      if (!isPlayingAudio) {
        audioRef.current.play().then(() => {
          setIsPlayingAudio(true)
        }).catch(err => {
          console.error("Audio playback error:", err)
        })
      }
    }
  }

  const handleAudioEnded = () => {
    if (playlist.length > 1) {
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
    } else {
      setIsPlayingAudio(false)
      if (audioRef.current) {
        audioRef.current.currentTime = 0
      }
    }
  }

  const projectsContainerRef = React.useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)



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
      icon: <Github className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://github.com/samiralam321"
    },
    {
      name: "Linkedin",
      icon: <Linkedin className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://www.linkedin.com/in/samir-alam-595b74328/"
    },
    {
      name: "X (Twitter)",
      icon: <Twitter className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://x.com/SamAlCse"
    },
    {
      name: "YouTube",
      icon: <YouTube className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://www.youtube.com/@itssamirx"
    },
    {
      name: "Instagram",
      icon: <Instagram className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "https://www.instagram.com/btechcse_forum?rpxt=MTU2MWoydGlpcHlvZg=="
    },
    {
      name: "Resume",
      icon: <FileText className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />,
      url: "/resume.pdf"
    },
    {
      name: "Email",
      icon: <Mail className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />,
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
      document.body.classList.add('h-dvh', 'overflow-hidden')
    } else {
      document.body.classList.remove('h-dvh', 'overflow-hidden')
    }
  }, [view])

  // Ensure clean body padding/margins on mount and view switch
  useEffect(() => {
    document.body.style.margin = '0px'
    document.body.style.padding = '0px'
    document.documentElement.style.margin = '0px'
    document.documentElement.style.padding = '0px'
    document.body.classList.remove('py-12', 'sm:py-24', 'px-6', 'max-w-2xl', 'mx-auto')
  }, [view])

  // Update document title for articles page
  useEffect(() => {
    if (view === 'articles') {
      document.title = 'Articles — Samir Alam'
    } else {
      document.title = 'Samir Alam - Backend Developer & Competitive Programmer'
    }
  }, [view])

  const handleThemeToggle = (e) => {
    const newMode = !darkMode

    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDarkMode(newMode)
      if (newMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return
    }

    const rect = e?.currentTarget?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setDarkMode(newMode)
        if (newMode) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('theme', 'light')
        }
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 750,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  const toggleDarkMode = handleThemeToggle

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

  // Projects Data: Zenvora, Trackr, CP Master, Tempo Timer
  const projects = [
    {
      title: "Zenvora",
      period: "Featured Project",
      description: "Curated tech learning platform organizing the developer journey into structured tracks and high-signal resources.",
      tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth.js", "Framer Motion"],
      image: "/images/zenvora_mockup.png",
      imageFit: "object-cover object-top",
      imageBg: "bg-[#060e24]",
      links: [
        { name: "Website", url: "https://zenvora-platform.vercel.app/", icon: <Globe className="size-3" /> },
        { name: "GitHub", url: "https://github.com/samiralam321/zenvora-platform", icon: <Github className="size-3" /> }
      ]
    },
    {
      title: "Trackr",
      period: "Featured Project",
      description: "Built a distraction-free space for students who actually want to get things done.",
      tech: ["Next.js 16", "React 19", "Tailwind CSS v4", "Supabase", "Vercel"],
      image: "/images/trackr_mockup.jpg",
      imageFit: "object-cover object-top",
      links: [
        { name: "Website", url: "https://trackr-ten-eta.vercel.app/", icon: <Globe className="size-3" /> },
        { name: "GitHub", url: "https://github.com/samiralam321/NewTrackr", icon: <Github className="size-3" /> }
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
        { name: "GitHub", url: "https://github.com/samiralam321", icon: <Github className="size-3" /> }
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
        { name: "GitHub", url: "https://github.com/samiralam321/tempo-timer", icon: <Github className="size-3" /> }
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
    <main className="min-h-screen m-0 p-0 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto max-w-4xl min-h-screen m-0 p-0"
          >
            {/* Left diagonal striped pattern column (hidden on mobile, visible on sm+) */}
            <div className="absolute left-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none" style={{ top: 0 }}>
              <div className="absolute inset-0 w-[60px] h-full border-r border-neutral-200/80 dark:border-[#292929] diagonal-stripes text-black dark:text-[#eee] opacity-[0.07] dark:opacity-[0.06]"></div>
            </div>

            {/* Right diagonal striped pattern column (hidden on mobile, visible on sm+) */}
            <div className="absolute right-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none" style={{ top: 0 }}>
              <div className="absolute inset-0 w-[60px] h-full border-l border-neutral-200/80 dark:border-[#292929] diagonal-stripes text-black dark:text-[#eee] opacity-[0.07] dark:opacity-[0.06]"></div>
            </div>

            {/* Center Main Profile Container */}
            <div className="mx-auto sm:w-[calc(100%-120px)] w-full min-h-screen bg-white dark:bg-[#171717] border-x border-neutral-200/80 dark:border-[#292929] shadow-xs pb-16 m-0 p-0">
              
              {/* Cover Banner Section */}
              <div className="w-full relative m-0 p-0">
                <div className="relative w-full h-[180px] sm:h-[280px] overflow-hidden bg-neutral-900">
                  <img 
                    src="/images/portfolio-landscape.webp" 
                    alt="Mountain River Landscape" 
                    className="w-full h-full object-cover select-none object-center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-4 bg-black/25 pointer-events-none">
                    <p className="text-white text-base sm:text-xl italic font-instrument text-center select-none tracking-wide drop-shadow-md">
                      Build what you wish existed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Information Section */}
              <div className="flex-col -mt-10 sm:-mt-12">
                {/* Circular Profile Avatar */}
                <div className="flex items-center justify-between mb-4 sm:ml-8 ml-4 sm:mr-8 mr-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 rounded-full overflow-hidden border-4 border-white dark:border-[#171717] shadow-sm bg-neutral-100 dark:bg-neutral-800 shrink-0">
                    <img 
                      src="/profile.png" 
                      alt="Samir" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>

                {/* Profile Name, Role & Social Icons */}
                <div className="text-left sm:flex sm:justify-between sm:items-center w-full sm:px-8 px-4 flex-col sm:flex-row gap-3">
                  <div className="px-0">
                    <h1 className="font-instrument italic text-3xl sm:text-4xl tracking-[0.01em] font-medium mb-0.5 text-neutral-900 dark:text-[#F2F2F2]">
                      Samir
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-[#A3A3A3] flex items-center gap-1.5">
                      <span>20</span>
                      <span>•</span>
                      <TypeAnimation
                        sequence={[
                          'Backend Developer', 2000,
                          'Competitive Programmer', 2000,
                          'AI & GenAI Learner', 2000,
                          'Lifetime Learner', 2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="font-normal"
                      />
                    </p>
                  </div>

                  {/* Social Media Action Buttons with Tooltips */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-0">
                    <Tooltip content="GitHub">
                      <a 
                        href="https://github.com/samiralam321" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="GitHub"
                        className="size-8 rounded-full border border-neutral-200/80 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-600 dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center transition-all duration-150 shadow-xs active:scale-95"
                      >
                        <Github className="size-3.5" />
                      </a>
                    </Tooltip>

                    <Tooltip content="X / Twitter">
                      <a 
                        href="https://x.com/SamAlCse" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="X / Twitter"
                        className="size-8 rounded-full border border-neutral-200/80 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-600 dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center transition-all duration-150 shadow-xs active:scale-95"
                      >
                        <Twitter className="size-3.5" />
                      </a>
                    </Tooltip>

                    <Tooltip content="View Resume">
                      <a 
                        href="/resume.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="View Resume"
                        className="size-8 rounded-full border border-neutral-200/80 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-600 dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center transition-all duration-150 shadow-xs active:scale-95"
                      >
                        <Paperclip className="size-3.5" />
                      </a>
                    </Tooltip>

                    <Tooltip content="LinkedIn">
                      <a 
                        href="https://www.linkedin.com/in/samir-alam-595b74328/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="LinkedIn"
                        className="size-8 rounded-full border border-neutral-200/80 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-600 dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center transition-all duration-150 shadow-xs active:scale-95"
                      >
                        <Linkedin className="size-3.5" />
                      </a>
                    </Tooltip>

                    <Tooltip content="Medium Articles">
                      <button 
                        onClick={() => handleNav('articles')}
                        aria-label="Medium Articles"
                        type="button"
                        className="size-8 rounded-full border border-neutral-200/80 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-600 dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center transition-all duration-150 shadow-xs active:scale-95 cursor-pointer"
                      >
                        <BookOpen className="size-3.5" />
                      </button>
                    </Tooltip>

                    <Tooltip content={darkMode ? "Switch to light theme" : "Switch to dark theme"}>
                      <button 
                        onClick={handleThemeToggle}
                        aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
                        type="button"
                        className="size-8 rounded-full border border-neutral-200/80 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-600 dark:text-[#B5B5B5] hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center transition-all duration-150 shadow-xs active:scale-95 cursor-pointer"
                      >
                        {darkMode ? <Sun className="size-3.5 text-yellow-500" /> : <Moon className="size-3.5 text-neutral-700" />}
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Thin horizontal divider */}
              <div className="border-b border-neutral-200/80 dark:border-[#292929] my-6 sm:my-8 mx-4 sm:mx-8"></div>

              {/* About Section */}
              <section id="about" className="sm:px-8 px-4">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-neutral-700 dark:text-[#A3A3A3] leading-[1.75] text-pretty">
                    <span className="font-semibold text-neutral-900 dark:text-[#F2F2F2]">I build from zero.</span> I'm a B.Tech CSE student focused on Backend Development, building scalable web applications with React, Node.js, Express, Python, C++, and Go. Outside of coding, I create content for a community of 15k+ followers, sharing insights and helping fellow developers in their tech journey. I enjoy solving challenging problems, optimizing performance, and crafting clean, reliable systems that make a real difference.
                  </p>
                </div>
              </section>

              {/* Music / Currently Playing Section */}
              <section id="music" className="sm:px-8 px-4 mt-6 sm:mt-8">
                <audio 
                  ref={audioRef} 
                  src={currentTrack.audio} 
                  onEnded={handleAudioEnded}
                  preload="metadata"
                />
                <div className="bg-neutral-50/80 dark:bg-[#1D1D1D]/80 rounded-2xl border border-neutral-200/60 dark:border-[#292929] p-3.5 sm:p-4 transition-all duration-300 hover:shadow-xs group">
                  <div className="flex items-center justify-between gap-3.5">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="shrink-0 size-12 sm:size-14 rounded-lg overflow-hidden shadow-sm relative group bg-neutral-200 dark:bg-neutral-800">
                        <img 
                          src={currentTrack.cover} 
                          alt="Album Cover" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <svg viewBox="0 0 24 24" className="size-3.5 text-[#1DB954]" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                          </svg>
                          <span className="text-xs font-medium text-neutral-500 dark:text-[#A3A3A3]">
                            {isPlayingAudio ? 'Now playing' : 'Last played'}
                          </span>
                        </div>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm hover:text-[#1DB954] transition-colors cursor-pointer block truncate">
                          {currentTrack.title}
                        </span>
                        <p className="text-xs text-neutral-500 dark:text-[#A3A3A3] truncate">
                          {currentTrack.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => switchTrack('prev')}
                        aria-label="Previous Track"
                        className="size-8 rounded-full border border-neutral-200 dark:border-[#292929] hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#252525] text-neutral-600 dark:text-[#A3A3A3] hover:text-black dark:hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                      >
                        <SkipBack className="size-3.5 fill-current" />
                      </button>
                      <button 
                        onClick={togglePlayAudio}
                        aria-label={isPlayingAudio ? 'Pause' : 'Play'}
                        className="size-9 rounded-full border border-neutral-200 dark:border-[#292929] hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#252525] text-neutral-800 dark:text-neutral-200 hover:scale-105 transition-all shadow-xs cursor-pointer active:scale-95 flex items-center justify-center"
                      >
                        {isPlayingAudio ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current ml-0.5" />}
                      </button>
                      <button 
                        onClick={() => switchTrack('next')}
                        aria-label="Next Track"
                        className="size-8 rounded-full border border-neutral-200 dark:border-[#292929] hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#252525] text-neutral-600 dark:text-[#A3A3A3] hover:text-black dark:hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                      >
                        <SkipForward className="size-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dashed divider */}
              <div className="border-b border-dashed border-neutral-200/80 dark:border-[#292929] my-8 sm:my-10 mx-4 sm:mx-8"></div>

              {/* Coding Profiles Section */}
              <section id="profiles" className="sm:px-8 px-4">
                <h2 className="text-xl sm:text-2xl font-normal font-instrument mb-3 text-neutral-900 dark:text-[#F2F2F2]">
                  Coding Profiles
                </h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 rounded-lg border border-neutral-200/80 dark:border-[#292929] px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-[#1D1D1D] text-xs font-medium text-neutral-800 dark:text-[#F2F2F2] transition-colors" 
                    href="https://leetcode.com/u/samCPer/"
                    title="LeetCode"
                  >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="h-4 w-4 text-[#FFA116]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"></path>
                    </svg>
                    <span>LeetCode</span>
                  </a>
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 rounded-lg border border-neutral-200/80 dark:border-[#292929] px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-[#1D1D1D] text-xs font-medium text-neutral-800 dark:text-[#F2F2F2] transition-colors" 
                    href="https://codeforces.com/profile/SamCodez"
                    title="Codeforces"
                  >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="h-4 w-4 text-[#318DFF]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h-3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"></path>
                    </svg>
                    <span>Codeforces</span>
                  </a>
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 rounded-lg border border-neutral-200/80 dark:border-[#292929] px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-[#1D1D1D] text-xs font-medium text-neutral-800 dark:text-[#F2F2F2] transition-colors" 
                    href="https://www.codechef.com/users/samir_codez"
                    title="CodeChef"
                  >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="h-4 w-4 text-[#5B4638]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.2574.0039c-.37.0101-.7353.041-1.1003.095C9.6164.153 9.0766.4236 8.482.694c-.757.3244-1.5147.6486-2.2176.7027-1.1896.3785-1.568.919-1.8925 1.3516 0 .054-.054.1079-.054.1079-.4325.865-.4873 1.73-.325 2.5952.1621.5407.3786 1.0282.5408 1.5148.3785 1.0274.7578 2.0007.92 3.1362.1622.3244.3235.7571.4316 1.1897.2704.8651.542 1.8383 1.353 2.5952l.0057-.0028c.0175.0183.0301.0387.0482.0568.0072-.0036.0141-.0063.0213-.0099l-.0213-.5849c.6489-.9733 1.5673-1.6221 2.865-1.8925.5195-.1093 1.081-.1497 1.6625-.1278a8.7733 8.7733 0 0 1 1.7988.2357c1.4599.3785 2.595 1.1358 2.6492 1.7846.0273.3549.0398.6952.0326 1.0364-.001.064-.0046.1285-.007.193l.1362.0682c.075-.0375.1424-.107.2059-.1902.0008-.001.002-.002.0028-.0028.0018-.0023.0039-.0061.0057-.0085.0396-.0536.0747-.1236.1107-.1931.0188-.0377.0372-.0866.0554-.1292.2048-.4622.362-1.1536.538-1.9635.0541-.2703.1092-.4864.1633-.7027.4326-.9733 1.0266-1.8382 1.6213-2.6492.9733-1.3518 1.8928-2.5962 1.7846-4.0561-1.784-3.4608-4.2718-4.0017-5.5695-4.272-.2163-.0541-.3233-.0539-.4856-.108-1.3382-.2433-2.4945-.3953-3.6046-.3648z"></path>
                    </svg>
                    <span>CodeChef</span>
                  </a>
                </div>
              </section>

              {/* Dashed divider */}
              <div className="border-b border-dashed border-neutral-200/80 dark:border-[#292929] my-8 sm:my-10 mx-4 sm:mx-8"></div>

              {/* Professional Experience Section */}
              <section id="experience" className="sm:px-8 px-4">
                <h2 className="text-xl sm:text-2xl font-normal font-instrument mb-4 text-neutral-900 dark:text-[#F2F2F2]">
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="flex flex-col space-y-1.5 rounded-xl p-3.5 sm:p-4 border border-neutral-200/60 dark:border-[#292929] bg-neutral-50/50 dark:bg-[#1D1D1D]/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                        <h3 className="font-semibold text-neutral-900 dark:text-[#F2F2F2] flex items-center gap-1.5">
                          <Briefcase className="size-3.5 text-neutral-500" />
                          {exp.role} <span className="text-xs text-neutral-500 dark:text-[#A3A3A3] font-normal">({exp.company})</span>
                        </h3>
                        <span className="text-xs text-neutral-500 dark:text-[#A3A3A3] sm:text-right font-medium">{exp.period}</span>
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-[#A3A3A3] font-medium pb-1">{exp.type}</div>
                      <ul className="list-disc list-inside text-xs text-neutral-600 dark:text-[#A3A3A3] space-y-1 pl-1 leading-relaxed">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dashed divider */}
              <div className="border-b border-dashed border-neutral-200/80 dark:border-[#292929] my-8 sm:my-10 mx-4 sm:mx-8"></div>

              {/* Featured Projects Section */}
              <section id="projects" className="sm:px-8 px-4 scroll-mt-12">
                <h2 className="text-xl sm:text-2xl font-normal font-instrument mb-4 text-neutral-900 dark:text-[#F2F2F2]">
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((project, idx) => (
                    <div key={idx} className="rounded-xl border border-neutral-200/70 dark:border-[#292929] bg-neutral-50/50 dark:bg-[#1D1D1D]/50 overflow-hidden flex flex-col hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 group">
                      <div className={`relative h-40 overflow-hidden ${project.imageBg || 'bg-neutral-100 dark:bg-neutral-800'}`}>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className={`w-full h-full ${project.imageFit || 'object-cover'} transition-transform duration-500 group-hover:scale-105`} 
                        />
                      </div>
                      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-[#F2F2F2]">{project.title}</h3>
                          <span className="text-[10px] text-neutral-500 dark:text-[#A3A3A3] font-medium">{project.period}</span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-[#A3A3A3] leading-relaxed mb-3 flex-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tech.slice(0, 6).map((t, tIdx) => (
                            <span key={tIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-[#A3A3A3] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-neutral-200/60 dark:border-[#292929]/80">
                          {project.links.map((link, lIdx) => (
                            <a 
                              key={lIdx} 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md border border-neutral-200 dark:border-[#292929] bg-white dark:bg-[#222222] text-neutral-700 dark:text-[#F2F2F2] hover:bg-neutral-50 dark:hover:bg-[#2a2a2a] transition-colors shadow-2xs"
                            >
                              {link.icon}
                              <span>{link.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dashed divider */}
              <div className="border-b border-dashed border-neutral-200/80 dark:border-[#292929] my-8 sm:my-10 mx-4 sm:mx-8"></div>

              {/* Education Section */}
              <section id="education" className="sm:px-8 px-4">
                <h2 className="text-xl sm:text-2xl font-normal font-instrument mb-4 text-neutral-900 dark:text-[#F2F2F2]">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="rounded-xl p-3.5 sm:p-4 border border-neutral-200/60 dark:border-[#292929] bg-neutral-50/50 dark:bg-[#1D1D1D]/50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                        <h3 className="font-semibold text-neutral-900 dark:text-[#F2F2F2] flex items-center gap-1.5">
                          <GraduationCap className="size-3.5 text-neutral-500" />
                          {edu.institution}
                        </h3>
                        <span className="text-xs text-neutral-500 dark:text-[#A3A3A3] font-medium">{edu.period}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-600 dark:text-[#A3A3A3] mt-1">
                        <span>{edu.degree} — <strong className="text-neutral-900 dark:text-[#F2F2F2]">{edu.details}</strong></span>
                        <span className="italic">{edu.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dashed divider */}
              <div className="border-b border-dashed border-neutral-200/80 dark:border-[#292929] my-8 sm:my-10 mx-4 sm:mx-8"></div>

              {/* Skills & Technologies Section */}
              <section id="skills" className="sm:px-8 px-4 scroll-mt-12">
                <h2 className="text-xl sm:text-2xl font-normal font-instrument mb-4 text-neutral-900 dark:text-[#F2F2F2]">
                  Skills &amp; Technologies
                </h2>
                <div className="space-y-3">
                  {Object.entries(skillsData).map(([category, skills], idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="text-xs font-medium text-neutral-500 dark:text-[#A3A3A3] uppercase tracking-wider">{category}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="inline-flex items-center rounded-md border border-neutral-200/80 dark:border-[#292929] px-2.5 py-0.5 text-xs font-medium bg-neutral-50 dark:bg-[#1D1D1D] text-neutral-800 dark:text-[#F2F2F2]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dashed divider */}
              <div className="border-b border-dashed border-neutral-200/80 dark:border-[#292929] my-8 sm:my-10 mx-4 sm:mx-8"></div>

              {/* GitHub Contributions Section */}
              <section id="github-heatmap" className="sm:px-8 px-4 scroll-mt-12">
                <div className="flex items-baseline gap-2 mb-4">
                  <h2 className="text-xl sm:text-2xl font-normal font-instrument text-neutral-900 dark:text-[#F2F2F2]">
                    GitHub Contributions
                  </h2>
                  <span className="text-neutral-400 dark:text-[#737373] text-sm">•</span>
                  <span className="text-lg sm:text-xl font-normal font-instrument not-italic text-neutral-500 dark:text-[#A3A3A3] select-none">
                    @samiralam321
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-200/70 dark:border-[#292929] bg-neutral-50/50 dark:bg-[#1D1D1D]/50 p-4 sm:p-5 overflow-hidden">
                  <div className="w-full flex justify-center">
                    <GitHubCalendar
                      username="samiralam321"
                      colorScheme={darkMode ? 'dark' : 'light'}
                      blockSize={11}
                      blockMargin={3}
                      fontSize={12}
                      labels={{
                        totalCount: '{{count}} contributions in the last year'
                      }}
                      theme={{
                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                        dark: ['#1c1c1c', '#0e4429', '#006d32', '#26a641', '#39d353'],
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Dashed divider */}
              <div className="border-b border-dashed border-neutral-200/80 dark:border-[#292929] my-8 sm:my-10 mx-4 sm:mx-8"></div>

              {/* Contact / Get in Touch Section */}
              <section id="contact" className="sm:px-8 px-4">
                <h2 className="text-xl sm:text-2xl font-normal font-instrument mb-3 text-neutral-900 dark:text-[#F2F2F2]">
                  Get in Touch
                </h2>
                <p className="text-sm text-neutral-600 dark:text-[#A3A3A3] leading-relaxed max-w-lg mb-4">
                  Have a question, collaboration idea, or opportunity? Feel free to reach out.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {contactLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.name !== "Email" ? "_blank" : undefined}
                      rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-200/80 dark:border-[#292929] px-3 py-1.5 bg-neutral-50 dark:bg-[#1D1D1D] text-xs font-medium text-neutral-800 dark:text-[#F2F2F2] hover:bg-neutral-100 dark:hover:bg-[#252525] transition-colors"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </section>

            </div>
          </motion.div>
        ) : view === 'articles' ? (
          <motion.div
            key="articles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto max-w-4xl min-h-screen m-0 p-0"
          >
            {/* Left and right stripes */}
            <div className="absolute left-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none" style={{ top: 0 }}>
              <div className="absolute inset-0 w-[60px] h-full border-r border-neutral-200/80 dark:border-[#292929] diagonal-stripes text-black dark:text-[#eee] opacity-[0.07] dark:opacity-[0.06]"></div>
            </div>
            <div className="absolute right-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none" style={{ top: 0 }}>
              <div className="absolute inset-0 w-[60px] h-full border-l border-neutral-200/80 dark:border-[#292929] diagonal-stripes text-black dark:text-[#eee] opacity-[0.07] dark:opacity-[0.06]"></div>
            </div>
            <div className="mx-auto sm:w-[calc(100%-120px)] w-full min-h-screen bg-white dark:bg-[#171717] border-x border-neutral-200/80 dark:border-[#292929] shadow-xs px-4 sm:px-8 py-8 pb-16 m-0">
              <ArticlesView onBack={() => handleNav('home')} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto max-w-4xl min-h-screen m-0 p-0"
          >
            {/* Left and right stripes */}
            <div className="absolute left-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none" style={{ top: 0 }}>
              <div className="absolute inset-0 w-[60px] h-full border-r border-neutral-200/80 dark:border-[#292929] diagonal-stripes text-black dark:text-[#eee] opacity-[0.07] dark:opacity-[0.06]"></div>
            </div>
            <div className="absolute right-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none" style={{ top: 0 }}>
              <div className="absolute inset-0 w-[60px] h-full border-l border-neutral-200/80 dark:border-[#292929] diagonal-stripes text-black dark:text-[#eee] opacity-[0.07] dark:opacity-[0.06]"></div>
            </div>
            <div className="mx-auto sm:w-[calc(100%-120px)] w-full min-h-screen bg-white dark:bg-[#171717] border-x border-neutral-200/80 dark:border-[#292929] shadow-xs px-4 sm:px-8 py-8 pb-16 m-0">
              <button 
                onClick={() => handleNav('home')}
                className="mb-6 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-4" />
                <span>Back to profile</span>
              </button>
              <div className="max-w-xl mx-auto py-4">
                <h2 className="text-3xl font-normal font-instrument mb-4 text-neutral-900 dark:text-[#F2F2F2]">Get in Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  {/* Left Side Links */}
                  <div className="flex flex-col space-y-2 justify-center pl-1">
                    {contactLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target={link.name !== "Email" ? "_blank" : undefined}
                        rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2.5 text-neutral-600 dark:text-[#A3A3A3] hover:text-neutral-900 dark:hover:text-white text-sm font-medium transition-colors py-1 cursor-pointer group w-max"
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </a>
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
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-900 dark:text-[#F2F2F2] placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-900 dark:text-[#F2F2F2] placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all text-xs"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-[#292929] bg-white dark:bg-[#1D1D1D] text-neutral-900 dark:text-[#F2F2F2] placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 resize-none transition-all text-xs"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="px-5 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all w-max text-xs disabled:opacity-50 cursor-pointer"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
