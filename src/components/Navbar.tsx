// src/components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        // FUTURO: aplicar estilo "píldora" a los enlaces
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1>
          <Link href="/">Mi Portafolio</Link>
        </h1>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#sobre">Sobre mí</a>
          </li>
          <li>
            <a href="#camino">Camino</a>
          </li>
          <li>
            <a href="#estudios">Estudios</a>
          </li>
          <li>
            <a href="#habilidades">Habilidades</a>
          </li>
          <li>
            <a href="#proyectos">Proyectos</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
