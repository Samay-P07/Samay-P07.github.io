import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AmbientSky() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.0006);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    camera.position.z = 800;

    // 2. WebGL Renderer with graceful fallback
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      // Graceful fallback to CSS gradient
      container.classList.add('no-webgl-fallback');
      return;
    }

    // 3. Starfield Particles
    const starCount = prefersReducedMotion ? 400 : 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color('#8fcaff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#3b86ff'),
      new THREE.Color('#d4e6ff')
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPos[idx] = (Math.random() - 0.5) * 2400;
      starPos[idx + 1] = (Math.random() - 0.5) * 2400;
      starPos[idx + 2] = (Math.random() - 0.5) * 1600;

      const clr = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[idx] = clr.r;
      starColors[idx + 1] = clr.g;
      starColors[idx + 2] = clr.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Cosmic Dust Particles
    const dustCount = prefersReducedMotion ? 50 : 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 1800;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 1800;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 1000 + 200;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 3.8,
      color: 0x8fcaff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

    // 5. Planetary Horizon Limb
    const limbRadius = 1400;
    const limbGeo = new THREE.SphereGeometry(limbRadius, 32, 16);
    const limbMat = new THREE.MeshBasicMaterial({
      color: 0x070e24,
      transparent: true,
      opacity: 0.85
    });
    const earthLimb = new THREE.Mesh(limbGeo, limbMat);
    earthLimb.position.set(0, -limbRadius - 280, -200);
    scene.add(earthLimb);

    // Atmosphere Ring
    const atmoGeo = new THREE.RingGeometry(limbRadius - 2, limbRadius + 18, 48);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x8fcaff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const atmoRing = new THREE.Mesh(atmoGeo, atmoMat);
    atmoRing.position.set(0, -limbRadius - 280, -195);
    scene.add(atmoRing);

    // 6. Interactive State & Performance Guards
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = window.scrollY / maxScroll;
      }
    };

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Loop with Performance Controls
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Skip render calculations when tab is hidden
      if (!isTabActive || !isVisible) return;

      const time = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      if (!prefersReducedMotion) {
        starField.rotation.y = time * 0.012 + mouseX * 0.08;
        starField.rotation.x = time * 0.006 + mouseY * 0.05;

        dustField.rotation.y = time * 0.02 + mouseX * 0.12;
        dustField.rotation.x = time * 0.008 + mouseY * 0.08;
      }

      camera.position.x = mouseX * 45;
      camera.position.y = -mouseY * 30 - scrollProgress * 220;
      camera.lookAt(0, -scrollProgress * 180, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Proper Cleanup & Disposal
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);

      // Dispose Three.js objects
      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      limbGeo.dispose();
      limbMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 20%, #080d1c 0%, #05070f 85%)'
      }}
      aria-hidden="true"
    />
  );
}
