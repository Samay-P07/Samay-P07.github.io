import React from 'react';
import { GraduationCap, BookOpen, Globe2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>04 // ACADEMIC BACKGROUND &amp; LANGUAGES</span>
          </div>
          <h2 className="section-title">
            Education &amp; <span className="font-serif-italic">Languages</span>
          </h2>
          <p className="section-subtitle">
            Formal degrees in Web Engineering and Information Technology alongside verified language proficiency.
          </p>
        </div>

        <div className="edu-languages-layout">
          
          {/* Degrees Grid */}
          <div className="degrees-grid">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="degree-card">
                <div className="degree-card-top">
                  <div className="degree-icon-box">
                    <GraduationCap size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="degree-period">{edu.period}</span>
                    <h3 className="degree-name">{edu.degree}</h3>
                  </div>
                  {edu.grade && (
                    <span className="degree-grade-badge">
                      {edu.grade}
                    </span>
                  )}
                </div>

                <div className="degree-major">{edu.major}</div>
                <div className="degree-school">
                  {edu.institution} <span className="sep">•</span> {edu.location}
                </div>

                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="coursework-block">
                    <div className="coursework-label">
                      <BookOpen size={13} aria-hidden="true" />
                      <span>Relevant Coursework:</span>
                    </div>
                    <p className="coursework-list" aria-label="Relevant coursework subjects">
                      {edu.coursework.map((course, idx) => (
                        <React.Fragment key={course}>
                          <span className="coursework-item">{course}</span>
                          {idx < edu.coursework.length - 1 && (
                            <span className="coursework-sep" aria-hidden="true">
                              {' '}
                              |{' '}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Languages Block */}
          <div className="languages-card">
            <div className="lang-header">
              <Globe2 size={20} className="lang-globe-icon" aria-hidden="true" />
              <h3 className="lang-title">
                Languages
              </h3>
            </div>

            <div className="languages-grid">
              {PORTFOLIO_DATA.languages.map((lang) => (
                <div key={lang.name} className="lang-tile">
                  <div className="lang-name">{lang.name}</div>
                  <div className="lang-level">{lang.level}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
