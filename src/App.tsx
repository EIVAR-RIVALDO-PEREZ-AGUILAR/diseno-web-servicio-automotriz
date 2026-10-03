import { useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Diagnóstico', href: '#diagnostico' },
  { label: 'Programación', href: '#programacion' },
  { label: 'Ubicación', href: '#ubicacion' },
  //{ label: 'Contacto', href: '#contacto' },
]

const SERVICIOS = [
  {
    imagen: '/images/mantenimiento_general.jpg',
    titulo: 'Mantenimiento General',
    desc: 'Servicios mayores y menores, baleros de rodamiento, masas, banda de accesorios, rectificación de discos y tambores.',
  },
  {
    imagen: '/images/suspension.jpg',
    titulo: 'Suspensión y dirección',
    desc: 'Clutch y frenos, sistema de enfriamiento y anticongelante.',
  },
  {
    imagen: '/images/mecanica_avanzada.jpg',
    titulo: 'Mecánica Avanzada',
    desc: 'Reemplazo de bandas de tiempo y sincronización, servicios de transmisión DSG (VW), transmisiones PowerShift (Ford).',
  },
  {
    imagen: '/images/diagnostico_computarizado1.png',
    titulo: 'Diagnóstico Computarizado',
    desc: 'Sistema de PCM (motor), sistema de frenos ABS, direcciones electrónicas asistidas, módulo BCM (carrocería), frenos electrónicos, sistema de bolsas de aire (airbags), sistema de TPMS (neumáticos), sistema de red CAN bus, sistema de inmovilizadores y controles remotos, sistema de carga computarizada y columnas de dirección electrónicas.',
  },
  {
    imagen: '/images/programacion_ecu1.png',
    titulo: 'Programación ECU',
    desc: 'Módulos TCM, PCM, ABS, BCM, EPS, AIRBAG, TPMS, DSG, PowerShift, IPDM, programación de llaves con chip y llaves de proximidad.',
  },
  {
    icon: '/images/imgTestigos.jpg',
  },
]

const DIAGNOSTICO_ITEMS = [
  {
    label: 'Diagnóstico y programación',
    value: 'Precisión 99.8%',
  },
  {
    label: 'Clonación de módulos',
    value: 'Precisión 99.8%',
  },
  {
    label:
      'Venta de computadoras de motor, módulos ABS, direcciones asistidas, BCM carrocería y sensores.',
    value: '',
  },
  {
    label: 'Sistema eléctrico y Red CAN BUS',
    value: '',
  },
]

const PROGRAMACION_ITEMS = [
  'Reprogramación de ECU / PCM',
  'Actualización de firmware OEM',
  'Codificación de llaves y transponders',
  'Calibración de sensores ADAS',
  'Reseteo de unidades de control',
  'Activación de funciones ocultas',
]

const GALERIA = Array.from({ length: 33 }, (_, index) => {
  const numero = String(index + 1).padStart(2, '0')

  return {
    url: `/images/galeri/galeria${numero}.jpg`,
   // titulo: `Trabajo ${numero}`,
  }
})

