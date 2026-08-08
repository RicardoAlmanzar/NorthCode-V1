import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionEyebrow, ServiceIcon } from "./ui/Icons";
import RotatingText from "./ui/RotatingText";
import { FORM_ENDPOINT } from '../config/chatbot.config';
import { GlowingEffect } from './ui/glowing-effect';

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

const inputBase = 'wiz-input w-full px-3 py-2 border-[1.5px] rounded-lg font-sans text-[.88rem] min-h-[40px] transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] focus:outline-none';
const inputNormal = `${inputBase} focus:border-[var(--color-coral)] focus:shadow-[0_0_0_4px_rgba(222,108,58,.12)]`;
const inputErrorCls = `${inputBase} border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,.12)]`;

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const todayStart = () => startOfDay(new Date());
const isBeforeToday = (date) => date && startOfDay(date).getTime() < todayStart().getTime();

function FieldError({ id, msg }) {
  return (
    <p
      id={id}
      role={msg ? 'alert' : undefined}
      aria-live="polite"
      className="mt-1.5 text-[.78rem] text-red-400 flex items-center gap-1 min-h-[1.1rem] transition-opacity duration-200"
      style={{ opacity: msg ? 1 : 0, pointerEvents: msg ? 'auto' : 'none' }}
    >
      {msg && (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {msg}
        </>
      )}
    </p>
  );
}

