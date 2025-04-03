"use client";

import { useEffect } from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Image from "next/image";

export default function HomePage() {
  useEffect(() => {
    // Forzar que no se pueda hacer scroll en todo el documento.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const container = document.querySelector<HTMLDivElement>(".portfolio-container");
    const gradientsContainer = container?.querySelector<HTMLDivElement>(".gradients-container");
    if (!container || !gradientsContainer) return;

    // Usaremos un margen de 200px para que las pelotas tengan más espacio antes de rebotar
    const margin = 200;

    const containerRect = container.getBoundingClientRect();

    // Selecciona las 5 pelotas (ignorando elementos con clase "interactive")
    const balls = Array.from(gradientsContainer.children).filter(
      (el) => !el.classList.contains("interactive")
    );

    // Genera posiciones iniciales para el centro de cada pelota
    const ballData = balls.map((ball) => {
      const halfWidth = ball.clientWidth / 2;
      const halfHeight = ball.clientHeight / 2;
      const containerRect = container.getBoundingClientRect();
      // Posición del centro entre halfWidth y (width - halfWidth) y similar para y.
      const x = halfWidth + Math.random() * (containerRect.width - 2 * halfWidth);
      const y = halfHeight + Math.random() * (containerRect.height - 2 * halfHeight);
      // Velocidad base entre 1200 y 1600 px/seg
      const speed = 50;
      let angle = Math.random() * 2 * Math.PI;
      let vx = speed * Math.cos(angle);
      let vy = speed * Math.sin(angle);
      // Forzar que |vy| sea al menos el 50% de speed
      if (Math.abs(vy) < speed * 0.5) {
        vy = (vy >= 0 ? 1 : -1) * (speed * 0.5);
        vx = Math.sqrt(speed * speed - vy * vy) * (Math.random() < 0.5 ? -1 : 1);
      }
      // Multiplicar ambas componentes por 5 (multiplicador razonable para que se vea el movimiento)
      vx *= 5;
      vy *= 5;
      console.log("Pelota generada: vx =", vx.toFixed(2), "vy =", vy.toFixed(2));
      return {
        element: ball as HTMLElement,
        x, // posición del centro
        y,
        vx,
        vy,
        halfWidth,
        halfHeight,
      };
    });

    let lastTimestamp: number | null = null;
    let lastLogTime = 0;
    function animate(timestamp: number) {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const dt = (timestamp - lastTimestamp) / 1000; // en segundos
      lastTimestamp = timestamp;

      // Recalcula el rectángulo del contenedor en cada frame
      const containerRect = container.getBoundingClientRect();

      ballData.forEach((data) => {
        data.x += data.vx * dt;
        data.y += data.vy * dt;

        // Colisión horizontal: se rebota cuando el borde de la pelota (centro ± halfWidth) toca el contenedor extendido en margin
        if (data.x - data.halfWidth < -margin) {
          data.x = -margin + data.halfWidth;
          data.vx *= -1;
        }
        if (data.x + data.halfWidth > containerRect.width + margin) {
          data.x = containerRect.width + margin - data.halfWidth;
          data.vx *= -1;
        }
        // Colisión vertical: se rebota cuando el borde de la pelota (centro ± halfHeight) toca el contenedor extendido en margin
        if (data.y - data.halfHeight < -margin) {
          data.y = -margin + data.halfHeight;
          data.vy *= -1;
        }
        if (data.y + data.halfHeight > containerRect.height + margin) {
          data.y = containerRect.height + margin - data.halfHeight;
          data.vy *= -1;
        }

        // Posiciona la pelota de modo que su centro quede en (data.x, data.y)
        data.element.style.transform = `translate(${data.x - data.halfWidth}px, ${data.y - data.halfHeight}px)`;
      });

      if (timestamp - lastLogTime >= 1000) {
        console.log(
          "Posiciones:",
          ballData.map((d, i) => `Pelota ${i + 1}: (${d.x.toFixed(2)}, ${d.y.toFixed(2)})`)
        );
        lastLogTime = timestamp;
      }

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
        position: "fixed", // Fija el contenedor a la pantalla
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
