"use client";

import { useEffect } from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Image from "next/image";

export default function HomePage() {
  useEffect(() => {
    const container = document.querySelector(".portfolio-container");
    const gradientsContainer = container?.querySelector(".gradients-container");
    if (!container || !gradientsContainer) return;

    const containerRect = container.getBoundingClientRect();

    // Seleccionamos las 5 pelotas (ignorar la capa 'interactive')
    const balls = Array.from(gradientsContainer.children).filter(
      (el) => !el.classList.contains("interactive")
    );

    // Asignar posiciones y velocidades aleatorias repartidas por todo el contenedor
    const ballData = balls.map((ball) => {
      const ballWidth = ball.clientWidth;
      const ballHeight = ball.clientHeight;
      const x = Math.random() * (containerRect.width - ballWidth);
      const y = Math.random() * (containerRect.height - ballHeight);
      // Velocidad aleatoria entre 50 y 150 px/seg
      const speed = 50 + Math.random() * 100;
      const angle = Math.random() * 2 * Math.PI;
      return {
        element: ball as HTMLElement,
        x,
        y,
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
      };
    });

    let lastTimestamp: number | null = null;
    function animate(timestamp: number) {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const dt = (timestamp - lastTimestamp) / 1000; // en segundos
      lastTimestamp = timestamp;

      ballData.forEach((data) => {
        data.x += data.vx * dt;
        data.y += data.vy * dt;

        // Rebotar en las paredes del contenedor
        if (data.x < 0) {
          data.x = 0;
          data.vx *= -1;
        }
        if (data.y < 0) {
          data.y = 0;
          data.vy *= -1;
        }
        if (data.x + data.element.clientWidth > containerRect.width) {
          data.x = containerRect.width - data.element.clientWidth;
          data.vx *= -1;
        }
        if (data.y + data.element.clientHeight > containerRect.height) {
          data.y = containerRect.height - data.element.clientHeight;
          data.vy *= -1;
        }

        data.element.style.transform = `translate(${data.x}px, ${data.y}px)`;
      });

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Actualizar containerRect en redimensionamiento (opcional)
    const handleResize = () => {
      // Se podría recalcular containerRect si se desea.
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="portfolio-container">
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
          <div className="interactive"></div>
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
              <h2 className="heroRole">Programador Backend</h2>
              <p className="heroDesc">
                Me apasiona transformar ideas en soluciones robustas y escalables. Con
                experiencia en arquitecturas de microservicios y API RESTful, me esfuerzo
                por escribir código limpio y eficiente que impulse la innovación. Siempre
                estoy aprendiendo y buscando colaborar con equipos visionarios para crear
                experiencias digitales impactantes.
              </p>
            </div>
          </div>
        </div>
        <BottomNavBar />
      </main>
    </div>
  );
}
