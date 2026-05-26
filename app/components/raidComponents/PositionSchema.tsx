"use client";
import { useState } from "react";

type Shape = "circle" | "square" | "rectangle";
type Role = "MT" | "OT" | "H1" | "H2" | "R1" | "R2" | "M1" | "M2" | "Boss";
type Waymark = "A" | "B" | "C" | "D" | "1" | "2" | "3" | "4";

interface AoE {
  type: "cone" | "circle" | "rect" | "share" | "tankbuster";
  x: number;
  y: number;
  range: number;
  direction: number;
  angle?: number;
  width?: number;
}

interface Position {
  role: Role | Waymark;
  x: number;
  y: number;
  label?: string;
}

interface PositionSchemaProps {
  positions: Position[] | string;
  positionsAfter?: Position[] | string;
  shape?: Shape;
  label?: string;
  size?: number;
}

const roleColors: Record<Role, { bg: string; text: string; border: string }> = {
  MT: { bg: "#1e40af", text: "#ffffff", border: "#3b82f6" },
  OT: { bg: "#1e40af", text: "#ffffff", border: "#93c5fd" },
  H1: { bg: "#166534", text: "#ffffff", border: "#4ade80" },
  H2: { bg: "#166534", text: "#ffffff", border: "#86efac" },
  R1: { bg: "#7f1d1d", text: "#ffffff", border: "#f87171" },
  R2: { bg: "#7f1d1d", text: "#ffffff", border: "#fca5a5" },
  M1: { bg: "#78350f", text: "#ffffff", border: "#fb923c" },
  M2: { bg: "#78350f", text: "#ffffff", border: "#fdba74" },
  Boss: { bg: "#4c1d95", text: "#ffffff", border: "#a78bfa" },
};

const waymarkColors: Record<
  Waymark,
  { bg: string; text: string; border: string }
> = {
  A: { bg: "#7f1d1d", text: "#ffffff", border: "#ef4444" },
  B: { bg: "#78350f", text: "#ffffff", border: "#f59e0b" },
  C: { bg: "#1e3a5f", text: "#ffffff", border: "#3b82f6" },
  D: { bg: "#4c1d95", text: "#ffffff", border: "#a78bfa" },
  "1": { bg: "#7f1d1d", text: "#ffffff", border: "#ef4444" },
  "2": { bg: "#78350f", text: "#ffffff", border: "#f59e0b" },
  "3": { bg: "#1e3a5f", text: "#ffffff", border: "#3b82f6" },
  "4": { bg: "#4c1d95", text: "#ffffff", border: "#a78bfa" },
};

const isWaymark = (role: Role | Waymark): role is Waymark =>
  ["A", "B", "C", "D", "1", "2", "3", "4"].includes(role);

const isLetterWaymark = (role: Waymark): boolean =>
  ["A", "B", "C", "D"].includes(role);

const parsePositions = (
  prop: Position[] | string,
): { tokens: Position[]; aoes: AoE[] } => {
  const raw = typeof prop === "string" ? JSON.parse(prop) : prop;
  if (Array.isArray(raw)) return { tokens: raw, aoes: [] };
  return { tokens: raw.tokens ?? [], aoes: raw.aoes ?? [] };
};

