"use client";

import { useEffect, useState } from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Image from "next/image";

export default function HomePage() {
  // Usamos "Programador " como prefijo
  const fixedPrefix = "Programador ";
  const roleSuffixes = ["Backend", "DevOps"];
  // Inicializamos mostrando el primer sufijo completo para evitar reescrituras innecesarias
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedSuffix, setDisplayedSuffix] = useState(roleSuffixes[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSuffix = roleSuffixes[currentRoleIndex];
    const typingSpeed = isDeleting ? 75 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Si ya se mostró el sufijo completo, espera y luego comienza a borrar
        if (displayedSuffix === currentSuffix) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        } else {
          // Esto no se ejecuta en el primer ciclo ya que mostramos el sufijo completo
          setDisplayedSuffix(currentSuffix.substring(0, displayedSuffix.length + 1));
        }
      } else {
        // Borramos letra a letra
        setDisplayedSuffix((prev) => {
          const updated = currentSuffix.substring(0, prev.length - 1);
          if (updated === "") {
            setIsDeleting(false);
            setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roleSuffixes.length);
          }
          return updated;
        });
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedSuffix, isDeleting, currentRoleIndex, roleSuffixes]);

  useEffect(() => {
    // Deshabilitamos el scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const container = document.querySelector<HTMLDivElement>(".portfolio-container");
    const gradientsContainer = container?.querySelector<HTMLDivElement>(".gradients-container");
    if (!container || !gradientsContainer) return;

    const margin = 200;
    const balls = Array.from(gradientsContainer.children).filter(
      (el) => !el.classList.contains("interactive")
    );

    const ballData = balls.map((ball) => {
      const halfWidth = ball.clientWidth / 2;
      const halfHeight = ball.clientHeight / 2;
      const containerRect = container.getBoundingClientRect();
      const x = halfWidth + Math.random() * (containerRect.width - 2 * halfWidth);
      const y = halfHeight + Math.random() * (containerRect.height - 2 * halfHeight);
      const speed = 50;
      let angle = Math.random() * 2 * Math.PI;
      let vx = speed * Math.cos(angle);
      let vy = speed * Math.sin(angle);
      if (Math.abs(vy) < speed * 0.5) {
        vy = (vy >= 0 ? 1 : -1) * (speed * 0.5);
        vx = Math.sqrt(speed * speed - vy * vy) * (Math.random() < 0.5 ? -1 : 1);
      }
      vx *= 5;
      vy *= 5;
      return {
        element: ball as HTMLElement,
        x,
        y,
        vx,
        vy,
        halfWidth,
        halfHeight,
      };
    });

    let lastTimestamp: number | null = null;
    function animate(timestamp: number) {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const dt = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      const containerRect = container!.getBoundingClientRect();

      ballData.forEach((data) => {
        data.x += data.vx * dt;
        data.y += data.vy * dt;

        if (data.x - data.halfWidth < -margin) {
          data.x = -margin + data.halfWidth;
          data.vx *= -1;
        }
        if (data.x + data.halfWidth > containerRect.width + margin) {
          data.x = containerRect.width + margin - data.halfWidth;
          data.vx *= -1;
        }
        if (data.y - data.halfHeight < -margin) {
          data.y = -margin + data.halfHeight;
          data.vy *= -1;
        }
        if (data.y + data.halfHeight > containerRect.height + margin) {
          data.y = containerRect.height + margin - data.halfHeight;
          data.vy *= -1;
        }
        data.element.style.transform = `translate(${data.x - data.halfWidth}px, ${data.y - data.halfHeight}px)`;
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
                {fixedPrefix}
                <span className="roleSuffix">{displayedSuffix}</span>
              </h2>
              <div className="projectPill fadeInLeft">
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
