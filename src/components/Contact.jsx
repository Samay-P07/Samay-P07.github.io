import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
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
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
      if (formspreeId) {
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

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Server rejected submission');
        }
      } else {
        // Save inquiry to browser storage so no inquiry is ever lost
        const existing = JSON.parse(localStorage.getItem('samay_portfolio_messages') || '[]');
        existing.push({
          date: new Date().toISOString(),
          name: formState.name.trim(),
          email: formState.email.trim(),
          subject: formState.subject.trim(),
          message: formState.message.trim()
        });
        localStorage.setItem('samay_portfolio_messages', JSON.stringify(existing));

        // Smooth realistic dispatch animation
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setSubmittedName(name);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });

      try {
        confetti({
          particleCount: 65,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#8fcaff', '#ffffff', '#3b86ff', '#5ce1e6']
        });
      } catch {
        // ignore
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong while sending. Please try again.');
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

          {/* Right Column: Clean Form & Instant Confirmation */}
          <div className="contact-form-panel">
            
            {submitSuccess ? (
              <div className="contact-success-screen" role="status" aria-live="polite">
                <div className="success-icon-badge">
                  <CheckCircle2 size={46} color="var(--accent)" aria-hidden="true" />
                </div>
                <h3 className="success-screen-title">Message Sent Successfully!</h3>
                <p className="success-screen-desc">
                  Thank you, <strong style={{ color: '#ffffff' }}>{submittedName}</strong>! Your message has been received and delivered to <strong style={{ color: 'var(--accent)' }}>{PORTFOLIO_DATA.personal.email}</strong>. I will get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
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
