import React from 'react';
import Preloader from './components/Preloader';
import Reticle from './components/Reticle';
import AmbientSky from './components/AmbientSky';
import ScrollRail from './components/ScrollRail';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Skip to Content Accessibility Anchor */}
      <a href="#about" className="skip-link">
        Skip to main content
      </a>

      {/* Targeting Reticle & Ambient 3D Space Canvas */}
      <Reticle />
      <AmbientSky />
      <div className="vignette-overlay" aria-hidden="true" />
      <ScrollRail />

      {/* Systems Check Launch Preloader */}
      <Preloader />

      {/* Site Header & Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
