"use client";

import { useState } from "react";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

type Tab = "inicio" | "sobre" | "camino" | "estudios" | "habilidades" | "proyectos" | "contacto";

const TabNavigator = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("inicio");

  const renderContent = () => {
    switch (selectedTab) {
      case "inicio":
        return <HomeSection />;
      case "sobre":
        return <AboutSection />;
      case "camino":
        return <JourneySection />;
      case "estudios":
        return <EducationSection />;
      case "habilidades":
        return <SkillsSection />;
      case "proyectos":
        return <ProjectsSection />;
      case "contacto":
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  const tabs: Tab[] = [
    "inicio",
    "sobre",
    "camino",
    "estudios",
    "habilidades",
    "proyectos",
    "contacto",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Área de contenido */}
      <div style={{ flex: "1 0 auto" }}>{renderContent()}</div>

      {/* Selector de pestañas */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem",
          borderTop: "1px solid #ddd",
          background: "#fff",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: selectedTab === tab ? "2px solid #0070f3" : "1px solid #ccc",
              background: selectedTab === tab ? "#0070f3" : "#fff",
              color: selectedTab === tab ? "#fff" : "#0070f3",
              cursor: "pointer",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigator;
