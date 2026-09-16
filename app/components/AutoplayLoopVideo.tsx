'use client';

import { useEffect, useRef } from 'react';

export function AutoplayLoopVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const play = () => {
      if (!video.paused) return;
      void video.play().catch(() => {
        // Mobile browsers can briefly reject playback while restoring a tab.
      });
    };
    const resumeWhenVisible = () => {
      if (!document.hidden) play();
    };

    play();
    video.addEventListener('canplay', play);
    video.addEventListener('loadeddata', play);
    window.addEventListener('pageshow', play);
    document.addEventListener('visibilitychange', resumeWhenVisible);

    return () => {
      video.removeEventListener('canplay', play);
      video.removeEventListener('loadeddata', play);
      window.removeEventListener('pageshow', play);
      document.removeEventListener('visibilitychange', resumeWhenVisible);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      tabIndex={-1}
      aria-hidden="true"
      disablePictureInPicture
    />
  );
}
