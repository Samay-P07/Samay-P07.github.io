import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitView, setSubmitView] = useState('idle'); // 'idle' | 'success' | 'activation'
  const [submittedName, setSubmittedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validate fields
  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = 'Please provide your full name.';
    if (!formState.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formState.subject.trim()) errs.subject = 'Subject cannot be empty.';
    if (!formState.message.trim() || formState.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    const name = formState.name.trim();

    try {
      // Target endpoint (Formspree if ID configured, otherwise FormSubmit direct to samaypatel713@gmail.com)
      const endpoint = formspreeId
        ? `https://formspree.io/f/${formspreeId}`
        : `https://formsubmit.co/ajax/${PORTFOLIO_DATA.personal.email}`;

      const payload = {
        name: formState.name.trim(),
        email: formState.email.trim(),
        subject: formState.subject.trim(),
        message: formState.message.trim(),
        _subject: `New Portfolio Inquiry from ${formState.name.trim()}: ${formState.subject.trim()}`,
        _replyto: formState.email.trim(),
        _template: 'table',
        _captcha: 'false'
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Save a local backup in browser storage so inquiry is never lost
      try {
        const existing = JSON.parse(localStorage.getItem('samay_portfolio_messages') || '[]');
        existing.push({
          date: new Date().toISOString(),
          ...payload
        });
        localStorage.setItem('samay_portfolio_messages', JSON.stringify(existing));
      } catch {
        // ignore storage errors
      }

      // Check if FormSubmit requires initial one-time email activation
      if (
        data &&
        (data.message?.toLowerCase().includes('activation') ||
         (data.success === 'false' || data.success === false) && data.message?.toLowerCase().includes('activ'))
      ) {
        setSubmittedName(name);
        setSubmitView('activation');
        setFormState({ name: '', email: '', subject: '', message: '' });
        return;
      }

      if (data && (data.success === true || data.success === 'true' || response.ok)) {
        setSubmittedName(name);
        setSubmitView('success');
        setFormState({ name: '', email: '', subject: '', message: '' });

        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#8fcaff', '#ffffff', '#3b86ff', '#5ce1e6']
          });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage(
          data?.message || 'Unable to deliver message at this time. Please email directly at samaypatel713@gmail.com'
        );
      }
    } catch {
      setErrorMessage(
        'Network transmission error. Please verify your connection or email directly at samaypatel713@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>06 // GET IN TOUCH</span>
          </div>
          <h2 className="section-title">
            Let's <span className="font-serif-italic">Connect</span>
          </h2>
          <p className="section-subtitle">
            I'm always interested in discussing new opportunities, software engineering roles, and collaborations. Feel free to get in touch.
          </p>
        </div>

        <div className="contact-layout">
          
          {/* Left Column: Direct Contact Info Tiles */}
          <div className="contact-card-list">
            
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="contact-info-tile"
              aria-label={`Send direct email to ${PORTFOLIO_DATA.personal.email}`}
            >
              <div className="contact-icon-box">
                <Mail size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="contact-tile-label">DIRECT EMAIL</div>
                <div className="contact-tile-val">{PORTFOLIO_DATA.personal.email}</div>
              </div>
            </a>

            <div className="contact-info-tile">
              <div className="contact-icon-box">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="contact-tile-label">LOCATION</div>
                <div className="contact-tile-val">{PORTFOLIO_DATA.personal.location}</div>
              </div>
            </div>

            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`}
              className="contact-info-tile"
              aria-label={`Call ${PORTFOLIO_DATA.personal.phone}`}
            >
              <div className="contact-icon-box">
                <Phone size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="contact-tile-label">PHONE NUMBER</div>
                <div className="contact-tile-val">{PORTFOLIO_DATA.personal.phone}</div>
              </div>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-info-tile"
              aria-label="Samay Patel on LinkedIn"
            >
              <div className="contact-icon-box">
                <LinkedinIcon size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="contact-tile-label">LINKEDIN PROFILE</div>
                <div className="contact-tile-val">linkedin.com/in/samaypatel7</div>
              </div>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-info-tile"
              aria-label="Samay Patel on GitHub"
            >
              <div className="contact-icon-box">
                <GithubIcon size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="contact-tile-label">GITHUB REPOSITORIES</div>
                <div className="contact-tile-val">github.com/Samay-P07</div>
              </div>
            </a>

          </div>

          {/* Right Column: Real Email Form & Feedback */}
          <div className="contact-form-panel">
            
            {submitView === 'activation' ? (
              <div className="contact-success-screen" role="status" aria-live="polite">
                <div
                  className="success-icon-badge"
                  style={{
                    borderColor: '#ffbe3b',
                    background: 'rgba(255, 190, 59, 0.1)',
                    boxShadow: '0 0 30px rgba(255, 190, 59, 0.25)'
                  }}
                >
                  <Mail size={38} color="#ffbe3b" aria-hidden="true" />
                </div>
                
                <h3 className="success-screen-title" style={{ fontSize: '1.75rem' }}>
                  One-Time Activation Required
                </h3>
                
                <div
                  style={{
                    background: 'rgba(255, 190, 59, 0.08)',
                    border: '1px solid rgba(255, 190, 59, 0.3)',
                    borderRadius: '12px',
                    padding: '1.2rem',
                    color: '#e2e8f0',
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                    textAlign: 'left',
                    marginBottom: '1.2rem',
                    width: '100%',
                    maxWidth: '460px'
                  }}
                >
                  <p style={{ margin: '0 0 0.8rem 0' }}>
                    FormSubmit has sent an activation email to:
                    <br />
                    <strong style={{ color: '#8fcaff', fontSize: '1rem' }}>{PORTFOLIO_DATA.personal.email}</strong>
                  </p>
                  
                  <div style={{ fontSize: '0.86rem', color: '#cbd5e1' }}>
                    <div style={{ marginBottom: '6px' }}><strong>Step 1:</strong> Open your Gmail inbox (check <strong>Spam / Updates</strong> folder if not in Primary).</div>
                    <div style={{ marginBottom: '6px' }}><strong>Step 2:</strong> Look for email from <em>FormSubmit</em> titled <em>"Action Required: Activate your form"</em>.</div>
                    <div><strong>Step 3:</strong> Click the <strong>"Activate Form"</strong> button.</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--fg-muted)', maxWidth: '440px', marginBottom: '1.2rem' }}>
                  After activating once, all future messages sent through this form will arrive straight in your Gmail inbox!
                </p>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a
                    href="https://mail.google.com/mail/u/0/#search/from%3Aformsubmit"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: '0.88rem', padding: '0.65rem 1.2rem' }}
                  >
                    <span>Open Gmail Search</span>
                    <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmitView('idle')}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.88rem', padding: '0.65rem 1.2rem' }}
                  >
                    <span>I've Activated / Back to Form</span>
                  </button>
                </div>
              </div>
            ) : submitView === 'success' ? (
              <div className="contact-success-screen" role="status" aria-live="polite">
                <div className="success-icon-badge">
                  <CheckCircle2 size={46} color="var(--accent)" aria-hidden="true" />
                </div>
                <h3 className="success-screen-title">Message Sent Successfully!</h3>
                
                <p className="success-screen-desc">
                  Thank you, <strong style={{ color: '#ffffff' }}>{submittedName}</strong>! Your message has been delivered directly to <strong style={{ color: 'var(--accent)' }}>{PORTFOLIO_DATA.personal.email}</strong>. I will get back to you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitView('idle')}
                  className="btn btn-secondary"
                  style={{ marginTop: '1.2rem' }}
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact Samay Patel">
                
                {errorMessage && (
                  <div className="form-error-banner" role="alert">
                    <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    {errorMessage}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    placeholder="e.g. Jane Doe"
                    value={formState.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className="field-error-msg" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Your Email <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="e.g. jane@company.com"
                    value={formState.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="field-error-msg" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className={`form-input ${errors.subject ? 'input-error' : ''}`}
                    placeholder="e.g. Software Engineering Opportunity"
                    value={formState.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    aria-required="true"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && (
                    <span id="subject-error" className="field-error-msg" role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="req" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                    placeholder="Please describe your project, role details, or inquiry..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="field-error-msg" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  aria-label="Send contact message to Samay Patel"
                >
                  <Send size={15} aria-hidden="true" />
                  <span>{isSubmitting ? 'Transmitting message...' : 'Send Message'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
