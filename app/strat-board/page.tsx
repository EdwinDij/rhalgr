"use client";
import { useState, useRef } from "react";
import {
  MousePointer,
  User,
  Circle,
  Square,
  Image as ImageIcon,
  Trash2,
  Copy,
  ChevronRight,
  ChevronLeft,
  Layers,
  Swords,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strat Board",
  robots: { index: false, follow: false },
};

type Shape = "circle" | "square" | "rectangle";
type Tool = "select" | "player" | "aoe";
type AoEType = "cone" | "circle" | "rect" | "share" | "tankbuster";

interface ElementPosition {
  id: string;
  label: string;
  type: "player" | "boss" | "waymark";
  x: number;
  y: number;
  colorClass: string;
}

interface AoEData {
  id: string;
  type: AoEType;
  x: number;
  y: number;
  range: number;
  direction: number;
  angle?: number;
  width?: number;
}

interface StepState {
  elements: ElementPosition[];
  aoes: AoEData[];
}

const PLAYER_ROLES = ["MT", "OT", "H1", "H2", "M1", "M2", "R1", "R2"] as const;
const WAYMARKS = ["A", "B", "C", "D", "1", "2", "3", "4"] as const;

const ROLE_COLORS: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  MT: { bg: "#1e3a8a", border: "#3b82f6", text: "#93c5fd" },
  OT: { bg: "#164e63", border: "#06b6d4", text: "#67e8f9" },
  H1: { bg: "#14532d", border: "#22c55e", text: "#86efac" },
  H2: { bg: "#064e3b", border: "#10b981", text: "#6ee7b7" },
  M1: { bg: "#7f1d1d", border: "#ef4444", text: "#fca5a5" },
  M2: { bg: "#7c2d12", border: "#f97316", text: "#fdba74" },
  R1: { bg: "#4c1d95", border: "#a855f7", text: "#d8b4fe" },
  R2: { bg: "#701a75", border: "#d946ef", text: "#f0abfc" },
  BOSS: { bg: "#450a0a", border: "#dc2626", text: "#fca5a5" },
  A: { bg: "#7f1d1d", border: "#ef4444", text: "#fca5a5" },
  B: { bg: "#1e3a8a", border: "#3b82f6", text: "#93c5fd" },
  C: { bg: "#713f12", border: "#eab308", text: "#fde047" },
  D: { bg: "#4c1d95", border: "#a855f7", text: "#d8b4fe" },
  "1": { bg: "#7f1d1d", border: "#ef4444", text: "#fca5a5" },
  "2": { bg: "#1e3a8a", border: "#3b82f6", text: "#93c5fd" },
  "3": { bg: "#713f12", border: "#eab308", text: "#fde047" },
  "4": { bg: "#4c1d95", border: "#a855f7", text: "#d8b4fe" },
};

const ROLE_STYLES: Record<string, string> = {
  MT: "bg-blue-900/80 border-blue-500 text-blue-300",
  OT: "bg-cyan-900/80 border-cyan-500 text-cyan-300",
  H1: "bg-green-900/80 border-green-500 text-green-300",
  H2: "bg-emerald-900/80 border-emerald-500 text-emerald-300",
  M1: "bg-red-900/80 border-red-500 text-red-300",
  M2: "bg-orange-900/80 border-orange-500 text-orange-300",
  R1: "bg-purple-900/80 border-purple-500 text-purple-300",
  R2: "bg-fuchsia-900/80 border-fuchsia-500 text-fuchsia-300",
  BOSS: "bg-red-950/90 border-red-600 text-red-400",
  A: "bg-red-600/30 border-red-500 text-red-200",
  B: "bg-blue-600/30 border-blue-500 text-blue-200",
  C: "bg-yellow-600/30 border-yellow-500 text-yellow-200",
  D: "bg-purple-600/30 border-purple-500 text-purple-200",
  "1": "bg-red-500/20 border-red-400 text-red-300",
  "2": "bg-blue-500/20 border-blue-400 text-blue-300",
  "3": "bg-yellow-500/20 border-yellow-400 text-yellow-300",
  "4": "bg-purple-500/20 border-purple-400 text-purple-300",
};

