import { useEffect, useRef, useState } from 'react'
import { categories, products, journal, type Product } from './data'
import TryOn from './TryOn'
import { SparkleIcon } from './SparkleIcon'
import BookingModal from './BookingModal'
import WishlistModal from './WishlistModal'

const HERO = '/Images/model1.jpg'
const BEFORE = '/Images/model1_before.jpg'
const AFTER = '/Images/model1.jpg'
const EDITORIAL = '/Images/necklace_new_emerald.jpg'
const CRAFT = '/Images/diamond5.jpg'

const NAV = ['Collections', 'Jewellery', 'AI Try-On', 'The Maison', 'Craftsmanship', 'Journal', 'Contact']

/* ---------------- Nav ---------------- */
function Nav({
  onTryOn,
  onMenu,
  wishlistCount,
  onWishlistOpen,
}: {
  onTryOn: () => void
  onMenu: () => void
  wishlistCount: number
  onWishlistOpen: () => void
}) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-ivory/95 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur' : 'text-ivory'
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 items-center px-5 py-4 sm:px-8 md:grid-cols-3">
        <nav className="hidden items-center gap-7 text-xs tracking-wide md:flex">
          {NAV.slice(0, 3).map((n) => (
            <a key={n} href={`#${n.toLowerCase().replace(/\s|-/g, '')}`} className="hover:opacity-60">
              {n}
            </a>
          ))}
        </nav>
        <button onClick={onMenu} className="text-sm tracking-wide md:hidden" aria-label="Open menu">
          Menu
        </button>

        <a href="#top" className="text-center font-serif text-2xl tracking-[0.15em] md:text-3xl">
          AUREVYA
        </a>

        <div className="flex items-center justify-end gap-5 text-xs tracking-wide">
          <button
            onClick={onWishlistOpen}
            className="hidden hover:opacity-60 sm:inline flex items-center gap-1 cursor-pointer"
          >
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="rounded-full bg-gold px-1.5 py-0.5 text-[10px] text-white font-medium">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={onTryOn}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 tracking-wide transition-colors cursor-pointer ${
              solid ? 'bg-ink text-ivory hover:bg-charcoal' : 'bg-ivory/90 text-ink hover:bg-ivory'
            }`}
          >
            <SparkleIcon className="w-3.5 h-3.5 text-gold" />
            <span>Try it on</span>
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------------- Hero ---------------- */
function Hero({ onExplore, onTryOn }: { onExplore: () => void; onTryOn: () => void }) {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <img
        src={HERO}
        alt="An Aurevya necklace worn against the skin"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/60" />
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="max-w-2xl ave-reveal">
          <p className="eyebrow text-ivory/80">Aurevya Haute Joaillerie</p>
          <h1 className="mt-5 font-serif text-[3.25rem] font-light leading-[0.98] text-ivory sm:text-7xl lg:text-8xl">
            Jewellery,
            <br />
            <span className="italic">seen differently.</span>
          </h1>
          <p className="mt-6 max-w-md text-ivory/80">
            Fine jewellery designed to become personal. Discover it — then see it on you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onExplore}
              className="rounded-full bg-ivory px-8 py-3.5 text-sm tracking-wide text-ink transition-colors hover:bg-white"
            >
              Explore the collection
            </button>
            <button
              onClick={onTryOn}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ivory/60 px-8 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 cursor-pointer"
            >
              <SparkleIcon className="w-4 h-4 text-gold" />
              <span>Experience AI Try-On</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Categories ---------------- */
function Categories({ onSelectCategory }: { onSelectCategory: (id: string) => void }) {
  return (
    <section id="collections" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-gold">Discover the collection</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
            Find the piece that feels like yours.
          </h2>
        </div>
        <a href="#jewellery" className="text-sm text-charcoal underline underline-offset-4 hover:text-ink">
          View signature pieces
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
        {categories.map((c, i) => {
          // Asymmetric editorial layout
          const span =
            i === 0
              ? 'lg:col-span-2 lg:row-span-2'
              : i === 4
                ? 'lg:col-span-2'
                : 'lg:col-span-2'
          const isNecklace = c.id === 'necklaces'
          return (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`group text-left relative overflow-hidden rounded-lg bg-stone cursor-pointer ${span} ${
                i === 0 ? 'aspect-[3/4] lg:aspect-auto' : 'aspect-[4/3] lg:aspect-[3/2]'
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              {isNecklace ? (
                <span className="absolute top-4 right-4 rounded-full bg-gold/95 text-ivory px-3 py-1 text-xs font-medium tracking-wide shadow-md">
                  ✨ Try-On Live
                </span>
              ) : (
                <span className="absolute top-4 right-4 rounded-full bg-ink/75 text-ivory/80 px-3 py-1 text-xs tracking-wide backdrop-blur">
                  Coming Soon
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl">{c.name}</h3>
                    <p className="mt-1 max-w-[22ch] text-sm text-ivory/75">{c.descriptor}</p>
                  </div>
                  <span className="mb-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    {isNecklace ? 'Explore Necklaces →' : 'Coming Soon →'}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------- Product card ---------------- */
function ProductCard({
  p,
  onTryOn,
  isWishlisted,
  onToggleWishlist,
}: {
  p: Product
  onTryOn: (p: Product) => void
  isWishlisted: boolean
  onToggleWishlist: (p: Product) => void
}) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone">
        <img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(p)
          }}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition-all cursor-pointer shadow-md ${
            isWishlisted
              ? 'bg-ivory text-burgundy opacity-100 scale-105 font-bold'
              : 'bg-ivory/85 text-charcoal opacity-0 hover:bg-ivory group-hover:opacity-100 max-md:opacity-100'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
        {p.tryOn && (
          <button
            onClick={() => onTryOn(p)}
            className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2.5 rounded-full bg-ink/90 py-3 text-xs font-medium tracking-[0.18em] text-ivory opacity-0 backdrop-blur transition-all duration-300 hover:bg-ink group-hover:opacity-100 max-md:opacity-100 cursor-pointer shadow-lg uppercase"
          >
            <SparkleIcon className="w-4 h-4 text-gold" />
            <span>TRY YOUR LOOK</span>
          </button>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
          <p className="mt-0.5 text-xs text-taupe">{p.descriptor}</p>
        </div>
        <p className="shrink-0 text-sm text-charcoal">{p.price === 'Price on Request' ? 'On request' : p.price}</p>
      </div>
    </div>
  )
}

/* ---------------- Signature edit ---------------- */
function Edit({
  selectedCategory,
  onSelectCategory,
  onTryOn,
  wishlistIds,
  onToggleWishlist,
}: {
  selectedCategory: string
  onSelectCategory: (catId: string) => void
  onTryOn: (p: Product) => void
  wishlistIds: string[]
  onToggleWishlist: (p: Product) => void
}) {
  const isNecklaces = selectedCategory === 'necklaces'
  const filteredProducts = products.filter((p) => p.category === selectedCategory)
  const currentCategoryObj = categories.find((c) => c.id === selectedCategory)

  return (
    <section id="jewellery" className="border-y border-stone bg-parchment/50">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-gold">The Aurevya Edit</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Signature pieces</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id
              const isNecklace = cat.id === 'necklaces'
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-xs tracking-wide transition-all cursor-pointer ${
                    active
                      ? 'bg-ink text-ivory shadow-sm'
                      : 'bg-stone/60 text-charcoal hover:bg-stone hover:text-ink'
                  }`}
                >
                  {cat.name}
                  {!isNecklace && (
                    <span className="ml-1.5 text-[10px] text-taupe font-normal">(Soon)</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {isNecklaces ? (
          <div>
            <div className="mt-6 flex items-center justify-between text-xs text-taupe border-b border-stone/60 pb-3">
              <span>Showing Necklaces with AI Virtual Try-On</span>
              <span className="hidden sm:inline">Click "TRY YOUR LOOK" to preview on your portrait</span>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  onTryOn={onTryOn}
                  isWishlisted={wishlistIds.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 overflow-hidden rounded-xl border border-stone bg-ivory/80 p-8 sm:p-14 text-center">
            <div className="mx-auto max-w-lg">
              <span className="inline-block rounded-full bg-gold/15 px-4 py-1.5 text-xs font-medium tracking-widest text-gold uppercase">
                {currentCategoryObj?.name || 'Collection'} · Coming Soon
              </span>
              <h3 className="mt-5 font-serif text-3xl sm:text-4xl text-ink">
                Atelier Virtual Try-On Coming Soon
              </h3>
              <p className="mt-4 text-sm text-charcoal/75 leading-relaxed">
                Our master jewelers and AI engineers are perfecting the 3D try-on simulation for{' '}
                <span className="font-semibold text-ink">{currentCategoryObj?.name || 'this collection'}</span>.
                Currently, AI Virtual Try-On is exclusively available for our Signature Necklaces collection.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onSelectCategory('necklaces')}
                  className="rounded-full bg-ink px-7 py-3 text-xs tracking-wider text-ivory uppercase transition-all hover:bg-charcoal cursor-pointer"
                >
                  Explore Necklaces Try-On →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


/* ---------------- Before/After slider ---------------- */
function BeforeAfter() {
  const [pos, setPos] = useState(52)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const move = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(4, Math.min(96, x)))
  }

  useEffect(() => {
    const up = () => (dragging.current = false)
    const mm = (e: MouseEvent) => dragging.current && move(e.clientX)
    const tm = (e: TouchEvent) => dragging.current && move(e.touches[0].clientX)
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', mm)
    window.addEventListener('touchend', up)
    window.addEventListener('touchmove', tm)
    return () => {
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('touchend', up)
      window.removeEventListener('touchmove', tm)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-lg bg-stone"
    >
      <img src={AFTER} alt="The same portrait wearing an Aurevya piece" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs tracking-wide text-ivory backdrop-blur">
        Aurevya Try-On
      </span>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={BEFORE}
          alt="Original portrait before try-on"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: ref.current?.offsetWidth ?? '100%' }}
          draggable={false}
        />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/85 px-3 py-1 text-xs tracking-wide text-ink">
          Your photo
        </span>
      </div>
      <button
        aria-label="Drag to compare"
        className="absolute top-0 z-10 flex h-full w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center"
        style={{ left: `${pos}%` }}
        onMouseDown={() => (dragging.current = true)}
        onTouchStart={() => (dragging.current = true)}
      >
        <span className="h-full w-px bg-ivory/90" />
        <span className="absolute grid h-11 w-11 place-items-center rounded-full bg-ivory text-ink shadow-lg">
          ⟷
        </span>
      </button>
    </div>
  )
}

/* ---------------- AI Try-On USP ---------------- */
function TryOnUSP({ onTryOn }: { onTryOn: () => void }) {
  return (
    <section id="aitryon" className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
        <div className="order-2 lg:order-1">
          <p className="eyebrow text-gold-soft">AI Virtual Try-On</p>
          <h2 className="mt-5 font-serif text-5xl font-light leading-[0.98] sm:text-6xl">
            See it on you.
          </h2>
          <p className="mt-6 max-w-md text-lg text-ivory/80">
            Jewellery is personal. Upload a portrait and see how your chosen Aurevya piece looks on
            you — before you make it yours.
          </p>
          <p className="mt-4 max-w-md text-sm text-ivory/55">
            No virtual mirror. No live camera. Just your photo and the piece you want to see.
          </p>
          <button
            onClick={onTryOn}
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-ivory px-8 py-3.5 text-sm tracking-wide text-ink transition-colors hover:bg-white cursor-pointer"
          >
            <SparkleIcon className="w-4 h-4 text-gold" />
            <span>Try Aurevya on you</span>
          </button>
        </div>
        <div className="order-1 lg:order-2">
          <BeforeAfter />
          <p className="mt-3 text-center text-xs text-ivory/50">
            Drag to compare — AI Virtual Try-On by Aurevya
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- How it works ---------------- */
function HowItWorks({ onTryOn }: { onTryOn: () => void }) {
  const steps = [
    { n: '01', t: 'Upload', d: 'Add a clear portrait with the relevant area visible.' },
    { n: '02', t: 'Choose', d: 'Select the Aurevya piece you want to experience.' },
    { n: '03', t: 'See it on you', d: 'Receive a personalised, editorial try-on preview.' },
  ]
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-lg font-serif text-4xl sm:text-5xl">
          What if you could see it on you?
        </h2>
        <button
          onClick={onTryOn}
          className="inline-flex items-center gap-2.5 rounded-full border border-ink px-7 py-3 text-sm tracking-wide transition-colors hover:bg-ink hover:text-ivory cursor-pointer"
        >
          <SparkleIcon className="w-4 h-4 text-gold" />
          <span>Try it on</span>
        </button>
      </div>
      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="border-t border-ink pt-5">
            <span className="font-serif text-3xl text-gold">{s.n}</span>
            <h3 className="mt-3 font-serif text-2xl">{s.t}</h3>
            <p className="mt-2 text-sm text-charcoal/75">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Editorial story ---------------- */
function Editorial() {
  return (
    <section className="border-y border-stone bg-parchment/40">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden bg-stone">
          <img src={EDITORIAL} alt="Aurevya editorial campaign" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-20">
          <p className="eyebrow text-gold">Featured — The Nocturne Story</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            One piece. A different feeling.
          </h2>
          <p className="mt-5 max-w-md text-charcoal/80">
            The Nocturne edit is built around contrast — warm gold against low light, a single stone
            given room to breathe. Pieces made to be lived in, not locked away.
          </p>
          <a href="#jewellery" className="mt-8 text-sm underline underline-offset-4 hover:text-gold">
            Explore the story →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Craftsmanship ---------------- */
function Craft() {
  const steps = ['Design', 'Material', 'Stone', 'Setting', 'Finish']
  return (
    <section id="craftsmanship" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-gold">Craftsmanship</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Crafted with intention.
          </h2>
          <p className="mt-5 max-w-md text-charcoal/80">
            Every Aurevya piece moves through the same hands, from first sketch to final polish. The
            care is in the details you rarely see.
          </p>
          <ol className="mt-9 space-y-0">
            {steps.map((s, i) => (
              <li
                key={s}
                className="flex items-center gap-5 border-t border-stone py-4 last:border-b"
              >
                <span className="font-serif text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-xl">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone">
          <img src={CRAFT} alt="An Aurevya goldsmith at the bench" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Consultation ---------------- */
function Consultation({ onBook }: { onBook: () => void }) {
  return (
    <section id="contact" className="bg-burgundy text-ivory">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="eyebrow text-ivory/70">Private consultation</p>
        <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Found your piece?</h2>
        <p className="mx-auto mt-5 max-w-md text-ivory/80">
          Speak with an Aurevya advisor for a personal, unhurried conversation about the pieces
          you love.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onBook}
            className="rounded-full bg-ivory px-8 py-3.5 text-sm tracking-wide text-burgundy transition-colors hover:bg-white cursor-pointer"
          >
            Inquire about a piece
          </button>
          <button
            onClick={onBook}
            className="rounded-full border border-ivory/50 px-8 py-3.5 text-sm tracking-wide transition-colors hover:bg-ivory/10 cursor-pointer"
          >
            Book a private viewing
          </button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Journal ---------------- */
function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex items-end justify-between">
        <h2 className="font-serif text-4xl sm:text-5xl">Journal</h2>
        <a href="#journal" className="text-sm underline underline-offset-4 hover:text-gold">
          All stories
        </a>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {journal.map((j) => (
          <a key={j.id} href="#journal" className="group">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-stone">
              <img
                src={j.image}
                alt={j.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="eyebrow mt-4 text-gold">
              {j.kicker} · {j.read}
            </p>
            <h3 className="mt-2 font-serif text-xl leading-snug">{j.title}</h3>
            <p className="mt-2 text-sm text-charcoal/70">{j.excerpt}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Final CTA + Footer ---------------- */
function Footer({
  onTryOn,
  onBook,
  onSelectCategory,
  onToast,
}: {
  onTryOn: () => void
  onBook: () => void
  onSelectCategory: (catId: string) => void
  onToast: (msg: string) => void
}) {
  const handleLinkClick = (item: string, e: React.MouseEvent) => {
    e.preventDefault()
    switch (item) {
      case 'Collections':
        document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'The Aurevya Edit':
        document.getElementById('jewellery')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'High Jewellery':
        onSelectCategory('high-jewellery')
        break
      case 'AI Try-On':
        onTryOn()
        break
      case 'The Maison':
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Craftsmanship':
        document.getElementById('craftsmanship')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Journal':
        document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Careers':
        onToast('Atelier careers: Please send your portfolio to careers@aurevya.com')
        break
      case 'Private consultation':
      case 'Care & repair':
        onBook()
        break
      case 'Delivery':
        onToast('Complimentary insured white-glove delivery available worldwide.')
        break
      case 'Contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer id="themaison" className="bg-ink text-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <div className="border-b border-ivory/15 pb-16 text-center">
          <p className="eyebrow text-gold-soft">Explore Aurevya</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-6xl">
            Try the collection from your own perspective.
          </h2>
          <button
            onClick={onTryOn}
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-ivory px-9 py-4 text-sm tracking-wide text-ink transition-colors hover:bg-white cursor-pointer"
          >
            <SparkleIcon className="w-4 h-4 text-gold" />
            <span>See it on you →</span>
          </button>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl tracking-[0.15em]">AUREVYA</p>
            <p className="mt-4 max-w-xs text-sm text-ivory/60">
              Haute Joaillerie. Fine jewellery designed to become personal.
            </p>
          </div>
          {[
            { h: 'Discover', items: ['Collections', 'The Aurevya Edit', 'High Jewellery', 'AI Try-On'] },
            { h: 'Maison', items: ['The Maison', 'Craftsmanship', 'Journal', 'Careers'] },
            { h: 'Service', items: ['Private consultation', 'Care & repair', 'Delivery', 'Contact'] },
          ].map((col) => (
            <div key={col.h}>
              <p className="eyebrow text-ivory/50">{col.h}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-ivory/75">
                {col.items.map((it) => (
                  <li key={it}>
                    <button
                      onClick={(e) => handleLinkClick(it, e)}
                      className="hover:text-ivory transition-colors cursor-pointer text-left"
                    >
                      {it}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Aurevya Haute Joaillerie</span>
          <div className="flex gap-6">
            <button onClick={() => onToast('Aurevya Privacy Policy: Your portrait & data are strictly confidential.')} className="hover:text-ivory/80 cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onToast('Aurevya Terms & Conditions of Haute Joaillerie.')} className="hover:text-ivory/80 cursor-pointer">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- Mobile menu ---------------- */
function MobileMenu({ open, onClose, onTryOn }: { open: boolean; onClose: () => void; onTryOn: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] bg-ivory md:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-serif text-2xl tracking-[0.15em]">AUREVYA</span>
        <button onClick={onClose} aria-label="Close menu" className="text-sm">
          Close ✕
        </button>
      </div>
      <nav className="mt-8 flex flex-col gap-1 px-5">
        {NAV.map((n) => (
          <a
            key={n}
            href={`#${n.toLowerCase().replace(/\s|-/g, '')}`}
            onClick={onClose}
            className="border-b border-stone py-4 font-serif text-2xl"
          >
            {n}
          </a>
        ))}
      </nav>
      <button
        onClick={() => {
          onClose()
          onTryOn()
        }}
        className="mx-5 mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-sm tracking-wide text-ivory cursor-pointer"
      >
        <SparkleIcon className="w-4 h-4 text-gold" />
        <span>Try it on →</span>
      </button>
    </div>
  )
}

