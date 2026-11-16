import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Sparkles, Move, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Pure synchronous WebGL support detection
const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return true;
  try {
    const testCanvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [webglSupported] = useState(checkWebGLSupport);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const labelElementsRef = useRef([]);

  // 3D rotation & inertia physics
  const rotationRef = useRef({ x: 0.08, y: 0.2 });
  const velocityRef = useRef({ x: 0, y: 0.0018 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const categories = PORTFOLIO_DATA.skills.categories;
  const skills = PORTFOLIO_DATA.skills.items;

  // Calculate Fibonacci Golden Spiral 3D distribution on sphere
  const skillPoints = useMemo(() => {
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle ~2.39996 rad

    return skills.map((skill, i) => {
      // Evenly distribute from y = 1 down to -1
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        ...skill,
        index: i,
        dir: new THREE.Vector3(x, y, z).normalize()
      };
    });
  }, [skills]);

  // Reset rotation view
  const handleResetRotation = useCallback(() => {
    rotationRef.current = { x: 0.08, y: 0.2 };
    velocityRef.current = { x: 0, y: 0.0018 };
  }, []);

  // Three.js 3D Floating Space & Math Projection Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !webglSupported) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 900;
    let height = container.clientHeight || 620;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1200);
    camera.position.z = 460;

    // 2. WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    } catch {
      return;
    }

    // 3. Ambient Starfield & Particles (Cosmic Depth)
    const starCount = prefersReducedMotion ? 60 : 160;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cWhite = new THREE.Color('#ffffff');
    const cBlue = new THREE.Color('#8fcaff');
    const cDeep = new THREE.Color('#3b86ff');

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 800;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 400 - 50;

      const clr = Math.random() > 0.6 ? cWhite : Math.random() > 0.5 ? cBlue : cDeep;
      starColors[i * 3] = clr.r;
      starColors[i * 3 + 1] = clr.g;
      starColors[i * 3 + 2] = clr.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Subtle Invisible Sphere Matrix Nodes
    const sphereRadius = Math.min(width, height) * 0.42;

    const nodeGeo = new THREE.SphereGeometry(1.6, 6, 6);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x8fcaff,
      transparent: true,
      opacity: 0.28
    });
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    skillPoints.forEach((sp) => {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(sp.dir.clone().multiplyScalar(sphereRadius * 0.95));
      sphereGroup.add(nodeMesh);
    });

    // 5. Visibility and Interaction Guards
    let isVisible = true;
    let isTabActive = !document.hidden;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Pointer Drag Listeners
    const onPointerDown = (e) => {
      // Allow drag on container or labels
      isDraggingRef.current = true;
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
      lastMousePosRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);

      const dx = clientX - lastMousePosRef.current.x;
      const dy = clientY - lastMousePosRef.current.y;

      velocityRef.current.y = dx * 0.0035;
      velocityRef.current.x = dy * 0.0035;

      rotationRef.current.y += velocityRef.current.y;
      rotationRef.current.x += velocityRef.current.x;

      // Limit vertical pitch between -75deg and +75deg
      rotationRef.current.x = Math.max(-1.3, Math.min(1.3, rotationRef.current.x));

      lastMousePosRef.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 900;
      height = container.clientHeight || 620;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Projection Animation Loop
    let animId;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) return;

      // Inertia & Auto-rotation
      if (!isDraggingRef.current) {
        if (!prefersReducedMotion) {
          velocityRef.current.y = velocityRef.current.y * 0.94 + 0.0014 * 0.06;
          velocityRef.current.x = velocityRef.current.x * 0.94;
        } else {
          velocityRef.current.x = 0;
          velocityRef.current.y = 0;
        }
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.x = Math.max(-1.3, Math.min(1.3, rotationRef.current.x));
      }

      // Apply rotation to internal 3D scene group
      sphereGroup.rotation.x = rotationRef.current.x;
      sphereGroup.rotation.y = rotationRef.current.y;

      // Gentle starfield drift
      starField.rotation.y += 0.0004;

      renderer.render(scene, camera);

      // Project 3D positions of skill labels onto the HTML typography overlay
      const labelEls = labelElementsRef.current;
      const wHalf = width / 2;
      const hHalf = height / 2;
      const r = Math.min(width, height) * (width < 640 ? 0.38 : 0.43);

      skillPoints.forEach((sp, idx) => {
        const el = labelEls[idx];
        if (!el) return;

        // Transform point along sphere rotation
        tempVec.copy(sp.dir).multiplyScalar(r);
        tempVec.applyEuler(sphereGroup.rotation);

        // Depth perspective (z: positive towards camera, negative away)
        const depth = (tempVec.z + r) / (2 * r); // 0 (farthest) to 1 (closest)
        const scale = 0.65 + depth * 0.65; // 0.65 to 1.3
        const opacity = 0.16 + depth * 0.84; // 0.16 to 1.0

        // Project to 2D screen coordinates
        tempVec.project(camera);
        const screenX = tempVec.x * wHalf + wHalf;
        const screenY = -(tempVec.y * hHalf) + hHalf;

        // Apply 3D translate and dynamic depth styling
        el.style.transform = `translate3d(${Math.round(screenX)}px, ${Math.round(screenY)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = Math.round(depth * 100);

        // Front vs back visibility flag
        el.dataset.front = depth > 0.42 ? 'true' : 'false';
      });
    };

    animate();

    // 7. Cleanup & Resource Disposal
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      cancelAnimationFrame(animId);

      starGeo.dispose();
      starMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer?.dispose();
    };
  }, [skillPoints, webglSupported]);

  return (
    <section id="skills" className="section skills-section full-width-skills">
      <div className="container skills-header-container">
        
        {/* Upper Left Header Inspired by Aahana's Reference */}
        <div className="skills-editorial-header">
          <div className="skills-author-callsign">
            <span>SAMAY PATEL</span>
            <span className="callsign-sep">•</span>
            <span className="callsign-tag">02 // TECHNICAL ARSENAL</span>
          </div>

          <h2 className="skills-headline">
            Skills
          </h2>

          <p className="skills-subtext">
            Interactive 3D cloud of engineering competencies, frameworks, databases, and intelligent systems.
          </p>
        </div>

        {/* Minimal Pill Category Filters */}
        <div className="skills-filters-ribbon" role="tablist" aria-label="Skill Category Filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`filter-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              {activeCategory === cat.id && (
                <Check size={12} className="pill-check-icon" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>

      </div>

      {/* Main Full-Width Interactive 3D Floating Skills Cloud Viewport */}
      <div className="skills-cloud-stage">
        
        <div
          ref={containerRef}
          className="skills-cloud-viewport"
          role="region"
          aria-label="Interactive 3D Spherical Skills Cloud"
        >
          {/* Three.js Ambient Starfield Canvas */}
          <canvas ref={canvasRef} className="skills-starfield-canvas" />

          {/* 3D Floating Typography Skills Layer */}
          <div className="skills-typography-layer" aria-hidden="false">
            {skillPoints.map((skill, idx) => {
              const matchesFilter = activeCategory === 'all' || skill.category === activeCategory;
              const isHovered = hoveredSkill?.name === skill.name;

              return (
                <div
                  key={skill.name}
                  ref={(el) => (labelElementsRef.current[idx] = el)}
                  className={`floating-skill-label importance-${skill.importance || 2} ${
                    matchesFilter ? 'matching' : 'faded'
                  } ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${skill.name} — ${skill.type}`}
                >
                  <span className="label-text">{skill.name}</span>

                  {/* Hover Category Tooltip */}
                  {isHovered && (
                    <span className="skill-hover-tooltip" role="tooltip">
                      <Sparkles size={11} aria-hidden="true" />
                      <span>{skill.type}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Subtle Bottom Drag Instruction Bar */}
          <div className="skills-cloud-bottom-bar">
            <div className="drag-explore-badge">
              <Move size={13} className="drag-icon" aria-hidden="true" />
              <span>DRAG TO EXPLORE</span>
            </div>

            <button
              type="button"
              onClick={handleResetRotation}
              className="skills-reset-btn"
              title="Reset 3D Cloud Orientation"
              aria-label="Reset 3D Skills Cloud Rotation"
            >
              Reset View
            </button>
          </div>

        </div>

      </div>

      {/* Accessible Semantic Fallback for Non-WebGL or Screen Readers */}
      {!webglSupported && (
        <div className="container">
          <div className="skills-accessible-fallback" role="region" aria-label="Technical Skills List">
            <h3 className="sr-only">Verified Skills by Category</h3>
            {categories.filter(c => c.id !== 'all').map((cat) => (
              <div key={cat.id} className="fallback-group">
                <h4 className="fallback-title">{cat.label}</h4>
                <ul className="fallback-tags">
                  {skills.filter(s => s.category === cat.id).map(s => (
                    <li key={s.name} className="fallback-pill">{s.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}