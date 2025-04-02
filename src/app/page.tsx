"use client";

import BottomNavBar from "@/components/BottomNavBar";
import Image from "next/image";

export default function HomePage() {
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
            {/* Imagen a la izquierda con animación fadeIn */}
            <div className="imageWrapper fadeIn">
              <Image
                src="/images/profile.jpg"
                alt="Foto de Marcos con taza de café"
                width={400}
                height={572}
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* Línea divisoria */}
            <div className="divider" />
            {/* Texto a la derecha con animación fadeIn */}
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
