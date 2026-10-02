import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Diagnóstico', href: '#diagnostico' },
  { label: 'Programación', href: '#programacion' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
]

const SERVICIOS = [
  {
    imagen: '/images/mantenimiento.jpg',
    titulo: 'Mantenimiento General',
    desc: 'Servicios mayores y menores, baleros de rodamiento, masas, banda de accesorios, rectificación de discos y tambores.',
  },
  {
    imagen: '/images/suspension.jpg',
    titulo: 'Suspensión y dirección',
    desc: 'Clutch y frenos, sistema de enfriamiento y anticongelante.',
  },
  {
    imagen: '/images/mecanica.jpg',
    titulo: 'Mecánica Avanzada',
    desc: 'Reemplazo de bandas de tiempo y sincronización, servicios de transmisión DSG (VW), transmisiones PowerShift (Ford).',
  },
  {
    imagen: '/images/diagnostico_computarizado1.png',
    titulo: 'Diagnóstico Computarizado',
    desc: 'Sistema de PCM (motor), sistema de frenos ABS, direcciones electrónicas asistidas, módulo BCM (carrocería), frenos electrónicos, sistema de bolsas de aire (airbags), sistema de TPMS (neumáticos), sistema de red CAN bus, sistema de inmovilizadores y controles remotos, sistema de carga computarizada, columnas de dirección electrónicas.',
  },
  {
    imagen: '/images/programacion_ecu1.png',
    titulo: 'Programación ECU',
    desc: 'Módulos TCM, PCM, ABS, BCM, EPS, AIRBAG, TPMS, DSG, PowerShift, IPDM, programación llaves con chip, llaves proximidad.',
  },

  // Esta sexta tarjeta la dejamos como está
  {
    icon: '/images/imgTestigos.jpg',
  },
]


const GALERI = [
  {
    url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=1100&fit=crop&auto=format',
    alt: 'Mecánico trabajando en motor',
    titulo: 'Reparación de Motor',
    span: 'tall',
  },
  
  {
    url: 'https://images.unsplash.com/photo-1767339736247-582fcf11442b?w=800&h=500&fit=crop&auto=format',
    alt: 'Trabajo en piezas de motor',
    titulo: 'Mecánica de Precisión',
    span: 'wide',
  },
  {
    url: 'https://images.unsplash.com/photo-1723099971299-3789db53604c?w=600&h=700&fit=crop&auto=format',
    alt: 'Vehículo en rampa de elevación',
    titulo: 'Diagnóstico en Rampa',
    span: 'normal',
  },
  {
    url: 'https://images.unsplash.com/photo-1767339736233-f4b02c41ee4a?w=800&h=500&fit=crop&auto=format',
    alt: 'Piezas de motor en taller',
    titulo: 'Revisión de Componentes',
    span: 'wide',
  },
  {
    url: 'https://images.unsplash.com/photo-1702146713870-8cdd7ab983fb?w=600&h=700&fit=crop&auto=format',
    alt: 'Repuestos y piezas metálicas',
    titulo: 'Repuestos de Calidad',
    span: 'normal',
  },
  {
    url: 'https://images.unsplash.com/photo-1767339736277-980a7d7d1fe5?w=800&h=500&fit=crop&auto=format',
    alt: 'Técnico en trabajo de motor',
    titulo: 'Servicio Especializado',
    span: 'wide',
  },
]

const DIAGNOSTICO_ITEMS = [
  { label: 'Lectura de códigos OBD-II', value: 'Precisión 99.8%' },
  { label: 'Análisis de sensores en tiempo real', value: '256 parámetros' },
  { label: 'Diagnóstico eléctrico multicanal', value: '12V — 48V' },
  { label: 'Tiempo promedio de diagnóstico', value: '45 minutos' },
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
    
    
  }
})


