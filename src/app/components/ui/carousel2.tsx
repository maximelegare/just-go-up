'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { createPortal } from 'react-dom'

import { cn } from '@app/utilities/cn'
import { Button } from '@app/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  // Prevent Hydration errors with the prerenderer
  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true) // DOM is available
  }, [])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <PrerendererProvider>
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
          {isClient && createPortal(<Prerenderer />, document?.body)}
        </div>
      </CarouselContext.Provider>
    </PrerendererProvider>
  )
})
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    const { containerWidth } = useCarouselPrerenderer()

    return (
      <div ref={carouselRef} className="overflow-hidden " style={{ width: containerWidth }}>
        <div
          ref={ref}
          className={cn(
            'flex gap-4',
            orientation === 'horizontal' ? '' : '-mt-4 flex-col',
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          'min-w-0 shrink-0 grow-0',
          orientation === 'horizontal' ? '' : 'pt-4',
          className,
        )}
        {...props}
      />
    )
  },
)
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute  h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? '-left-12 top-1/2 -translate-y-1/2'
            : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? '-right-12 top-1/2 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = 'CarouselNext'

const Prerenderer = () => {
  const { setCardWidth, setContainerWidth } = useCarouselPrerenderer()

  const cardRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (cardRef && 'current' in cardRef && cardRef.current) {
      const { width } = cardRef.current.getBoundingClientRect()
      setCardWidth(width)
    }
    if (containerRef && 'current' in containerRef && containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      setContainerWidth(width)
    }
  }, [cardRef, containerRef])

  return (
    <div className="relative">
      <div className="absolute w-screen mx-auto z-[100]">
        <div className="container">
          <div
            ref={containerRef}
            className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]"
          >
            <div ref={cardRef} className="h-16 bg-red-400"></div>
            <div className="h-16 bg-blue-500"></div>
            <div className="h-16 bg-green-400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface CardWidthContext {
  setCardWidth: (size: number | null) => void
  cardWidth?: number
  containerWidth: number
  setContainerWidth: (size: number | null) => void
}

const initialContext: CardWidthContext = {
  setCardWidth: () => null,
  cardWidth: undefined,
  containerWidth: undefined,
  setContainerWidth: () => null,
}

const PrerendererContext = React.createContext(initialContext)

const PrerendererProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardWidth, setCardWidthState] = React.useState<number | undefined>(undefined)
  const [containerWidth, setContainerWidth] = React.useState<number | undefined>(undefined)

  const setCardWidth = React.useCallback((cardSizeToSet: number | null) => {
    setCardWidthState(cardSizeToSet)
  }, [])

  return (
    <PrerendererContext.Provider
      value={{ setCardWidth, cardWidth, containerWidth, setContainerWidth }}
    >
      {children}
    </PrerendererContext.Provider>
  )
}

const useCarouselPrerenderer = (): CardWidthContext => React.useContext(PrerendererContext)

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarouselPrerenderer,
}
