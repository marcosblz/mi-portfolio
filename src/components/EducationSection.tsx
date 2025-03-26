// src/components/EducationSection.tsx
const EducationSection = () => {
    return (
      <section id="estudios" style={{ padding: '4rem 0' }}>
        <h2>Estudios</h2>
        <div
          style={{
            borderLeft: '2px solid #ccc',
            marginLeft: '20px',
            paddingLeft: '20px',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>SMR - [Institución]</h3>
            <span>Fecha: 20XX</span>
            <p>Descripción breve de la formación en SMR.</p>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>DAM - [Institución]</h3>
            <span>Fecha: 20XX</span>
            <p>Descripción breve de la formación en DAM.</p>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Bootcamp DEVOPS - [Institución]</h3>
            <span>Fecha: 20XX</span>
            <p>Descripción breve del bootcamp en DEVOPS.</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default EducationSection;
  