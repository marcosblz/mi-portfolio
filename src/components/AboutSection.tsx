// src/components/AboutSection.tsx
const AboutSection = () => {
    return (
      <section
        id="sobre"
        style={{
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Placeholder: Círculo gris para imagen personal */}
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'grey',
          }}
        >
          {/* Imagen reservada */}
        </div>
        <div>
          <h2>Sobre mí</h2>
          <p>
            Soy un desarrollador apasionado con experiencia en diversas tecnologías.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
            odio vitae vestibulum vestibulum.
          </p>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  