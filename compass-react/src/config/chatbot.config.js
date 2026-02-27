/* ─── Chatbot Configuration ─── */

export const WHATSAPP_NUMBER = '18299727697'; // formato internacional sin +
export const FORM_ENDPOINT = 'https://formspree.io/f/xykdoqdo'; // URL de Formspree (ej: https://formspree.io/f/xabcd)

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola, vengo desde la web de NorthCode. Quiero una cotización.';

export const CHAT_GREETING =
  'Hola 👋 Soy el asistente de NorthCode. Puedo ayudarte con información sobre servicios, tiempos, proceso, capacitación y cotización. Si ya tienes una idea, también puedes contarnos tu proyecto para orientarte.';

export const CHAT_WA_NUDGE =
  '¿Quieres que te ayudemos a estimar tu proyecto? Puedes cotizar por WhatsApp y te orientamos.';

export const CHAT_FAQS = [
  {
    chip: '¿Cómo es el proceso?',
    answer:
      'Nuestro proceso suele incluir una etapa de diagnóstico y levantamiento de requerimientos, seguida de la propuesta, diseño y/o desarrollo, revisiones y entrega final. Trabajamos por etapas para mantener claridad en tiempos, avances y comunicación durante todo el proyecto.',
  },
  {
    chip: '¿Cuánto tardan?',
    answer:
      'El tiempo depende del tipo de proyecto y de la rapidez con la que recibimos materiales y feedback. Como referencia, una landing page puede tomar de 1 a 3 semanas y proyectos más completos entre 4 y 8 semanas.',
  },
  {
    chip: '¿Cómo cotizan?',
    answer:
      'Cotizamos cada proyecto de forma personalizada según alcance, complejidad, funcionalidades, tiempos y soporte requerido. Primero entendemos lo que necesitas y luego te compartimos una propuesta clara con lo incluido.',
  },
  {
    chip: '¿Incluyen capacitación?',
    answer:
      'Sí, podemos incluir una capacitación inicial u orientación de uso al momento de la entrega, según el tipo de proyecto. Esta etapa puede cubrir el uso básico, gestión de contenido y resolución de dudas para que puedas operar la solución con mayor confianza.',
  },
  {
    chip: '¿Qué necesitan para cotizar?',
    answer:
      'Para cotizar de forma más precisa necesitamos conocer el objetivo del proyecto, tipo de solución que buscas, alcance aproximado, funcionalidades o secciones requeridas, tiempos esperados y, si tienes, referencias visuales o técnicas. Con esa información podemos preparar una propuesta más clara y realista.',
  },
];

export const CHAT_LEAD_SUCCESS = '✓ ¡Mensaje enviado! Te contactaremos a tu correo pronto.';
export const CHAT_LEAD_ERROR = 'Hubo un error. Intenta de nuevo o escríbenos por WhatsApp.';
