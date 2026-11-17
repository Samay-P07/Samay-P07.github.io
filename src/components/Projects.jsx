import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="section projects-editorial-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>03 // FEATURED PROJECTS</span>
          </div>
          <h2 className="section-title">
            Academic &amp; <span className="font-serif-italic">Engineering Projects</span>
          </h2>
          <p className="section-subtitle">
            Full-stack systems, machine learning pipelines, and backend APIs documented from my CV and hosted repositories.
          </p>
        </div>

        {/* Compact Horizontal Editorial Showcase List */}
        <div className="editorial-projects-list">
          {PORTFOLIO_DATA.projects.map((project, idx) => {
            const isExpanded = expandedId === project.id;
            const isEven = idx % 2 === 1;
            const projectNumber = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={project.id}
                className={`editorial-project-card ${isEven ? 'row-reversed' : ''} ${
                  isExpanded ? 'is-expanded' : ''
                }`}
                aria-labelledby={`project-title-${project.id}`}
              >
                {/* 1. Media Frame Column */}
                <div className="editorial-media-column">
                  <div className="editorial-media-frame">
                    <img
                      src={project.image}
                      alt={`${project.shortTitle} project interface`}
                      width="580"
                      height="360"
                      loading="lazy"
                    />

                    {/* Subtle Overlay Tag */}
                    <div className="media-overlay-badge">
                      {project.liveUrl ? (
                        <span className="live-status-pill">
                          <span className="live-pulsar" aria-hidden="true" />
                          <span>Live System</span>
                        </span>
                      ) : (
                        <span className="repo-status-pill">
                          <span>Open Source</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Content Body Column */}
                <div className="editorial-content-column">
                  
                  {/* Metadata Bar */}
                  <div className="editorial-meta-row">
                    <span className="project-index-tag">// {projectNumber}</span>
                    <span className="meta-sep">•</span>
                    <span className="project-category-tag">{project.subtitle}</span>
                  </div>

                  {/* Serif Project Headline */}
                  <h3 id={`project-title-${project.id}`} className="editorial-project-title">
                    {project.shortTitle}
                  </h3>

                  {/* Concise Description */}
                  <p className="editorial-project-desc">
                    {project.description}
                  </p>

                  {/* Compact Horizontal Key Metrics Row (4 Metrics) */}
                  <div className="editorial-metrics-strip" aria-label="Key Technical Metrics">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="metric-chip">
                        <span className="chip-label">{m.label}</span>
                        <span className="chip-value">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Compact Technology Stack Pills */}
                  <div className="editorial-tech-ribbon" aria-label="Technologies Used">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Primary & Secondary Action Buttons */}
                  <div className="editorial-actions-bar">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                        aria-label={`Open live web demo of ${project.shortTitle}`}
                      >
                        <ExternalLink size={13} aria-hidden="true" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                      aria-label={`View ${project.shortTitle} source code on GitHub`}
                    >
                      <GithubIcon size={13} aria-hidden="true" />
                      <span>Source Code</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="btn btn-ghost btn-sm details-toggle-btn"
                      aria-expanded={isExpanded}
                      aria-controls={`drawer-${project.id}`}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} case study for ${project.shortTitle}`}
                    >
                      <span>{isExpanded ? 'Close Case Study' : 'Case Study Details'}</span>
                      {isExpanded ? (
                        <ChevronUp size={14} aria-hidden="true" />
                      ) : (
                        <ChevronDown size={14} aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Case Study Drawer (Preserves 100% of CV Bullet Points) */}
                  {isExpanded && (
                    <div
                      id={`drawer-${project.id}`}
                      className="editorial-expanded-drawer"
                      role="region"
                      aria-label={`Full case study details for ${project.shortTitle}`}
                    >
                      <div className="drawer-inner-content">
                        
                        <div className="drawer-header-row">
                          <div className="drawer-tag">
                            <Layers size={13} aria-hidden="true" />
                            <span>Technical Architecture &amp; CV Highlights:</span>
                          </div>
                          <span className="drawer-full-title">{project.title}</span>
                        </div>

                        {/* Complete Bullet Points (100% Verbatim) */}
                        <ul className="drawer-highlights-list">
                          {project.highlights.map((bullet, bIdx) => (
                            <li key={bIdx}>
                              <CheckCircle2 size={14} className="bullet-check-icon" aria-hidden="true" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Footer in Expanded View */}
                        <div className="drawer-footer-row">
                          <span className="drawer-repo-note">
                            Verified from Samay Patel's official engineering resume and repository commit tree.
                          </span>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}