export default function Contact({ onToast }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [deadlineFlexible, setDeadlineFlexible] = useState(false);
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const projectOptionRefs = useRef([]);
  const leftRef = useScrollReveal();
  const formRef = useScrollReveal();

  const touch = (field) => setTouched(t => ({ ...t, [field]: true }));

  const validateStep1 = (vals = { deadline, deadlineFlexible }) => {
    const e = {};
    if (!vals.deadlineFlexible && isBeforeToday(vals.deadline)) {
      e.deadline = 'La fecha lÃ­mite no puede ser anterior a hoy.';
    }
    return e;
  };

  /* ── Validate step 2 ── */
  const validateStep2 = (vals = { details }) => {
    const e = {};
    if (!vals.details.trim()) e.details = 'Este campo es obligatorio para poder ayudarte mejor.';
    return e;
  };

  /* ── Validate step 3 ── */
  const validateStep3 = (vals = { name, email }) => {
    const e = {};
    if (!vals.name.trim()) e.name = 'El nombre es obligatorio.';
    if (!vals.email.trim()) e.email = 'El email es obligatorio.';
    else if (!isValidEmail(vals.email)) e.email = 'Ingresa un email válido (ej: tu@email.com).';
    return e;
  };

  const next = () => {
    if (step === 1) {
      const e = validateStep1();
      setTouched(t => ({ ...t, deadline: true }));
      setErrors(e);
      if (Object.keys(e).length > 0) return;
    }
    if (step === 2) {
      const e = validateStep2();
      setTouched(t => ({ ...t, details: true }));
      setErrors(e);
      if (Object.keys(e).length > 0) return;
    }
    setErrors({});
    setStep(s => Math.min(s + 1, 3));
  };

  const back = () => {
    setErrors({});
    setStep(s => Math.max(s - 1, 1));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const e1 = validateStep1();
    if (Object.keys(e1).length > 0) {
      setTouched(t => ({ ...t, deadline: true }));
      setErrors(e1);
      setStep(1);
      return;
    }

    const e2 = validateStep2();
    if (Object.keys(e2).length > 0) {
      setTouched(t => ({ ...t, details: true }));
      setErrors(e2);
      setStep(2);
      return;
    }

    const e3 = validateStep3();
    setTouched(t => ({ ...t, name: true, email: true }));
    setErrors(e3);
    if (Object.keys(e3).length > 0) return;

    setSending(true);
    try {
      if (!FORM_ENDPOINT) {
        await new Promise(r => setTimeout(r, 800));
        console.info('[Contact Form - Simulated]', {
          type: PROJECT_TYPES[selectedType].title,
          deadline: deadlineFlexible ? 'Sin fecha definida' : deadline?.toLocaleDateString(),
          budget: `${currency} ${budget}`,
          details, name, company, email, whatsapp
        });
      } else {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `Nuevo Proyecto de ${name}`,
            tipo_proyecto: PROJECT_TYPES[selectedType].title,
            fecha_limite: deadlineFlexible ? 'Sin fecha definida' : deadline?.toLocaleDateString(),
            presupuesto: `${currency} ${budget}`,
            detalles: details,
            nombre: name,
            empresa: company,
            email,
            whatsapp
          })
        });
        if (!response.ok) throw new Error('Form submission failed');
      }

      onToast?.('Tu proyecto ha sido enviado con éxito. Te contactaremos pronto.');
      setStep(1); setSelectedType(0); setDeadline(null); setDeadlineFlexible(false); setBudget(''); setCurrency('USD');
      setDetails(''); setName(''); setCompany(''); setEmail(''); setWhatsapp('');
      setErrors({}); setTouched({});
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
          <span className="inline-flex flex-wrap items-center gap-3">
            <span>¿Tienes un</span>
            <RotatingText
              words={["proyecto", "idea", "diseño"]}
              className="italic font-black text-white bg-[var(--color-coral)] px-4 py-1.5 rounded-[1.5rem] shadow-[0_18px_40px_rgba(222,108,58,0.18)]"
            />
          </span>
          <br />
          <span className="block">en mente?</span>
        </h2>
        <p className="text-white/55 max-w-[56ch] leading-[1.75] mb-12 text-base">
          Escríbenos y te respondemos en menos de 24 horas.
        </p>
        <address className="not-italic">
          <div className="flex items-center gap-3 text-[.88rem] text-white/60 mb-3 min-h-[44px]">
            <div className="w-[2.2rem] h-[2.2rem] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
              </svg>
            </div>
            <a href="mailto:contact@northcoderd.com" className="text-inherit no-underline hover:text-[var(--color-coral)] transition-colors">contact@northcoderd.com</a>
          </div>
          <div className="flex items-center gap-3 text-[.88rem] text-white/60 mb-3 min-h-[44px]">
            <div className="w-[2.2rem] h-[2.2rem] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.08 6.08l1.09-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <a href="tel:+18098410101" className="text-inherit no-underline hover:text-[var(--color-coral)] transition-colors">+1 (809) 841-0101</a>
          </div>
          <div className="flex items-center gap-3 text-[.88rem] text-white/60 mb-3 min-h-[44px]">
            <div className="w-[2.2rem] h-[2.2rem] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Santo%20Domingo%2C%20Rep%C3%BAblica%20Dominicana"
              target="_blank"
              rel="noreferrer"
              className="text-inherit no-underline hover:text-[var(--color-coral)] transition-colors"
            >
              Santo Domingo, República Dominicana
            </a>
          </div>
        </address>
      </div>

      {/* Right column — wizard form */}
      <div ref={formRef} className="reveal-right rounded-2xl wiz-card wiz-card-fixed relative overflow-hidden">
        <GlowingEffect spread={120} glow={true} />
        {/* Stepper */}
        <nav aria-label="Pasos del formulario" className="flex items-center justify-between relative wiz-stepper-bar z-10">
          {STEPS.map((s, i) => {
            const state = step > s.num ? 'complete' : step === s.num ? 'current' : 'pending';
            return (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className={`wiz-stepper-item wiz-stepper-item--${state}`} aria-current={state === 'current' ? 'step' : undefined}>
                  <div className="wiz-stepper-dot">
                    {state === 'complete' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span className="wiz-stepper-label">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="wiz-stepper-line">
                    <div className="wiz-line-bg" />
                    <div className="wiz-line-fill" style={{ width: step > s.num ? '100%' : step === s.num ? '38%' : '0%' }} />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Step body */}
        <div className="wiz-step-scroll relative z-10">
          <form onSubmit={handleSubmit} aria-label="Formulario de proyecto" className="h-full" noValidate>

            {/* ─── Step 1: Proyecto ─── */}
            {step === 1 && (
              <div className="wiz-step-body wizard-step">
                <h3 className="font-heading font-black text-[1.3rem] mb-0.5">¿Qué necesitas?</h3>
                <p className="text-[var(--color-muted)] text-[.82rem] mb-3">Selecciona el tipo de proyecto que tienes en mente.</p>

                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-2 mb-4" role="radiogroup" aria-label="Tipo de proyecto">
                  {PROJECT_TYPES.map((pt, i) => (
                    <button
                      key={i}
                      ref={(node) => { projectOptionRefs.current[i] = node; }}
                      type="button"
                      role="radio"
                      aria-checked={selectedType === i}
                      tabIndex={selectedType === i ? 0 : -1}
                      onClick={() => setSelectedType(i)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedType(i); }
                        let n;
                        if (e.key === 'ArrowRight') n = (i + 1) % PROJECT_TYPES.length;
                        if (e.key === 'ArrowLeft') n = (i - 1 + PROJECT_TYPES.length) % PROJECT_TYPES.length;
                        if (n !== undefined) {
                          e.preventDefault();
                          setSelectedType(n);
                          projectOptionRefs.current[n]?.focus();
                        }
                      }}
                      className={`wiz-project-option ${selectedType === i ? 'is-selected' : ''}`}
                    >
                      <span className="wiz-project-check" aria-hidden="true">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      </span>
                      <div className="wiz-project-icon" aria-hidden="true">
                        <ServiceIcon type={pt.icon} size={22} />
                      </div>
                      <p className="text-[.82rem] font-semibold mb-0.5">{pt.title}</p>
                      <p className="text-[.72rem] text-[var(--color-muted)]">{pt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="mb-3">
                  <label htmlFor="wiz-deadline" className="block text-[.8rem] font-medium mb-1">
                    ¿Tienes fecha límite? <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                  </label>
                  <div className="wiz-date-row">
                    <div className="wiz-date-field">
                      <svg className="wiz-date-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="3" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      <DatePicker
                        id="wiz-deadline"
                        selected={deadline}
                        onChange={(date) => {
                          setDeadline(date);
                          setDeadlineFlexible(false);
                          if (touched.deadline) {
                            setErrors(er => ({
                              ...er,
                              deadline: isBeforeToday(date) ? 'La fecha lÃ­mite no puede ser anterior a hoy.' : undefined
                            }));
                          }
                        }}
                        onBlur={() => touch('deadline')}
                        minDate={todayStart()}
                        placeholderText="Selecciona una fecha aproximada"
                        dateFormat="MM/dd/yyyy"
                        aria-describedby={errors.deadline ? 'err-deadline' : undefined}
                        aria-invalid={!!errors.deadline}
                        className={`${touched.deadline && errors.deadline ? inputErrorCls : inputNormal} wiz-date-input`}
                        calendarClassName="northcode-calendar"
                        showPopperArrow={false}
                        popperPlacement="top-start"
                      />
                    </div>
                    <button
                      type="button"
                      className={`wiz-date-flexible ${deadlineFlexible ? 'is-selected' : ''}`}
                      aria-pressed={deadlineFlexible}
                      onClick={() => {
                        setDeadline(null);
                        setDeadlineFlexible(true);
                        setErrors(er => ({ ...er, deadline: undefined }));
                      }}
                    >
                      No tengo fecha definida
                    </button>
                  </div>
                  <FieldError id="err-deadline" msg={touched.deadline ? errors.deadline : null} />
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={next} className="wizard-btn-next">Siguiente →</button>
                </div>
              </div>
            )}

            {/* ─── Step 2: Detalles ─── */}
            {step === 2 && (
              <div className="wiz-step-body wizard-step flex flex-col">
                <h3 className="font-heading font-black text-[1.3rem] mb-0.5">Cuéntanos más</h3>
                <p className="text-[var(--color-muted)] text-[.82rem] mb-2">Entre más detalles, más precisa será nuestra propuesta.</p>

                {/* Presupuesto — opcional */}
                <div className="mb-3">
                  <label htmlFor="wiz-budget" className="block text-[.8rem] font-semibold mb-1">
                    ¿Cuál es tu presupuesto aproximado? <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                  </label>
                  <div className="flex gap-2 mb-2" role="radiogroup" aria-label="Moneda">
                    {['USD', 'RD$'].map(c => (
                      <button
                        key={c} type="button" role="radio" aria-checked={currency === c}
                        onClick={() => setCurrency(c)}
                        className={`wiz-currency-option ${currency === c ? 'is-selected' : ''}`}
                      >{c}</button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 wiz-prefix text-[.85rem] font-medium pointer-events-none">{currency === 'USD' ? 'USD$' : 'RD$'}</span>
                    <input
                      type="text" id="wiz-budget" inputMode="numeric" placeholder="Ej: 1,500"
                      value={budget} onChange={e => setBudget(e.target.value)}
                      className={`${inputNormal} ${currency === 'USD' ? 'pl-14' : 'pl-12'}`}
                    />
                  </div>
                </div>

                {/* Detalles — requerido */}
                <div className="mb-3">
                  <label htmlFor="wiz-details" className="block text-[.8rem] font-semibold mb-1">
                    Cuéntanos sobre tu proyecto <span className="text-[var(--color-coral)]">*</span>
                  </label>
                  <textarea
                    id="wiz-details" rows={3}
                    value={details}
                    onChange={e => {
                      setDetails(e.target.value);
                      if (touched.details) setErrors(er => ({ ...er, details: e.target.value.trim() ? undefined : 'Este campo es obligatorio para poder ayudarte mejor.' }));
                    }}
                    onBlur={() => touch('details')}
                    placeholder="¿Qué necesitas? ¿A quién va dirigido? ¿Tienes referencias?"
                    aria-describedby={errors.details ? 'err-details' : undefined}
                    aria-invalid={!!errors.details}
                    className={`${touched.details && errors.details ? inputErrorCls : inputNormal} min-h-[80px] resize-y`}
                  />
                  <FieldError id="err-details" msg={touched.details ? errors.details : null} />
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
                <h3 className="font-heading font-black text-[1.3rem] mb-0.5">¿Con quién hablamos?</h3>
                <p className="text-[var(--color-muted)] text-[.82rem] mb-2">Último paso — te contactamos en menos de 24h.</p>

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 mb-2">
                  {/* Nombre — requerido */}
                  <div>
                    <label htmlFor="wiz-name" className="block text-[.82rem] font-semibold mb-1">
                      Nombre <span className="text-[var(--color-coral)]">*</span>
                    </label>
                    <input
                      type="text" id="wiz-name" autoComplete="name" placeholder="Tu nombre"
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                        if (touched.name) setErrors(er => ({ ...er, name: e.target.value.trim() ? undefined : 'El nombre es obligatorio.' }));
                      }}
                      onBlur={() => touch('name')}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      aria-invalid={!!errors.name}
                      className={touched.name && errors.name ? inputErrorCls : inputNormal}
                    />
                    <FieldError id="err-name" msg={touched.name ? errors.name : null} />
                  </div>
                  {/* Empresa — opcional */}
                  <div>
                    <label htmlFor="wiz-company" className="block text-[.82rem] font-semibold mb-1">
                      Empresa <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                    </label>
                    <input
                      type="text" id="wiz-company" autoComplete="organization" placeholder="Empresa"
                      value={company} onChange={e => setCompany(e.target.value)}
                      className={inputNormal}
                    />
                  </div>
                </div>

                {/* Email — requerido */}
                <div className="mb-2">
                  <label htmlFor="wiz-email" className="block text-[.8rem] font-semibold mb-1">
                    Email <span className="text-[var(--color-coral)]">*</span>
                  </label>
                  <input
                    type="email" id="wiz-email" autoComplete="email" placeholder="tu@email.com"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (touched.email) {
                        const v = e.target.value;
                        setErrors(er => ({ ...er, email: !v.trim() ? 'El email es obligatorio.' : !isValidEmail(v) ? 'Ingresa un email válido (ej: tu@email.com).' : undefined }));
                      }
                    }}
                    onBlur={() => touch('email')}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                    aria-invalid={!!errors.email}
                    className={touched.email && errors.email ? inputErrorCls : inputNormal}
                  />
                  <FieldError id="err-email" msg={touched.email ? errors.email : null} />
                </div>

                {/* WhatsApp — opcional */}
                <div className="mb-3">
                  <label htmlFor="wiz-whatsapp" className="block text-[.8rem] font-semibold mb-1">
                    WhatsApp <span className="font-normal text-[var(--color-muted)]">(opcional)</span>
                  </label>
                  <input
                    type="tel" id="wiz-whatsapp" autoComplete="tel" placeholder="+1 (809) 555-1234"
                    value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
                    className={inputNormal}
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
        </div>
      </div>
    </section>
  );
}
