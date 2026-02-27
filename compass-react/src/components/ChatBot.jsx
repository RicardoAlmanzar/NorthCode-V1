import { useState, useEffect, useRef, useCallback } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { NorthCodeIcon } from './ui/Icons';
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
  CHAT_GREETING,
  CHAT_WA_NUDGE,
  CHAT_FAQS,
  CHAT_LEAD_SUCCESS,
  CHAT_LEAD_ERROR,
  FORM_ENDPOINT,
} from '../config/chatbot.config';

/* ─── Helpers ─── */
const waUrl = (number = WHATSAPP_NUMBER, text = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

const validateLead = ({ name, email, message }) => {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Mínimo 2 caracteres';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Email inválido';
  if (!message || message.trim().length < 10) errors.message = 'Mínimo 10 caracteres';
  return errors;
};

/* ─── Icons (inline SVG, no deps) ─── */
function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

/* ─── Message Bubble ─── */
function Bubble({ from, children }) {
  const isBot = from === 'bot';
  return (
    <div className={`chatbot-bubble ${isBot ? 'chatbot-bubble-bot' : 'chatbot-bubble-user'}`}>
      {children}
    </div>
  );
}

/* ─── Main Component ─── */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('chat'); // 'chat' | 'lead'
  const [messages, setMessages] = useState([{ from: 'bot', text: CHAT_GREETING }]);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', message: '' });
  const [leadErrors, setLeadErrors] = useState({});
  const [leadStatus, setLeadStatus] = useState('idle'); // idle | loading | success | error
  const [faqCount, setFaqCount] = useState(0);
  const [nudgeShown, setNudgeShown] = useState(false);

  const panelRef = useFocusTrap(open);
  const scrollRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Autoscroll to last message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, view]);

  // Focus close button on open
  useEffect(() => {
    if (open) {
      document.body.style.setProperty('--chatbot-open', '1');
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.removeProperty('--chatbot-open');
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Click outside to close
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) setOpen(false);
  }, []);

  // FAQ chip click
  const handleFaq = useCallback((faq) => {
    const newCount = faqCount + 1;
    setFaqCount(newCount);

    const newMessages = [
      { from: 'user', text: faq.chip },
      { from: 'bot', text: faq.answer },
    ];

    if (newCount >= 2 && !nudgeShown) {
      newMessages.push({ from: 'bot', text: CHAT_WA_NUDGE, isNudge: true });
      setNudgeShown(true);
    }

    setMessages(prev => [...prev, ...newMessages]);
  }, [faqCount, nudgeShown]);

  // Lead form
  const handleLeadChange = useCallback((e) => {
    const { name, value } = e.target;
    setLeadForm(prev => ({ ...prev, [name]: value }));
    setLeadErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const handleLeadSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errors = validateLead(leadForm);
    if (Object.keys(errors).length) { setLeadErrors(errors); return; }

    setLeadStatus('loading');
    try {
      if (!FORM_ENDPOINT) {
        await new Promise(r => setTimeout(r, 800));
        console.info('[ChatBot Lead - Simulated]', leadForm);
      } else {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...leadForm,
            _subject: `Nuevo Lead ChatBot: ${leadForm.name}`
          })
        });
        if (!response.ok) throw new Error('Submission failed');
      }
      setLeadStatus('success');
      setMessages(prev => [...prev, { from: 'bot', text: CHAT_LEAD_SUCCESS }]);
      setLeadForm({ name: '', email: '', message: '' });
      setTimeout(() => { setView('chat'); setLeadStatus('idle'); }, 2000);
    } catch {
      setLeadStatus('error');
      setMessages(prev => [...prev, { from: 'bot', text: CHAT_LEAD_ERROR }]);
    }
  }, [leadForm]);

  return (
    <>
      {/* ── Floating Bubble ── */}
      <button
        onClick={() => setOpen(true)}
        className={`chatbot-fab ${open ? 'chatbot-fab-hidden' : ''}`}
        aria-label="Abrir chat de asistencia"
        type="button"
      >
        <ChatIcon />
      </button>

      {/* ── Panel ── */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={`chatbot-overlay ${open ? 'chatbot-overlay-visible' : ''}`}
        onClick={handleOverlayClick}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Chat de asistencia NorthCode"
          aria-modal="true"
          className={`chatbot-panel ${open ? 'chatbot-panel-open' : ''}`}
        >
          {/* Header */}
          <header className="chatbot-header">
            <div className="flex items-center gap-2.5">
              <div className="chatbot-avatar flex items-center justify-center p-0 overflow-hidden bg-white rounded-full">
                <NorthCodeIcon size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">NorthCode</p>
                <p className="text-[.7rem] text-white/55 leading-tight mt-0.5">Responde en minutos</p>
              </div>
            </div>
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              className="chatbot-close"
              aria-label="Cerrar chat"
              type="button"
            >
              <CloseIcon />
            </button>
          </header>

          {/* Body */}
          <div ref={scrollRef} className="chatbot-body">
            {/* Messages */}
            {messages.map((msg, i) => (
              <Bubble key={i} from={msg.from}>{msg.text}</Bubble>
            ))}

            {/* FAQ chips (show after greeting, in chat view) */}
            {view === 'chat' && (
              <div className="chatbot-chips">
                {CHAT_FAQS.map((faq, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleFaq(faq)}
                    className="chatbot-chip"
                  >
                    {faq.chip}
                  </button>
                ))}
              </div>
            )}

            {/* Lead form (inline in body) */}
            {view === 'lead' && (
              <div className="chatbot-lead-form">
                <p className="text-[.78rem] text-white/70 mb-3">Déjanos tus datos y te contactamos:</p>
                <form onSubmit={handleLeadSubmit} noValidate>
                  <div className="chatbot-field">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      autoComplete="name"
                      value={leadForm.name}
                      onChange={handleLeadChange}
                      className={`chatbot-input ${leadErrors.name ? 'chatbot-input-error' : ''}`}
                      aria-invalid={!!leadErrors.name}
                      aria-describedby={leadErrors.name ? 'lead-name-err' : undefined}
                    />
                    {leadErrors.name && <p id="lead-name-err" className="chatbot-error">{leadErrors.name}</p>}
                  </div>
                  <div className="chatbot-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={leadForm.email}
                      onChange={handleLeadChange}
                      className={`chatbot-input ${leadErrors.email ? 'chatbot-input-error' : ''}`}
                      aria-invalid={!!leadErrors.email}
                      aria-describedby={leadErrors.email ? 'lead-email-err' : undefined}
                    />
                    {leadErrors.email && <p id="lead-email-err" className="chatbot-error">{leadErrors.email}</p>}
                  </div>
                  <div className="chatbot-field">
                    <textarea
                      name="message"
                      placeholder="Cuéntanos sobre tu proyecto (mín. 10 caracteres)"
                      rows={3}
                      value={leadForm.message}
                      onChange={handleLeadChange}
                      className={`chatbot-input chatbot-textarea ${leadErrors.message ? 'chatbot-input-error' : ''}`}
                      aria-invalid={!!leadErrors.message}
                      aria-describedby={leadErrors.message ? 'lead-msg-err' : undefined}
                    />
                    {leadErrors.message && <p id="lead-msg-err" className="chatbot-error">{leadErrors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={leadStatus === 'loading' || leadStatus === 'success'}
                    className="chatbot-submit"
                  >
                    {leadStatus === 'loading' ? (
                      <span className="chatbot-spinner" />
                    ) : leadStatus === 'success' ? (
                      '✓ Enviado'
                    ) : (
                      <><SendIcon /> Enviar mensaje</>
                    )}
                  </button>
                  {leadStatus === 'error' && (
                    <p className="chatbot-error mt-2 text-center">{CHAT_LEAD_ERROR}</p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="chatbot-footer">
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="chatbot-wa-btn"
            >
              <WhatsAppIcon /> Cotizar por WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setView(v => v === 'lead' ? 'chat' : 'lead')}
              className="chatbot-lead-toggle"
            >
              {view === 'lead' ? '← Volver al chat' : '✉ Dejar un mensaje'}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
