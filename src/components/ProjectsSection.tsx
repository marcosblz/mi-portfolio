// src/components/ProjectsSection.tsx
interface Project {
    id: number;
    title: string;
    description: string;
    link: string;
  }
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Proyecto 1',
      description: 'Descripción breve del proyecto 1.',
      link: '#',
    },
    {
      id: 2,
      title: 'Proyecto 2',
      description: 'Descripción breve del proyecto 2.',
      link: '#',
    },
    {
      id: 3,
      title: 'Proyecto 3',
      description: 'Descripción breve del proyecto 3.',
      link: '#',
    },
  ];
  
  const ProjectsSection = () => {
    return (
      <section id="proyectos" style={{ padding: '4rem 0' }}>
        <h2>Proyectos</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                height: '200px', // Espacio cuadrado
              }}
            >
              <h3>{project.title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{project.description}</p>
              <a href={project.link}>Ver proyecto</a>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ProjectsSection;
  