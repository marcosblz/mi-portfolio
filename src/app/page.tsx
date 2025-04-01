"use client";

import BottomNavBar from "@/components/BottomNavBar";
import Image from "next/image";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1f1f1f 0%, #2b2b2b 100%)",
        color: "#fff",
      }}
    >
      {/* Contenedor principal para la imagen y el texto */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "1200px",
            width: "100%",
            gap: "3rem",
          }}
        >
          {/* Lado Izquierdo: Imagen */}
          <div
            style={{
              flex: "none",
              width: "320px",
              height: "457px",
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src="/images/profile.png"
              alt="Foto de Marcos con taza de café"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Línea vertical divisoria */}
          <div
            style={{
              width: "1px",
              height: "60%",
              backgroundColor: "#ccc",
              margin: "0 3rem",
            }}
          />

          {/* Lado Derecho: Texto de presentación con animación */}
          <div className="textContainer" style={{ flex: 1 }}>
            <h1 style={{ fontSize: "3rem", margin: 0 }}>Marcos</h1>
            <h2 style={{ fontSize: "2rem", margin: 0, marginTop: "0.5rem", color: "#aaa" }}>
              Programador Backend
            </h2>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.6", maxWidth: "600px" }}>
              Me apasiona transformar ideas en soluciones robustas y escalables. Con experiencia en
              arquitecturas de microservicios y API RESTful, me esfuerzo por escribir código limpio
              y eficiente que impulsa la innovación. Siempre estoy aprendiendo y buscando
              colaborar con equipos visionarios para crear experiencias digitales impactantes.
            </p>
          </div>
        </div>
      </div>

      {/* BottomNavBar fijo en la parte inferior */}
      <BottomNavBar />

      {/* Animación para el bloque de texto: se desliza de izquierda a derecha */}
      <style jsx>{`
        .textContainer {
          opacity: 0;
          transform: translateX(-50px);
          animation: slideIn 1s forwards;
        }
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
