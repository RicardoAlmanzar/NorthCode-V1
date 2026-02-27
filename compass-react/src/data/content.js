/* ─── Service card items ─── */
export const SERVICES = [
  {
    key: 'web',
    name: 'Web',
    url: 'northcode.dev/services/web',
    icon: 'globe',
    items: [
      { label: 'Sitios corporativos', price: 'Desde $800' },
      { label: 'E-Commerce', price: 'Desde $1,200' },
      { label: 'Landing pages', price: 'Desde $400' },
      { label: 'Mantenimiento', price: 'Desde $80/mes' },
    ],
  },
  {
    key: 'branding',
    name: 'UI/Branding',
    url: 'northcode.dev/services/branding',
    icon: 'star',
    items: [
      { label: 'Identidad visual', price: 'Desde $600' },
      { label: 'UI/UX para apps', price: 'Desde $900' },
      { label: 'Materiales de marca', price: 'Desde $300' },
      { label: 'Guía de marca', price: 'Desde $200' },
    ],
  },
  {
    key: 'desktop',
    name: 'Aplicaciones de escritorio',
    url: 'northcode.dev/services/desktop',
    icon: 'desktop',
    items: [
      { label: 'Apps empresariales', price: 'Desde $2,500' },
      { label: 'Herramientas internas', price: 'Desde $1,800' },
      { label: 'Dashboard & analytics', price: 'Desde $1,500' },
      { label: 'Soporte & updates', price: 'Desde $150/mes' },
    ],
  },
];

