"use client";
import { useState } from "react";

type Shape = "circle" | "square" | "rectangle";

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
  role: string;
  x: number;
  y: number;
  label?: string;
}

interface Movement {
  from: string;
  to: string;
}

interface PhaseData {
  label: string;
  tokens?: Position[];
  aoes?: AoE[];
  movements?: Movement[];
  background?: string | null;
}

interface ParsedState {
  tokens: Position[];
  aoes: AoE[];
  movements: Movement[];
  background: string | null;
}

interface PositionSchemaProps {
  positions?: Position[] | string;
  positionsAfter?: Position[] | string;
  phases?: string;
  shape?: Shape;
  label?: string;
  size?: number;
  backgroundImage?: string;
}

const roleColors: Record<string, { bg: string; text: string; border: string }> = {
  MT: { bg: "#1e40af", text: "#ffffff", border: "#3b82f6" },
  OT: { bg: "#1e40af", text: "#ffffff", border: "#93c5fd" },
  H1: { bg: "#166534", text: "#ffffff", border: "#4ade80" },
  H2: { bg: "#166534", text: "#ffffff", border: "#86efac" },
  R1: { bg: "#7f1d1d", text: "#ffffff", border: "#f87171" },
  R2: { bg: "#7f1d1d", text: "#ffffff", border: "#fca5a5" },
  M1: { bg: "#78350f", text: "#ffffff", border: "#fb923c" },
  M2: { bg: "#78350f", text: "#ffffff", border: "#fdba74" },
  Boss: { bg: "#4c1d95", text: "#ffffff", border: "#a78bfa" },
  ADDS: { bg: "#4c1d95", text: "#ffffff", border: "#c4b5fd" },
};

const waymarkColors: Record<string, { bg: string; text: string; border: string }> = {
  A: { bg: "#7f1d1d", text: "#ffffff", border: "#ef4444" },
  B: { bg: "#78350f", text: "#ffffff", border: "#f59e0b" },
  C: { bg: "#1e3a5f", text: "#ffffff", border: "#3b82f6" },
  D: { bg: "#4c1d95", text: "#ffffff", border: "#a78bfa" },
  "1": { bg: "#7f1d1d", text: "#ffffff", border: "#ef4444" },
  "2": { bg: "#78350f", text: "#ffffff", border: "#f59e0b" },
  "3": { bg: "#1e3a5f", text: "#ffffff", border: "#3b82f6" },
  "4": { bg: "#4c1d95", text: "#ffffff", border: "#a78bfa" },
};

const WAYMARKS = new Set(["A", "B", "C", "D", "1", "2", "3", "4"]);
const LETTER_WAYMARKS = new Set(["A", "B", "C", "D"]);

const parseProp = (prop: Position[] | string | undefined | null): ParsedState => {
  if (!prop) return { tokens: [], aoes: [], movements: [], background: null };
  try {
    const raw = typeof prop === "string" ? JSON.parse(prop) : prop;
    if (Array.isArray(raw)) return { tokens: raw, aoes: [], movements: [], background: null };
    return {
      tokens: raw.tokens ?? [],
      aoes: raw.aoes ?? [],
      movements: raw.movements ?? [],
      background: raw.background || null,
    };
  } catch (e) {
    console.error("Erreur de parsing des positions de l'arène :", e);
    return { tokens: [], aoes: [], movements: [], background: null };
  }
};

const parsePhases = (prop: string | undefined): PhaseData[] | null => {
  if (!prop) return null;
  try {
    const raw = JSON.parse(prop);
    return Array.isArray(raw) ? raw : null;
  } catch {
    return null;
  }
};

