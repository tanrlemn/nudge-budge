'use client';

// hooks
import { useEffect } from 'react';

// components
import anime from 'animejs/lib/anime.es.js';
import { LogoSvg } from './logoSvg';

export default function Logo() {
  useEffect(() => {
    const logoAnimation = anime({
      targets: '#logo path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function (el, i) {
        return i * 250;
      },
      direction: 'normal',
      loop: false,
    });
    logoAnimation.play();
  }, []);

  return (
    <LogoSvg
      id='logo'
      alt='logo'
      priority
    />
  );
}
