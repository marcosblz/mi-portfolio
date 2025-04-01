"use client";

import BottomNavBar from "@/components/BottomNavBar";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="homeMain">
      <div className="heroSection">
        <div className="heroContent">
          {/* Imagen con un suave fade-in */}
          <div className="imageWrapper fadeIn">
            <Image
              src="/images/profile.jpg"
              alt="Foto de Marcos con taza de café"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Línea divisoria */}
          <div className="divider" />

          {/* Bloque de texto con fade-in */}
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
  );
}
