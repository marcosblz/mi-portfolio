// src/components/HomeSection.tsx
const HomeSection = () => {
    return (
      <section id="inicio" style={{ padding: '4rem 0', textAlign: 'center' }}>
        {/* Placeholder: Círculo gris para la imagen de perfil */}
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'grey',
            margin: '0 auto',
          }}
        >
          {/* Espacio reservado para la imagen */}
        </div>
        <h1>¡Hola, soy [Tu Nombre]!</h1>
        <p>Estudios: SMR, DAM y Bootcamp DEVOPS</p>
      </section>
    );
  };
  
  export default HomeSection;
  