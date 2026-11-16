import React from 'react';
import { Award, BookOpen, MapPin, Code2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>01 // BACKGROUND &amp; PROFILE</span>
          </div>
          <h2 className="section-title">
            About <span className="font-serif-italic">Me</span>
          </h2>
          <p className="section-subtitle">
            Software Developer and M.Sc. Web Engineering student at TU Chemnitz with hands-on experience in full-stack web applications, REST APIs, and applied machine learning.
          </p>
        </div>

        <div className="about-content-layout">
          
          {/* Narrative Column */}
          <div className="about-bio-card">
            <div className="about-bio-text">
              <p>
                I am currently pursuing an <strong style={{ color: '#ffffff' }}>M.Sc. in Web Engineering at Technische Universität Chemnitz, Germany</strong>. I completed my Bachelor's degree in Information Technology with a <strong style={{ color: 'var(--accent)' }}>CGPA of 8.94</strong>.
              </p>
              <p>
                My interests include <strong style={{ color: '#ffffff' }}>software development, backend engineering, full-stack applications, data science, and artificial intelligence</strong>. I have hands-on experience in building full-stack web applications, developing REST APIs, working with databases, and integrating machine learning features.
              </p>
              <p>
                During my internships, I gained practical experience working with <strong style={{ color: '#ffffff' }}>Django, Flask, databases, frontend technologies, and application development</strong>. I enjoy learning new technologies, solving technical challenges, and turning ideas into working applications that are practical, scalable, and user-friendly.
              </p>
            </div>
          </div>

          {/* Credentials Column */}
          <div className="about-credentials-grid">
            <div className="credential-tile">
              <div className="cred-icon-wrap">
                <BookOpen size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="cred-label">CURRENT PROGRAM</div>
                <div className="cred-val">M.Sc. Web Engineering</div>
                <div className="cred-sub">TU Chemnitz, Germany (2025 – Present)</div>
              </div>
            </div>

            <div className="credential-tile">
              <div className="cred-icon-wrap">
                <Award size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="cred-label">UNDERGRADUATE DEGREE</div>
                <div className="cred-val">B.E. Information Technology</div>
                <div className="cred-sub">Alpha College (CGPA: 8.94 / 10.0)</div>
              </div>
            </div>

            <div className="credential-tile">
              <div className="cred-icon-wrap">
                <Code2 size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="cred-label">CORE DOMAIN</div>
                <div className="cred-val">Full-Stack &amp; Backend Engineering</div>
                <div className="cred-sub">Python (Django/FastAPI/Flask) &amp; JS</div>
              </div>
            </div>

            <div className="credential-tile">
              <div className="cred-icon-wrap">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="cred-label">LOCATION</div>
                <div className="cred-val">Chemnitz, Germany</div>
                <div className="cred-sub">Saxony, Germany</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
