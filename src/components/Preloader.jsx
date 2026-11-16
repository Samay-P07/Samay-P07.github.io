import React, { useState, useEffect } from 'react';

const STATUS_MESSAGES = [
  'INITIALIZING SYSTEM CORE',
  'LOADING ARCHITECTURE & COMPILATION PIPELINES',
  'VERIFYING FULL-STACK & BACKEND SERVICES',
  'SYNCHRONIZING REPOSITORIES',
  'SYSTEMS NOMINAL // READY'
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setHidden(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        const next = Math.min(100, prev + step);
        const idx = Math.min(STATUS_MESSAGES.length - 1, Math.floor((next / 100) * STATUS_MESSAGES.length));
        setStatusIndex(idx);
        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`preloader ${hidden ? 'preloader-hidden' : ''}`}
      aria-hidden={hidden}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Portfolio Loading Progress"
    >
      <div className="pre-inner">
        <p className="pre-mark">Samay Patel</p>
        <p className="pre-submark">Software Developer // M.Sc. Web Engineering</p>
        
        <div className="pre-rule">
          <span className="pre-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="pre-foot">
          <span className="pre-status">{STATUS_MESSAGES[statusIndex]}</span>
          <span className="pre-count">{progress.toString().padStart(2, '0')}%</span>
        </div>
      </div>
    </div>
  );
}
