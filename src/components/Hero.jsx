import React from 'react';
import { Download, FolderGit2, Mail, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Hero() {
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8fcaff', '#ffffff', '#3b86ff', '#5ce1e6']
      });
    } catch {
      // ignore
    }
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="section hero-section">
      <div className="container">
        
        <div className="hero-grid">
          
          {/* Left Column: Heading, Subtitle, Pitch & Actions */}
          <div className="hero-text-col">
            <div className="section-tag" style={{ marginBottom: '1rem' }}>
              <span>SOFTWARE DEVELOPER // M.SC. WEB ENGINEERING</span>
            </div>

            <h1 className="hero-name">
              Samay Patel
            </h1>

            <p className="hero-title">
              Software Developer &amp; Full-Stack Engineer
              <span className="hero-subline">TU Chemnitz, Germany</span>
            </p>

            <p className="hero-intro">
              "{PORTFOLIO_DATA.personal.tagline}"
            </p>

            {/* Action Buttons */}
            <div className="hero-actions">
              <a
                href={PORTFOLIO_DATA.personal.cvPath}
                download="Samay_Patel_CV.pdf"
                onClick={triggerConfetti}
                className="btn btn-primary"
                title="Download Samay Patel's CV (PDF)"
                aria-label="Download Samay Patel's CV in PDF format"
              >
                <Download size={16} aria-hidden="true" />
                <span>Download CV</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="btn btn-secondary"
                aria-label="View featured engineering projects"
              >
                <FolderGit2 size={16} aria-hidden="true" />
                <span>View Projects</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="btn btn-secondary"
                aria-label="Navigate to contact section"
              >
                <Mail size={16} aria-hidden="true" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Direct Social & Professional Links */}
            <div className="hero-social-bar">
              <a
                href={PORTFOLIO_DATA.personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
                aria-label="Samay Patel GitHub Profile"
              >
                <GithubIcon size={16} aria-hidden="true" />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
                aria-label="Samay Patel LinkedIn Profile"
              >
                <LinkedinIcon size={16} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="hero-social-link"
                aria-label="Email Samay Patel directly"
              >
                <Mail size={16} aria-hidden="true" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </a>

              <span className="hero-loc-pill">
                Chemnitz, DE
              </span>
            </div>
          </div>

          {/* Right Column: Prominent Profile Frame */}
          <div className="hero-visual-col">
            <div className="porthole-wrap">
              <svg className="porthole-arc" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="48" />
              </svg>
              
              <div className="porthole">
                <div className="porthole-glass">
                  <img
                    src={PORTFOLIO_DATA.personal.profileImage}
                    alt="Samay Patel - Software Developer"
                    width="320"
                    height="320"
                    loading="eager"
                  />
                </div>
                <span className="porthole-sweep" aria-hidden="true" />
              </div>
            </div>

            <div className="hero-caption">
              <span>M.Sc. Web Engineering</span>
              <span className="sep">•</span>
              <span>TU Chemnitz</span>
            </div>
          </div>

        </div>

        {/* Scroll Cue */}
        <div className="hero-scroll-cue">
          <span>Scroll to explore portfolio</span>
          <ArrowDown size={14} aria-hidden="true" />
        </div>

      </div>
    </section>
  );
}
