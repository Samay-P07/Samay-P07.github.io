import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Constant copyright year computed once outside render
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        
        <div className="footer-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
              <span className="footer-title">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="logo-badge">ENGINEERING</span>
            </div>
            <p className="footer-subtitle">
              Software Developer | Full-Stack &amp; Machine Learning <span className="sep">//</span> TU Chemnitz, Germany
            </p>
          </div>

          <div className="footer-actions">
            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              aria-label="Samay Patel on GitHub"
            >
              <GithubIcon size={14} aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              aria-label="Samay Patel on LinkedIn"
            >
              <LinkedinIcon size={14} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="btn btn-primary btn-sm"
              aria-label="Scroll back to top of the page"
            >
              <ArrowUp size={14} aria-hidden="true" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {CURRENT_YEAR} {PORTFOLIO_DATA.personal.name}. All rights reserved.
          </div>
          <div className="footer-location">
            <span>TU Chemnitz, Germany</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
