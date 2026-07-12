"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Diagrama que EXPLICA el flujo evento → evaluación → señal → canal → acción.
 * Los eventos entran desde varias fuentes; la mayoría es ruido y se disipa en
 * el filtro; el que importa se convierte en señal (rojo) y llega por el canal
 * correcto a quien debe actuar. Respeta prefers-reduced-motion.
 */

const SOURCES = [
  "Sensor",
  "Servidor",
  "Precio",
  "Cliente",
  "Orden",
  "Documento",
] as const;

// y de cada fuente en el viewBox
const Y = [40, 96, 152, 208, 264, 320];
const GATE_X = 350;
const GATE_Y = 180;
const CH_X = 540;
const CH_Y = 118;
const ACT_Y = 250;

function toGate(i: number): string {
  const y = Y[i]!;
  return `M120,${y} C 235,${y} 250,${GATE_Y} ${GATE_X},${GATE_Y}`;
}
const GATE_TO_CH = `M${GATE_X},${GATE_Y} C 470,${GATE_Y} 505,${CH_Y} ${CH_X},${CH_Y}`;
function signalPath(i: number): string {
  return `${toGate(i)} ${GATE_TO_CH.replace(`M${GATE_X},${GATE_Y} `, "")}`;
}

type Scenario = { source: number; channel: string; action: string };

const SCENARIOS: Scenario[] = [
  { source: 0, channel: "Telegram", action: "Aviso al operador" },
  { source: 2, channel: "WhatsApp", action: "Alerta al comercial" },
  { source: 3, channel: "CRM", action: "Oportunidad asignada" },
  { source: 1, channel: "SMS", action: "Escalamiento al jefe" },
];

export function SignalFlow() {
  const reduced = useReducedMotion();
  // Bajo reduced: estado estático (i=0, arrived=true) — diagrama claro sin movimiento.
  const [i, setI] = useState(0);
  const [arrived, setArrived] = useState(true);

  useEffect(() => {
    if (reduced) return;
    let arriveTimer: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setArrived(false);
      setI((v) => (v + 1) % SCENARIOS.length);
      arriveTimer = setTimeout(() => setArrived(true), 1650);
    };
    const id = setInterval(cycle, 3600);
    return () => {
      clearInterval(id);
      clearTimeout(arriveTimer);
    };
  }, [reduced]);

  const sc = SCENARIOS[i]!;

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 720 360"
        className="h-auto w-full"
        role="img"
        aria-label="Diagrama del flujo de RedLocal: eventos llegan desde fuentes como sensores, servidores, precios, clientes, órdenes y documentos. Pasan por un filtro que descarta el ruido. El evento importante se convierte en una señal y se envía por el canal correcto —WhatsApp, Telegram, SMS o CRM— a la persona que debe actuar."
      >
        <defs>
          <linearGradient id="fade" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-line-strong)" />
            <stop offset="1" stopColor="var(--color-line)" />
          </linearGradient>
        </defs>

        {/* Rutas base (estructura) */}
        {SOURCES.map((_, idx) => (
          <path
            key={idx}
            d={toGate(idx)}
            fill="none"
            stroke="url(#fade)"
            strokeWidth={1}
          />
        ))}
        <path d={GATE_TO_CH} fill="none" stroke="var(--color-line-strong)" strokeWidth={1} />
        <line
          x1={CH_X}
          y1={CH_Y + 14}
          x2={CH_X}
          y2={ACT_Y - 14}
          stroke={arrived ? "var(--color-signal)" : "var(--color-line-strong)"}
          strokeWidth={1.5}
          className={arrived && !reduced ? "route-live" : undefined}
        />

        {/* Filtro / gate */}
        <g>
          <rect
            x={GATE_X - 10}
            y={28}
            width={20}
            height={304}
            rx={4}
            fill="var(--color-paper-2)"
            stroke="var(--color-line-strong)"
          />
          <text
            x={GATE_X}
            y={20}
            textAnchor="middle"
            className="fill-[color:var(--color-ink-faint)] font-mono"
            fontSize={11}
          >
            FILTRO
          </text>
          <text
            x={GATE_X}
            y={348}
            textAnchor="middle"
            className="fill-[color:var(--color-ink-faint)]"
            fontSize={11}
          >
            descarta el ruido
          </text>
        </g>

        {/* Fuentes */}
        {SOURCES.map((label, idx) => {
          const isSignal = sc.source === idx;
          return (
            <g key={label}>
              <circle cx={118} cy={Y[idx]} r={4} fill={isSignal ? "var(--color-signal)" : "var(--color-ink-faint)"} />
              <text
                x={106}
                y={Y[idx]! + 4}
                textAnchor="end"
                fontSize={13}
                className="fill-[color:var(--color-ink)] font-sans"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Ruido ambiente: dots que se disipan en el filtro */}
        {!reduced &&
          SOURCES.map((_, idx) =>
            idx === sc.source ? null : (
              <circle
                key={`noise-${idx}`}
                r={3}
                fill="var(--color-ink-faint)"
                style={{
                  offsetPath: `path('${toGate(idx)}')`,
                  offsetRotate: "0deg",
                  animation: `noise ${2.6 + (idx % 3) * 0.5}s linear ${idx * 0.4}s infinite`,
                }}
              />
            ),
          )}

        {/* La señal */}
        {!reduced && (
          <circle
            key={`sig-${i}`}
            r={5.5}
            fill="var(--color-signal)"
            style={{
              offsetPath: `path('${signalPath(sc.source)}')`,
              offsetRotate: "0deg",
              animation: "travel 1.65s ease-in-out forwards",
            }}
          />
        )}

        {/* Canal */}
        <g>
          <circle
            cx={CH_X}
            cy={CH_Y}
            r={7}
            fill={arrived ? "var(--color-signal)" : "var(--color-paper)"}
            stroke="var(--color-signal)"
            strokeWidth={1.5}
          />
          <text x={CH_X + 16} y={CH_Y - 4} fontSize={12} className="fill-[color:var(--color-ink-faint)] font-mono">
            CANAL
          </text>
          <text x={CH_X + 16} y={CH_Y + 13} fontSize={15} className="fill-[color:var(--color-ink)] font-display" fontWeight={600}>
            {sc.channel}
          </text>
        </g>

        {/* Acción */}
        <g opacity={arrived ? 1 : 0.35} style={{ transition: "opacity .4s ease" }}>
          <circle cx={CH_X} cy={ACT_Y} r={5} fill="var(--color-ok)" />
          <text x={CH_X + 16} y={ACT_Y - 3} fontSize={12} className="fill-[color:var(--color-ink-faint)] font-mono">
            ACCIÓN
          </text>
          <text x={CH_X + 16} y={ACT_Y + 14} fontSize={13} className="fill-[color:var(--color-ink)]">
            {sc.action}
          </text>
        </g>
      </svg>
      <figcaption className="sr-only">
        evento → evaluación → señal → canal → acción
      </figcaption>
    </figure>
  );
}
