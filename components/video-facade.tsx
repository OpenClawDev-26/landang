"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function VideoFacade() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-frame">
      {playing ? (
        <iframe
          src="https://www.youtube-nocookie.com/embed/CfcpYORSHr0?autoplay=1&rel=0"
          title="Ángel Mendoza en el podcast Espejo Dental"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          className="video-poster"
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Reproducir entrevista de Ángel Mendoza en Espejo Dental"
        >
          <span className="video-thumb" aria-hidden="true" />
          <span className="play-button"><Play fill="currentColor" aria-hidden="true" /></span>
          <span className="video-caption">Espejo Dental · Expodental</span>
        </button>
      )}
    </div>
  );
}
