import React, { useEffect, useState } from 'react';

export default function ScrollRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        setProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 180px track height minus 28px thumb height = 152px max travel
  const thumbTop = Math.round(progress * 152);

  return (
    <div className="scroll-rail" aria-hidden="true">
      <i style={{ top: `${thumbTop}px` }} />
    </div>
  );
}