export default function StratBoard() {
  const [shape, setShape] = useState<Shape>("circle");
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [selectedAoEType, setSelectedAoEType] = useState<AoEType>("cone");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedRoleToAdd, setSelectedRoleToAdd] = useState<string | null>(
    null,
  );
  const [selectedAoEId, setSelectedAoEId] = useState<string | null>(null);
  const [aoeAngle, setAoeAngle] = useState(90);
  const [aoeDirection, setAoeDirection] = useState(0);
  const [aoeRange, setAoeRange] = useState(40);
  const [aoeWidth, setAoeWidth] = useState(15);
  const [beforeState, setBeforeState] = useState<StepState>({
    elements: [],
    aoes: [],
  });
  const [afterState, setAfterState] = useState<StepState>({
    elements: [],
    aoes: [],
  });
  const [copied, setCopied] = useState(false);

  const arenaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draggingId = useRef<string | null>(null);

  const currentState = activeTab === "before" ? beforeState : afterState;
  const setCurrentState =
    activeTab === "before" ? setBeforeState : setAfterState;

  const positionsJson = JSON.stringify({
    tokens: currentState.elements.map((el) => ({
      role: el.id === "BOSS" ? "Boss" : el.id,
      x: Math.round((el.x / 100) * 100) / 100,
      y: Math.round((el.y / 100) * 100) / 100,
    })),
    aoes: currentState.aoes.map((aoe) => ({
      type: aoe.type,
      x: Math.round((aoe.x / 100) * 100) / 100,
      y: Math.round((aoe.y / 100) * 100) / 100,
      range: Math.round((aoe.range / 100) * 100) / 100,
      direction: aoe.direction,
      ...(aoe.angle !== undefined ? { angle: aoe.angle } : {}),
      ...(aoe.width !== undefined
        ? { width: Math.round((aoe.width / 100) * 100) / 100 }
        : {}),
    })),
  });

  const switchTab = (targetTab: "before" | "after") => {
    if (targetTab === "after" && activeTab === "before") {
      if (afterState.elements.length === 0 && afterState.aoes.length === 0) {
        setAfterState({
          elements: beforeState.elements.map((el) => ({ ...el })),
          aoes: beforeState.aoes.map((c) => ({ ...c })),
        });
      }
    }
    setActiveTab(targetTab);
    setSelectedAoEId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBackgroundImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleArenaClick = (e: React.MouseEvent) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const x = parseFloat(
      (((e.clientX - rect.left) / rect.width) * 100).toFixed(1),
    );
    const y = parseFloat(
      (((e.clientY - rect.top) / rect.height) * 100).toFixed(1),
    );

    if (activeTool === "player" && selectedRoleToAdd) {
      if (currentState.elements.some((el) => el.id === selectedRoleToAdd))
        return;
      const newElement: ElementPosition = {
        id: selectedRoleToAdd,
        label: selectedRoleToAdd,
        type:
          selectedRoleToAdd === "BOSS"
            ? "boss"
            : WAYMARKS.includes(selectedRoleToAdd as any)
              ? "waymark"
              : "player",
        x,
        y,
        colorClass: ROLE_STYLES[selectedRoleToAdd] || "",
      };
      setCurrentState((prev) => ({
        ...prev,
        elements: [...prev.elements, newElement],
      }));
      setSelectedRoleToAdd(null);
      setActiveTool("select");
    } else if (activeTool === "aoe") {
      const newAoE: AoEData = {
        id: `aoe-${Date.now()}`,
        type: selectedAoEType,
        x,
        y,
        range: aoeRange,
        direction: aoeDirection,
        ...(selectedAoEType === "cone" ? { angle: aoeAngle } : {}),
        ...(selectedAoEType === "rect" ? { width: aoeWidth } : {}),
      };
      setCurrentState((prev) => ({ ...prev, aoes: [...prev.aoes, newAoE] }));
      setSelectedAoEId(newAoE.id);
      setActiveTool("select");
    }
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    draggingId.current = id;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId.current || !arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(
        100,
        parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(1)),
      ),
    );
    const y = Math.max(
      0,
      Math.min(
        100,
        parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(1)),
      ),
    );
    setCurrentState((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === draggingId.current ? { ...el, x, y } : el,
      ),
    }));
  };

  const handleMouseUp = () => {
    draggingId.current = null;
  };

  const removeElement = (id: string) => {
    setCurrentState((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => el.id !== id),
      aoes: prev.aoes.filter((a) => a.id !== id),
    }));
    if (selectedAoEId === id) setSelectedAoEId(null);
  };

  const updateSelectedAoE = (
    key: "angle" | "direction" | "range" | "width",
    val: number,
  ) => {
    if (key === "angle") setAoeAngle(val);
    if (key === "direction") setAoeDirection(val);
    if (key === "range") setAoeRange(val);
    if (key === "width") setAoeWidth(val);
    if (selectedAoEId) {
      setCurrentState((prev) => ({
        ...prev,
        aoes: prev.aoes.map((a) =>
          a.id === selectedAoEId ? { ...a, [key]: val } : a,
        ),
      }));
    }
  };

  const selectAoE = (aoe: AoEData) => {
    setSelectedAoEId(aoe.id);
    setSelectedAoEType(aoe.type);
    setAoeRange(aoe.range);
    setAoeDirection(aoe.direction);
    if (aoe.angle !== undefined) setAoeAngle(aoe.angle);
    if (aoe.width !== undefined) setAoeWidth(aoe.width);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(positionsJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TokenButton = ({ id, isPlaced }: { id: string; isPlaced: boolean }) => {
    const colors = ROLE_COLORS[id];
    const isSelected = selectedRoleToAdd === id && activeTool === "player";
    return (
      <button
        onClick={() => {
          setActiveTool("player");
          setSelectedRoleToAdd(id);
        }}
        disabled={isPlaced}
        style={{
          background: isPlaced
            ? "#1a1f2e"
            : isSelected
              ? colors.border
              : colors.bg,
          border: `2px solid ${isPlaced ? "#2d3748" : isSelected ? "#f59e0b" : colors.border}`,
          color: isPlaced ? "#374151" : isSelected ? "#000" : colors.text,
          boxShadow: isSelected ? `0 0 12px ${colors.border}66` : "none",
        }}
        className="w-10 h-10 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center"
      >
        {id}
      </button>
    );
  };

  return (
    <>
      <div className="flex md:hidden min-h-screen items-center justify-center bg-[#0a0c12] p-8 text-center">
        <div className="space-y-4">
          <p className="text-4xl">🖥️</p>
          <h1 className="text-white font-bold text-xl">
            Éditeur non disponible
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Le tableau stratégique nécessite un écran plus large. Accède-y
            depuis un ordinateur.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#0a0c12] text-gray-200 flex flex-col pt-20">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800/60 bg-[#0d0f17]">
          <div className="flex items-center gap-3">
            <Swords size={18} className="text-amber-500" />
            <span className="text-sm font-semibold text-white">
              Tableau stratégique
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#141820] rounded-lg p-1 border border-gray-800/60">
            <button
              onClick={() => switchTab("before")}
              className={`px-5 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "before" ? "bg-amber-500 text-black shadow" : "text-gray-400 hover:text-white"}`}
            >
              <ChevronLeft size={13} /> Avant
            </button>
            <button
              onClick={() => switchTab("after")}
              className={`px-5 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "after" ? "bg-amber-500 text-black shadow" : "text-gray-400 hover:text-white"}`}
            >
              Après <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#141820] rounded-lg p-1 border border-gray-800/60 text-xs">
            <button
              onClick={() => setActiveTool("select")}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${activeTool === "select" ? "bg-gray-700 text-amber-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              <MousePointer size={13} /> Sélection
            </button>
            <button
              onClick={() => {
                setActiveTool("player");
                setSelectedRoleToAdd("MT");
              }}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${activeTool === "player" ? "bg-gray-700 text-amber-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              <User size={13} /> Joueur
            </button>
            <button
              onClick={() => setActiveTool("aoe")}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${activeTool === "aoe" ? "bg-gray-700 text-amber-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              <Layers size={13} /> AoE
            </button>
            <div className="w-px h-4 bg-gray-700 mx-1" />
            <button
              onClick={() => setShape("circle")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${shape === "circle" ? "text-amber-400 bg-gray-700" : "text-gray-500"}`}
            >
              <Circle size={14} />
            </button>
            <button
              onClick={() => setShape("square")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${shape === "square" ? "text-amber-400 bg-gray-700" : "text-gray-500"}`}
            >
              <Square size={14} />
            </button>
            <button
              onClick={() => setShape("rectangle")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${shape === "rectangle" ? "text-amber-400 bg-gray-700" : "text-gray-500"}`}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="12"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <div className="w-px h-4 bg-gray-700 mx-1" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-2 py-1.5 rounded-md flex items-center gap-1 text-xs transition-colors cursor-pointer ${backgroundImage ? "text-emerald-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              <ImageIcon size={13} /> {backgroundImage ? "Fond ✓" : "Fond"}
            </button>
            {backgroundImage && (
              <button
                onClick={() => setBackgroundImage(null)}
                className="text-red-400 text-xs px-1 cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0c12]">
            <div
              ref={arenaRef}
              onClick={handleArenaClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                backgroundImage: backgroundImage
                  ? `url(${backgroundImage})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: activeTool === "select" ? "default" : "crosshair",
              }}
              className={`relative bg-[#080a10] border border-gray-700/50 shadow-2xl overflow-hidden select-none transition-all duration-300 ${shape === "circle" ? "rounded-full aspect-square w-full max-w-140" : shape === "rectangle" ? "rounded-2xl w-full max-w-140 aspect-video" : "rounded-2xl aspect-square w-full max-w-140"}`}
            >
              {!backgroundImage && (
                <>
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-700/30" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700/30" />
                    <div
                      className={`absolute inset-[10%] border border-gray-700/20 ${shape === "circle" ? "rounded-full" : "rounded"}`}
                    />
                    <div
                      className={`absolute inset-[25%] border border-gray-700/20 ${shape === "circle" ? "rounded-full" : "rounded"}`}
                    />
                  </div>
                  {currentState.elements.length === 0 &&
                    currentState.aoes.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-gray-600 text-sm">
                          Cliquez pour placer des éléments
                        </p>
                      </div>
                    )}
                </>
              )}

              {currentState.aoes.map((aoe) => {
                const isSelected = selectedAoEId === aoe.id;
                const base = `absolute transition-all pointer-events-auto cursor-pointer ${isSelected ? "border-amber-400 bg-red-500/25 z-10" : "border-red-500/50 bg-red-600/15"}`;
                if (aoe.type === "cone" && aoe.angle !== undefined) {
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAoE(aoe);
                      }}
                      style={{
                        left: `${aoe.x}%`,
                        top: `${aoe.y}%`,
                        width: `${aoe.range * 2}%`,
                        height: `${aoe.range * 2}%`,
                        transform: `translate(-50%, -50%) rotate(${aoe.direction - aoe.angle / 2}deg)`,
                        clipPath: `polygon(50% 50%, ${Array.from(
                          { length: 12 },
                          (_, i) => {
                            const a = (i / 11) * (aoe.angle! * (Math.PI / 180));
                            return `${50 + 50 * Math.cos(a)}% ${50 + 50 * Math.sin(a)}%`;
                          },
                        ).join(", ")})`,
                      }}
                      className={`border ${base}`}
                    />
                  );
                }
                if (aoe.type === "circle") {
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAoE(aoe);
                      }}
                      style={{
                        left: `${aoe.x}%`,
                        top: `${aoe.y}%`,
                        width: `${aoe.range * 2}%`,
                        height: `${aoe.range * 2}%`,
                        transform: `translate(-50%, -50%)`,
                      }}
                      className={`border rounded-full ${base}`}
                    />
                  );
                }
                if (aoe.type === "rect" && aoe.width !== undefined) {
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAoE(aoe);
                      }}
                      style={{
                        left: `${aoe.x}%`,
                        top: `${aoe.y}%`,
                        width: `${aoe.width}%`,
                        height: `${aoe.range}%`,
                        transformOrigin: "top center",
                        transform: `translate(-50%, 0%) rotate(${aoe.direction}deg)`,
                      }}
                      className={`border ${base}`}
                    />
                  );
                }
                if (aoe.type === "share") {
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAoE(aoe);
                      }}
                      style={{
                        left: `${aoe.x}%`,
                        top: `${aoe.y}%`,
                        width: `${aoe.range * 2}%`,
                        height: `${aoe.range * 2}%`,
                        transform: `translate(-50%, -50%)`,
                      }}
                      className={`border-2 border-dashed rounded-full border-yellow-400/70 bg-yellow-500/10 absolute cursor-pointer ${selectedAoEId === aoe.id ? "border-amber-400 bg-yellow-500/20" : ""}`}
                    />
                  );
                }

                if (aoe.type === "tankbuster") {
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAoE(aoe);
                      }}
                      style={{
                        left: `${aoe.x}%`,
                        top: `${aoe.y}%`,
                        width: `${aoe.range * 2}%`,
                        height: `${aoe.range * 2}%`,
                        transform: `translate(-50%, -50%)`,
                      }}
                      className={`border-2 rounded-full border-red-500/80 bg-red-600/15 absolute cursor-pointer ${selectedAoEId === aoe.id ? "border-amber-400 bg-red-500/25" : ""}`}
                    >
                      <div className="absolute inset-[20%] border border-red-500/50 rounded-full" />
                    </div>
                  );
                }
                return null;
              })}

              {currentState.elements.map((el) => {
                const colors = ROLE_COLORS[el.id];
                const isBoss = el.type === "boss";
                return (
                  <div
                    key={el.id}
                    onMouseDown={(e) => handleMouseDown(el.id, e)}
                    style={{
                      left: `${el.x}%`,
                      top: `${el.y}%`,
                      background: colors?.bg,
                      border: `2px solid ${colors?.border}`,
                      color: colors?.text,
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-bold text-[11px] cursor-grab active:cursor-grabbing select-none shadow-lg ${isBoss ? "w-10 h-6 rounded-sm px-2" : "w-9 h-9 rounded-full"}`}
                  >
                    {el.label}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        removeElement(el.id);
                      }}
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      ×
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-72 border-l border-gray-800/60 bg-[#0d0f17] flex flex-col overflow-y-auto">
            <div className="p-5 border-b border-gray-800/40">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <User size={10} /> Joueurs
              </p>
              <div className="grid grid-cols-4 gap-2">
                {PLAYER_ROLES.map((role) => (
                  <TokenButton
                    key={role}
                    id={role}
                    isPlaced={currentState.elements.some(
                      (el) => el.id === role,
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="px-5 py-4 border-b border-gray-800/40">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Swords size={10} /> Boss
              </p>
              {(() => {
                const isPlaced = currentState.elements.some(
                  (el) => el.type === "boss",
                );
                return (
                  <button
                    onClick={() => {
                      setActiveTool("player");
                      setSelectedRoleToAdd("BOSS");
                    }}
                    disabled={isPlaced}
                    className={`w-full py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-2 ${isPlaced ? "border-gray-800 text-gray-600 bg-transparent" : "border-red-800 text-red-400 bg-red-950/20 hover:bg-red-950/40"}`}
                  >
                    ⚔️ {isPlaced ? "Boss placé" : "Placer le Boss"}
                  </button>
                );
              })()}
            </div>

            <div className="px-5 py-4 border-b border-gray-800/40">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
                📍 Waymarks
              </p>
              <div className="grid grid-cols-4 gap-2">
                {WAYMARKS.map((mark) => (
                  <TokenButton
                    key={mark}
                    id={mark}
                    isPlaced={currentState.elements.some(
                      (el) => el.id === mark,
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="px-5 py-4 border-b border-gray-800/40">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Layers size={10} /> Types d'attaque
              </p>
              <div className="grid grid-cols-5 gap-1 mb-4 bg-[#0a0c12] p-1 rounded-lg border border-gray-800/60">
                {(
                  [
                    { id: "cone", label: "Cône" },
                    { id: "circle", label: "Cercle" },
                    { id: "rect", label: "Ligne" },
                    { id: "share", label: "Stack" },
                    { id: "tankbuster", label: "TB" },
                  ] as { id: AoEType; label: string }[]
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedAoEType(t.id);
                      setActiveTool("aoe");
                    }}
                    className={`py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${selectedAoEType === t.id && activeTool === "aoe" ? "bg-amber-500 text-black" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {selectedAoEType === "cone" && (
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                      <span>Angle d'ouverture</span>
                      <span className="text-amber-400 font-mono">
                        {aoeAngle}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="360"
                      value={aoeAngle}
                      onChange={(e) =>
                        updateSelectedAoE("angle", parseInt(e.target.value))
                      }
                      className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500"
                    />
                  </div>
                )}
                {selectedAoEType === "rect" && (
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                      <span>Largeur</span>
                      <span className="text-amber-400 font-mono">
                        {aoeWidth}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={aoeWidth}
                      onChange={(e) =>
                        updateSelectedAoE("width", parseInt(e.target.value))
                      }
                      className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500"
                    />
                  </div>
                )}
                {selectedAoEType !== "circle" && (
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                      <span>Direction</span>
                      <span className="text-amber-400 font-mono">
                        {aoeDirection}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={aoeDirection}
                      onChange={(e) =>
                        updateSelectedAoE("direction", parseInt(e.target.value))
                      }
                      className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500"
                    />
                  </div>
                )}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                    <span>
                      {selectedAoEType === "circle"
                        ? "Rayon"
                        : selectedAoEType === "rect"
                          ? "Longueur"
                          : "Portée"}
                    </span>
                    <span className="text-amber-400 font-mono">
                      {aoeRange}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={aoeRange}
                    onChange={(e) =>
                      updateSelectedAoE("range", parseInt(e.target.value))
                    }
                    className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500"
                  />
                </div>
                {selectedAoEType !== "circle" && (
                  <p className="text-[10px] text-gray-600 leading-relaxed">
                    Ces réglages s'appliquent au prochain cône placé. Cliquez
                    sur un cône dans la liste pour l'éditer.
                  </p>
                )}
              </div>

              {currentState.aoes.length > 0 && (
                <div className="mt-3 space-y-1.5 max-h-28 overflow-y-auto">
                  {currentState.aoes.map((a, idx) => (
                    <div
                      key={a.id}
                      onClick={() => selectAoE(a)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer border transition-colors ${selectedAoEId === a.id ? "bg-amber-500/10 border-amber-500/50 text-amber-400" : "bg-[#0a0c12] border-gray-800 text-gray-500 hover:border-gray-700"}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {a.type === "cone"
                          ? "Cône"
                          : a.type === "circle"
                            ? "Cercle"
                            : a.type === "rect"
                              ? "Ligne"
                              : a.type === "share"
                                ? "Stack"
                                : "Tankbuster"}
                        #{idx + 1}
                      </span>
                      <Trash2
                        size={11}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeElement(a.id);
                        }}
                        className="text-gray-600 hover:text-red-400 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 mt-auto">
              <button
                onClick={handleCopy}
                className={`w-full py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${copied ? "bg-green-500 text-black" : "bg-amber-500 hover:bg-amber-400 text-black"}`}
              >
                <Copy size={13} />
                {copied ? "Copié !" : "Copier pour Keystatic"}
              </button>
              <p className="text-[10px] text-gray-600 text-center mt-2">
                Colle dans le champ "positions" de Keystatic
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
