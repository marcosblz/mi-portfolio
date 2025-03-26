// src/components/SkillsSection.tsx
const SkillsSection = () => {
    return (
      <section id="habilidades" style={{ padding: '4rem 0' }}>
        <h2>Habilidades</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <p>Node.js</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <p>Python</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <p>Docker</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <p>Kubernetes</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <p>React</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default SkillsSection;
  