/* ─── Service modal expanded data ─── */
export const SVC_DETAIL = {
  web: {
    title: 'Web',
    url: 'northcode.dev/services/web',
    shortDesc: 'Sitios de alto rendimiento diseñados para convertir. Desde landing pages hasta e-commerce a escala completa.',
    priceLabel: 'DESDE $400',
    priceSummary: 'Desde $400 — sitios, e-commerce, landing pages',
    sections: [
      {
        title: 'Qué incluye', isList: true, items: [
          { name: 'Diseño UI personalizado', tag: 'No templates' },
          { name: 'Desarrollo responsive', tag: 'Mobile-first' },
          { name: 'Integración CMS', tag: 'WP / Webflow / Headless' },
          { name: 'Optimización SEO on-page', tag: 'Básica' },
          { name: 'Hosting setup + dominio', tag: '1er año' },
        ]
      },
      {
        title: 'Tiempo estimado', isList: true, items: [
          { name: 'Landing page', duration: '1 – 2 semanas' },
          { name: 'Sitio corporativo', duration: '3 – 5 semanas' },
          { name: 'E-Commerce', duration: '5 – 8 semanas' },
          { name: 'Mantenimiento', duration: 'Retainer mensual' },
        ]
      },
      {
        title: 'Proceso', isTimeline: true, items: [
          { title: 'Brief + discovery call', desc: 'Conocemos tu proyecto, objetivos y necesidades (gratis).' },
          { title: 'Wireframes y prototipo', desc: 'Estructura navegable para validar flujo y contenido.' },
          { title: 'Diseño visual + revisiones', desc: 'UI personalizada con 2 rondas de ajustes incluidas.' },
          { title: 'Desarrollo front/back + QA', desc: 'Código limpio, responsive y probado a fondo.' },
          { title: 'Lanzamiento + capacitación', desc: 'Deploy, checklist final y sesión de entrega.' },
        ]
      },
      {
        title: 'Entregables', isList: true, items: [
          { name: 'Sitio web live', tag: 'Tu dominio' },
          { name: 'Archivos fuente', tag: 'Figma' },
          { name: 'Guía de uso del CMS', tag: 'Documentación' },
          { name: 'Checklist SEO + audit', tag: 'Performance' },
          { name: 'Soporte post-lanzamiento', tag: '30 días' },
        ]
      },
    ],
  },
  branding: {
    title: 'UI / Branding',
    url: 'northcode.dev/services/branding',
    shortDesc: 'Identidades que conectan. Logos, sistemas de diseño, UI/UX y brand kits listos para escalar.',
    priceLabel: 'DESDE $200',
    priceSummary: 'Desde $200 — identidad, UI/UX, guías de marca',
    sections: [
      {
        title: 'Qué incluye', isList: true, items: [
          { name: 'Logo principal + variaciones', tag: 'Mono / Icono' },
          { name: 'Paleta de colores + tipografías', tag: 'Sistema visual' },
          { name: 'Sistema de componentes UI', tag: 'Si aplica' },
          { name: 'Mockups en contexto', tag: 'Aplicación real' },
          { name: 'Materiales digitales', tag: 'Social / Banners' },
        ]
      },
      {
        title: 'Tiempo estimado', isList: true, items: [
          { name: 'Guía de marca', duration: '1 – 2 semanas' },
          { name: 'Identidad visual completa', duration: '3 – 4 semanas' },
          { name: 'UI/UX para app', duration: '4 – 6 semanas' },
          { name: 'Materiales de campaña', duration: '1 semana' },
        ]
      },
      {
        title: 'Proceso', isTimeline: true, items: [
          { title: 'Cuestionario + moodboard', desc: 'Entendemos tu marca, público y referencias visuales.' },
          { title: 'Exploración visual', desc: '3 direcciones de diseño distintas para elegir.' },
          { title: 'Refinamiento', desc: 'Afinamos la dirección elegida con tus comentarios.' },
          { title: 'Producción final', desc: 'Generamos todos los archivos y formatos listos para usar.' },
          { title: 'Entrega + handoff', desc: 'Guía de uso, archivos organizados y sesión de cierre.' },
        ]
      },
      {
        title: 'Entregables', isList: true, items: [
          { name: 'Brandbook', tag: 'PDF' },
          { name: 'Archivos vectoriales', tag: 'AI / SVG / EPS' },
          { name: 'Kit digital para redes', tag: 'Social media' },
          { name: 'Archivos Figma editables', tag: 'Fuente' },
          { name: 'Licencias tipográficas', tag: 'Si compradas' },
        ]
      },
    ],
  },
  desktop: {
    title: 'Aplicaciones de escritorio',
    url: 'northcode.dev/services/desktop',
    shortDesc: 'Apps nativas y Electron a medida, con dashboards, autenticación y soporte técnico incluido.',
    priceLabel: 'DESDE $1,500',
    priceSummary: 'Desde $1,500 — apps empresariales, dashboards, herramientas',
    sections: [
      {
        title: 'Qué incluye', isList: true, items: [
          { name: 'App nativa o Electron', tag: 'Windows / Mac' },
          { name: 'Diseño UI/UX personalizado', tag: 'A medida' },
          { name: 'Integración APIs + bases de datos', tag: 'Backend' },
          { name: 'Sistema de autenticación y roles', tag: 'Seguridad' },
          { name: 'Instalador + auto-updates', tag: 'Distribución' },
        ]
      },
      {
        title: 'Tiempo estimado', isList: true, items: [
          { name: 'Dashboard sencillo', duration: '3 – 4 semanas' },
          { name: 'App empresarial', duration: '6 – 10 semanas' },
          { name: 'Herramienta interna', duration: '4 – 6 semanas' },
          { name: 'Mantenimiento', duration: 'Retainer mensual' },
        ]
      },
      {
        title: 'Proceso', isTimeline: true, items: [
          { title: 'Discovery call + requerimientos', desc: 'Definimos alcance, tecnología y expectativas del proyecto.' },
          { title: 'Arquitectura y wireframes', desc: 'Estructura técnica y flujos de usuario validados.' },
          { title: 'Diseño visual + prototipo', desc: 'Interfaz interactiva para aprobar antes de desarrollar.' },
          { title: 'Desarrollo iterativo + QA', desc: 'Sprints con entregas parciales y testing continuo.' },
          { title: 'Deploy + capacitación', desc: 'Instalación, documentación y entrenamiento del equipo.' },
        ]
      },
      {
        title: 'Entregables', isList: true, items: [
          { name: 'App compilada', tag: 'Windows / Mac' },
          { name: 'Código fuente documentado', tag: 'Repositorio' },
          { name: 'Manual de usuario', tag: 'Guía' },
          { name: 'Pipeline CI/CD', tag: 'Automatizado' },
          { name: 'Soporte post-lanzamiento', tag: '60 días' },
        ]
      },
    ],
  },
};