export default function PositionSchema({
  positions: positionsProp = [],
  positionsAfter: positionsAfterProp,
  shape = "circle",
  label,
  size = 400,
}: PositionSchemaProps) {
  const [showAfter, setShowAfter] = useState(false);

  const { tokens, aoes } = parsePositions(positionsProp);
  const after = positionsAfterProp ? parsePositions(positionsAfterProp) : null;

  const currentTokens = showAfter && after ? after.tokens : tokens;
  const currentAoes = showAfter && after ? after.aoes : aoes;

  const padding = 40;
  const innerSize = size - padding * 2;
  const center = size / 2;
  const tokenRadius = 16;

  const getArenaPath = () => {
    switch (shape) {
      case "circle":
        return (
          <circle
            cx={center}
            cy={center}
            r={innerSize / 2}
            fill="#1a1a2e"
            stroke="#374151"
            strokeWidth={2}
          />
        );
      case "square":
        return (
          <rect
            x={padding}
            y={padding}
            width={innerSize}
            height={innerSize}
            fill="#1a1a2e"
            stroke="#374151"
            strokeWidth={2}
          />
        );
      case "rectangle":
        return (
          <rect
            x={padding}
            y={padding + innerSize * 0.15}
            width={innerSize}
            height={innerSize * 0.7}
            fill="#1a1a2e"
            stroke="#374151"
            strokeWidth={2}
          />
        );
    }
  };

  const toSvgCoords = (x: number, y: number) => ({
    cx: padding + x * innerSize,
    cy: padding + y * innerSize,
  });

  return (
    <div className="my-6">
      {label && (
        <p className="text-sm text-white/50 mb-3 text-center uppercase tracking-widest">
          {label}
        </p>
      )}

      {after && (
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${!showAfter ? "bg-amber-500 text-black" : "bg-gray-800/60 text-white/60 hover:bg-gray-700"}`}
          >
            Avant
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${showAfter ? "bg-amber-500 text-black" : "bg-gray-800/60 text-white/60 hover:bg-gray-700"}`}
          >
            Après
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="max-w-full"
        >
          <rect width={size} height={size} fill="#0d0f17" rx={8} />
          {getArenaPath()}

          {/* Lignes cardinales */}
          <line
            x1={center}
            y1={padding}
            x2={center}
            y2={size - padding}
            stroke="#374151"
            strokeWidth={0.5}
            strokeDasharray="4,4"
          />
          <line
            x1={padding}
            y1={center}
            x2={size - padding}
            y2={center}
            stroke="#374151"
            strokeWidth={0.5}
            strokeDasharray="4,4"
          />

          {/* AoEs — rendus avant les jetons pour être en dessous */}
          {currentAoes.map((aoe, i) => {
            const cx = padding + aoe.x * innerSize;
            const cy = padding + aoe.y * innerSize;
            const r = aoe.range * innerSize;

            if (aoe.type === "circle") {
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="rgba(239,68,68,0.15)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth={1.5}
                />
              );
            }

            if (aoe.type === "share") {
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="rgba(234,179,8,0.1)"
                  stroke="rgba(234,179,8,0.6)"
                  strokeWidth={1.5}
                  strokeDasharray="4,3"
                />
              );
            }

            if (aoe.type === "tankbuster") {
              return (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="rgba(239,68,68,0.1)"
                    stroke="rgba(239,68,68,0.7)"
                    strokeWidth={2}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r * 0.5}
                    fill="none"
                    stroke="rgba(239,68,68,0.4)"
                    strokeWidth={1}
                  />
                </g>
              );
            }

            if (aoe.type === "rect" && aoe.width !== undefined) {
              const w = aoe.width * innerSize;
              const h = aoe.range * innerSize;
              return (
                <rect
                  key={i}
                  x={cx - w / 2}
                  y={cy}
                  width={w}
                  height={h}
                  fill="rgba(239,68,68,0.15)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth={1.5}
                  transform={`rotate(${aoe.direction}, ${cx}, ${cy})`}
                />
              );
            }

            if (aoe.type === "cone" && aoe.angle !== undefined) {
              const rad = aoe.direction * (Math.PI / 180);
              const halfAngle = (aoe.angle / 2) * (Math.PI / 180);
              const x1 = cx + r * Math.cos(rad - halfAngle);
              const y1 = cy + r * Math.sin(rad - halfAngle);
              const x2 = cx + r * Math.cos(rad + halfAngle);
              const y2 = cy + r * Math.sin(rad + halfAngle);
              return (
                <path
                  key={i}
                  d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${aoe.angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`}
                  fill="rgba(239,68,68,0.15)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth={1.5}
                />
              );
            }

            return null;
          })}

          {/* Jetons joueurs & waymarks */}
          {currentTokens.map((pos, i) => {
            const { cx, cy } = toSvgCoords(pos.x, pos.y);
            const colors = isWaymark(pos.role)
              ? waymarkColors[pos.role as Waymark]
              : roleColors[pos.role as Role];

            const renderToken = () => {
              if (isWaymark(pos.role) && isLetterWaymark(pos.role as Waymark)) {
                const d = tokenRadius * 1.3;
                return (
                  <polygon
                    points={`${cx},${cy - d} ${cx + d},${cy} ${cx},${cy + d} ${cx - d},${cy}`}
                    fill={colors.bg}
                    stroke={colors.border}
                    strokeWidth={2}
                  />
                );
              } else if (isWaymark(pos.role)) {
                const s = tokenRadius * 1.1;
                return (
                  <rect
                    x={cx - s}
                    y={cy - s}
                    width={s * 2}
                    height={s * 2}
                    rx={4}
                    fill={colors.bg}
                    stroke={colors.border}
                    strokeWidth={2}
                  />
                );
              } else {
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={tokenRadius}
                    fill={colors.bg}
                    stroke={colors.border}
                    strokeWidth={2}
                  />
                );
              }
            };

            return (
              <g key={i}>
                {renderToken()}
                <text
                  x={cx}
                  y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={colors.text}
                  fontSize={10}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {pos.label ?? pos.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
