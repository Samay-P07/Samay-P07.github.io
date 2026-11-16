import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Pure synchronous WebGL availability check
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
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [webglSupported] = useState(checkWebGLSupport);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const labelsContainerRef = useRef(null);
  const labelElementsRef = useRef([]);

  // Globe interaction state
  const rotationRef = useRef({ x: 0.12, y: 0.35 });
  const velocityRef = useRef({ x: 0, y: 0.0015 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const resetTargetRef = useRef(null);

  const categories = PORTFOLIO_DATA.skills.categories;
  const skills = PORTFOLIO_DATA.skills.items;

  // Calculate Fibonacci Golden Spiral 3D points on sphere for 32 skills
  const skillPoints = useMemo(() => {
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle ~2.39996 rad

    return skills.map((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2; // from 1 down to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        ...skill,
        index: i,
        // Normalized direction vector from center
        dir: new THREE.Vector3(x, y, z).normalize()
      };
    });
  }, [skills]);

  // Handle smooth reset view
  const handleResetRotation = useCallback(() => {
    resetTargetRef.current = { x: 0.1, y: 0.4 };
    velocityRef.current = { x: 0, y: 0.0015 };
  }, []);

  // Three.js 3D Earth Globe Engine
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 780;
    let height = container.clientHeight || 560;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 420;

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

    // 3. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Responsive globe radius
    const globeRadius = Math.min(width, height) * 0.28;
    const labelRadius = globeRadius * 1.34;

    // A. Dark Cosmic Earth Sphere Core
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 36, 36);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x060c1d,
      emissive: 0x040814,
      specular: 0x3b86ff,
      shininess: 18,
      transparent: true,
      opacity: 0.94
    });
    const earthSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(earthSphere);

    // B. Holographic Latitude & Longitude Wireframe
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x244a7f,
      transparent: true,
      opacity: 0.32
    });

    // Latitude rings
    const latAngles = [-60, -30, 0, 30, 60];
    latAngles.forEach((deg) => {
      const rad = THREE.MathUtils.degToRad(deg);
      const r = globeRadius * Math.cos(rad);
      const y = globeRadius * Math.sin(rad);

      const ringGeo = new THREE.BufferGeometry();
      const pts = [];
      const segs = 64;
      for (let j = 0; j <= segs; j++) {
        const theta = (j / segs) * Math.PI * 2;
        pts.push(r * Math.cos(theta), y, r * Math.sin(theta));
      }
      ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const latLine = new THREE.Line(ringGeo, gridMat);
      globeGroup.add(latLine);
    });

    // Longitude meridians (6 meridians)
    for (let m = 0; m < 6; m++) {
      const meridianAngle = (m / 6) * Math.PI;
      const merGeo = new THREE.BufferGeometry();
      const pts = [];
      const segs = 64;
      for (let j = 0; j <= segs; j++) {
        const theta = (j / segs) * Math.PI * 2;
        pts.push(
          globeRadius * Math.cos(theta) * Math.cos(meridianAngle),
          globeRadius * Math.sin(theta),
          globeRadius * Math.cos(theta) * Math.sin(meridianAngle)
        );
      }
      merGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const meridianLine = new THREE.Line(merGeo, gridMat);
      globeGroup.add(meridianLine);
    }

    // C. Surface Matrix Tech Particles (Continents / Grid dots)
    const dotCount = prefersReducedMotion ? 400 : 900;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);

    const c1 = new THREE.Color('#8fcaff');
    const c2 = new THREE.Color('#3b86ff');
    const c3 = new THREE.Color('#162d55');

    for (let i = 0; i < dotCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = globeRadius * 1.002;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      const pickColor = Math.random() > 0.4 ? (Math.random() > 0.5 ? c1 : c2) : c3;
      dotColors[i * 3] = pickColor.r;
      dotColors[i * 3 + 1] = pickColor.g;
      dotColors[i * 3 + 2] = pickColor.b;
    }

    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65
    });
    const surfaceDots = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(surfaceDots);

    // D. Atmospheric Rim Shell (Glow Halo)
    const atmoGeo = new THREE.SphereGeometry(globeRadius * 1.04, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x3b86ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmoMesh);

    // Outer glow ring around globe
    const outerGlowGeo = new THREE.RingGeometry(globeRadius * 1.01, globeRadius * 1.28, 64);
    const outerGlowMat = new THREE.MeshBasicMaterial({
      color: 0x8fcaff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const outerGlowRing = new THREE.Mesh(outerGlowGeo, outerGlowMat);
    globeGroup.add(outerGlowRing);

    // E. 2 Tilted Orbital Paths with Traveling Data Beacons
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    const makeOrbit = (radiusX, radiusY, tiltX, tiltZ) => {
      const curvePts = [];
      const count = 72;
      for (let i = 0; i <= count; i++) {
        const a = (i / count) * Math.PI * 2;
        curvePts.push(new THREE.Vector3(radiusX * Math.cos(a), 0, radiusY * Math.sin(a)));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(curvePts);
      const mat = new THREE.LineDashedMaterial({
        color: 0x8fcaff,
        dashSize: 4,
        gapSize: 4,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      line.rotation.x = tiltX;
      line.rotation.z = tiltZ;
      return line;
    };

    const orbit1 = makeOrbit(globeRadius * 1.25, globeRadius * 1.15, 0.45, -0.2);
    const orbit2 = makeOrbit(globeRadius * 1.35, globeRadius * 1.22, -0.65, 0.4);
    orbitalGroup.add(orbit1);
    orbitalGroup.add(orbit2);

    // Traveling satellites on orbital rings
    const satGeo = new THREE.SphereGeometry(2.5, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x8fcaff });
    const sat1 = new THREE.Mesh(satGeo, satMat);
    const sat2 = new THREE.Mesh(satGeo, satMat);
    scene.add(sat1);
    scene.add(sat2);

    // F. Skill Surface Markers & Radial Stems on Globe
    const nodeGeo = new THREE.SphereGeometry(2.4, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x8fcaff });
    const nodeMeshes = [];

    skillPoints.forEach((sp) => {
      const surfacePos = sp.dir.clone().multiplyScalar(globeRadius);
      const marker = new THREE.Mesh(nodeGeo, nodeMat);
      marker.position.copy(surfacePos);
      globeGroup.add(marker);
      nodeMeshes.push(marker);

      // Fine radial stem connecting globe surface to skill label
      const stemGeo = new THREE.BufferGeometry().setFromPoints([
        surfacePos,
        sp.dir.clone().multiplyScalar(labelRadius * 0.95)
      ]);
      const stemMat = new THREE.LineBasicMaterial({
        color: 0x3b86ff,
        transparent: true,
        opacity: 0.22
      });
      const stem = new THREE.Line(stemGeo, stemMat);
      globeGroup.add(stem);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x8fcaff, 1.8);
    dirLight.position.set(200, 150, 300);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x1a3668, 1.0);
    backLight.position.set(-200, -100, -250);
    scene.add(backLight);

    // 4. Performance & Visibility Guard
    let isVisible = true;
    let isTabActive = !document.hidden;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 5. Mouse & Touch Drag Interactions
    const onPointerDown = (e) => {
      // Don't drag if user clicked directly on an interactive button
      if (e.target.closest('button')) return;
      isDraggingRef.current = true;
      resetTargetRef.current = null;

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

      // Clamp vertical tilt between -70deg and +70deg
      rotationRef.current.x = Math.max(-1.2, Math.min(1.2, rotationRef.current.x));

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
      width = container.clientWidth || 780;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation & Projection Render Loop
    let animId;
    let orbitClock = 0;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) return;

      orbitClock += 0.015;

      // Smooth reset transition
      if (resetTargetRef.current) {
        rotationRef.current.x += (resetTargetRef.current.x - rotationRef.current.x) * 0.08;
        rotationRef.current.y += (resetTargetRef.current.y - rotationRef.current.y) * 0.08;
        if (
          Math.abs(resetTargetRef.current.x - rotationRef.current.x) < 0.005 &&
          Math.abs(resetTargetRef.current.y - rotationRef.current.y) < 0.005
        ) {
          resetTargetRef.current = null;
        }
      } else if (!isDraggingRef.current) {
        // Natural continuous auto-rotation
        if (!prefersReducedMotion) {
          velocityRef.current.y = 0.0016;
        }
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x * 0.92;
        rotationRef.current.x = Math.max(-1.2, Math.min(1.2, rotationRef.current.x));
      }

      // Apply rotation to globe
      globeGroup.rotation.x = rotationRef.current.x;
      globeGroup.rotation.y = rotationRef.current.y;

      // Animate orbital satellites
      const o1Angle = orbitClock * 0.6;
      const r1 = globeRadius * 1.25;
      sat1.position.set(r1 * Math.cos(o1Angle), 0, r1 * Math.sin(o1Angle));
      sat1.position.applyEuler(new THREE.Euler(0.45, 0, -0.2));

      const o2Angle = -orbitClock * 0.8;
      const r2 = globeRadius * 1.35;
      sat2.position.set(r2 * Math.cos(o2Angle), 0, r2 * Math.sin(o2Angle));
      sat2.position.applyEuler(new THREE.Euler(-0.65, 0, 0.4));

      // Make outer glow ring billow toward camera
      outerGlowRing.lookAt(camera.position);

      renderer.render(scene, camera);

      // Project 32 skill labels from 3D coordinates onto HTML canvas overlay
      const labelEls = labelElementsRef.current;
      const wHalf = width / 2;
      const hHalf = height / 2;

      skillPoints.forEach((sp, idx) => {
        const el = labelEls[idx];
        if (!el) return;

        // Position on label radius
        tempVec.copy(sp.dir).multiplyScalar(labelRadius);
        tempVec.applyEuler(globeGroup.rotation);

        // Check if facing the front (z > 0 means towards camera in perspective projection)
        const isFront = tempVec.z > -globeRadius * 0.25;
        const normalizedDepth = (tempVec.z + globeRadius) / (2 * globeRadius);

        // Project to 2D screen coordinates
        tempVec.project(camera);
        const screenX = tempVec.x * wHalf + wHalf;
        const screenY = -(tempVec.y * hHalf) + hHalf;

        // Apply 3D translate and dynamic depth styling
        el.style.transform = `translate3d(${Math.round(screenX)}px, ${Math.round(screenY)}px, 0) translate(-50%, -50%)`;

        // Manage depth z-index
        el.style.zIndex = Math.round(normalizedDepth * 100) + 10;
        el.dataset.front = isFront ? 'true' : 'false';
      });
    };

    animate();

    // 7. Cleanup & Disposals
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

      // Dispose geometries & materials
      sphereGeo.dispose();
      sphereMat.dispose();
      gridMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      outerGlowGeo.dispose();
      outerGlowMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer?.dispose();
    };
  }, [skillPoints]);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span>02 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="section-title">
            Skills &amp; <span className="font-serif-italic">Competencies</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Technologies and tools I use to build web applications, backend systems, and intelligent solutions.
          </p>
        </div>

        {/* Minimal Category Filter Pills */}
        <div className="globe-filters-bar" role="tablist" aria-label="Technology Skill Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`globe-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSkill(null);
              }}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Centered 3D Interactive Earth Technology Globe */}
        <div className="earth-globe-wrapper">
          
          <div
            ref={containerRef}
            className="earth-globe-viewport"
            role="region"
            aria-label="Interactive 3D Technology Earth Globe"
          >
            {/* Three.js WebGL Canvas */}
            <canvas ref={canvasRef} className="earth-webgl-canvas" />

            {/* Projected Skill Labels Layer */}
            <div ref={labelsContainerRef} className="earth-labels-layer" aria-hidden="false">
              {skillPoints.map((skill, idx) => {
                const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
                const isSelected = selectedSkill?.name === skill.name;
                const isHovered = hoveredSkill?.name === skill.name;

                return (
                  <button
                    key={skill.name}
                    ref={(el) => (labelElementsRef.current[idx] = el)}
                    type="button"
                    className={`earth-skill-chip ${matchesCategory ? 'in-category' : 'out-category'} ${
                      isSelected ? 'chip-selected' : ''
                    } ${isHovered ? 'chip-hovered' : ''}`}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    aria-label={`Inspect ${skill.name} (${skill.type})`}
                  >
                    <span className="chip-dot" aria-hidden="true" />
                    <span className="chip-text">{skill.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Subtle Controls Overlay */}
            <div className="globe-controls-overlay">
              <span className="globe-hint-pill">
                <Sparkles size={12} aria-hidden="true" />
                <span>Drag to rotate • Click skill to inspect</span>
              </span>

              <button
                type="button"
                onClick={handleResetRotation}
                className="globe-reset-btn"
                title="Reset Earth Globe Orientation"
                aria-label="Reset Earth Globe Rotation"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Reset View</span>
              </button>
            </div>

          </div>

          {/* Floating Selected Skill Information HUD Badge */}
          <div className="globe-hud-panel" aria-live="polite">
            {selectedSkill ? (
              <div className="hud-card hud-active">
                <div className="hud-header">
                  <div className="hud-badge">
                    <CheckCircle2 size={13} aria-hidden="true" />
                    <span>{selectedSkill.type}</span>
                  </div>
                  <h3 className="hud-title">{selectedSkill.name}</h3>
                </div>
                <p className="hud-desc">{selectedSkill.desc}</p>
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="hud-dismiss-btn"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <div className="hud-card hud-idle">
                <div className="hud-idle-content">
                  <Info size={16} className="hud-info-icon" aria-hidden="true" />
                  <span>
                    Explore <strong>32 technical competencies</strong> across Full-Stack, Machine Learning, Databases &amp; DevOps.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Accessible Semantic Fallback for Non-WebGL or Screen Readers */}
          {!webglSupported && (
            <div className="webgl-fallback-matrix" role="region" aria-label="Accessible Skills Matrix">
              <h3 className="sr-only">Technical Skills by Category</h3>
              {categories.filter(c => c.id !== 'all').map((cat) => (
                <div key={cat.id} className="fallback-category-group">
                  <h4 className="fallback-group-title">{cat.label}</h4>
                  <ul className="fallback-skill-list">
                    {skills.filter(s => s.category === cat.id).map(s => (
                      <li key={s.name} className="fallback-skill-item">
                        <strong>{s.name}</strong> — {s.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}