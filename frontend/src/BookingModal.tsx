import { useState, useEffect } from 'react'

export default function BookingModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: (message: string) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Clear inputs
    setName('')
    setEmail('')
    setPhone('')
    setDate('')
    setNotes('')
    // Close modal
    onClose()
    // Show toast notification
    onSuccess('✨ Private Viewing Reserved — An Aurevya Atelier Advisor will contact you shortly to confirm your viewing.')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-ivory p-6 sm:p-10 shadow-2xl border border-stone"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-stone text-charcoal hover:border-ink hover:text-ink cursor-pointer transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="text-center">
          <p className="eyebrow text-gold">Aurevya Atelier</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-ink">Book a Private Viewing</h2>
          <p className="mt-3 text-sm text-charcoal/80">
            Schedule an exclusive, unhurried consultation with a senior Aurevya jewellery advisor.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Eleanor Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-stone bg-parchment/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="eleanor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-stone bg-parchment/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-stone bg-parchment/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80 mb-1">
              Preferred Date & Time (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Next Tuesday afternoon"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-stone bg-parchment/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80 mb-1">
              Particular Piece of Interest (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Tell us about the pieces you'd like to view..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-stone bg-parchment/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 rounded-full bg-ink py-4 text-sm font-medium tracking-wider text-ivory transition-colors hover:bg-charcoal cursor-pointer shadow-md uppercase"
          >
            Confirm & Reserve Viewing
          </button>
        </form>
      </div>
    </div>
  )
}
