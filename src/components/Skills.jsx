import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const filteredSkills = PORTFOLIO_DATA.skills.items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Interactive 3D Draggable Sphere on Canvas with Performance Guards
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth || 360);
    let height = (canvas.height = canvas.width);
    let radius = width * 0.38;

    const skillList = PORTFOLIO_DATA.skills.items.map((s) => s.name);
    const count = skillList.length;

    // Fibonacci sphere distribution
    const tags = skillList.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        text,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      };
    });

    let angleX = 0.002;
    let angleY = 0.002;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animId;
    let isVisible = true;
    let isTabActive = !document.hidden;

    // Pause when canvas is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (canvas) observer.observe(canvas);

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const onMouseDown = (e) => {
      isDragging = true;
      lastMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      lastMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const dx = clientX - lastMouseX;
      const dy = clientY - lastMouseY;

      angleY = dx * 0.00035;
      angleX = -dy * 0.00035;

      lastMouseX = clientX;
      lastMouseY = clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    const render = () => {
      animId = requestAnimationFrame(render);

      // Only render if tab is focused and element is on-screen
      if (!isVisible || !isTabActive) return;

      ctx.clearRect(0, 0, width, height);

      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      tags.forEach((tag) => {
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.z * cosY + tag.x * sinY;

        const y2 = tag.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + tag.y * sinX;

        tag.x = x1;
        tag.y = y2;
        tag.z = z2;

        const depth = (tag.z + radius) / (2 * radius);
        const scale = 0.65 + depth * 0.6;
        const alpha = 0.25 + depth * 0.75;
        const fontSize = Math.round(11 * scale);

        const screenX = width / 2 + tag.x;
        const screenY = height / 2 + tag.y;

        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = depth > 0.6 ? `rgba(255, 255, 255, ${alpha})` : `rgba(143, 202, 255, ${alpha * 0.85})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag.text, screenX, screenY);
      });

      if (!isDragging) {
        angleX *= 0.96;
        angleY *= 0.96;
        if (Math.abs(angleX) < 0.0012) angleX = 0.0012;
        if (Math.abs(angleY) < 0.0016) angleY = 0.0016;
      }
    };

    render();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="skills" className="section" ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>02 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="section-title">
            Skills &amp; <span className="font-serif-italic">Competencies</span>
          </h2>
          <p className="section-subtitle">
            Verified technical stack across programming languages, web frameworks, databases, developer tooling, and cloud platforms.
          </p>
        </div>

        <div className="skills-layout">
          
          {/* Left: 3D Interactive Sphere */}
          <div className="skill-canvas-wrap">
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', cursor: 'grab' }}
              aria-label="3D Interactive Skills Cloud"
            />
            <div className="skill-canvas-hint">Drag sphere to spin</div>
          </div>

          {/* Right: Category Tabs & Accessible Matrix */}
          <div>
            <div className="category-tabs" role="tablist" aria-label="Skill Categories">
              {PORTFOLIO_DATA.skills.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="skills-matrix" role="region" aria-label="Skill List" aria-live="polite">
              {filteredSkills.map((skill) => (
                <div key={skill.name} className="skill-tile">
                  <span className="skill-tile-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
