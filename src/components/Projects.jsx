import React, { useState } from 'react';
import { ExternalLink, X, Info } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>04 // FEATURED PROJECTS</span>
          </div>
          <h2 className="section-title">
            Academic &amp; <span className="font-serif-italic">Engineering Projects</span>
          </h2>
          <p className="section-subtitle">
            Full-stack systems, machine learning pipelines, and backend APIs documented from my CV and hosted repositories.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {PORTFOLIO_DATA.projects.map((project) => (
            <article key={project.id} className="project-card" tabIndex={0}>
              
              {/* Media Aspect Frame */}
              <div className="project-media-frame">
                <img
                  src={project.image}
                  alt={`${project.shortTitle} project interface`}
                  width="600"
                  height="338"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="project-body">
                <div className="project-header">
                  <h3 className="project-title">{project.shortTitle}</h3>
                  <div className="project-subtitle">{project.subtitle}</div>
                </div>

                <p className="project-desc">
                  {project.description}
                </p>

                {/* Metrics Row */}
                <div className="project-metrics-row" aria-label="Key Technical Metrics">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="metric-col">
                      <div className="m-label">{m.label}</div>
                      <div className="m-val">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* CV-Supported Technical Highlights */}
                <ul className="project-features-list" aria-label="Technical Achievements">
                  {project.highlights.slice(0, 3).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="tech-tag-row" aria-label="Technologies Used">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="project-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                      aria-label={`Open live web demo of ${project.shortTitle}`}
                    >
                      <ExternalLink size={14} aria-hidden="true" />
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
                    <GithubIcon size={14} aria-hidden="true" />
                    <span>Source Code</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-ghost btn-sm"
                    style={{ marginLeft: 'auto' }}
                    aria-label={`View full case study for ${project.shortTitle}`}
                  >
                    <Info size={14} aria-hidden="true" />
                    <span>Details</span>
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Polished Case Study Details Modal */}
        {selectedProject && (
          <div
            className="project-modal-backdrop"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="project-modal-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <div className="section-tag" style={{ marginBottom: '0.4rem' }}>
                    <span>PROJECT CASE STUDY</span>
                  </div>
                  <h4 id="modal-title" className="modal-title">
                    {selectedProject.title}
                  </h4>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-media-frame">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.shortTitle}
                  />
                </div>

                <p className="modal-desc">
                  {selectedProject.description}
                </p>

                <h5 className="modal-subheading">Technical Architecture &amp; CV Highlights:</h5>
                <ul className="modal-highlights-list">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <h5 className="modal-subheading">Technologies:</h5>
                <div className="tech-tag-row">
                  {selectedProject.technologies.map((t) => (
                    <span key={t} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="modal-actions">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                      <span>Visit Live Demo</span>
                    </a>
                  )}

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    <GithubIcon size={15} aria-hidden="true" />
                    <span>View GitHub Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