export default function App() {
  const [nosotrosVisible, setNosotrosVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
const [currentImage, setCurrentImage] = useState(0)
const [isGalleryHovered, setIsGalleryHovered] = useState(false)

  const [heroScroll, setHeroScroll] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [lightbox, setLightbox] = useState<null | typeof GALERIA[0]>(null)

 // useEffect(() => {
  //  const onScroll = () => setScrolled(window.scrollY > 40)
  //  window.addEventListener('scroll', onScroll)
   // return () => window.removeEventListener('scroll', onScroll)
  //}, [])
  useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 40)
    setHeroScroll(window.scrollY)
  }

  window.addEventListener('scroll', onScroll)

  return () => window.removeEventListener('scroll', onScroll)
}, [])

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
      threshold: 0.2,
    }
  )

  observer.observe(nosotros)

  return () => observer.disconnect()
}, [])


  useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 40)
    setHeroScroll(window.scrollY)
  }

  window.addEventListener('scroll', onScroll)

  return () => window.removeEventListener('scroll', onScroll)
}, [])


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.35 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

useEffect(() => {
  if (isGalleryHovered) return

  const interval = setInterval(() => {
    setCurrentImage((prev) => {
      if (prev >= GALERIA.length - 5) {
        return 0
      }

      return prev + 1
    })
  }, 3000)

  return () => clearInterval(interval)
}, [isGalleryHovered])



  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-20 h-20 flex items-center justify-center">
               <img
    src="/images/logotipo_taller.jpg"
    alt="Servicio Automotriz Torres"
    className="w-full h-full object-contain"
  />
            </div>
            <span className="font-display text-xl font-800 tracking-wider uppercase text-white">
              Servicio Automotriz <span className="text-white">Torres</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-display text-base font-600 uppercase tracking-widest px-4 py-2 transition-colors duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#1d4ed]'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="ml-4 bg-[#1d4ed8] hover:bg-[#1e3a8a] text-white font-display text-sm font-700 uppercase tracking-widest px-5 py-2.5 transition-colors duration-200"
            >
              Agendar Cita
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0f0f0f] border-t border-[#2a2a2a]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block font-display text-base font-600 uppercase tracking-widest px-6 py-4 text-[#a3a3a3] hover:text-white hover:bg-[#141414] border-b border-[#1a1a1a] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#1d4ed8] text-white font-display text-base font-700 uppercase tracking-widest px-6 py-4 text-center"
            >
              Agendar Cita
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-[#050505]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(/images/heroMain_taller.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />

        <div
  className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full"
  style={{
    transform: `translateY(${heroScroll * -0.25}px)`,
    opacity: Math.max(0, 1 - heroScroll / 500),
  }}
>

          <div className="max-w-3xl">
           <p className="hero-fade hero-delay-1 font-display text-[#737373] text-lg font-bold uppercase tracking-[0.3em] mb-6">
  Taller Especializado — Desde 2008
</p>

            <h1 className="hero-fade hero-delay-2 font-display font-900 text-7xl md:text-9xl leading-none uppercase text-white mb-6">
  Excelencia<br />
  <span className="text-[#1d4ed8]">Automotriz</span>
</h1>

            <p className="hero-fade hero-delay-3 font-body text-[#a3a3a3] text-lg max-w-xl leading-relaxed mb-10">
  Diagnóstico de precisión, programación ECU y servicio automotriz de alto rendimiento.
  Tu vehículo merece los mejores especialistas.
</p>

            <div className="hero-fade hero-delay-4 flex flex-wrap gap-4">

              <a
                href="#servicios"
                className="bg-[#1d4ed8] hover:bg-[#1e3a8a] text-white font-display text-sm font-700 uppercase tracking-widest px-8 py-4 transition-colors duration-200"
              >
                Ver Servicios
              </a>
              <a
                href="#diagnostico"
                className="border border-[#f5f5f0]/30 hover:border-white text-white font-display text-sm font-600 uppercase tracking-widest px-8 py-4 transition-colors duration-200"
              >
                Diagnóstico
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 right-0 left-0 z-10 border-t border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#2a2a2a]">
              {[
                { num: '18+', label: 'Años de experiencia' },
                { num: '12k+', label: 'Vehículos atendidos' },
                { num: '98%', label: 'Clientes satisfechos' },
                { num: '24h', label: 'Respuesta garantizada' },
              ].map((s) => (
                <div key={s.label} className="px-6 py-5 bg-[#0a0a0a]/80 backdrop-blur-sm">
                  <p className="font-display text-3xl font-800 text-[#1d4ed8]">{s.num}</p>
                  <p className="font-body text-xs text-[#737373] uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
  className={`transition-all duration-1000 ease-out ${
    nosotrosVisible
      ? 'opacity-100 translate-x-0'
      : 'opacity-0 -translate-x-16'
  }`}
>

            <p className="font-display text-[#1d4ed8] text-lg font-700 uppercase tracking-[0.3em] mb-4">
              Quiénes Somos
            </p>
            <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white mb-8">
              Más de 18 años<br />
              <span className="text-[#737373]">en el ramo Automotriz</span>
            </h2>
            <p className="font-body text-[#a3a3a3] text-base leading-relaxed mb-6">
              Servicio Automotriz Torres nació en 2008 con una misión clara: ofrecer servicio automotriz de calidad industrial
              al alcance de todos. Contamos con un equipo de técnicos certificados , equipos de diagnóstico
              de última generación y un compromiso inquebrantable con la transparencia.
            </p>
            <p className="font-body text-[#a3a3a3] text-base leading-relaxed mb-10">
              Cada vehículo que ingresa a nuestro taller recibe un diagnóstico computarizado completo antes
              de cualquier intervención. Creemos que un cliente informado es un cliente satisfecho.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-[#1d4ed8] font-display font-800">{b.icon}</span>
                  <span className="font-body text-sm text-[#f5f5f0]">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div
  className={`relative transition-all duration-1000 ease-out delay-200 ${
    nosotrosVisible
      ? 'opacity-100 translate-x-0'
      : 'opacity-0 translate-x-16'
  }`}
>

            <div className="aspect-[8/7] overflow-hidden">
              <img
                src="/images/fachadaTaller.jpg"
                alt="Mecánico trabajando en taller"
                className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1d4ed8] px-6 py-4">
              <p className="font-display text-4xl font-900 text-white">18+</p>
              <p className="font-body text-xs text-white/80 uppercase tracking-wider">Años de trayectoria</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-28 bg-[#0f0f0f] border-t border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <p className="font-display text-[#1d4ed8] text-lg font-700 uppercase tracking-[0.3em] mb-4">
                Lo que hacemos
              </p>
              <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white">
                Nuestros<br />Servicios
              </h2>
            </div>
            <p className="font-body text-[#737373] text-sm max-w-xs leading-relaxed lg:text-right">
              Soluciones integrales para todo tipo de vehículo, desde mantenimiento rutinario hasta diagnóstico electrónico avanzado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">


     {SERVICIOS.map((s, i) => (
  <div
    key={s.titulo || i}
    className="bg-[#0f0f0f] group hover:bg-[#141414] transition-colors duration-200 cursor-default"
  >

    {i < 5 ? (
      <>
        {/* IMAGEN TARJETAS 1-5 */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={s.imagen}
            alt={s.titulo}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* CONTENIDO TARJETAS 1-5 */}
        <div className="p-8">
          <h3 className="font-display text-2xl font-700 uppercase text-white mb-4 group-hover:text-[#1d4ed8] transition-colors">
            {s.titulo}
          </h3>

          <p className="font-body text-sm text-[#737373] leading-relaxed">
            {s.desc}
          </p>
        </div>
      </>
    ) : (

      /* TARJETA 6 - IMAGEN COMPLETA */
      <div className="w-full h-full min-h-[300px] overflow-hidden">
        <img
          src={s.icon}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

    )}

  </div>
))}





          </div>
        </div>
      </section>

{/* new GALERÍA */}
{/* GALERÍA */}
<section
  id="galeria"
  className="py-28 max-w-7xl mx-auto px-6 overflow-hidden"
>
  {/* ENCABEZADO */}
  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
    <div>
      <p className="font-display text-[#1d4ed8] text-lg font-700 uppercase tracking-[0.3em] mb-4">
        Nuestro trabajo
      </p>

      <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white">
        Galería de
        <br />
        Trabajos
      </h2>
    </div>

    <p className="font-body text-[#737373] text-sm max-w-xs leading-relaxed lg:text-right">
      Cada trabajo refleja nuestro estándar de calidad. Conoce algunos de
      nuestros trabajos realizados.
    </p>
  </div>

  {/* CARRUSEL */}
  <div
    className="relative"
    onMouseEnter={() => setIsGalleryHovered(true)}
    onMouseLeave={() => setIsGalleryHovered(false)}
  >

    {/* BOTÓN IZQUIERDO */}
    <button
      type="button"
      onClick={() => {
        setCurrentImage((prev) =>
          prev === 0
            ? GALERIA.length - 5
            : prev - 1
        )
      }}
      className="
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        z-20
        w-11
        h-11
        md:w-12
        md:h-12
        bg-[#0a0a0a]/90
        border
        border-[#2a2a2a]
        hover:bg-[#1d4ed8]
        hover:border-[#1d4ed8]
        text-white
        flex
        items-center
        justify-center
        transition-all
        duration-200
      "
      aria-label="Imagen anterior"
    >
      <span className="text-xl">←</span>
    </button>

    {/* BOTÓN DERECHO */}
    <button
      type="button"
      onClick={() => {
        setCurrentImage((prev) =>
          prev >= GALERIA.length - 5
            ? 0
            : prev + 1
        )
      }}
      className="
        absolute
        right-0
        top-1/2
        -translate-y-1/2
        z-20
        w-11
        h-11
        md:w-12
        md:h-12
        bg-[#0a0a0a]/90
        border
        border-[#2a2a2a]
        hover:bg-[#1d4ed8]
        hover:border-[#1d4ed8]
        text-white
        flex
        items-center
        justify-center
        transition-all
        duration-200
      "
      aria-label="Imagen siguiente"
    >
      <span className="text-xl">→</span>
    </button>

    {/* VENTANA DEL CARRUSEL */}
    <div className="overflow-hidden mx-6 md:mx-8">

      {/* PISTA DEL CARRUSEL */}
      <div
        className="
          flex
          gap-3
          md:gap-4
          transition-transform
          duration-700
          ease-out
        "
        style={{
          transform: `translateX(-${
            currentImage *
            (
              window.innerWidth >= 1024
                ? 20
                : window.innerWidth >= 640
                ? 50
                : 100
            )
          }%)`,
        }}
      >

        {GALERIA.map((img, index) => (
          <div
            key={img.url}
            className="
              relative
              flex-shrink-0

              w-full
              sm:w-[calc(50%-0.375rem)]
              lg:w-[calc(20%-0.8rem)]

              aspect-[4/5]

              overflow-hidden
              bg-[#141414]

              group
            "
          >

            {/* IMAGEN */}
            <img
              src={img.url}
              alt={img.alt}
              loading={index < 5 ? 'eager' : 'lazy'}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />

            {/* DEGRADADO */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#0a0a0a]/95
                via-[#0a0a0a]/20
                to-transparent
                opacity-80
                group-hover:opacity-100
                transition-opacity
                duration-300
              "
            />

         
            {/* INFORMACIÓN */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-5
                translate-y-2
                group-hover:translate-y-0
                transition-transform
                duration-300
              "
            >
              <p
                className="
                  font-display
                  text-[10px]
                  font-700
                  uppercase
                  tracking-widest
                  text-[#1d4ed8]
                  mb-1
                "
              >
                Servicio Automotriz Torres
              </p>

              <h3
                className="
                  font-display
                  text-sm
                  md:text-base
                  font-700
                  uppercase
                  text-white
                "
              >
                {img.titulo}
              </h3>
            </div>

          </div>
        ))}

      </div>
    </div>

    {/* CONTADOR */}
    <div className="flex items-center justify-center gap-4 mt-8">

      <span
        className="
          font-display
          text-xs
          font-700
          text-[#1d4ed8]
          tracking-widest
        "
      >
        
      </span>

    </div>

  </div>
</section>

{/* GALERÍA */}




      {/* GALERÍA 
      <section id="galeria" className="py-28 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-display text-[#1d4ed8] text-sm font-700 uppercase tracking-[0.3em] mb-4">
              Nuestro trabajo
            </p>
            <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white">
              Galería de<br />Trabajos
            </h2>
          </div>
          <p className="font-body text-[#737373] text-sm max-w-xs leading-relaxed lg:text-right">
            Cada trabajo refleja nuestro estándar de calidad. Haz clic en cualquier imagen para ampliarla.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
          {GALERIA.map((img) => (
            <button
              key={img.url}
              onClick={() => setLightbox(img)}
              className={`relative overflow-hidden group bg-[#141414] text-left ${
                img.span === 'tall' ? 'row-span-2 aspect-[3/4]' : img.span === 'wide' ? 'col-span-2 lg:col-span-1 aspect-[4/3]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/60 transition-all duration-300 flex items-end">
                <div className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-display text-xs font-700 uppercase tracking-widest text-[#1d4ed8] mb-1">Ver imagen</p>
                  <p className="font-display text-xl font-700 uppercase text-white">{img.titulo}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
*/}
      {/* LIGHTBOX */}
      {/*{lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 border border-[#2a2a2a] hover:border-[#1d4ed8] text-[#737373] hover:text-white flex items-center justify-center text-xl transition-colors"
            aria-label="Cerrar"
          >
            ✕
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.url && (
              <img
                src={lightbox.url.replace(/w=\d+&h=\d+/, 'w=1400&h=900')}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-contain"
              />
            )}
            <div className="mt-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#1d4ed8] flex-shrink-0" />
              <p className="font-display text-lg font-700 uppercase text-white tracking-wider">{lightbox.titulo}</p>
            </div>
          </div>
        </div>
      )}
*/}
      {/* DIAGNÓSTICO */}
      <section id="diagnostico" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square overflow-hidden">
              <img
                src="/images/diagnostico.jpg"
                alt="Diagnóstico computarizado de vehículo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 right-0 bg-[#0a0a0a] border border-[#2a2a2a] p-6 max-w-[200px]">
              <p className="font-display text-5xl font-900 text-[#1d4ed8]">99.8%</p>
              <p className="font-body text-xs text-[#737373] uppercase tracking-wider mt-1">Tasa de detección</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-display text-[#1d4ed8] text-lg font-700 uppercase tracking-[0.3em] mb-4">
              Tecnología avanzada
            </p>
            <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white mb-8">
              Diagnóstico<br />
              <span className="text-[#737373]">Computarizado</span>
            </h2>
            <p className="font-body text-[#a3a3a3] text-base leading-relaxed mb-10">
              Utilizamos escáneres OBD-II de última generación compatibles con más de 10,000 modelos de vehículos.
              Nuestro software detecta fallas en motor, transmisión, ABS, airbags y todos los sistemas electrónicos
              en tiempo real, con una precisión del 99.8%.
            </p>
            <div className="space-y-0 divide-y divide-[#2a2a2a] border border-[#2a2a2a]">
              {DIAGNOSTICO_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-5 py-4">
                  <span className="font-body text-sm text-[#a3a3a3]">{item.label}</span>
                  <span className="font-display text-sm font-700 text-[#1d4ed8] uppercase tracking-wider">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="#contacto"
                className="inline-block bg-[#1d4ed8] hover:bg-[#1e3a8a] text-white font-display text-sm font-700 uppercase tracking-widest px-8 py-4 transition-colors duration-200"
              >
                Solicitar Diagnóstico
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMACIÓN */}
      <section id="programacion" className="py-28 bg-[#1d4ed8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-display text-white/60 text-lg font-700 uppercase tracking-[0.3em] mb-4">
                Servicio especializado
              </p>
              <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white mb-8">
                Programación<br />ECU &amp; Módulos
              </h2>
              <p className="font-body text-white/80 text-base leading-relaxed">
                La programación electrónica vehicular requiere equipos certificados y técnicos con formación
                específica en cada fabricante. Nuestro laboratorio cuenta con acceso a bases de datos OEM
                oficiales para garantizar la calibración correcta de todos los módulos de control.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-px bg-white/20">
                {PROGRAMACION_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="bg-[#1d4ed8] hover:bg-[#1e3a8a] px-6 py-5 flex items-center gap-4 transition-colors duration-150 cursor-default group"
                  >
                    <span className="w-2 h-2 bg-white group-hover:bg-[#0a0a0a] transition-colors flex-shrink-0" />
                    <span className="font-display text-lg font-600 uppercase text-white tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section id="ubicacion" className="py-28 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="font-display text-[#1d4ed8] text-lg font-700 uppercase tracking-[0.3em] mb-4">
              Encuéntranos
            </p>
            <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white">
              Nuestra Ubicación
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 aspect-video bg-[#141414] border border-[#2a2a2a] overflow-hidden relative">
              <iframe
                title="Mapa ubicación AutoTechPro"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.597698965358!2d-92.14352332515307!3d16.24110913481416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858d3f54b3ed28f7%3A0xa1e03c0369d475a1!2sTALLER%20MECANICO%20TORRES!5e0!3m2!1ses-419!2smx!4v1790870859333!5m2!1ses-419!2smx"
                width="600"
                height="450"
                className="w-full h-full grayscale opacity-80"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>

              <div className="absolute inset-0 pointer-events-none border border-[#1d4ed8]/20" />
            </div>
            <div className="space-y-6">
              {[
                {
                  label: 'Dirección',
                  value: '8a Calle Sur Pte Num 110\n Barrio Nicalocok, Comitan Chiapas C.P 30068',
                  icon: '📍',
                },
                {
                  label: 'Horario',
                  value: 'Lun – Vie: 8:00am – 6:00pm\nSáb: 8:00am – 2:00pm',
                  icon: '🕐',
                },
                {
                  label: 'Teléfono',
                  value: '+52 (963)1014599',
                  icon: '📞',
                },
                {
                  label: 'WhatsApp',
                  value: '+52 (963)2527630',
                  icon: '💬',
                },
              ].map((info) => (
                <div key={info.label} className="border border-[#2a2a2a] p-5 bg-[#0f0f0f]">
                  <p className="font-display text-xs font-700 uppercase tracking-widest text-[#1d4ed8] mb-2">
                    {info.label}
                  </p>
                  <p className="font-body text-sm text-[#a3a3a3] whitespace-pre-line leading-relaxed">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-28 bg-[#0f0f0f] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="font-display text-[#1d4ed8] text-lg font-700 uppercase tracking-[0.3em] mb-4">
                Escríbenos
              </p>
              <h2 className="font-display font-800 text-6xl md:text-7xl uppercase leading-none text-white mb-8">
                Agenda tu<br />
                <span className="text-[#737373]">Cita</span>
              </h2>
              <p className="font-body text-[#737373] text-base leading-relaxed max-w-sm mb-8">
                Completa el formulario y un asesor técnico se comunicará contigo en menos de 24 horas para
                confirmar tu cita y orientarte sobre el servicio que necesitas.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/joseantonio.torresdelavega"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#2a2a2a] hover:border-[#1d4ed8] px-4 py-3 group transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d4ed8">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="font-display text-xs font-700 uppercase tracking-widest text-[#737373] group-hover:text-white transition-colors">Facebook</span>
                </a>
                <a
                  href="mailto:tallertorres@gmail.com"
                  className="flex items-center gap-3 border border-[#2a2a2a] hover:border-[#1d4ed8] px-4 py-3 group transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="font-display text-xs font-700 uppercase tracking-widest text-[#737373] group-hover:text-white transition-colors">Correo</span>
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20  flex items-center justify-center">
              <img
    src="/images/logotipo_taller.jpg"
    alt="Servicio Automotriz Torres"
    className="w-full h-full object-contain"
  />
             { /**/ 
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M2 14L4 8h12l2 6H2z" fill="white" />
                <circle cx="5.5" cy="15.5" r="1.5" fill="white" />
                <circle cx="14.5" cy="15.5" r="1.5" fill="white" />
                <path d="M6 8V5h8v3" stroke="white" strokeWidth="1.5" />
              </svg>
              }
            </div>
            <span className="font-display text-base font-700 uppercase tracking-wider text-white">
              Servicio Automotriz <span className="text-[#1d4ed]">Torres</span>
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-body text-xs text-[#737373] hover:text-[#1d4ed8] uppercase tracking-wider transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/joseantonio.torresdelavega"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 border border-[#2a2a2a] hover:border-[#1d4ed8] hover:bg-[#1d4ed8] flex items-center justify-center text-[#737373] hover:text-white transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="mailto:tallertorres@gmail.com"
              aria-label="Correo electrónico"
              className="w-9 h-9 border border-[#2a2a2a] hover:border-[#1d4ed8] hover:bg-[#1d4ed8] flex items-center justify-center text-[#737373] hover:text-white transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
          <p className="font-body text-xs text-[#404040]">
            © 2026 Servicio Automotriz Torres. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 // const handleSubmit = (e: React.FormEvent) => {
 //   e.preventDefault()
 //   setSent(true)
 // }
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const mensaje = `
Nueva solicitud de cita

Nombre: ${form.nombre}
Teléfono: ${form.telefono}
Correo: ${form.email}
Servicio: ${form.servicio || 'No especificado'}

Mensaje:
${form.mensaje || 'Sin mensaje'}
  `.trim()

  const numeroWhatsApp = '529631828511'

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`

  window.open(url, '_blank')

  setSent(true)
}


  if (sent) {
    return (
      <div className="border border-[#1d4ed8] p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
        <div className="w-14 h-14 bg-[#1d4ed8] flex items-center justify-center text-2xl">✓</div>
        <h3 className="font-display text-3xl font-800 uppercase text-white">¡Mensaje Enviado!</h3>
        <p className="font-body text-[#737373] text-sm max-w-xs">
          Te contactaremos en menos de 24 horas para confirmar tu cita.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' }) }}
          className="mt-4 border border-[#2a2a2a] hover:border-[#1d4ed8] text-[#737373] hover:text-[#1d4ed8] font-display text-xs font-700 uppercase tracking-widest px-6 py-3 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#1d4ed8] text-[#f5f5f0] font-body text-sm px-4 py-3 outline-none transition-colors placeholder:text-[#404040]'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-display text-xs font-700 uppercase tracking-widest text-[#737373] mb-2">Nombre</label>
          <input name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Juan Pérez" className={inputClass} />
        </div>
        <div>
          <label className="block font-display text-xs font-700 uppercase tracking-widest text-[#737373] mb-2">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="+57 300 000 0000" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block font-display text-xs font-700 uppercase tracking-widest text-[#737373] mb-2">Correo electrónico</label>
        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" className={inputClass} />
      </div>
      <div>
        <label className="block font-display text-xs font-700 uppercase tracking-widest text-[#737373] mb-2">Servicio requerido</label>
        <select name="servicio" value={form.servicio} onChange={handleChange} className={inputClass + ' cursor-pointer'}>
          <option value="" disabled selected>Selecciona un servicio...</option>
          <option>Mantenimiento General</option>
          <option>Mecánica Avanzada</option>
          <option>Diagnóstico Computarizado</option>
          <option>Programación ECU</option>
          <option>Otro</option>
        </select>
      </div>
      <div>
        <label className="block font-display text-xs font-700 uppercase tracking-widest text-[#737373] mb-2">Mensaje</label>
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="Describe el problema o el servicio que necesitas..." className={inputClass + ' resize-none'} />
      </div>
      <button
        type="submit"
        className="w-full bg-[#1d4ed8] hover:bg-[#1e3a8a] text-white font-display text-sm font-700 uppercase tracking-widest py-4 transition-colors duration-200"
      >
        Enviar Solicitud
      </button>
    </form>
  )
}