export default function PositionSchema({
  positions: positionsProp,
  positionsAfter: positionsAfterProp,
  phases: phasesProp,
  shape = "circle",
  label,
  size = 500,
  backgroundImage: directBackgroundImage,
}: PositionSchemaProps) {
  const parsedPhases = parsePhases(phasesProp);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const padding = 40;
  const innerSize = size - padding * 2;
  const center = size / 2;
  const tokenRadius = 16;

  const toSvgCoords = (x: number, y: number) => ({
    cx: padding + x * innerSize,
    cy: padding + y * innerSize,
  });

  // Determine current render state
  let currentTokens: Position[];
  let currentAoes: AoE[];
  let currentMovements: Movement[];
  let backgroundFromState: string | null;
  const isMultiPhase = parsedPhases !== null && parsedPhases.length > 0;

  if (isMultiPhase && parsedPhases) {
    const phase = parsedPhases[Math.min(phaseIndex, parsedPhases.length - 1)];
    currentTokens = phase.tokens ?? [];
    currentAoes = phase.aoes ?? [];
    currentMovements = phase.movements ?? [];
    backgroundFromState = phase.background ?? null;
  } else {
    const base = parseProp(positionsProp);
    const after = positionsAfterProp ? parseProp(positionsAfterProp) : null;
    const src = showAfter && after ? after : base;
    currentTokens = src.tokens;
    currentAoes = src.aoes;
    currentMovements = src.movements;
    backgroundFromState = src.background;
  }

  const finalBackgroundImage = backgroundFromState || directBackgroundImage || null;

  // Reusable arena shape — used for both the fill and the clipPath mask
  const renderArenaShape = (fillColor: string, strokeColor?: string, strokeW = 0) => {
    switch (shape) {
      case "circle":
        return (
          <circle cx={center} cy={center} r={innerSize / 2}
            fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        );
      case "square":
        return (
          <rect x={padding} y={padding} width={innerSize} height={innerSize}
            fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        );
      case "rectangle":
        return (
          <rect x={padding} y={padding + innerSize * 0.15}
            width={innerSize} height={innerSize * 0.7}
            fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} />
        );
    }
  };

  const renderAoe = (aoe: AoE, i: number) => {
    const cx = padding + aoe.x * innerSize;
    const cy = padding + aoe.y * innerSize;
    const r = aoe.range * innerSize;

    if (aoe.type === "circle") return (
      <circle key={i} cx={cx} cy={cy} r={r}
        fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.5)" strokeWidth={1.5} />
    );
    if (aoe.type === "share") return (
      <circle key={i} cx={cx} cy={cy} r={r}
        fill="rgba(234,179,8,0.1)" stroke="rgba(234,179,8,0.6)"
        strokeWidth={1.5} strokeDasharray="4,3" />
    );
    if (aoe.type === "tankbuster") return (
      <g key={i}>
        <circle cx={cx} cy={cy} r={r}
          fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.7)" strokeWidth={2} />
        <circle cx={cx} cy={cy} r={r * 0.5}
          fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth={1} />
      </g>
    );
    if (aoe.type === "rect" && aoe.width !== undefined) {
      const w = aoe.width * innerSize;
      const h = aoe.range * innerSize;
      return (
        <rect key={i} x={cx - w / 2} y={cy} width={w} height={h}
          fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.5)" strokeWidth={1.5}
          transform={`rotate(${aoe.direction}, ${cx}, ${cy})`} />
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
        <path key={i}
          d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${aoe.angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`}
          fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.5)" strokeWidth={1.5} />
      );
    }
    return null;
  };

  const renderMovements = (movements: Movement[], tokens: Position[]) => {
    const tokenMap = new Map(tokens.map((t) => [t.role, t]));
    return movements.map((mv, i) => {
      const from = tokenMap.get(mv.from);
      const to = tokenMap.get(mv.to);
      if (!from || !to) return null;
      const { cx: x1, cy: y1 } = toSvgCoords(from.x, from.y);
      const { cx: x2, cy: y2 } = toSvgCoords(to.x, to.y);
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const offset = tokenRadius + 2;
      const startX = x1 + Math.cos(angle) * offset;
      const startY = y1 + Math.sin(angle) * offset;
      const endX = x2 - Math.cos(angle) * offset;
      const endY = y2 - Math.sin(angle) * offset;
      const arrowLen = 8;
      const spread = Math.PI / 5;
      return (
        <g key={i}>
          <line x1={startX} y1={startY} x2={endX} y2={endY}
            stroke="rgba(251,191,36,0.7)" strokeWidth={1.5} strokeDasharray="5,3" />
          <polyline
            points={`${endX - arrowLen * Math.cos(angle - spread)},${endY - arrowLen * Math.sin(angle - spread)} ${endX},${endY} ${endX - arrowLen * Math.cos(angle + spread)},${endY - arrowLen * Math.sin(angle + spread)}`}
            fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth={1.5}
            strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    });
  };

  const renderToken = (pos: Position, i: number) => {
    const { cx, cy } = toSvgCoords(pos.x, pos.y);
    const isWm = WAYMARKS.has(pos.role);
    const colors = isWm ? waymarkColors[pos.role] : roleColors[pos.role];
    if (!colors) return null;

    const shape = () => {
      if (isWm && LETTER_WAYMARKS.has(pos.role)) {
        const d = tokenRadius * 1.3;
        return (
          <polygon points={`${cx},${cy - d} ${cx + d},${cy} ${cx},${cy + d} ${cx - d},${cy}`}
            fill={colors.bg} stroke={colors.border} strokeWidth={2} />
        );
      }
      if (isWm) {
        const s = tokenRadius * 1.1;
        return (
          <rect x={cx - s} y={cy - s} width={s * 2} height={s * 2} rx={4}
            fill={colors.bg} stroke={colors.border} strokeWidth={2} />
        );
      }
      return (
        <circle cx={cx} cy={cy} r={tokenRadius}
          fill={colors.bg} stroke={colors.border} strokeWidth={2} />
      );
    };

    return (
      <g key={i}>
        {shape()}
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          fill={colors.text} fontSize={10} fontWeight="bold" fontFamily="sans-serif">
          {pos.label ?? pos.role}
        </text>
      </g>
    );
  };

  return (
    <div className="my-6">
      {label && (
        <p className="text-sm text-white/50 mb-3 text-center uppercase tracking-widest">
          {label}
        </p>
      )}

      {isMultiPhase && parsedPhases && parsedPhases.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {parsedPhases.map((phase, i) => (
            <button key={i} onClick={() => setPhaseIndex(i)}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                phaseIndex === i
                  ? "bg-amber-500 text-black"
                  : "bg-gray-800/60 text-white/60 hover:bg-gray-700"
              }`}>
              {phase.label}
            </button>
          ))}
        </div>
      )}

      {!isMultiPhase && positionsAfterProp && (
        <div className="flex justify-center gap-2 mb-4">
          <button onClick={() => setShowAfter(false)}
            className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
              !showAfter ? "bg-amber-500 text-black" : "bg-gray-800/60 text-white/60 hover:bg-gray-700"
            }`}>
            Avant
          </button>
          <button onClick={() => setShowAfter(true)}
            className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
              showAfter ? "bg-amber-500 text-black" : "bg-gray-800/60 text-white/60 hover:bg-gray-700"
            }`}>
            Après
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full">
          <defs>
            <clipPath id="arena-clip">{renderArenaShape("#ffffff")}</clipPath>
          </defs>

          <rect width={size} height={size} fill="#0d0f17" rx={8} />
          {renderArenaShape("#1a1a2e", "#374151", 2)}

          {finalBackgroundImage && (
            <image href={finalBackgroundImage} x={padding} y={padding}
              width={innerSize} height={innerSize}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#arena-clip)"
              style={{ opacity: 0.35 }} />
          )}

          <line x1={center} y1={padding} x2={center} y2={size - padding}
            stroke="#374151" strokeWidth={0.5} strokeDasharray="4,4" />
          <line x1={padding} y1={center} x2={size - padding} y2={center}
            stroke="#374151" strokeWidth={0.5} strokeDasharray="4,4" />

          {currentAoes.map((aoe, i) => renderAoe(aoe, i))}
          {renderMovements(currentMovements, currentTokens)}
          {currentTokens.map((pos, i) => renderToken(pos, i))}
        </svg>
      </div>
    </div>
  );
}