/* ─── Projects for Work section ─── */
export const PROJECTS = [
  {
    title: 'Sistema de Gestión de Muestras',
    tag: 'Branding · Web',
    /* ≤90 chars — microcopy de alcance visible en la card */
    summary: 'Plataforma web de trazabilidad de muestras con roles, validaciones y reportes.',
    desc: 'Desarrollamos una solución web para un laboratorio enfocada en la administración y trazabilidad de muestras de sustancias, integrando sus metadatos, validaciones del flujo y control de roles dentro del proceso operativo.',
    meta: { title: 'Sistema de Gestión de Muestras', sub: 'Branding & Web' },
    gradient: 'linear-gradient(135deg,#b5c8d8,#ccd8e8)',
    gradientDark: 'linear-gradient(135deg,#1e3448,#253d52)',
    thumb: '/img/projects/natura/thumbnail-sistema-HQ.jpg',
    slides: [
      { src: '/img/projects/natura/LogIn.png', alt: 'Inicio de sesión — Natura Co.' },
      { src: '/img/projects/natura/dashboard.png', alt: 'Dashboard estadístico — Panel del Analista' },
      { src: '/img/projects/natura/verdetalles.png', alt: 'Detalles de muestra con resultados de análisis' },
      { src: '/img/projects/natura/evaluadortareas.png', alt: 'Panel del Evaluador — Gestión de tareas' },
      { src: '/img/projects/natura/evaluadorbusqueda.png', alt: 'Panel del Evaluador — Búsqueda de muestras' },
      { src: '/img/projects/natura/admincrearusuario.png', alt: 'Panel de Administrador — Crear usuario' },
      { src: '/img/projects/natura/admin dash.png', alt: 'Panel de Administrador — Dashboard' },
      { src: '/img/projects/natura/admin user.png', alt: 'Panel de Administrador — Gestión de usuarios' },
      { src: '/img/projects/natura/recepcion.png', alt: 'Panel de Recepción' },
      { src: '/img/projects/natura/tareas anal.png', alt: 'Panel del Analista — Gestión de tareas' },
    ],
  },
  {
    title: 'Aplicación Móvil de Emergencias',
    tag: 'UI/UX Design',
    summary: 'Diseño de marca e interfaz para app móvil de atención de emergencias.',
    desc: 'Diseñamos la identidad de marca, la interfaz y la experiencia de usuario de una aplicación móvil enfocada en la atención y gestión de emergencias.',
    meta: { title: 'Aplicación Móvil de Emergencias', sub: 'UI/UX Design' },
    gradient: 'linear-gradient(135deg,#e8a090,#f2b5a5)',
    gradientDark: 'linear-gradient(135deg,#4a2a22,#5c382e)',
    thumb: '/img/projects/fintech/thumbnail-auxilio-v5-HQ.jpg',
    slides: [
      { src: '/img/projects/fintech/login.png', alt: 'Login — App móvil' },
      { src: '/img/projects/fintech/inicio.png', alt: 'Pantalla de inicio' },
      { src: '/img/projects/fintech/sos.png', alt: 'Pantalla SOS' },
      { src: '/img/projects/fintech/ubi.png', alt: 'Ubicación' },
      { src: '/img/projects/fintech/ubipro.png', alt: 'Ubicación Pro' },
      { src: '/img/projects/fintech/chat.png', alt: 'Chat' },
      { src: '/img/projects/fintech/actividad.png', alt: 'Actividad' },
      { src: '/img/projects/fintech/noticias.png', alt: 'Noticias' },
      { src: '/img/projects/fintech/riesgo.png', alt: 'Riesgo' },
    ],
    slidesMobile: true,
  },
  {
    title: 'Sistema de Gestión de Sustancias Controladas',
    tag: 'UI/UX · Web',
    summary: 'Sistema web con flujos de aprobación, formularios y control de permisos por rol.',
    desc: 'Desarrollamos una solución web para la gestión y traslado de sustancias, con formularios, flujos de negocio, esquema de base de datos, autenticación y control de permisos. La plataforma permite registrar solicitudes de traslado y coordina la revisión por distintos roles hasta su validación y aprobación final.',
    meta: { title: 'Sistema de Gestión de Sustancias Controladas', sub: 'UI/UX · Web' },
    gradient: 'linear-gradient(135deg,#8fb2c8,#a8c5d5)',
    gradientDark: 'linear-gradient(135deg,#1a3040,#24404e)',
    thumb: '/img/projects/gestion/thumbnail-dgcd-HQ.jpg',
    slides: [
      { src: '/img/projects/gestion/first.png', alt: 'Vista principal — Herramienta de Gestión' },
      { src: '/img/projects/gestion/second.png', alt: 'Panel de control' },
      { src: '/img/projects/gestion/third.png', alt: 'Gestión de registros' },
      { src: '/img/projects/gestion/fourth.png', alt: 'Formulario de entrada' },
      { src: '/img/projects/gestion/fifth.png', alt: 'Vista de reportes' },
      { src: '/img/projects/gestion/sixth.png', alt: 'Configuración del sistema' },
      { src: '/img/projects/gestion/seven.png', alt: 'Panel de usuarios' },
      { src: '/img/projects/gestion/eight.png', alt: 'Vista de tareas' },
      { src: '/img/projects/gestion/nine.png', alt: 'Dashboard de métricas' },
      { src: '/img/projects/gestion/ten.png', alt: 'Historial de actividad' },
      { src: '/img/projects/gestion/eleven.png', alt: 'Módulo de búsqueda' },
      { src: '/img/projects/gestion/twelve.png', alt: 'Detalles del registro' },
      { src: '/img/projects/gestion/thirteen.png', alt: 'Exportación de datos' },
    ],
  },
  {
    title: 'E-Commerce Waldykicks',
    tag: 'Web · E-Commerce',
    summary: 'Tienda online especializada en sneakers con sistema de verificación y análisis.',
    desc: 'Desarrollamos una plataforma e-commerce completa para Waldykicks enfocada en la venta de sneakers. Incluye un diseño moderno y herramientas para la verificación de autenticidad y predicción.',
    meta: { title: 'Waldykicks', sub: 'E-Commerce' },
    gradient: 'linear-gradient(135deg,#e89080,#f2a895)',
    gradientDark: 'linear-gradient(135deg,#4a2820,#5c3528)',
    thumb: '/img/projects/sneakers/thumbnail-waldykicks-HQ.jpg',
    slides: [
      { src: '/img/projects/sneakers/inicio.jpg', alt: 'Vista de Inicio — Waldykicks' },
      { src: '/img/projects/sneakers/verify.jpg', alt: 'Verificación de autenticidad' },
      { src: '/img/projects/sneakers/predict.jpg', alt: 'Módulo de predicción y análisis' },
      { src: '/img/projects/sneakers/footer.jpg', alt: 'Footer — Waldykicks' },
    ],
  },
];

