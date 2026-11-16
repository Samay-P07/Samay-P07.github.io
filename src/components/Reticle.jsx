import React, { useEffect, useRef } from 'react';

export default function Reticle() {
  const dotRef = useRef(null);
  const reticleRef = useRef(null);

  useEffect(() => {
    // Only enable if pointer is fine
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) return;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const reticle = reticleRef.current;
    if (!dot || !reticle) return;

    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2, w: 26, h: 26 };
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2, w: 26, h: 26, locked: false };

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let isVisible = false;

    const onMouseMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        reticle.style.opacity = '1';
      }

      dot.style.transform = `translate(${pointerX}px, ${pointerY}px)`;

      // Check if hovering over an interactive element
      const hoverTarget = e.target.closest('a, button, .project-card, .skill-tile, .contact-info-tile, .exp-card, input, textarea, [data-reticle]');
      
      if (hoverTarget) {
        const rect = hoverTarget.getBoundingClientRect();
        const pad = 6;
        target.x = rect.left + rect.width / 2;
        target.y = rect.top + rect.height / 2;
        target.w = rect.width + pad * 2;
        target.h = rect.height + pad * 2;
        target.locked = true;
      } else {
        target.x = pointerX;
        target.y = pointerY;
        target.w = 26;
        target.h = 26;
        target.locked = false;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      reticle.style.opacity = '0';
    };

    let animationFrameId;
    const tick = () => {
      const ease = target.locked ? 0.22 : 0.28;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.w += (target.w - current.w) * 0.2;
      current.h += (target.h - current.h) * 0.2;

      reticle.style.width = `${Math.round(current.w)}px`;
      reticle.style.height = `${Math.round(current.h)}px`;
      reticle.style.transform = `translate(${Math.round(current.x - current.w / 2)}px, ${Math.round(current.y - current.h / 2)}px)`;

      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={reticleRef} className="reticle" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
    </>
  );
}
