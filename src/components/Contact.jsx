import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback_opened' | 'error'
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
  };

  const openMailtoDirectly = () => {
    const subject = encodeURIComponent(formState.subject.trim() || 'Software Developer Inquiry // Samay Patel');
    const body = encodeURIComponent(
      `Hello Samay,\n\nName: ${formState.name.trim()}\nEmail: ${formState.email.trim()}\n\nMessage:\n${formState.message.trim()}\n`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    // 1. If Formspree ID is configured in .env, submit via API
    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            subject: formState.subject.trim(),
            message: formState.message.trim()
          })
        });

        if (response.ok) {
          setSubmitStatus('success');
          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.7 },
              colors: ['#8fcaff', '#ffffff', '#3b86ff']
            });
          } catch {
            // ignore
          }
          setFormState({ name: '', email: '', subject: '', message: '' });
        } else {
          const data = await response.json();
          setSubmitStatus('error');
          setErrorMessage(data.error || 'Server rejected submission. You can use the direct email client below.');
        }
      } catch {
        setSubmitStatus('error');
        setErrorMessage('Network connection error. Please use the direct email link below.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // 2. No third-party API key configured: Honest, transparent mailto dispatch!
      // We NEVER fake that an email was sent. We open the user's mail client with all details prefilled.
      setIsSubmitting(false);
      setSubmitStatus('fallback_opened');
      openMailtoDirectly();
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
            I'm always interested in discussing new opportunities, interesting projects, and collaborations. Feel free to get in touch.
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

          {/* Right Column: Accessible, Honest Form */}
          <div className="contact-form-panel">
            
            {submitStatus === 'success' && (
              <div className="form-feedback-card success" role="status" aria-live="polite">
                <CheckCircle2 size={36} color="var(--accent)" aria-hidden="true" />
                <div>
                  <h4 className="feedback-title">Message Delivered Successfully</h4>
                  <p className="feedback-desc">
                    Thank you! Your message was transmitted to Samay. You will receive a response shortly.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'fallback_opened' && (
              <div className="form-feedback-card info" role="status" aria-live="polite">
                <Mail size={36} color="var(--accent)" aria-hidden="true" />
                <div>
                  <h4 className="feedback-title">Email Client Triggered</h4>
                  <p className="feedback-desc">
                    Your email client was opened with your message prefilled. If it did not open automatically, click the button below to send directly:
                  </p>
                  <button
                    type="button"
                    onClick={openMailtoDirectly}
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '0.8rem' }}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    <span>Open in Default Mail Client</span>
                  </button>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-feedback-card error" role="alert" aria-live="assertive">
                <AlertTriangle size={36} color="#ff6b6b" aria-hidden="true" />
                <div>
                  <h4 className="feedback-title">Submission Error</h4>
                  <p className="feedback-desc">{errorMessage}</p>
                  <button
                    type="button"
                    onClick={openMailtoDirectly}
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '0.8rem' }}
                  >
                    <span>Send via Direct Email Client</span>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate aria-label="Contact Samay Patel">
              
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
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