/* ─── FAQ items ─── */
export const FAQS = [
  { q: '¿Cuánto tarda un proyecto típico?', a: 'Los tiempos se definen en la propuesta según el alcance y prioridades del proyecto.' },
  { q: '¿Ofrecen mantenimiento mensual?', a: 'Sí. Ofrecemos mantenimiento después de la entrega, con ajustes menores, actualizaciones de contenido y mejoras puntuales. Se cotiza por separado según lo que necesites.' },
  { q: '¿Cómo es el proceso de pago?', a: 'Trabajamos por etapas. Normalmente se solicita un anticipo para iniciar y el resto se paga por avances o entregas acordadas en la propuesta.' },
  { q: '¿Qué pasa si no me gusta el diseño?', a: 'Incluimos revisiones para ajustar el diseño según tu feedback. Antes de diseñar, alineamos objetivos, estilo y referencias para reducir al mínimo ese riesgo.' },
  { q: '¿Qué pasa después de la entrega?', a: 'Entregamos todo lo acordado en la propuesta y, si aplica, accesos o archivos necesarios. Si luego necesitas cambios o mejoras, se cotiza como una nueva etapa o mantenimiento.' },
];

/* ─── Hero cards ─── */
export const HERO_CARDS = [
  { title: 'E-Commerce Store', tag: 'Web · 2024', label: 'Web', gradient: 'linear-gradient(135deg,#b8c8d8,#c5d5e5)' },
  { title: 'App de Finanzas', tag: 'UI/Branding · 2024', label: 'UI/UX', gradient: 'linear-gradient(135deg,#e8a090,#f0b8a8)' },
  { title: 'Identidad Visual', tag: 'Branding · 2024', label: 'Brand', gradient: 'linear-gradient(135deg,#9ab5cc,#b5cad8)' },
  { title: 'App de Gestión', tag: 'Desktop · 2024', label: 'Desktop', gradient: 'linear-gradient(135deg,#e89585,#f0a898)' },
];
