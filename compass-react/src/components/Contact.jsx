// ...existing code...
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionEyebrow, ServiceIcon } from './ui/Icons';
import { FORM_ENDPOINT } from '../config/chatbot.config';

const PROJECT_TYPES = [
  { icon: 'web', title: 'Diseño Web', desc: 'Sitio o app nueva' },
  { icon: 'branding', title: 'Branding', desc: 'Identidad visual' },
  { icon: 'desktop', title: 'App / Software', desc: 'A medida' },
];

const STEPS = [
  { num: 1, label: 'Proyecto' },
  { num: 2, label: 'Detalles' },
  { num: 3, label: 'Contacto' },
];

const inputClass = 'wiz-input w-full px-4 py-3 border-[1.5px] rounded-lg font-sans text-[.9rem] min-h-[44px] transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] focus:border-[var(--color-coral)] focus:shadow-[0_0_0_4px_rgba(232,97,74,.12)] focus:outline-none';

export default function Contact({ onToast }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sending, setSending] = useState(false);
  const leftRef = useScrollReveal();
  const formRef = useScrollReveal();

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      if (!FORM_ENDPOINT) {
        // Simulación si no hay endpoint
        await new Promise(r => setTimeout(r, 800));
        console.info('[Contact Form - Simulated]', {
          type: PROJECT_TYPES[selectedType].title,
          deadline: deadline?.toLocaleDateString(),
          budget: `${currency} ${budget}`,
          details,
          name,
          company,
          email,
          whatsapp
        });
      } else {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `Nuevo Proyecto de ${name}`,
            tipo_proyecto: PROJECT_TYPES[selectedType].title,
            fecha_limite: deadline?.toLocaleDateString(),
            presupuesto: `${currency} ${budget}`,
            detalles: details,
            nombre: name,
            empresa: company,
            email: email,
            whatsapp: whatsapp
          })
        });
        if (!response.ok) throw new Error('Form submission failed');
      }

      onToast?.('Tu proyecto ha sido enviado con éxito. Te contactaremos pronto.');
      setStep(1);
      setSelectedType(0);
      setDeadline(null);
      setBudget('');
      setCurrency('USD');
      setDetails('');
      setName('');
      setCompany('');
      setEmail('');
      setWhatsapp('');
    } catch (err) {
      onToast?.('Hubo un error al enviar el formulario. Intenta de nuevo.');
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-contact bg-[#0d1b2a] text-white grid grid-cols-[1fr_1.2fr] max-md:grid-cols-1 gap-10 items-center px-16 max-md:px-5 py-10"
    >
      {/* Left column — info */}
      <div ref={leftRef} className="reveal-left">
        <SectionEyebrow className="text-[var(--color-coral-lt)] before:bg-[var(--color-coral-lt)]">Contacto</SectionEyebrow>
        <h2 id="contact-heading" className="font-heading font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.8rem)] mb-4 text-white">
          ¿Tienes un <em className="italic text-[var(--color-coral)]">proyecto</em> en mente?
        </h2>
        <p className="text-white/55 max-w-[56ch] leading-[1.75] mb-12 text-base">
          Escríbenos y te respondemos en menos de 24 horas. Sin formalidades.
        </p>
        <address className="not-italic">
          <div className="flex items-center gap-3 text-[.88rem] text-white/60 mb-3 min-h-[44px]">
            <div className="w-[2.2rem] h-[2.2rem] rounded-full bg-white/10 flex items-center justify-center text-[.75rem] shrink-0">✉</div>
            <a href="mailto:contact@northcoderd.com" className="text-inherit no-underline hover:text-[var(--color-coral)] transition-colors">contact@northcoderd.com</a>
          </div>
          <div className="flex items-center gap-3 text-[.88rem] text-white/60 mb-3 min-h-[44px]">
            <div className="w-[2.2rem] h-[2.2rem] rounded-full bg-white/10 flex items-center justify-center text-[.75rem] shrink-0">📞</div>
            <a href="tel:+18095551234" className="text-inherit no-underline hover:text-[var(--color-coral)] transition-colors">+1 (809) 555-1234</a>
          </div>
          <div className="flex items-center gap-3 text-[.88rem] text-white/60 mb-3 min-h-[44px]">
            <div className="w-[2.2rem] h-[2.2rem] rounded-full bg-white/10 flex items-center justify-center text-[.75rem] shrink-0">📍</div>
            <span>Santo Domingo, RD — y remoto</span>
          </div>
        </address>
      </div>

      {/* Right column — wizard form */}
      <div
        ref={formRef}
        className="reveal-right rounded-2xl wiz-card wiz-card-fixed"
      >
        {/* Stepper — always visible at fixed top */}
        <nav aria-label="Pasos del formulario" className="flex items-center justify-between relative wiz-stepper-bar">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[.8rem] font-bold transition-colors duration-300 ${step >= s.num
                    ? 'wiz-step-active'
                    : 'wiz-step-inactive'
                    }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-[.72rem] font-medium transition-colors duration-300 ${step >= s.num ? 'text-[var(--color-coral)]' : 'text-[var(--color-muted)]'
                    }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] mx-3 mt-[-18px] relative">
                  <div className="absolute inset-0 wiz-line-bg rounded-full" />
                  <div
                    className="absolute inset-y-0 left-0 wiz-line-fill rounded-full transition-all duration-500"
                    style={{ width: step > s.num ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Scrollable step body — fills remaining height, never changes outer card size */}
        <div className="wiz-step-scroll">
          <form onSubmit={handleSubmit} aria-label="Formulario de proyecto" className="h-full">
            {/* ─── Step 1: Proyecto ─── */}
            {step === 1 && (
              <div className="wiz-step-body wizard-step">
                <h3 className="font-heading font-black text-[1.5rem] mb-1">¿Qué necesitas?</h3>
                <p className="text-[var(--color-muted)] text-[.88rem] mb-6">Selecciona el tipo de proyecto que tienes en mente.</p>

                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3 mb-8" role="radiogroup" aria-label="Tipo de proyecto">
                  {PROJECT_TYPES.map((pt, i) => (
                    <div
                      key={i}
                      role="radio"
                      aria-checked={selectedType === i}
                      tabIndex={selectedType === i ? 0 : -1}
                      onClick={() => setSelectedType(i)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedType(i); }
                        let n;
                        if (e.key === 'ArrowRight') n = (i + 1) % PROJECT_TYPES.length;
                        if (e.key === 'ArrowLeft') n = (i - 1 + PROJECT_TYPES.length) % PROJECT_TYPES.length;
                        if (n !== undefined) { e.preventDefault(); setSelectedType(n); }
                      }}
                      className={`border-[1.5px] rounded-xl p-4 cursor-pointer text-center transition-all duration-300 ${selectedType === i
                        ? 'border-[var(--color-coral)] bg-[rgba(232,97,74,.06)]'
                        : 'border-[var(--color-border)] bg-transparent hover:border-[var(--color-coral)]/40'
                        }`}
                    >
                      <div className="text-[var(--color-coral)] text-lg mb-2 flex justify-center" aria-hidden="true">
                        <ServiceIcon type={pt.icon} size={24} />
                      </div>
                      <p className="text-[.82rem] font-semibold mb-0.5">{pt.title}</p>
                      <p className="text-[.72rem] text-[var(--color-muted)]">{pt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label htmlFor="wiz-deadline" className="block text-[.82rem] font-medium mb-2">
                    ¿Tienes fecha límite? <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                  </label>
                  <DatePicker
                    id="wiz-deadline"
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    minDate={new Date()}
                    placeholderText="mm/dd/yyyy"
                    dateFormat="MM/dd/yyyy"
                    className={`${inputClass} bg-[var(--color-card-bg)] border-[var(--color-border)] text-[var(--color-ink)] dark:text-white w-full`}
                    calendarClassName="northcode-calendar"
                    showPopperArrow={false}
                    popperPlacement="top-start"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={next} className="wizard-btn-next">
                    Siguiente →
                  </button>
                </div>
              </div>
            )}

            {/* ─── Step 2: Detalles ─── */}
            {step === 2 && (
              <div className="wiz-step-body wizard-step flex flex-col">
                <h3 className="font-heading font-black text-[1.5rem] mb-1">Cuéntanos más</h3>
                <p className="text-[var(--color-muted)] text-[.88rem] mb-2">Entre más detalles, más precisa será nuestra propuesta.</p>

                <div className="mb-6">
                  <label htmlFor="wiz-budget" className="block text-[.82rem] font-semibold mb-1">
                    ¿Cuál es tu presupuesto aproximado? <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                  </label>
                  <div className="flex gap-2 mb-3" role="radiogroup" aria-label="Moneda">
                    {['USD', 'RD$'].map(c => (
                      <button
                        key={c}
                        type="button"
                        role="radio"
                        aria-checked={currency === c}
                        onClick={() => setCurrency(c)}
                        className={`px-4 py-2 rounded-lg text-[.8rem] font-semibold border-[1.5px] transition-all duration-200 cursor-pointer ${currency === c
                          ? 'border-[var(--color-coral)] bg-[var(--color-coral)] text-white'
                          : 'wiz-currency-inactive'
                          }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 wiz-prefix text-[.85rem] font-medium pointer-events-none">{currency === 'USD' ? '$' : 'RD$'}</span>
                    <input
                      type="text"
                      id="wiz-budget"
                      inputMode="numeric"
                      placeholder="Ej: 1,500"
                      value={budget}
                      onChange={e => setBudget(e.target.value)}
                      className={`${inputClass} ${currency === 'USD' ? 'pl-8' : 'pl-12'}`}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="wiz-details" className="block text-[.82rem] font-semibold mb-1">Cuéntanos sobre tu proyecto</label>
                  <textarea
                    id="wiz-details"
                    rows={4}
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    placeholder="¿Qué necesitas? ¿A quién va dirigido? ¿Tienes referencias?"
                    className={`${inputClass} min-h-[110px] resize-y`}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button type="button" onClick={back} className="wizard-btn-back">← Atrás</button>
                  <button type="button" onClick={next} className="wizard-btn-next">Siguiente →</button>
                </div>
              </div>
            )}

            {/* ─── Step 3: Contacto ─── */}
            {step === 3 && (
              <div className="wiz-step-body wizard-step flex flex-col">
                <h3 className="font-heading font-black text-[1.5rem] mb-1">¿Con quién hablamos?</h3>
                <p className="text-[var(--color-muted)] text-[.88rem] mb-2">Último paso — te contactamos en menos de 24h.</p>

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-4">
                  <div>
                    <label htmlFor="wiz-name" className="block text-[.82rem] font-semibold mb-1">Nombre</label>
                    <input
                      type="text"
                      id="wiz-name"
                      required
                      autoComplete="name"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="wiz-company" className="block text-[.82rem] font-semibold mb-1">
                      Empresa <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="wiz-company"
                      autoComplete="organization"
                      placeholder="Empresa"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="wiz-email" className="block text-[.82rem] font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    id="wiz-email"
                    required
                    autoComplete="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="wiz-whatsapp" className="block text-[.82rem] font-semibold mb-1">
                    WhatsApp <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                  </label>
                  <input
                    type="tel"
                    id="wiz-whatsapp"
                    autoComplete="tel"
                    placeholder="+1 (809) 555-1234"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button type="button" onClick={back} className="wizard-btn-back">← Atrás</button>
                  <button type="submit" disabled={sending} className="wizard-btn-next">
                    {sending ? 'Enviando...' : 'Enviar proyecto →'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>{/* end wiz-step-scroll */}
      </div>
    </section>
  );
}