/* ---------------- App ---------------- */
export default function App() {
  const [tryOnOpen, setTryOnOpen] = useState(false)
  const [tryOnProduct, setTryOnProduct] = useState<Product | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('necklaces')

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 4500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const openTryOn = (p?: Product) => {
    setTryOnProduct(p ?? null)
    setTryOnOpen(true)
  }

  const toggleWishlist = (p: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(p.id)
      if (exists) {
        setToastMessage(`Removed ${p.name} from your Wishlist`)
        return prev.filter((id) => id !== p.id)
      } else {
        setToastMessage(`✨ Added ${p.name} to your Wishlist`)
        return [...prev, p.id]
      }
    })
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId)
    scrollTo('jewellery')
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Nav
        onTryOn={() => openTryOn()}
        onMenu={() => setMenuOpen(true)}
        wishlistCount={wishlist.length}
        onWishlistOpen={() => setWishlistOpen(true)}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onTryOn={() => openTryOn()} />

      <main>
        <Hero onExplore={() => handleSelectCategory('necklaces')} onTryOn={() => openTryOn()} />
        <Categories onSelectCategory={handleSelectCategory} />
        <Edit
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onTryOn={openTryOn}
          wishlistIds={wishlist}
          onToggleWishlist={toggleWishlist}
        />
        <TryOnUSP onTryOn={() => openTryOn()} />
        <HowItWorks onTryOn={() => openTryOn()} />
        <Editorial />
        <Craft />
        <Consultation onBook={() => setBookingOpen(true)} />
        <Journal />
      </main>

      <Footer
        onTryOn={() => openTryOn()}
        onBook={() => setBookingOpen(true)}
        onSelectCategory={handleSelectCategory}
        onToast={(msg) => setToastMessage(msg)}
      />

      <TryOn open={tryOnOpen} onClose={() => setTryOnOpen(false)} initialProduct={tryOnProduct} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} onSuccess={(msg) => setToastMessage(msg)} />
      <WishlistModal
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((x) => x !== id))}
        onTryOn={(p) => openTryOn(p)}
      />

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-[150] -translate-x-1/2 pointer-events-none transition-all">
          <div className="rounded-full bg-ink/95 px-6 py-3.5 text-sm text-ivory shadow-2xl border border-gold/40 backdrop-blur flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
