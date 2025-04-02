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
  const baseSize = 44;
  const containerHeight = 60;
  const [scales, setScales] = useState<number[]>(() => items.map(() => 1));
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [centers, setCenters] = useState<number[]>(() => items.map(() => 0));
  const containerRef = useRef<HTMLDivElement>(null);
  const threshold = 120;
  const maxAdd = 1;
  const [showTooltipIndex, setShowTooltipIndex] = useState<number | null>(null);
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);
  const [darkMode, setDarkMode] = useState(false);

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

  function handleMouseLeave() {
    setScales(items.map(() => 1));
    setShowTooltipIndex(null);
  }

  function onMouseEnterIcon(i: number) {
    tooltipTimer.current = setTimeout(() => {
      setShowTooltipIndex(i);
    }, 250);
  }
  function onMouseLeaveIcon() {
    if (tooltipTimer.current) {
      clearTimeout(tooltipTimer.current);
      tooltipTimer.current = null;
    }
    setShowTooltipIndex(null);
  }

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  }

  const navBarStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "inline-flex",
    whiteSpace: "nowrap",
    alignItems: "center",
    gap: "1rem",
    background: darkMode ? "#1a1a1a" : "#ffffff",
    borderRadius: "20px",
    padding: "0.5rem 1rem",
    boxShadow: darkMode 
      ? "inset 0 0 0 0.5px #fff, 0 2px 10px rgba(0,0,0,0.3)"
      : "inset 0 0 0 0.5px #000, 0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 9999,
    height: `${containerHeight}px`,
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={navBarStyle}
    >
      {items.map((item, i) => {
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
        const buttonWrapperStyle = {
          height: "40px",
          display: "flex",
          alignItems: "flex-end",
        } as React.CSSProperties;

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
                    bottom: "calc(100% + 4px)",
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
                        ? "inset 0 0 0 0.5px #8B4513"
                        : "inset 0 0 0 0.5px " + (darkMode ? "#fff" : "#000"),
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
                  bottom: "calc(100% + 4px)",
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
