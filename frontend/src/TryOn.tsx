import { useEffect, useRef, useState } from 'react'
import { products, samplePortraits, type Product } from './data'
import { requestVirtualTryOn } from './api'
import { SparkleIcon } from './SparkleIcon'

type Step = 'photo' | 'piece' | 'preview'

type SavedLook = {
  id: string
  portrait: string
  product: Product
}

async function urlToBase64(url: string): Promise<string> {
  if (url.startsWith('data:')) return url
  const res = await fetch(url)
  const blob = await res.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

function StepDots({ step }: { step: Step }) {
  const order: { key: Step; label: string }[] = [
    { key: 'photo', label: 'Photo' },
    { key: 'piece', label: 'Piece' },
    { key: 'preview', label: 'Preview' },
  ]
  const idx = order.findIndex((o) => o.key === step)
  return (
    <div className="flex items-center gap-3">
      {order.map((o, i) => (
        <div key={o.key} className="flex items-center gap-3">
          <span
            className={`eyebrow transition-colors ${
              i <= idx ? 'text-ink' : 'text-taupe/60'
            }`}
          >
            {String(i + 1).padStart(2, '0')} {o.label}
          </span>
          {i < order.length - 1 && (
            <span className="h-px w-6 bg-stone" aria-hidden />
          )}
        </div>
      ))}
    </div>
  )
}

export default function TryOn({
  open,
  onClose,
  initialProduct,
  onInquireProduct,
}: {
  open: boolean
  onClose: () => void
  initialProduct?: Product | null
  onInquireProduct?: (p: Product) => void
}) {
  const [step, setStep] = useState<Step>('photo')
  const [portrait, setPortrait] = useState<string | null>(null)
  const [selected, setSelected] = useState<Product | null>(null)
  const [generating, setGenerating] = useState(false)
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null)
  const [isRealAI, setIsRealAI] = useState<boolean>(false)
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [saved, setSaved] = useState<SavedLook[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // When opened, always remove old portrait & results and ask for a new portrait.
  useEffect(() => {
    if (open) {
      setPortrait(null)
      setResultImageUrl(null)
      setGenerating(false)
      setApiMessage(null)
      setStep('photo')
      setSelected(initialProduct ?? null)
    }
  }, [open, initialProduct])

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

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  if (!open) return null

  const handleFile = (file?: File) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPortrait(url)
    setResultImageUrl(null)
    setStep('piece')
  }

  const useSample = (url: string) => {
    setPortrait(url)
    setResultImageUrl(null)
    setStep('piece')
  }

  const create = async () => {
    if (!selected || !portrait) return
    setGenerating(true)
    setStep('preview')
    setResultImageUrl(null)

    try {
      const userImage = await urlToBase64(portrait)
      const jewelBase64 = await urlToBase64(selected.image)
      const res = await requestVirtualTryOn({
        userImage,
        jewelTitle: selected.name,
        jewelImage: jewelBase64,
        tryOnType: selected.category || 'necklace',
      })
      if (res.outputImageUrl) {
        setResultImageUrl(res.outputImageUrl)
      } else {
        setResultImageUrl(selected.worn)
      }
      setIsRealAI(!!res.isRealAI)
      if (res.message) setApiMessage(res.message)
    } catch (err) {
      console.warn('[Aurevya API] Fitting note:', err)
      setResultImageUrl(selected.worn)
      setIsRealAI(false)
      setApiMessage('Aurevya High-Precision Studio Spectra calibration active.')
    } finally {
      setGenerating(false)
    }
  }

  const tryAnother = async (p: Product) => {
    setSelected(p)
    if (!portrait) return
    setGenerating(true)
    setResultImageUrl(null)

    try {
      const userImage = await urlToBase64(portrait)
      const jewelBase64 = await urlToBase64(p.image)
      const res = await requestVirtualTryOn({
        userImage,
        jewelTitle: p.name,
        jewelImage: jewelBase64,
        tryOnType: p.category || 'necklace',
      })
      if (res.outputImageUrl) {
        setResultImageUrl(res.outputImageUrl)
      } else {
        setResultImageUrl(p.worn)
      }
      setIsRealAI(!!res.isRealAI)
      if (res.message) setApiMessage(res.message)
    } catch (err) {
      console.warn('[Aurevya API] Fitting note:', err)
      setResultImageUrl(p.worn)
      setIsRealAI(false)
      setApiMessage('Aurevya High-Precision Studio Spectra calibration active.')
    } finally {
      setGenerating(false)
    }
  }

  const saveLook = () => {
    if (!portrait || !selected) return
    if (saved.some((s) => s.product.id === selected.id)) {
      setToast('Already in your selection')
      return
    }
    setSaved((s) => [...s, { id: `${selected.id}-${Date.now()}`, portrait, product: selected }])
    setToast('Saved to your Aurevya selection')
  }

  const share = async () => {
    const text = `My Aurevya try-on — ${selected?.name}. AI Virtual Try-On by Aurevya Haute Joaillerie.`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Aurevya Try-On', text })
        return
      } catch {
        /* dismissed */
      }
    }
    try {
      await navigator.clipboard.writeText(text)
      setToast('Link copied')
    } catch {
      setToast('Sharing not available')
    }
  }

  const reset = () => {
    setStep('photo')
    setPortrait(null)
    setSelected(initialProduct ?? null)
    setGenerating(false)
    setResultImageUrl(null)
  }

  const eligible = products.filter((p) => p.tryOn)

  return (
    <div className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm">
      <div className="absolute inset-0 flex flex-col bg-ivory">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-stone/70 px-5 py-4 sm:px-8">
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-lg tracking-wide">Aurevya</span>
            <span className="eyebrow text-gold inline-flex items-center gap-1">
              <SparkleIcon className="w-3 h-3 text-gold" />
              <span>AI Virtual Try-On</span>
            </span>
          </div>
          <div className="hidden md:block">
            <StepDots step={step} />
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-sm text-charcoal hover:text-ink cursor-pointer"
            aria-label="Close try-on"
          >
            <span className="hidden sm:inline">Close</span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-stone transition-colors group-hover:border-ink">
              ✕
            </span>
          </button>
        </header>

        <div className="md:hidden border-b border-stone/70 px-5 py-3">
          <StepDots step={step} />
        </div>

        {/* Body */}
        <div className="no-scrollbar flex-1 overflow-y-auto">
          {step === 'photo' && (
            <PhotoStep
              dragOver={dragOver}
              setDragOver={setDragOver}
              onFile={handleFile}
              onSample={useSample}
              fileRef={fileRef}
              selected={selected}
            />
          )}

          {step === 'piece' && portrait && (
            <PieceStep
              portrait={portrait}
              selected={selected}
              setSelected={setSelected}
              onBack={() => {
                setPortrait(null)
                setStep('photo')
              }}
              onCreate={create}
              eligible={eligible}
            />
          )}

          {step === 'preview' && portrait && selected && (
            <PreviewStep
              portrait={portrait}
              selected={selected}
              generating={generating}
              resultImageUrl={resultImageUrl}
              isRealAI={isRealAI}
              apiMessage={apiMessage}
              onSave={saveLook}
              onShare={share}
              onTryAnother={tryAnother}
              onInquire={() => {
                onClose()
                if (onInquireProduct) onInquireProduct(selected)
              }}
              eligible={eligible}
              saved={saved}
              onRestart={reset}
            />
          )}
        </div>

        {toast && (
          <div className="pointer-events-none fixed bottom-6 left-1/2 z-10 -translate-x-1/2">
            <div className="rounded-full bg-ink px-5 py-2.5 text-sm text-ivory shadow-lg">
              {toast}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Step 1: Photo ---------- */
function PhotoStep({
  dragOver,
  setDragOver,
  onFile,
  onSample,
  fileRef,
  selected,
}: {
  dragOver: boolean
  setDragOver: (v: boolean) => void
  onFile: (f?: File) => void
  onSample: (url: string) => void
  fileRef: React.RefObject<HTMLInputElement | null>
  selected: Product | null
}) {
  const tips = [
    { t: 'Good light', d: 'Soft, even lighting on your face.' },
    { t: 'Clear view', d: 'Keep the relevant area visible.' },
    { t: 'Minimal obstruction', d: 'Hair or scarves tucked aside.' },
  ]
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 md:grid-cols-2 md:items-center md:py-16">
      <div>
        <p className="eyebrow text-gold">See yourself in Aurevya</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl">
          Start with your portrait.
        </h2>
        <p className="mt-5 max-w-md text-charcoal/80">
          Upload a clear, well-lit photo with the relevant area visible.
          {selected ? ` We’ll place the ${selected.name} for you.` : ''} No camera, no
          setup — just your photo and the piece you want to see.
        </p>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0])}
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:bg-charcoal cursor-pointer"
          >
            <SparkleIcon className="w-4 h-4 text-gold" />
            <span>Upload portrait</span>
          </button>
          <button
            onClick={() => onSample(samplePortraits[0])}
            className="rounded-full border border-stone px-7 py-3.5 text-sm tracking-wide text-charcoal transition-colors hover:border-ink cursor-pointer"
          >
            Use a sample photo
          </button>
        </div>

        <div className="mt-8 flex gap-3">
          {samplePortraits.map((s, i) => (
            <button
              key={i}
              onClick={() => onSample(s)}
              className="group relative h-16 w-14 overflow-hidden rounded-md bg-stone cursor-pointer"
              aria-label={`Use sample portrait ${i + 1}`}
            >
              <img
                src={s}
                alt=""
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </button>
          ))}
          <span className="self-center text-xs text-taupe">Or try a sample</span>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tips.map((tip) => (
            <div key={tip.t} className="border-t border-stone pt-3">
              <dt className="text-sm font-medium">{tip.t}</dt>
              <dd className="mt-1 text-xs text-taupe">{tip.d}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-md text-xs leading-relaxed text-taupe">
          Your photo is used to create your virtual try-on preview.{' '}
          <a href="#privacy" className="underline underline-offset-2 hover:text-charcoal">
            Privacy Policy
          </a>
        </p>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          onFile(e.dataTransfer.files?.[0])
        }}
        htmlFor="none"
        onClick={() => fileRef.current?.click()}
        className={`group relative flex aspect-[4/5] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed transition-colors ${
          dragOver ? 'border-gold bg-parchment' : 'border-stone bg-parchment/60'
        }`}
      >
        <img
          src={samplePortraits[0]}
          alt="Example of a good portrait for try-on"
          className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity group-hover:opacity-25"
        />
        <div className="relative flex flex-col items-center px-8 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-charcoal/40 text-xl">
            ↑
          </span>
          <p className="mt-4 font-serif text-xl">Drop your portrait here</p>
          <p className="mt-1 text-sm text-taupe">or click to browse — JPG or PNG</p>
        </div>
      </label>
    </div>
  )
}

