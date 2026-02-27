import React, { useState } from "react";
import "../index.css";

const steps = [
  {
    title: "¿Qué necesitas?",
    content: (
      <div>
        <h2>¿Qué necesitas?</h2>
        <p>Selecciona el tipo de proyecto que tienes en mente.</p>
        <div className="step-options">
          <button className="step-option">Diseño Web</button>
          <button className="step-option">Branding</button>
          <button className="step-option">App / Software</button>
        </div>
        <label style={{ marginTop: "2rem" }}>¿Tienes fecha límite? (opcional)</label>
        <input type="date" className="step-date" />
      </div>
    ),
  },
  {
    title: "Detalles",
    content: (
      <div>
        <h2>Detalles del proyecto</h2>
        <p>Cuéntanos más sobre lo que necesitas. Describe tu idea, objetivos, funcionalidades o cualquier detalle relevante.</p>
        <textarea className="step-textarea" placeholder="Describe tu proyecto..." />
      </div>
    ),
  },
  {
    title: "Contacto",
    content: (
      <div>
        <h2>Contacto</h2>
        <input className="step-input" placeholder="Tu nombre" />
        <input className="step-input" placeholder="Tu email" />
      </div>
    ),
  },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  return (
    <div className="form-card">
      <div className="form-step-content">
        {steps[step].content}
      </div>
      <div className="form-step-footer">
        <button
          className="step-nav"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Anterior
        </button>
        <button
          className="step-nav"
          disabled={step === steps.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

/*
CSS sugerido para index.css:

.form-card {
  width: 480px;
  height: 420px;
  max-width: 100%;
  max-height: 90vh;
  min-width: 320px;
  min-height: 320px;
  background: #181c22;
  border-radius: 24px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 64px;
}

.form-step-content {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.form-step-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background: transparent;
}

.step-nav {
  background: #ff7f6b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.step-nav:disabled {
  background: #333;
  cursor: not-allowed;
}

.step-options {
  display: flex;
  gap: 24px;
  margin: 24px 0;
}

.step-option {
  background: #222;
  color: #ff7f6b;
  border: 1px solid #ff7f6b;
  border-radius: 12px;
  padding: 24px 32px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.step-option:focus,
.step-option:hover {
  background: #ff7f6b;
  color: #fff;
}

.step-date,
.step-input,
.step-textarea {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #222;
  color: #fff;
  font-size: 1rem;
}

.step-textarea {
  min-height: 120px;
  resize: vertical;
}

@media (max-width: 600px) {
  .form-card {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    max-height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
  }
  .form-step-content {
    padding: 16px 8px;
  }
  .form-step-footer {
    padding: 8px 8px;
  }
}
*/
