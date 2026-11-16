import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, Sparkles, Layers, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Pure synchronous WebGL support check
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
  const [webglSupported] = useState(checkWebGLSupport);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Mouse parallax and glow state
  const mouseStateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isHovered: false,
    glowIntensity: 0.18,
    targetGlow: 0.18,
    dragActive: false,
    dragStartX: 0,
    dragStartY: 0,
    manualRotY: 0,
    manualRotX: 0
  });

  const categories = PORTFOLIO_DATA.skills.categories;
  const allSkills = PORTFOLIO_DATA.skills.items;

  // Filter skills according to active category tab
  const displayedSkills = allSkills.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Handle resetting the Earth orientation
  const handleResetEarth = useCallback(() => {
    mouseStateRef.current.manualRotX = 0;
    mouseStateRef.current.manualRotY = 0;
    mouseStateRef.current.targetX = 0;
    mouseStateRef.current.targetY = 0;
  }, []);

  // Three.js 3D Medium Earth with Interactive Mouse Parallax & Atmospheric Glow
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !webglSupported) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 460;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1200);
    camera.position.z = 440;

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

    // 3. Earth Globe Group
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Balanced medium Earth radius
    const globeRadius = Math.min(width, height) * 0.27;

    // A. Cosmic Earth Dark Core Sphere
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 40, 40);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x050c1e,
      emissive: 0x030712,
      specular: 0x3b86ff,
      shininess: 24,
      transparent: true,
      opacity: 0.96
    });
    const earthSphere = new THREE.Mesh(sphereGeo, sphereMat);
    earthGroup.add(earthSphere);

    // B. Holographic Latitude & Longitude Coordinate Lines
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x244a7f,
      transparent: true,
      opacity: 0.32
    });

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
      earthGroup.add(latLine);
    });

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
      earthGroup.add(meridianLine);
    }

    // C. Surface Matrix Tech Particles (Continents & Nodes)
    const dotCount = prefersReducedMotion ? 350 : 850;
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

      dotPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dotPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPositions[i * 3 + 2] = r * Math.cos(phi);

      const pickColor = Math.random() > 0.35 ? (Math.random() > 0.5 ? c1 : c2) : c3;
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
      opacity: 0.72
    });
    const surfaceDots = new THREE.Points(dotGeo, dotMat);
    earthGroup.add(surfaceDots);

    // D. Dynamic Atmosphere Rim Shell (Glow intensity increases near pointer)
    const atmoGeo = new THREE.SphereGeometry(globeRadius * 1.04, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x3b86ff,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    earthGroup.add(atmoMesh);

    // Outer atmosphere glow ring
    const glowRingGeo = new THREE.RingGeometry(globeRadius * 1.01, globeRadius * 1.25, 64);
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0x8fcaff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
    earthGroup.add(glowRing);

    // E. Background Parallax Particle Field (Depth Stars)
    const starCount = prefersReducedMotion ? 40 : 120;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 550;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 550;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 300 - 100;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.8,
      color: 0x8fcaff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const bgStars = new THREE.Points(starGeo, starMat);
    scene.add(bgStars);

    // F. Two Orbital Ellipses with Traveling Satellites
    const makeOrbitRing = (rx, ry, tiltX, tiltZ) => {
      const pts = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(rx * Math.cos(a), 0, ry * Math.sin(a)));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineDashedMaterial({
        color: 0x8fcaff,
        dashSize: 4,
        gapSize: 4,
        transparent: true,
        opacity: 0.35
      });
      const ringLine = new THREE.Line(geo, mat);
      ringLine.computeLineDistances();
      ringLine.rotation.x = tiltX;
      ringLine.rotation.z = tiltZ;
      return ringLine;
    };

    const orbit1 = makeOrbitRing(globeRadius * 1.28, globeRadius * 1.18, 0.45, -0.25);
    const orbit2 = makeOrbitRing(globeRadius * 1.36, globeRadius * 1.22, -0.65, 0.35);
    scene.add(orbit1);
    scene.add(orbit2);

    // Orbital traveling satellites
    const satGeo = new THREE.SphereGeometry(2.4, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x8fcaff });
    const sat1 = new THREE.Mesh(satGeo, satMat);
    const sat2 = new THREE.Mesh(satGeo, satMat);
    scene.add(sat1);
    scene.add(sat2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x8fcaff, 1.8);
    dirLight.position.set(180, 160, 260);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x19366a, 1.0);
    backLight.position.set(-180, -100, -220);
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
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 5. Mouse Parallax & Proximity Hover Listeners
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Clamp target parallax angles
      mouseStateRef.current.targetX = Math.max(-1, Math.min(1, x));
      mouseStateRef.current.targetY = Math.max(-1, Math.min(1, y));

      // Increase atmospheric glow when mouse is over or near Earth
      const distFromCenter = Math.sqrt(x * x + y * y);
      if (distFromCenter < 1.3) {
        mouseStateRef.current.targetGlow = 0.32;
      } else {
        mouseStateRef.current.targetGlow = 0.18;
      }

      if (mouseStateRef.current.dragActive) {
        const dx = e.clientX - mouseStateRef.current.dragStartX;
        const dy = e.clientY - mouseStateRef.current.dragStartY;
        mouseStateRef.current.manualRotY += dx * 0.005;
        mouseStateRef.current.manualRotX += dy * 0.005;
        mouseStateRef.current.manualRotX = Math.max(-0.8, Math.min(0.8, mouseStateRef.current.manualRotX));
        mouseStateRef.current.dragStartX = e.clientX;
        mouseStateRef.current.dragStartY = e.clientY;
      }
    };

    const onMouseEnter = () => {
      mouseStateRef.current.isHovered = true;
      mouseStateRef.current.targetGlow = 0.3;
    };

    const onMouseLeave = () => {
      mouseStateRef.current.isHovered = false;
      mouseStateRef.current.targetX = 0;
      mouseStateRef.current.targetY = 0;
      mouseStateRef.current.targetGlow = 0.18;
      mouseStateRef.current.dragActive = false;
    };

    const onMouseDown = (e) => {
      mouseStateRef.current.dragActive = true;
      mouseStateRef.current.dragStartX = e.clientX;
      mouseStateRef.current.dragStartY = e.clientY;
    };

    const onMouseUp = () => {
      mouseStateRef.current.dragActive = false;
    };

    // Touch support for mobile devices
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseStateRef.current.targetX = Math.max(-0.8, Math.min(0.8, x));
        mouseStateRef.current.targetY = Math.max(-0.8, Math.min(0.8, y));
      }
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onMouseLeave);

    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 460;
      height = container.clientHeight || 460;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Smooth Animation & Parallax Render Loop
    let animId;
    let autoTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) return;

      autoTime += 0.0028;

      const ms = mouseStateRef.current;

      // Smooth interpolation for mouse parallax (no jitter)
      ms.currentX += (ms.targetX - ms.currentX) * 0.055;
      ms.currentY += (ms.targetY - ms.currentY) * 0.055;

      // Smooth atmospheric glow transition
      ms.glowIntensity += (ms.targetGlow - ms.glowIntensity) * 0.075;
      atmoMat.opacity = ms.glowIntensity;
      glowRingMat.opacity = ms.glowIntensity * 1.1;

      // Combine continuous automatic rotation with gentle mouse parallax tilt
      const parallaxTiltX = ms.currentY * 0.35 + ms.manualRotX;
      const parallaxTiltY = autoTime + ms.currentX * 0.45 + ms.manualRotY;

      if (!prefersReducedMotion) {
        earthGroup.rotation.x = parallaxTiltX;
        earthGroup.rotation.y = parallaxTiltY;

        // Subtle background star parallax (depth effect)
        bgStars.position.x = -ms.currentX * 18;
        bgStars.position.y = -ms.currentY * 14;

        // Traveling satellites on orbits
        const s1Angle = autoTime * 1.6;
        const r1 = globeRadius * 1.28;
        sat1.position.set(r1 * Math.cos(s1Angle), 0, r1 * Math.sin(s1Angle));
        sat1.position.applyEuler(new THREE.Euler(0.45, 0, -0.25));

        const s2Angle = -autoTime * 2.1;
        const r2 = globeRadius * 1.36;
        sat2.position.set(r2 * Math.cos(s2Angle), 0, r2 * Math.sin(s2Angle));
        sat2.position.applyEuler(new THREE.Euler(-0.65, 0, 0.35));
      } else {
        earthGroup.rotation.y = 0.2;
      }

      // Outer glow ring continuously billows toward camera
      glowRing.lookAt(camera.position);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup & Disposals
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onMouseLeave);
      cancelAnimationFrame(animId);

      sphereGeo.dispose();
      sphereMat.dispose();
      gridMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      glowRingGeo.dispose();
      glowRingMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer?.dispose();
    };
  }, [webglSupported]);

  return (
    <section id="skills" className="section skills-section">
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
            Technologies and tools I use to build web applications, backend systems, and intelligent solutions.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Medium Earth Left, Clean Skills Panel Right */}
        <div className="skills-split-layout">
          
          {/* Left Column: Medium Interactive 3D Earth */}
          <div className="earth-column">
            <div
              ref={containerRef}
              className="medium-earth-viewport"
              role="region"
              aria-label="Interactive 3D Technology Earth with Mouse Parallax"
            >
              <canvas ref={canvasRef} className="earth-canvas" />

              {/* Status / Interaction Overlays */}
              <div className="earth-overlay-top">
                <span className="earth-badge">
                  <Sparkles size={12} aria-hidden="true" />
                  <span>Interactive 3D Earth</span>
                </span>
                
                <button
                  type="button"
                  onClick={handleResetEarth}
                  className="earth-reset-btn"
                  title="Reset Earth View"
                  aria-label="Reset 3D Earth Rotation and Tilt"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  <span>Reset View</span>
                </button>
              </div>

              <div className="earth-overlay-bottom">
                <span className="earth-caption">
                  Move mouse over globe for parallax tilt &amp; atmospheric glow
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Organized Skills Panel */}
          <div className="skills-panel-column">
            <div className="skills-glass-panel">
              
              {/* Category Filter Tabs */}
              <div className="panel-tabs-bar" role="tablist" aria-label="Skill Categories">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    className={`panel-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSelectedSkill(null);
                    }}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Subheader: Category Count & Title */}
              <div className="panel-content-header">
                <div className="panel-category-info">
                  <Layers size={15} className="panel-cat-icon" aria-hidden="true" />
                  <span className="panel-cat-name">
                    {categories.find((c) => c.id === activeCategory)?.label || 'All Skills'}
                  </span>
                </div>
                <span className="panel-count-pill">
                  {displayedSkills.length} Competencies
                </span>
              </div>

              {/* Organized Skill Cards Grid */}
              <div
                className="skills-cards-grid"
                role="region"
                aria-label="Technical skills in selected category"
              >
                {displayedSkills.map((skill) => {
                  const isSelected = selectedSkill?.name === skill.name;

                  return (
                    <div
                      key={skill.name}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      className={`skill-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedSkill(isSelected ? null : skill)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedSkill(isSelected ? null : skill);
                        }
                      }}
                    >
                      <div className="card-top-row">
                        <span className="skill-item-name">{skill.name}</span>
                        <span className="skill-type-pill">{skill.type}</span>
                      </div>
                      <p className="skill-item-desc">{skill.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Inspection Bar */}
              {selectedSkill && (
                <div className="panel-selected-bar" role="status" aria-live="polite">
                  <div className="selected-meta">
                    <Cpu size={14} className="selected-icon" aria-hidden="true" />
                    <span>
                      Selected: <strong style={{ color: '#ffffff' }}>{selectedSkill.name}</strong> ({selectedSkill.type})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="selected-close-btn"
                  >
                    Dismiss
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}