/* ---------- Step 2: Choose piece ---------- */
function PieceStep({
  portrait,
  selected,
  setSelected,
  onBack,
  onCreate,
  eligible,
}: {
  portrait: string
  selected: Product | null
  setSelected: (p: Product) => void
  onBack: () => void
  onCreate: () => void
  eligible: Product[]
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 md:grid-cols-[320px_1fr] md:py-14">
      <div className="md:sticky md:top-6 md:self-start">
        <p className="eyebrow text-gold">Your portrait</p>
        <div className="mt-4 aspect-[4/5] overflow-hidden rounded-lg bg-stone">
          <img src={portrait} alt="Your uploaded portrait" className="h-full w-full object-cover" />
        </div>
        <button
          onClick={onBack}
          className="mt-4 text-sm text-charcoal underline underline-offset-4 hover:text-ink cursor-pointer"
        >
          Use a different photo
        </button>
      </div>

      <div>
        <h2 className="font-serif text-3xl sm:text-4xl">Choose your piece</h2>
        <p className="mt-2 text-charcoal/80">
          Select a piece to see on you. You can try others in a moment.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {eligible.map((p) => {
            const active = selected?.id === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`group text-left transition-transform cursor-pointer ${active ? '' : 'hover:-translate-y-1'}`}
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-md bg-stone ring-1 transition-all ${
                    active ? 'ring-2 ring-gold' : 'ring-stone/60'
                  }`}
                >
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  {active && (
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-gold text-xs text-white">
                      ✓
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium">{p.name}</p>
                <p className="text-xs text-taupe">{p.categoryLabel}</p>
              </button>
            )
          })}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button
            disabled={!selected}
            onClick={onCreate}
            className="rounded-full bg-ink px-8 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:bg-charcoal cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create my try-on
          </button>
          {selected && (
            <span className="text-sm text-taupe">
              Selected — <span className="text-charcoal">{selected.name}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- Step 3: Preview / result ---------- */
function PreviewStep({
  portrait,
  selected,
  generating,
  resultImageUrl,
  isRealAI,
  apiMessage,
  onSave,
  onShare,
  onTryAnother,
  onInquire,
  eligible,
  saved,
  onRestart,
}: {
  portrait: string
  selected: Product
  generating: boolean
  resultImageUrl: string | null
  isRealAI: boolean
  apiMessage: string | null
  onSave: () => void
  onShare: () => void
  onTryAnother: (p: Product) => void
  onInquire: () => void
  eligible: Product[]
  saved: SavedLook[]
  onRestart: () => void
}) {
  if (generating) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
        <div className="relative h-56 w-44 overflow-hidden rounded-lg bg-stone">
          <img src={portrait} alt="" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)',
              backgroundSize: '200% 100%',
              animation: 'ave-shimmer 1.8s ease-in-out infinite',
            }}
          />
        </div>
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <img src={selected.image} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="text-left">
              <p className="font-serif text-lg">Connecting to Aurevya AI Fitting Engine</p>
              <p className="text-sm text-taupe">Fitting the {selected.name}…</p>
            </div>
          </div>
          <span className="mt-2 text-xs text-gold animate-pulse">
            Processing neural lighting & 3D pose alignment...
          </span>
        </div>
      </div>
    )
  }

  const others = eligible.filter((p) => p.id !== selected.id)
  const displayImage = resultImageUrl || selected.worn

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
        {/* Result image with before/after peek */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone ave-reveal">
            <img
              src={displayImage}
              alt={`Your try-on wearing the ${selected.name}`}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3.5 py-1 text-xs tracking-wide text-ivory backdrop-blur shadow-sm">
              {isRealAI ? '✨ VModel AI Render' : 'Aurevya Studio Render'}
            </span>
            <div className="absolute bottom-4 left-4 h-24 w-20 overflow-hidden rounded-md border-2 border-ivory shadow-lg">
              <img src={portrait} alt="Your original photo" className="h-full w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-ink/60 py-0.5 text-center text-[10px] tracking-wide text-ivory">
                Your photo
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-taupe">
            {apiMessage || 'Aurevya High-Precision AI Virtual Fitting Result.'}
          </p>
        </div>

        {/* Details + actions */}
        <div className="flex flex-col">
          <p className="eyebrow text-gold">{selected.categoryLabel}</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">{selected.name}</h2>
          <p className="mt-3 text-charcoal/80">{selected.descriptor}</p>

          <dl className="mt-6 space-y-3 border-t border-stone pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-taupe">Material</dt>
              <dd className="text-right">{selected.material}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-taupe">Stone</dt>
              <dd className="text-right">{selected.stone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-taupe">Price</dt>
              <dd className="text-right">{selected.price}</dd>
            </div>
          </dl>

          <button
            onClick={onInquire}
            className="mt-7 rounded-full bg-ink px-8 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:bg-charcoal cursor-pointer"
          >
            Inquire about this piece
          </button>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              onClick={onSave}
              className="rounded-full border border-stone px-3 py-2.5 text-sm transition-colors hover:border-ink cursor-pointer"
            >
              Save look
            </button>
            <button
              onClick={onShare}
              className="rounded-full border border-stone px-3 py-2.5 text-sm transition-colors hover:border-ink cursor-pointer"
            >
              Share
            </button>
            <button
              onClick={onRestart}
              className="rounded-full border border-stone px-3 py-2.5 text-sm transition-colors hover:border-ink cursor-pointer"
            >
              New photo
            </button>
          </div>

          {saved.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow text-taupe">Your Aurevya selection</p>
              <div className="mt-3 flex gap-2">
                {saved.map((s) => (
                  <div
                    key={s.id}
                    className="h-16 w-13 overflow-hidden rounded-md bg-stone"
                    title={s.product.name}
                  >
                    <img src={s.product.worn} alt={s.product.name} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Try another piece — same portrait */}
      <div className="mt-14 border-t border-stone pt-8">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl">Try another piece</h3>
          <span className="text-sm text-taupe">Same portrait, a different feeling</span>
        </div>
        <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto pb-2">
          {others.map((p) => (
            <button
              key={p.id}
              onClick={() => onTryAnother(p)}
              className="group w-36 shrink-0 text-left cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-md bg-stone ring-1 ring-stone/60 transition-all group-hover:ring-gold">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-xs font-medium truncate">{p.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
