import React from 'react';
import {AbsoluteFill, Composition} from 'remotion';

const Page = ({title, subtitle, accent = '#22c55e', blocks = []}) => (
  <AbsoluteFill
    style={{
      background: 'linear-gradient(135deg, #eaf4ff 0%, #f0fdf4 100%)',
      fontFamily: 'Inter, Arial, sans-serif',
      color: '#0f172a',
      padding: 64,
    }}
  >
    <div style={{fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 1300}}>{title}</div>
    <div style={{fontSize: 32, color: '#334155', marginTop: 16, marginBottom: 36}}>{subtitle}</div>

    <div style={{display: 'grid', gridTemplateColumns: `repeat(${blocks.length}, 1fr)`, gap: 24}}>
      {blocks.map((b, i) => (
        <div
          key={i}
          style={{
            background: '#ffffff',
            border: '1px solid #dbeafe',
            borderRadius: 24,
            padding: 28,
            minHeight: 420,
            boxShadow: '0 18px 40px rgba(15,23,42,0.09)',
          }}
        >
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 20,
              background: b.badge || '#e0f2fe',
              display: 'grid',
              placeItems: 'center',
              fontSize: 36,
              marginBottom: 16,
            }}
          >
            {b.icon}
          </div>
          <div style={{fontSize: 34, fontWeight: 700, marginBottom: 14}}>{b.title}</div>
          <div style={{fontSize: 25, color: '#475569', lineHeight: 1.45}}>{b.body}</div>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: 26,
        height: 10,
        width: '100%',
        borderRadius: 999,
        background: '#dbeafe',
      }}
    >
      <div style={{height: '100%', width: '45%', background: accent, borderRadius: 999}} />
    </div>
  </AbsoluteFill>
);

const Hero = () => (
  <Page
    title="Vende más por WhatsApp, sin trabajar el doble"
    subtitle="Respondemos al instante para que no se te escapen clientes, mientras tú sigues atendiendo tu negocio"
    accent="#22c55e"
    blocks={[
      {icon: '💬', title: 'Respuesta inmediata', body: 'El cliente recibe atención al momento, incluso fuera de horario.', badge: '#dcfce7'},
      {icon: '🎯', title: 'Lead calificado', body: 'Captura datos clave y prioriza casos con reglas claras.', badge: '#e0f2fe'},
      {icon: '📈', title: 'Más control', body: 'Visibilidad mensual para mejorar tiempos y conversión.', badge: '#fef9c3'},
    ]}
  />
);

const Flow = () => (
  <Page
    title="Flujo RedLocal en 3 pasos"
    subtitle="Implementación estándar para rapidez, estabilidad y costos predecibles"
    accent="#0ea5e9"
    blocks={[
      {icon: '1️⃣', title: 'Entrada', body: 'Bienvenida automática, menú y captura de datos del cliente.'},
      {icon: '2️⃣', title: 'Calificación', body: 'Respuestas configuradas y priorización por tipo de consulta.'},
      {icon: '3️⃣', title: 'Derivación', body: 'Traspaso al equipo humano cuando se requiere cierre o atención especializada.'},
    ]}
  />
);

const Cases = () => (
  <Page
    title="Rubros donde RedLocal encaja rápido"
    subtitle="Producto cerrado pensado para resolver problemas simples con alta repetición"
    accent="#a855f7"
    blocks={[
      {icon: '🍽️', title: 'Restaurantes', body: 'Reservas, horarios, dudas frecuentes.'},
      {icon: '🏥', title: 'Clínicas', body: 'Preconsulta, horarios y derivación.'},
      {icon: '🔧', title: 'Talleres/Servicios', body: 'Diagnóstico inicial y priorización.'},
      {icon: '🛒', title: 'Comercio', body: 'Stock, despacho y postventa básica.'},
    ]}
  />
);

export const Root = () => {
  return (
    <>
      <Composition id="HeroLanding" component={Hero} durationInFrames={1} fps={30} width={1600} height={1000} />
      <Composition id="FlowLanding" component={Flow} durationInFrames={1} fps={30} width={1600} height={760} />
      <Composition id="CasesLanding" component={Cases} durationInFrames={1} fps={30} width={1600} height={700} />
    </>
  );
};
