"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("angel-cookie-choice") === null);
  }, []);

  function choose(value: "accepted" | "rejected") {
    localStorage.setItem("angel-cookie-choice", value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferencias de cookies">
      <div>
        <strong>Tu privacidad, clara.</strong>
        <p>
          Esta web solo usa cookies técnicas por defecto. Si más adelante activamos medición,
          respetaremos tu elección. <a href="/politica-de-cookies">Ver política</a>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose("rejected")}>Solo necesarias</button>
        <button type="button" onClick={() => choose("accepted")}>Aceptar</button>
      </div>
    </aside>
  );
}
