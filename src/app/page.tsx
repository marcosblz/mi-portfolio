"use client";

import { useEffect } from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Image from "next/image";

export default function HomePage() {
  // Ya no es necesario usar estados para el texto del puesto
  const fixedRole = "Backend";

  useEffect(() => {
    // Se conserva la lógica de las animaciones de las pelotas y el bloqueo del scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const container = document.querySelector<HTMLDivElement>(".portfolio-container");
    const gradientsContainer = container?.querySelector<HTMLDivElement>(".gradients-container");
    if (!container || !gradientsContainer) return;

    const margin = 200;
    const balls = Array.from(gradientsContainer.children).filter(
      (el) => !el.classList.contains("interactive")
    );

    // ... (resto de la animación de las pelotas sin cambios)
    
    let lastTimestamp: number | null = null;
    function animate(timestamp: number) {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const dt = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      const containerRect = container!.getBoundingClientRect();

      balls.forEach((ball: any) => {
        // Lógica de animación para cada pelota
        // ...
      });
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    const handleResize = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="portfolio-container"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
      }}
    >
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </div>
      <main className="homeMain">
        <div className="heroSection">
          <div className="heroContent">
            <div className="imageWrapper fadeIn">
              <Image
                src="/images/profile.jpg"
                alt="Foto de Marcos con taza de café"
                width={400}
                height={572}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="divider" />
            <div className="textWrapper fadeIn">
              <h1 className="heroName">Marcos</h1>
              <h2 className="heroRole">
                <span className="baseText">Programador Backend</span>
                <span className="shineOverlay">Programador Backend</span>
              </h2>

              <div className="projectPill">
                <span className="blinkingDot"></span>
                Abierto a nuevos proyectos
              </div>
              <p className="heroDesc">
                Formado en SMR, DAM y Bootcamp de DevOps. Me apasiona transformar ideas en soluciones
                robustas y escalables. Con experiencia en arquitecturas de microservicios y API RESTful,
                me esfuerzo por escribir código limpio y eficiente que impulse la innovación. Siempre estoy
                aprendiendo y buscando colaborar con equipos visionarios para crear experiencias digitales
                impactantes.
              </p>
            </div>
          </div>
        </div>
        <BottomNavBar />
      </main>
    </div>
  );
}