export default function App() {
  const [nosotrosVisible, setNosotrosVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isGalleryHovered, setIsGalleryHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [heroScroll, setHeroScroll] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  const galleryRef = useRef<HTMLDivElement | null>(null)
  const dragStartX = useRef(0)
  const dragCurrentX = useRef(0)
  const hasDragged = useRef(false)

  /*
   * ============================================================
   * SCROLL
   * ============================================================
   */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setHeroScroll(window.scrollY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
   * ============================================================
   * NOSOTROS
   * ============================================================
   */

  useEffect(() => {
    const nosotros = document.getElementById('nosotros')

    if (!nosotros) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNosotrosVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
      },
    )

    observer.observe(nosotros)

    return () => observer.disconnect()
  }, [])

  /*
   * ============================================================
   * ACTIVE SECTION
   * ============================================================
   */

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          )

        if (visibleSections.length > 0) {
          setActiveSection(
            visibleSections[0].target.id,
          )
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  /*
   * ============================================================
   * BODY LOCK MOBILE MENU
   * ============================================================
   */

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? 'hidden'
      : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /*
   * ============================================================
   * PRELOAD GALERÍA
   *
   * Esto evita que el carrusel llegue a una imagen todavía
   * descargándose y se vea un cuadro negro.
   * ============================================================
   */

  useEffect(() => {
    GALERIA.forEach((img) => {
      const image = new Image()
      image.src = img.url
    })
  }, [])

  /*
   * ============================================================
   * AUTO PLAY
   *
   * El carrusel nunca se queda detenido.
   * Se pausa mientras el usuario toca/arrastra.
   * ============================================================
   */

  useEffect(() => {
    if (isGalleryHovered || isDragging) return

    const interval = window.setInterval(() => {
      setCurrentImage((prev) => {
        if (prev >= GALERIA.length - 1) {
          return 0
        }

        return prev + 1
      })
    }, 3500)

    return () => {
      window.clearInterval(interval)
    }
  }, [isGalleryHovered, isDragging])

  /*
   * ============================================================
   * NAVEGACIÓN
   * ============================================================
   */

  const scrollToSection = (href: string) => {
    setMenuOpen(false)

    const element = document.querySelector(href)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  /*
   * ============================================================
   * GALERÍA
   * ============================================================
   */

  const moveGallery = (
    direction: 'next' | 'prev',
  ) => {
    setCurrentImage((prev) => {
      if (direction === 'next') {
        return prev >= GALERIA.length - 1
          ? 0
          : prev + 1
      }

      return prev <= 0
        ? GALERIA.length - 1
        : prev - 1
    })
  }

  /*
   * ============================================================
   * TOUCH / MOUSE DRAG
   * ============================================================
   */

  const startDrag = (clientX: number) => {
    dragStartX.current = clientX
    dragCurrentX.current = clientX
    hasDragged.current = false
    setIsDragging(true)
  }

  const updateDrag = (clientX: number) => {
    if (!isDragging) return

    dragCurrentX.current = clientX

    const distance =
      dragCurrentX.current -
      dragStartX.current

    if (Math.abs(distance) > 10) {
      hasDragged.current = true
    }
  }

  const endDrag = () => {
    if (!isDragging) return

    const distance =
      dragCurrentX.current -
      dragStartX.current

    const threshold = 50

    if (Math.abs(distance) >= threshold) {
      if (distance < 0) {
        moveGallery('next')
      } else {
        moveGallery('prev')
      }
    }

    setIsDragging(false)

    window.setTimeout(() => {
      hasDragged.current = false
    }, 50)
  }

  const handleGalleryClick = (
    e: React.MouseEvent,
  ) => {
    if (hasDragged.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  /*
   * ============================================================
   * HERO
   * ============================================================
   */

  const heroTransform = Math.min(
    heroScroll * -0.12,
    90,
  )

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] text-[#f5f5f0]">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20">

          {/* LOGO */}

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })

              setMenuOpen(false)
            }}
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14 lg:h-16 lg:w-16">
              <img
                src="/images/logotipo_taller.jpg"
                alt="Servicio Automotriz Torres"
                className="h-full w-full object-contain"
              />
            </div>

            <span className="font-display hidden min-w-0 text-sm font-800 uppercase tracking-wider text-white sm:block md:text-base lg:text-xl">
              Servicio Automotriz{' '}
              <span className="text-white">
                Torres
              </span>
            </span>
          </a>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-0 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className={`font-display px-3 py-2 text-base font-600 uppercase tracking-widest transition-colors duration-200 xl:px-4 xl:text-base ${
                  activeSection ===
                  item.href.slice(1)
                    ? 'text-[#1d4ed]'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contacto')
              }}
              className="ml-2 bg-[#1d4ed8] px-4 py-2.5 font-display text-base font-700 uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#1e3a8a] xl:ml-4 xl:px-5"
            >
              Agendar Cita
            </a>
          </nav>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            className="flex shrink-0 flex-col gap-1.5 p-2 lg:hidden"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label={
              menuOpen
                ? 'Cerrar menú'
                : 'Abrir menú'
            }
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-200 ${
                menuOpen
                  ? 'translate-y-2 rotate-45'
                  : ''
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-200 ${
                menuOpen
                  ? 'opacity-0'
                  : ''
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-200 ${
                menuOpen
                  ? '-translate-y-2 -rotate-45'
                  : ''
              }`}
            />
          </button>
        </div>

        {/* MOBILE MENU */}

        <div
          className={`overflow-hidden border-t border-[#2a2a2a] bg-[#0f0f0f] transition-all duration-300 lg:hidden ${
            menuOpen
              ? 'max-h-[calc(100vh-4rem)] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto pb-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className={`block border-b border-[#1a1a1a] px-5 py-4 font-display text-sm font-600 uppercase tracking-widest transition-colors sm:px-6 sm:text-base ${
                  activeSection ===
                  item.href.slice(1)
                    ? 'bg-[#141414] text-[#1d4ed]'
                    : 'text-[#a3a3a3] hover:bg-[#141414] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contacto')
              }}
              className="mx-4 mt-4 block bg-[#1d4ed8] px-6 py-4 text-center font-display text-sm font-700 uppercase tracking-widest text-white sm:mx-6 sm:text-base"
            >
              Agendar Cita
            </a>
          </nav>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#050505] sm:min-h-screen">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(/images/heroMain_taller.jpg)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/65 to-[#0a0a0a]/25" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-transparent" />

        <div
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-40 pt-32 sm:px-6 sm:pb-44 sm:pt-40 lg:pb-48"
          style={{
            transform: `translateY(${heroTransform * -1}px)`,
            opacity: Math.max(
              0,
              1 - heroScroll / 700,
            ),
          }}
        >
          <div className="max-w-3xl">

            <p className="hero-fade hero-delay-1 mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-[#737373] sm:mb-6 sm:text-lg sm:tracking-[0.3em]">
              Taller Especializado — Desde 2008
            </p>

            <h1 className="hero-fade hero-delay-2 mb-5 font-display text-5xl font-900 uppercase leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl">
              Excelencia
              <br />
              <span className="text-[#1d4ed8]">
                Automotriz
              </span>
            </h1>

            <p className="hero-fade hero-delay-3 mb-8 max-w-xl font-body text-base leading-relaxed text-[#a3a3a3] sm:mb-10 sm:text-lg">
              Diagnóstico de precisión,
              programación ECU y servicio
              automotriz de alto rendimiento.
              Tu vehículo merece los mejores
              especialistas.
            </p>

            <div className="hero-fade hero-delay-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">

              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#servicios')
                }}
                className="w-full bg-[#1d4ed8] px-6 py-3.5 text-center font-display text-xs font-700 uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#1e3a8a] sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
              >
                Ver Servicios
              </a>

              <a
                href="#diagnostico"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#diagnostico')
                }}
                className="w-full border border-[#f5f5f0]/30 px-6 py-3.5 text-center font-display text-xs font-600 uppercase tracking-widest text-white transition-colors duration-200 hover:border-white sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
              >
                Diagnóstico
              </a>

            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-[#2a2a2a]">
          <div className="mx-auto max-w-7xl px-0 sm:px-6">

            <div className="grid grid-cols-2 divide-x divide-y divide-[#2a2a2a] lg:grid-cols-4 lg:divide-y-0">

              <div className="min-w-0 bg-[#0a0a0a]/85 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-5">
                <p className="truncate font-display text-xl font-800 text-[#1d4ed8] sm:text-3xl">
                  18+
                </p>

                <p className="mt-1 font-body text-[9px] uppercase leading-tight tracking-wider text-[#737373] sm:text-xs">
                  Años de experiencia
                </p>
              </div>

              <div className="min-w-0 bg-[#0a0a0a]/85 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-5">
                <p className="truncate font-display text-xl font-800 text-[#1d4ed8] sm:text-3xl">
                  12k+
                </p>

                <p className="mt-1 font-body text-[9px] uppercase leading-tight tracking-wider text-[#737373] sm:text-xs">
                  Vehículos atendidos
                </p>
              </div>

              <div className="min-w-0 bg-[#0a0a0a]/85 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-5">
                <p className="truncate font-display text-xl font-800 text-[#1d4ed8] sm:text-3xl">
                  98%
                </p>

                <p className="mt-1 font-body text-[9px] uppercase leading-tight tracking-wider text-[#737373] sm:text-xs">
                  Clientes satisfechos
                </p>
              </div>

              {/* REFACCIONARIA TORRES */}

              <div className="min-w-0 bg-[#0a0a0a]/85 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-5">
                <p className="whitespace-nowrap font-display text-[13px] font-800 leading-tight text-[#1d4ed8] sm:text-xl lg:text-lg xl:text-xl">
                  REFACCIONARIA TORRES
                </p>

                <p className="mt-1 font-body text-[9px] uppercase leading-tight tracking-wider text-[#737373] sm:text-xs">
                  Contamos con refacciones automotrices para todas las marcas
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          NOSOTROS
      ========================================================= */}

      <section
        id="nosotros"
        className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div
            className={`min-w-0 transition-all duration-1000 ease-out ${
              nosotrosVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-8 opacity-0 sm:-translate-x-16'
            }`}
          >
            <p className="mb-4 font-display text-sm font-700 uppercase tracking-[0.2em] text-[#1d4ed8] sm:text-lg sm:tracking-[0.3em]">
              Quiénes Somos
            </p>

            <h2 className="mb-6 font-display text-4xl font-800 uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl">
              Más de 18 años
              <br />
              <span className="text-[#737373]">
                en el ramo Automotriz
              </span>
            </h2>

            <p className="mb-5 font-body text-sm leading-relaxed text-[#a3a3a3] sm:text-base">
              Servicio Automotriz Torres nació en
              2008 con una misión clara: ofrecer
              servicio automotriz de calidad
              industrial al alcance de todos.
              Contamos con un equipo de técnicos
              certificados, equipos de diagnóstico
              de última generación y un compromiso
              inquebrantable con la transparencia.
            </p>

            <p className="mb-8 font-body text-sm leading-relaxed text-[#a3a3a3] sm:mb-10 sm:text-base">
              Cada vehículo que ingresa a nuestro
              taller recibe un diagnóstico
              computarizado completo antes de
              cualquier intervención. Creemos que
              un cliente informado es un cliente
              satisfecho.
            </p>
          </div>

          <div
            className={`relative min-w-0 transition-all delay-200 duration-1000 ease-out ${
              nosotrosVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-8 opacity-0 sm:translate-x-16'
            }`}
          >
            <div className="aspect-[8/7] w-full overflow-hidden">
              <img
                src="/images/fachadaTaller.jpg"
                alt="Mecánico trabajando en taller"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-3 bg-[#1d4ed8] px-4 py-3 sm:-bottom-6 sm:left-5 sm:px-6 sm:py-4">
              <p className="font-display text-3xl font-900 text-white sm:text-4xl">
                18+
              </p>

              <p className="font-body text-[10px] uppercase tracking-wider text-white/80 sm:text-xs">
                Años de trayectoria
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SERVICIOS
      ========================================================= */}

      <section
        id="servicios"
        className="scroll-mt-20 border-y border-[#2a2a2a] bg-[#0f0f0f] px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="mb-4 font-display text-lg font-700 uppercase tracking-[0.2em] text-[#1d4ed8] sm:text-lg sm:tracking-[0.3em]">
                Lo que hacemos
              </p>

              <h2 className="font-display text-4xl font-800 uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Nuestros
                <br />
                Servicios
              </h2>
            </div>

            <p className="max-w-md font-body text-sm leading-relaxed text-[#737373] lg:max-w-xs lg:text-right">
              Soluciones integrales para todo tipo
              de vehículo, desde mantenimiento
              rutinario hasta diagnóstico electrónico
              avanzado.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {SERVICIOS.map((s, i) => (
              <div
                key={
                  s.titulo ||
                  `servicio-${i}`
                }
                className="group min-w-0 overflow-hidden bg-[#0a0a0a] transition-colors duration-200 hover:bg-[#141414]"
              >
                {i < 5 ? (
                  <>
                    <div className="h-52 w-full overflow-hidden sm:h-48">
                      <img
                        src={s.imagen}
                        alt={s.titulo}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 sm:p-7 lg:p-8">
                      <h3 className="mb-3 font-display text-xl font-700 uppercase text-white transition-colors group-hover:text-[#1d4ed8] sm:text-2xl">
                        {s.titulo}
                      </h3>

                      <p className="font-body text-sm leading-relaxed text-[#737373]">
                        {s.desc}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="aspect-[4/3] min-h-0 w-full overflow-hidden sm:aspect-auto sm:min-h-[300px] lg:h-full">
                    <img
                      src={s.icon}
                      alt="Servicio Automotriz Torres"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          GALERÍA
      ========================================================= */}

      <section
        id="galeria"
        className="scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="mb-4 font-display text-LG font-700 uppercase tracking-[0.2em] text-[#1d4ed8] sm:text-lg sm:tracking-[0.3em]">
                Nuestro trabajo
              </p>

              <h2 className="font-display text-4xl font-800 uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Galería de
                <br />
                Trabajos
              </h2>
            </div>

            <p className="max-w-md font-body text-sm leading-relaxed text-[#737373] lg:max-w-xs lg:text-right">
              Cada trabajo refleja nuestro estándar
              de calidad. Conoce algunos de nuestros
              trabajos realizados.
            </p>

          </div>

          <div
            ref={galleryRef}
            className="relative select-none touch-pan-y"
            onMouseEnter={() =>
              setIsGalleryHovered(true)
            }
            onMouseLeave={() =>
              setIsGalleryHovered(false)
            }
            onMouseDown={(e) => {
              startDrag(e.clientX)
            }}
            onMouseMove={(e) => {
              updateDrag(e.clientX)
            }}
            onMouseUp={() => {
              endDrag()
            }}
            onMouseCancel={() => {
              endDrag()
            }}
            onTouchStart={(e) => {
              startDrag(
                e.touches[0].clientX,
              )
            }}
            onTouchMove={(e) => {
              updateDrag(
                e.touches[0].clientX,
              )
            }}
            onTouchEnd={() => {
              endDrag()
            }}
            onTouchCancel={() => {
              endDrag()
            }}
            onClick={handleGalleryClick}
          >

            {/* PREVIOUS */}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                moveGallery('prev')
              }}
              className="absolute left-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#2a2a2a] bg-[#0a0a0a]/90 text-white transition-all duration-200 hover:border-[#1d4ed8] hover:bg-[#1d4ed8] sm:left-0 sm:h-12 sm:w-12"
              aria-label="Imagen anterior"
            >
              <span className="text-lg sm:text-xl">
                ←
              </span>
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                moveGallery('next')
              }}
              className="absolute right-1 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#2a2a2a] bg-[#0a0a0a]/90 text-white transition-all duration-200 hover:border-[#1d4ed8] hover:bg-[#1d4ed8] sm:right-0 sm:h-12 sm:w-12"
              aria-label="Imagen siguiente"
            >
              <span className="text-lg sm:text-xl">
                →
              </span>
            </button>

            {/* VIEWPORT */}

            <div className="mx-5 overflow-hidden sm:mx-8">

              <div
                className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 ${
                  isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                }`}
              >

                {GALERIA.map(
                  (img, index) => {
                    /*
                     * Solo mostramos las imágenes
                     * cercanas a currentImage.
                     *
                     * Esto evita mantener 33 imágenes
                     * moviéndose simultáneamente.
                     */

                    const distance =
                      Math.abs(
                        index -
                          currentImage,
                      )

                    const circularDistance =
                      Math.min(
                        distance,
                        GALERIA.length -
                          distance,
                      )

                    const isVisible =
                      circularDistance <= 2

                    if (!isVisible) {
                      return (
                        <div
                          key={img.url}
                          className="hidden"
                        />
                      )
                    }

                    return (
                      <div
                        key={img.url}
                        className={`relative overflow-hidden bg-[#141414] ${
                          index ===
                          currentImage
                            ? 'block'
                            : 'hidden sm:block'
                        }`}
                      >
                        <div className="aspect-[3.5/5] w-full">
                          <img
                            src={img.url}
                            //alt={img.titulo}
                            draggable={false}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                            onError={(
                              e,
                            ) => {
                              /*
                               * Si una imagen no existe,
                               * mostramos un fondo neutro
                               * en lugar de provocar un
                               * espacio negro inesperado.
                               */
                              e.currentTarget.style.opacity =
                                '0'
                            }}
                          />
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/20 to-transparent opacity-80" />

                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                          

                          <h3 className="font-display text-xs font-700 uppercase text-white sm:text-base">
                            {img.titulo}
                          </h3>
                        </div>
                      </div>
                    )
                  },
                )}

              </div>

            </div>

            {/* DOTS */}

            

            

          </div>
        </div>
      </section>

      {/* =========================================================
          DIAGNÓSTICO
      ========================================================= */}

      <section
        id="diagnostico"
        className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div className="relative order-2 min-w-0 lg:order-1">
            <div className="aspect-square w-full overflow-hidden">
              <img
                src="/images/diagnostico.jpg"
                alt="Diagnóstico computarizado de vehículo"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute right-0 top-0 max-w-[145px] border border-[#2a2a2a] bg-[#0a0a0a] p-4 sm:max-w-[200px] sm:p-6">
              <p className="font-display text-3xl font-900 text-[#1d4ed8] sm:text-5xl">
                99.8%
              </p>

              <p className="mt-1 font-body text-[9px] uppercase tracking-wider text-[#737373] sm:text-xs">
                Tasa de detección
              </p>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">

            <p className="mb-4 font-display text-sm font-700 uppercase tracking-[0.2em] text-[#1d4ed8] sm:text-lg sm:tracking-[0.3em]">
              Tecnología avanzada
            </p>

            <h2 className="mb-6 font-display text-4xl font-800 uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl">
              Diagnóstico
              <br />
              <span className="text-[#737373]">
                Computarizado
              </span>
            </h2>

            <p className="mb-8 font-body text-sm leading-relaxed text-[#a3a3a3] sm:mb-10 sm:text-base">
              Utilizamos equipos de última
              generación y plataformas de
              diagnóstico automotriz con
              información y bases de datos
              técnicas.
            </p>

            <div className="divide-y divide-[#2a2a2a] border border-[#2a2a2a]">
              {DIAGNOSTICO_ITEMS.map(
                (item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <span className="min-w-0 font-body text-sm leading-relaxed text-[#a3a3a3]">
                      {item.label}
                    </span>

                    {item.value && (
                      <span className="shrink-0 font-display text-xs font-700 uppercase tracking-wider text-[#1d4ed8] sm:text-sm">
                        {item.value}
                      </span>
                    )}
                  </div>
                ),
              )}
            </div>

            <div className="mt-7 sm:mt-8">
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#contacto')
                }}
                className="inline-block w-full bg-[#1d4ed8] px-6 py-3.5 text-center font-display text-xs font-700 uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#1e3a8a] sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
              >
                Solicitar Diagnóstico
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          PROGRAMACIÓN
      ========================================================= */}

      <section
        id="programacion"
        className="scroll-mt-20 bg-[#1d4ed8] px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            <div className="min-w-0">

              <p className="mb-4 font-display text-sm font-700 uppercase tracking-[0.2em] text-white/60 sm:text-lg sm:tracking-[0.3em]">
                Servicio especializado
              </p>

              <h2 className="mb-6 font-display text-4xl font-800 uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl">
                Programación
                <br />
                ECU &amp; Módulos
              </h2>

              <p className="font-body text-sm leading-relaxed text-white/80 sm:text-base">
                La programación electrónica
                vehicular requiere equipos
                certificados y técnicos con
                formación específica en cada
                fabricante. Nuestro laboratorio
                cuenta con acceso a bases de datos
                OEM oficiales para garantizar la
                calibración correcta de todos los
                módulos de control.
              </p>

            </div>

            <div className="min-w-0">

              <div className="grid gap-px bg-white/20">
                {PROGRAMACION_ITEMS.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 bg-[#1d4ed8] px-4 py-4 transition-colors duration-150 hover:bg-[#1e3a8a] sm:items-center sm:gap-4 sm:px-6 sm:py-5"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-white sm:mt-0" />

                      <span className="font-display text-sm font-600 uppercase leading-snug tracking-wide text-white sm:text-base lg:text-lg">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          UBICACIÓN
      ========================================================= */}

      <section
        id="ubicacion"
        className="scroll-mt-20 border-t border-[#2a2a2a] px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 sm:mb-12">
            <p className="mb-4 font-display text-sm font-700 uppercase tracking-[0.2em] text-[#1d4ed8] sm:text-lg sm:tracking-[0.3em]">
              Encuéntranos
            </p>

            <h2 className="font-display text-4xl font-800 uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Nuestra Ubicación
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            <div className="lg:col-span-2 aspect-video bg-[#141414] border border-[#2a2a2a] overflow-hidden relative">
              <iframe
                title="Mapa ubicación Servicio Automotriz Torres"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.597698965358!2d-92.14352332515307!3d16.24110913481416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858d3f54b3ed28f7%3A0xa1e03c0369d475a1!2sTALLER%20MECANICO%20TORRES!5e0!3m2!1ses-419!2smx!4v1790870859333!5m2!1ses-419!2smx"
                width="600"
                height="450"
                className="h-full w-full grayscale opacity-80"
                style={{
                  border: 0,
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />

              <div className="pointer-events-none absolute inset-0 border border-[#1d4ed8]/20" />
            </div>

            <div className="space-y-4 sm:space-y-6">

              {[
                {
                  label: 'Dirección',
                  value:
                    '8a Calle Sur Pte Num 110\nBarrio Nicalocok, Comitán Chiapas C.P. 30068',
                  
                },
                {
                  label: 'Horario',
                  value:
                    'Lun – Vie: 8:00am – 6:00pm\nSáb: 8:00am – 2:00pm',
                  
                },
                {
                  label: 'Teléfono',
                  value: '+52 (963) 101 4599',
                  
                },
                {
                  label: 'WhatsApp',
                  value: '+52 (963) 252 7630',
                  
                },
              ].map((info) => (
                <div
                  key={info.label}
                  className="border border-[#2a2a2a] bg-[#0f0f0f] p-4 sm:p-5"
                >
                  <div className="mb-2 flex items-center gap-2">

                    <span className="text-sm">
                      {info.icon}
                    </span>

                    <p className="font-display text-[10px] font-700 uppercase tracking-widest text-[#1d4ed8] sm:text-xs">
                      {info.label}
                    </p>

                  </div>

                  <p className="whitespace-pre-line font-body text-sm leading-relaxed text-[#a3a3a3]">
                    {info.value}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACTO
      ========================================================= */}

      <section
        id="contacto"
        className="scroll-mt-20 border-t border-[#2a2a2a] bg-[#0f0f0f] px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            <div className="min-w-0">

              <p className="mb-4 font-display text-sm font-700 uppercase tracking-[0.2em] text-[#1d4ed8] sm:text-lg sm:tracking-[0.3em]">
                Escríbenos
              </p>

              <h2 className="mb-6 font-display text-4xl font-800 uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl">
                Agenda tu
                <br />
                <span className="text-[#737373]">
                  Cita
                </span>
              </h2>

              <p className="mb-8 max-w-sm font-body text-sm leading-relaxed text-[#737373] sm:text-base">
                Completa el formulario y un asesor
                técnico se comunicará contigo en
                menos de 24 horas para confirmar tu
                cita y orientarte sobre el servicio
                que necesitas.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                <a
                  href="https://www.facebook.com/joseantonio.torresdelavega"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#2a2a2a] px-4 py-3 transition-all duration-200 hover:border-[#1d4ed8]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#1d4ed8"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>

                  <span className="font-display text-xs font-700 uppercase tracking-widest text-[#737373]">
                    Facebook
                  </span>
                </a>

                <a
                  href="mailto:tallertorres@gmail.com"
                  className="flex items-center gap-3 border border-[#2a2a2a] px-4 py-3 transition-all duration-200 hover:border-[#1d4ed8]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="20"
                      height="16"
                      x="2"
                      y="4"
                      rx="2"
                    />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>

                  <span className="font-display text-xs font-700 uppercase tracking-widest text-[#737373]">
                    Correo
                  </span>
                </a>

                <a
                  href="https://wa.me/529632527630?text=Hola%2C%20quiero%20agendar%20una%20cita%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#2a2a2a] px-4 py-3 transition-all duration-200 hover:border-[#25D366]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.4 8.4 0 0 1-9 9 8.4 8.4 0 0 1-4-.9L3 21l1.4-4.7a8.4 8.4 0 1 1 16.6-4.8Z" />
                    <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c.7 1.3 1.7 2.3 3 3l.6-.5c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.3-1 .4-1.5.2-1.4-.4-2.7-1.2-3.8-2.3-1.1-1.1-1.9-2.4-2.3-3.8-.2-.5-.1-1.1.1-1.5Z" />
                  </svg>

                  <span className="font-display text-xs font-700 uppercase tracking-widest text-[#737373]">
                    WhatsApp
                  </span>
                </a>

              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a]">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

          <div className="flex items-center justify-center gap-3 lg:justify-start">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
              <img
                src="/images/logotipo_taller.jpg"
                alt="Servicio Automotriz Torres"
                className="h-full w-full object-contain"
              />
            </div>

            <span className="font-display text-sm font-700 uppercase tracking-wider text-white sm:text-base">
              Servicio Automotriz{' '}
              <span className="text-[#1d4ed8]">
                Torres
              </span>
            </span>

          </div>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-x-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="font-body text-[10px] uppercase tracking-wider text-[#737373] transition-colors hover:text-[#1d4ed8] sm:text-xs"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-center gap-3">

            <a
              href="https://www.facebook.com/joseantonio.torresdelavega"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center border border-[#2a2a2a] text-[#737373] transition-all duration-200 hover:border-[#1d4ed8] hover:bg-[#1d4ed8] hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            <a
              href="mailto:tallertorres@gmail.com"
              aria-label="Correo electrónico"
              className="flex h-9 w-9 items-center justify-center border border-[#2a2a2a] text-[#737373] transition-all duration-200 hover:border-[#1d4ed8] hover:bg-[#1d4ed8] hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  width="20"
                  height="16"
                  x="2"
                  y="4"
                  rx="2"
                />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

          </div>

          <p className="text-center font-body text-[10px] text-[#404040] lg:text-right">
            © 2026 Servicio Automotriz Torres.
            Todos los derechos reservados.
          </p>

        </div>
      </footer>

    </div>
  )
}

/* =============================================================
   CONTACT FORM
============================================================= */

function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  })

  const [sent, setSent] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    const mensaje = `
Nueva solicitud de cita

Nombre: ${form.nombre}
Teléfono: ${form.telefono}
Correo: ${form.email}
Servicio: ${
      form.servicio ||
      'No especificado'
    }

Mensaje:
${form.mensaje || 'Sin mensaje'}
    `.trim()

    const numeroWhatsApp =
      '529632527630'

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensaje,
    )}`

    window.open(
      url,
      '_blank',
      'noopener,noreferrer',
    )

    setSent(true)
  }

  const resetForm = () => {
    setSent(false)

    setForm({
      nombre: '',
      email: '',
      telefono: '',
      servicio: '',
      mensaje: '',
    })
  }

  if (sent) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 border border-[#1d4ed8] p-6 text-center sm:min-h-[400px] sm:p-10">

        <div className="flex h-14 w-14 items-center justify-center bg-[#1d4ed8] text-2xl text-white">
          ✓
        </div>

        <h3 className="font-display text-2xl font-800 uppercase text-white sm:text-3xl">
          ¡Mensaje Enviado!
        </h3>

        <p className="max-w-xs font-body text-sm text-[#737373]">
          Te contactaremos en menos de 24
          horas para confirmar tu cita.
        </p>

        <button
          type="button"
          onClick={resetForm}
          className="mt-4 border border-[#2a2a2a] px-5 py-3 font-display text-xs font-700 uppercase tracking-widest text-[#737373] transition-colors hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
        >
          Enviar otro mensaje
        </button>

      </div>
    )
  }

  const inputClass =
    'w-full min-w-0 bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#1d4ed8] text-[#f5f5f0] font-body text-sm px-4 py-3 outline-none transition-colors placeholder:text-[#404040]'

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 space-y-4"
    >

      {/* NOMBRE + TELÉFONO */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div className="min-w-0">
          <label
            htmlFor="nombre"
            className="mb-2 block font-display text-[10px] font-700 uppercase tracking-widest text-[#737373] sm:text-xs"
          >
            Nombre
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            placeholder="Juan Pérez"
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="telefono"
            className="mb-2 block font-display text-[10px] font-700 uppercase tracking-widest text-[#737373] sm:text-xs"
          >
            Teléfono
          </label>

          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+52 963 000 0000"
            autoComplete="tel"
            className={inputClass}
          />
        </div>

      </div>

      {/* EMAIL */}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-display text-[10px] font-700 uppercase tracking-widest text-[#737373] sm:text-xs"
        >
          Correo electrónico
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          className={inputClass}
        />
      </div>

      {/* SERVICIO */}

      <div>
        <label
          htmlFor="servicio"
          className="mb-2 block font-display text-[10px] font-700 uppercase tracking-widest text-[#737373] sm:text-xs"
        >
          Servicio requerido
        </label>

        <select
          id="servicio"
          name="servicio"
          value={form.servicio}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">
            Selecciona un servicio...
          </option>

          <option value="Mantenimiento General">
            Mantenimiento General
          </option>

          <option value="Suspensión y dirección">
            Suspensión y dirección
          </option>

          <option value="Mecánica Avanzada">
            Mecánica Avanzada
          </option>

          <option value="Diagnóstico Computarizado">
            Diagnóstico Computarizado
          </option>

          <option value="Programación ECU">
            Programación ECU
          </option>

          <option value="Otro">
            Otro
          </option>
        </select>
      </div>

      {/* MENSAJE */}

      <div>
        <label
          htmlFor="mensaje"
          className="mb-2 block font-display text-[10px] font-700 uppercase tracking-widest text-[#737373] sm:text-xs"
        >
          Mensaje
        </label>

        <textarea
          id="mensaje"
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          rows={5}
          placeholder="Describe el problema o el servicio que necesitas..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        className="w-full bg-[#1d4ed8] px-6 py-4 font-display text-xs font-700 uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#1e3a8a] sm:text-sm"
      >
        Enviar Solicitud
      </button>

    </form>
  )
}
