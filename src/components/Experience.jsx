import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>02 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="section-title">
            Internship <span className="font-serif-italic">Experience</span>
          </h2>
          <p className="section-subtitle">
            Hands-on software development and backend engineering internships documented from my CV.
          </p>
        </div>

        {/* Clean Editorial Timeline Layout */}
        <div className="experience-timeline">
          {PORTFOLIO_DATA.experience.map((exp) => (
            <div key={exp.id} className="timeline-item">
              
              {/* Timeline Marker */}
              <div className="timeline-marker" aria-hidden="true">
                <div className="marker-dot" />
                <div className="marker-line" />
              </div>

              {/* Experience Card */}
              <div className="timeline-content-card">
                <div className="exp-card-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company-row">
                      <Briefcase size={14} className="exp-icon" aria-hidden="true" />
                      <span className="exp-company">{exp.company}</span>
                      <span className="exp-sep">•</span>
                      <MapPin size={13} className="exp-icon" aria-hidden="true" />
                      <span className="exp-location">{exp.location}</span>
                    </div>
                  </div>

                  <div className="exp-period-pill">
                    <Calendar size={13} aria-hidden="true" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ul className="exp-bullets" aria-label={`Responsibilities at ${exp.company}`}>
                  {exp.highlights.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>

                <div className="tech-tag-row" aria-label="Technologies used">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="tech-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
