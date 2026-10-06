import { useEffect } from 'react'
import { products, type Product } from './data'
import { SparkleIcon } from './SparkleIcon'

export default function WishlistModal({
  open,
  onClose,
  wishlistIds,
  onRemove,
  onTryOn,
}: {
  open: boolean
  onClose: () => void
  wishlistIds: string[]
  onRemove: (id: string) => void
  onTryOn: (p: Product) => void
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id))

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-fade-in">
      <div
        className="relative flex flex-col w-full max-w-2xl max-h-[85vh] rounded-2xl bg-ivory p-6 sm:p-8 shadow-2xl border border-stone"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone/60 pb-4">
          <div>
            <p className="eyebrow text-gold">Saved Collection</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink">Your Wishlist</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-stone text-charcoal hover:border-ink hover:text-ink cursor-pointer transition-colors"
            aria-label="Close wishlist"
          >
            ✕
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto py-6">
          {savedProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-xl text-charcoal/80">Your wishlist is currently empty</p>
              <p className="mt-2 text-sm text-taupe max-w-sm mx-auto">
                Click the ♡ heart icon on any Aurevya piece to save it to your personal wishlist.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedProducts.map((p) => (
                <div key={p.id} className="flex gap-4 p-3 rounded-lg border border-stone/70 bg-parchment/40">
                  <img src={p.image} alt={p.name} className="h-24 w-20 rounded-md object-cover bg-stone shrink-0" />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h3 className="font-serif text-base truncate">{p.name}</h3>
                      <p className="text-xs text-taupe">{p.categoryLabel}</p>
                      <p className="mt-1 text-xs font-medium text-charcoal">{p.price}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {p.tryOn && (
                        <button
                          onClick={() => {
                            onClose()
                            onTryOn(p)
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-ivory hover:bg-charcoal cursor-pointer"
                        >
                          <SparkleIcon className="w-3 h-3 text-gold" />
                          <span>Try on</span>
                        </button>
                      )}
                      <button
                        onClick={() => onRemove(p.id)}
                        className="text-[11px] text-taupe underline hover:text-burgundy cursor-pointer ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-stone/60 pt-4 text-right">
          <button
            onClick={onClose}
            className="rounded-full bg-stone/60 px-6 py-2 text-xs font-medium tracking-wide text-charcoal hover:bg-stone cursor-pointer"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  )
}
