"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import Link from "next/link";
import {
  FaUser,
  FaBook,
  FaCode,
  FaLayerGroup,
  FaCog,
  FaProjectDiagram,
  FaEnvelope,
  FaMoon,
  FaSun,
} from "react-icons/fa";

/**
 * Ítems del Dock:
 * - 7 botones para pestañas con sus rutas (ajusta los href a tus páginas reales)
 * - 1 separador
 * - 1 botón para cambiar el tema (modo oscuro)
 */
const items = [
  { key: "home", icon: <FaUser />, label: "Inicio", href: "/" },
  { key: "about", icon: <FaBook />, label: "Sobre mí", href: "/about" },
  { key: "camino", icon: <FaCode />, label: "Camino", href: "/camino" },
  { key: "estudios", icon: <FaLayerGroup />, label: "Estudios", href: "/estudios" },
  { key: "habilidades", icon: <FaCog />, label: "Habilidades", href: "/habilidades" },
  { key: "proyectos", icon: <FaProjectDiagram />, label: "Proyectos", href: "/projects" },
  { key: "contacto", icon: <FaEnvelope />, label: "Contacto", href: "/contact" },
  { key: "separator", type: "separator" },
  { key: "darkMode", type: "darkMode", icon: <FaMoon />, label: "Modo oscuro" },
];

export default function BottomNavBar() {
  // Tamaño base aumentado en un 10%: de 40px a 44px.
  const baseSize = 44;
  const containerHeight = 66; // contenedor de 66px

  // Cada botón parte con escala 1 (tamaño base = baseSize) y puede crecer.
  const [scales, setScales] = useState<number[]>(() => items.map(() => 1));
  // Estado para la pestaña seleccionada.
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [centers, setCenters] = useState<number[]>(() => items.map(() => 0));
  const containerRef = useRef<HTMLDivElement>(null);

  // Parámetros para el fish‑eye:
  const threshold = 120; // A menos de 120px, se incrementa la escala.
  const maxAdd = 1;      // Escala máxima = 1 + maxAdd (en este ejemplo = 2).

  // TOOLTIP con retardo de 0,25 s.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTooltipIndex, setShowTooltipIndex] = useState<number | null>(null);
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);

  // Modo oscuro.
  const [darkMode, setDarkMode] = useState(false);

  // Mide el centro X de cada botón.
  useEffect(() => {
    function measureCenters() {
      if (!containerRef.current) return;
      const newCenters = items.map((_, i) => {
        const ref = itemRefs.current[i];
        if (!ref) return 0;
        const rect = ref.getBoundingClientRect();
        return rect.left + rect.width / 2;
      });
      setCenters(newCenters);
    }
    measureCenters();
    window.addEventListener("resize", measureCenters);
    return () => window.removeEventListener("resize", measureCenters);
  }, []);

  // Calcula la escala según la distancia al ratón (nunca menor que 1).
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const mouseX = e.clientX;
    const newScales = centers.map(center => {
      const distance = Math.abs(mouseX - center);
      let scale = 1;
      if (distance < threshold) {
        const factor = 1 - distance / threshold;
        scale = 1 + maxAdd * factor;
      }
      return scale;
    });
    setScales(newScales);
  }

  // Al salir el ratón, vuelve todo a escala 1 y oculta tooltips.
  function handleMouseLeave() {
    setScales(items.map(() => 1));
    setHoveredIndex(null);
    setShowTooltipIndex(null);
  }

  // Tooltip: espera 0,25 s antes de mostrar.
  function onMouseEnterIcon(i: number) {
    setHoveredIndex(i);
    tooltipTimer.current = setTimeout(() => {
      setShowTooltipIndex(i);
    }, 250);
  }
  function onMouseLeaveIcon() {
    setHoveredIndex(null);
    if (tooltipTimer.current) {
      clearTimeout(tooltipTimer.current);
      tooltipTimer.current = null;
    }
    setShowTooltipIndex(null);
  }

  // Alterna modo oscuro.
  function toggleDarkMode() {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "inline-flex",
        whiteSpace: "nowrap",
        alignItems: "center", // Centra verticalmente los botones.
        gap: "1rem",
        background: "#1a1a1a",
        borderRadius: "20px",
        padding: "0.5rem 1rem",
        // Simula un borde ultrafino con box-shadow inset.
        boxShadow: "inset 0 0 0 0.5px #fff, 0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 9999,
        height: `${containerHeight}px`,
      }}
    >
      {items.map((item, i) => {
        // Separador.
        if (item.type === "separator") {
          return (
            <div
              key="separator"
              style={{
                width: "1px",
                height: "25px",
                background: "#444",
                margin: "0 0.5rem",
              }}
            />
          );
        }

        // Wrapper para fijar la altura del botón y alinear su contenido (para que crezca solo hacia arriba).
        const buttonWrapperStyle = {
          height: "40px",
          display: "flex",
          alignItems: "flex-end",
        } as React.CSSProperties;

        // Botón para cambiar el tema (modo oscuro).
        if (item.type === "darkMode") {
          const scale = scales[i];
          const size = baseSize * scale;
          return (
            <div
              key={item.key}
              ref={(el) => { itemRefs.current[i] = el; }}
              onMouseEnter={() => onMouseEnterIcon(i)}
              onMouseLeave={onMouseLeaveIcon}
              onClick={toggleDarkMode}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <div style={buttonWrapperStyle}>
                <div
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transformOrigin: "bottom center",
                    transition: "width 0.15s, height 0.15s",
                    borderRadius: "50%",
                    boxShadow: "inset 0 0 0 0.5px #fff",
                    background: "#2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: `${1.2 * scale}rem`, color: "#fff" }}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </div>
                </div>
              </div>
              {showTooltipIndex === i && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 4px)", // Aparece solo por encima.
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.8)",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>
          );
        }

        // Botón normal para las 7 pestañas.
        const scale = scales[i];
        const size = baseSize * scale;
        return (
          <div
            key={item.key}
            ref={(el) => { itemRefs.current[i] = el; }}
            onMouseEnter={() => onMouseEnterIcon(i)}
            onMouseLeave={onMouseLeaveIcon}
            onClick={() => setSelectedIndex(i)}
            style={{ position: "relative" }}
          >
            <div style={buttonWrapperStyle}>
              <Link href={item.href || "#"} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transformOrigin: "bottom center",
                    transition: "width 0.15s, height 0.15s",
                    borderRadius: "50%",
                    boxShadow:
                      i === selectedIndex
                        ? "inset 0 0 0 0.5px #8B4513" // borde café para seleccionado
                        : "inset 0 0 0 0.5px #fff",
                    background: "#2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: `${1.2 * scale}rem`, color: darkMode ? "#fff" : "#ccc" }}>
                    {item.icon}
                  </div>
                </div>
              </Link>
            </div>
            {showTooltipIndex === i && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 4px)", // Solo por encima.
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.8)",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
