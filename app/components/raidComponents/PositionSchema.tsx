type Shape = "circle" | "square" | "rectangle";
type Role = "MT" | "OT" | "H1" | "H2" | "R1" | "R2" | "M1" | "M2" | "Boss";
type Waymark = "A" | "B" | "C" | "D" | "1" | "2" | "3" | "4";

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
interface PositionSchemaProps {
  positions: Position[] | string;
  shape?: Shape;
  label?: string;
  size?: number;
}

interface Position {
  role: Role | Waymark;
  x: number;
  y: number;
  label?: string;
}

const isWaymark = (role: Role | Waymark): role is Waymark =>
  ["A", "B", "C", "D", "1", "2", "3", "4"].includes(role);

const isLetterWaymark = (role: Waymark): boolean =>
  ["A", "B", "C", "D"].includes(role);

export default function PositionSchema({
  positions: positionsProp = [],
  shape = "circle",
  label,
  size = 400,
}: PositionSchemaProps) {
  const positions: Position[] =
    typeof positionsProp === "string"
      ? JSON.parse(positionsProp)
      : positionsProp;
  console.log("position reçue", positions);
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
      <div className="flex justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="max-w-full"
        >
          <rect width={size} height={size} fill="#0d0f17" rx={8} />
          {getArenaPath()}
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

          {positions.map((pos, i) => {
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
