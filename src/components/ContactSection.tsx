"use client";

import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Mensaje enviado');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contacto" style={{ padding: '4rem 0' }}>
      <h2>Contacto</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem' }}
        />
        <textarea
          name="message"
          placeholder="Tu mensaje"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          style={{ padding: '0.5rem' }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Enviar
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="#" style={{ color: '#0070f3' }}>
          Descargar CV
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
