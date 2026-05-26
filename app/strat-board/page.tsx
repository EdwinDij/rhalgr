"use client";
import { useState, useRef } from "react";
import { 
  MousePointer, User, Triangle, Circle, Square, Image as ImageIcon, 
  Trash2, Copy, Download, ChevronRight, ChevronLeft, Layers
} from "lucide-react";

type Shape = "circle" | "square" | "rectangle";
type Tool = "select" | "player" | "aoe";
type AoEType = "cone" | "circle" | "rect";

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
  // Paramètres partagés ou spécifiques
  range: number;      // Portée / Rayon / Longueur
  direction: number;  // Orientation (pour cône et rectangle)
  angle?: number;     // Pour le cône (ouverture)
  width?: number;     // Pour le rectangle (largeur)
}

interface StepState {
  elements: ElementPosition[];
  aoes: AoEData[];
}

const PLAYER_ROLES = ["MT", "OT", "H1", "H2", "M1", "M2", "R1", "R2"] as const;
const WAYMARKS = ["A", "B", "C", "D", "1", "2", "3", "4"] as const;

const ROLE_STYLES: Record<string, string> = {
  MT: "bg-blue-900/80 border-blue-500 text-blue-300",
  OT: "bg-cyan-900/80 border-cyan-500 text-cyan-300",
  H1: "bg-green-900/80 border-green-500 text-green-300",
  H2: "bg-emerald-900/80 border-emerald-500 text-emerald-300",
  M1: "bg-red-900/80 border-red-500 text-red-300",
  M2: "bg-orange-900/80 border-orange-500 text-orange-300",
  R1: "bg-purple-900/80 border-purple-500 text-purple-300",
  R2: "bg-fuchsia-900/80 border-fuchsia-500 text-fuchsia-300",
  BOSS: "bg-red-950/90 border-red-600 text-red-400 font-extrabold rounded-md p-1",
  A: "bg-red-600/30 border-red-500 text-red-200",
  B: "bg-blue-600/30 border-blue-500 text-blue-200",
  C: "bg-yellow-600/30 border-yellow-500 text-yellow-200",
  D: "bg-purple-600/30 border-purple-500 text-purple-200",
  "1": "bg-red-500/20 border-red-400 text-red-300",
  "2": "bg-blue-500/20 border-blue-400 text-blue-300",
  "3": "bg-yellow-500/20 border-yellow-400 text-yellow-300",
  "4": "bg-purple-500/20 border-purple-400 text-purple-300",
};

export default function ArenaPlannerPro() {
  const [shape, setShape] = useState<Shape>("circle");
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");
  const [activeTool, setActiveTool] = useState<Tool>("select");
  
  const [selectedAoEType, setSelectedAoEType] = useState<AoEType>("cone");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  
  const [selectedRoleToAdd, setSelectedRoleToAdd] = useState<string | null>(null);
  const [selectedAoEId, setSelectedAoEId] = useState<string | null>(null);

  const [aoeAngle, setAoeAngle] = useState(44);
  const [aoeDirection, setAoeDirection] = useState(128);
  const [aoeRange, setAoeRange] = useState(40);
  const [aoeWidth, setAoeWidth] = useState(15); // Pour le rectangle

  const [beforeState, setBeforeState] = useState<StepState>({ elements: [], aoes: [] });
  const [afterState, setAfterState] = useState<StepState>({ elements: [], aoes: [] });

  const arenaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draggingId = useRef<string | null>(null);

  const currentState = activeTab === "before" ? beforeState : afterState;
  const setCurrentState = activeTab === "before" ? setBeforeState : setAfterState;

  const switchTab = (targetTab: "before" | "after") => {
    if (targetTab === "after" && activeTab === "before") {
      if (afterState.elements.length === 0 && afterState.aoes.length === 0) {
        setAfterState({
          elements: beforeState.elements.map(el => ({ ...el })),
          aoes: beforeState.aoes.map(c => ({ ...c }))
        });
      }
    }
    setActiveTab(targetTab);
    setSelectedAoEId(null);
  };
const positionsJson = JSON.stringify(
  currentState.elements.map(el => ({
    role: el.id === "BOSS" ? "Boss" : el.id,
    x: Math.round((el.x / 100) * 100) / 100,
    y: Math.round((el.y / 100) * 100) / 100,
  }))
);
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
    const x = parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(1));
    const y = parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(1));

    if (activeTool === "player" && selectedRoleToAdd) {
      if (currentState.elements.some(el => el.id === selectedRoleToAdd)) return;

      const newElement: ElementPosition = {
        id: selectedRoleToAdd,
        label: selectedRoleToAdd,
        type: selectedRoleToAdd === "BOSS" ? "boss" : (WAYMARKS.includes(selectedRoleToAdd as any) ? "waymark" : "player"),
        x,
        y,
        colorClass: ROLE_STYLES[selectedRoleToAdd] || "",
      };

      setCurrentState(prev => ({ ...prev, elements: [...prev.elements, newElement] }));
      setSelectedRoleToAdd(null);
      setActiveTool("select");
    } 
    else if (activeTool === "aoe") {
      const newAoE: AoEData = {
        id: `aoe-${Date.now()}`,
        type: selectedAoEType,
        x,
        y,
        range: aoeRange,
        direction: aoeDirection,
        ...(selectedAoEType === "cone" ? { angle: aoeAngle } : {}),
        ...(selectedAoEType === "rect" ? { width: aoeWidth } : {})
      };
      setCurrentState(prev => ({ ...prev, aoes: [...prev.aoes, newAoE] }));
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
    let x = Math.max(0, Math.min(100, parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(1))));
    let y = Math.max(0, Math.min(100, parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(1))));

    setCurrentState(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === draggingId.current ? { ...el, x, y } : el)
    }));
  };

  const handleMouseUp = () => { draggingId.current = null; };

  const removeElement = (id: string) => {
    setCurrentState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id),
      aoes: prev.aoes.filter(a => a.id !== id)
    }));
    if (selectedAoEId === id) setSelectedAoEId(null);
  };

  const updateSelectedAoE = (key: "angle" | "direction" | "range" | "width", val: number) => {
    if (key === "angle") setAoeAngle(val);
    if (key === "direction") setAoeDirection(val);
    if (key === "range") setAoeRange(val);
    if (key === "width") setAoeWidth(val);

    if (selectedAoEId) {
      setCurrentState(prev => ({
        ...prev,
        aoes: prev.aoes.map(a => a.id === selectedAoEId ? { ...a, [key]: val } : a)
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

  const totalItems = currentState.elements.length + currentState.aoes.length;
  const finalJson = { arena: { shape, backgroundImage }, before: beforeState, after: afterState };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-gray-200 font-sans p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-[1400px] grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        <div className="xl:col-span-3 flex flex-col gap-4">
          
          <div className="flex items-center justify-between bg-[#141822] p-2 rounded-xl border border-gray-800/40">
            <div className="flex gap-2 bg-[#0d0f14] p-1 rounded-lg border border-gray-800/60">
              <button 
                onClick={() => switchTab("before")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer transition-all ${activeTab === "before" ? "bg-amber-500 text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                <ChevronLeft size={14} /> Avant
              </button>
              <button 
                onClick={() => switchTab("after")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer transition-all ${activeTab === "after" ? "bg-amber-500 text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                Après <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex items-center gap-1 bg-[#0d0f14] p-1 rounded-lg border border-gray-800/60 text-xs">
              <button onClick={() => setActiveTool("select")} className={`px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer ${activeTool === "select" ? "bg-gray-800 text-amber-400" : "text-gray-400"}`}><MousePointer size={14}/> Sélection</button>
              <button onClick={() => { setActiveTool("player"); setSelectedRoleToAdd("MT"); }} className={`px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer ${activeTool === "player" ? "bg-gray-800 text-amber-400" : "text-gray-400"}`}><User size={14}/> Joueur</button>
              <button onClick={() => setActiveTool("aoe")} className={`px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer ${activeTool === "aoe" ? "bg-gray-800 text-amber-400" : "text-gray-400"}`}><Layers size={14}/> Attaque (AoE)</button>
              
              <div className="h-4 w-[1px] bg-gray-800 mx-2"></div>
              
              <span className="text-gray-500">Arène :</span>
              <button onClick={() => setShape("circle")} className={`p-1.5 rounded ${shape === "circle" ? "text-amber-400 bg-gray-800" : "text-gray-400"}`}><Circle size={14}/></button>
              <button onClick={() => setShape("square")} className={`p-1.5 rounded ${shape === "square" ? "text-amber-400 bg-gray-800" : "text-gray-400"}`}><Square size={14}/></button>
              
              <div className="h-4 w-[1px] bg-gray-800 mx-2"></div>
              
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className={`px-2 py-1 flex items-center gap-1 cursor-pointer ${backgroundImage ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'}`}><ImageIcon size={14}/> {backgroundImage ? "Fond OK" : "Fond"}</button>
              {backgroundImage && <button onClick={() => setBackgroundImage(null)} className="text-red-500 ml-1 font-bold text-[10px]">×</button>}
            </div>
          </div>

          {/* L'Arène de Dessin Principale */}
          <div className="flex-1 bg-[#141822] border border-gray-800/40 rounded-2xl flex items-center justify-center p-12 min-h-[600px]">
            <div 
              ref={arenaRef}
              onClick={handleArenaClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}
              className={`relative bg-[#090b0e] border-2 border-gray-800/80 aspect-square w-full max-w-[520px] shadow-2xl overflow-hidden select-none transition-all duration-300 ${shape === "circle" ? "rounded-full" : "rounded-xl"}`}
            >
              {!backgroundImage && (
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] flex items-center justify-center">
                  <div className={`w-3/4 h-3/4 border border-gray-700 ${shape === "circle" ? "rounded-full" : "rounded"}`}></div>
                  <div className={`w-1/2 h-1/2 border border-gray-700 absolute ${shape === "circle" ? "rounded-full" : "rounded"}`}></div>
                </div>
              )}

              {currentState.aoes.map((aoe) => {
                const isSelected = selectedAoEId === aoe.id;
                const baseStyle = `absolute transition-all pointer-events-auto cursor-pointer ${isSelected ? "border-amber-400 bg-red-500/25 z-10 animate-pulse" : "border-red-500/40 bg-red-600/15"}`;

                if (aoe.type === "cone" && aoe.angle !== undefined) {
                  const rotation = aoe.direction - aoe.angle / 2;
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => { e.stopPropagation(); selectAoE(aoe); }}
                      style={{
                        left: `${aoe.x}%`, top: `${aoe.y}%`,
                        width: `${aoe.range * 2}%`, height: `${aoe.range * 2}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        clipPath: `polygon(50% 50%, ${Array.from({ length: 12 }, (_, idx) => {
                          const alpha = (idx / 11) * (aoe.angle! * (Math.PI / 180));
                          return `${50 + 50 * Math.cos(alpha)}% ${50 + 50 * Math.sin(alpha)}%`;
                        }).join(", ")})`,
                      }}
                      className={`border ${baseStyle}`}
                    />
                  );
                }

                if (aoe.type === "circle") {
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => { e.stopPropagation(); selectAoE(aoe); }}
                      style={{
                        left: `${aoe.x}%`, top: `${aoe.y}%`,
                        width: `${aoe.range * 2}%`, height: `${aoe.range * 2}%`,
                        transform: `translate(-50%, -50%)`,
                      }}
                      className={`border rounded-full ${baseStyle}`}
                    />
                  );
                }

                if (aoe.type === "rect" && aoe.width !== undefined) {
                  return (
                    <div
                      key={aoe.id}
                      onClick={(e) => { e.stopPropagation(); selectAoE(aoe); }}
                      style={{
                        left: `${aoe.x}%`, top: `${aoe.y}%`,
                        width: `${aoe.width}%`, height: `${aoe.range}%`,
                        transformOrigin: "top center",
                        transform: `translate(-50%, 0%) rotate(${aoe.direction}deg)`,
                      }}
                      className={`border ${baseStyle}`}
                    />
                  );
                }
                return null;
              })}

              {currentState.elements.map((el) => {
                const isBoss = el.type === "boss";
                return (
                  <div
                    key={el.id}
                    onMouseDown={(e) => handleMouseDown(el.id, e)}
                    style={{ left: `${el.x}%`, top: `${el.y}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-bold border cursor-grab active:cursor-grabbing select-none ${isBoss ? `${el.colorClass} text-xs px-2 py-1 rounded-md shadow-lg` : `w-8 h-8 rounded-full text-[11px] ${el.colorClass}`}`}
                  >
                    {el.label}
                    <div onClick={(e) => { e.stopPropagation(); removeElement(el.id); }} className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">×</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          
          <div className="bg-[#141822] border border-gray-800/40 p-4 rounded-xl space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><User size={12}/> Joueurs</h3>
              <div className="grid grid-cols-4 gap-1.5">
                {PLAYER_ROLES.map(role => {
                  const isPlaced = currentState.elements.some(el => el.id === role);
                  return (
                    <button key={role} onClick={() => { setActiveTool("player"); setSelectedRoleToAdd(role); }} className={`relative py-2 text-xs font-bold border rounded-md transition-all cursor-pointer ${isPlaced ? "bg-gray-800/40 border-gray-700 text-gray-500" : selectedRoleToAdd === role ? "border-amber-400 bg-amber-500/10 text-amber-400" : "bg-[#0d0f14] border-gray-800 text-gray-300 hover:border-gray-700"}`}>{role}</button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">👾 Boss</h3>
              {(() => {
                const isBossPlaced = currentState.elements.some(el => el.type === "boss");
                return (
                  <button onClick={() => { setActiveTool("player"); setSelectedRoleToAdd("BOSS"); }} className={`w-full py-2 text-xs font-bold border rounded-md cursor-pointer flex items-center justify-center gap-2 ${isBossPlaced ? "bg-gray-800/40 border-gray-700 text-gray-600" : "bg-red-950/20 border-red-900/60 text-red-400"}`}>⚔️ Placer le Boss</button>
                );
              })()}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">📍 Waymarks</h3>
              <div className="grid grid-cols-4 gap-1.5">
                {WAYMARKS.map(mark => {
                  const isPlaced = currentState.elements.some(el => el.id === mark);
                  return (
                    <button key={mark} onClick={() => { setActiveTool("player"); setSelectedRoleToAdd(mark); }} className={`py-1.5 text-xs font-bold border rounded-md cursor-pointer ${isPlaced ? "bg-gray-800/40 border-gray-700 text-gray-600" : "bg-[#0d0f14] border-gray-800 text-gray-300"}`}>{mark}</button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-[#141822] border border-gray-800/40 p-4 rounded-xl space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Layers size={12}/> Forme de l'attaque</h3>
            
            <div className="grid grid-cols-3 gap-1 bg-[#0d0f14] p-1 rounded-lg border border-gray-800/60 text-xs">
              <button onClick={() => { setSelectedAoEType("cone"); setActiveTool("aoe"); }} className={`py-1.5 rounded cursor-pointer ${selectedAoEType === "cone" ? "bg-amber-500 text-black font-bold" : "text-gray-400"}`}>Cône</button>
              <button onClick={() => { setSelectedAoEType("circle"); setActiveTool("aoe"); }} className={`py-1.5 rounded cursor-pointer ${selectedAoEType === "circle" ? "bg-amber-500 text-black font-bold" : "text-gray-400"}`}>Cercle</button>
              <button onClick={() => { setSelectedAoEType("rect"); setActiveTool("aoe"); }} className={`py-1.5 rounded cursor-pointer ${selectedAoEType === "rect" ? "bg-amber-500 text-black font-bold" : "text-gray-400"}`}>Ligne</button>
            </div>
            
            <div className="space-y-3 text-xs">
              {selectedAoEType === "cone" && (
                <div>
                  <div className="flex justify-between text-gray-400 mb-1"><span>Angle d'ouverture</span><span className="text-amber-400 font-mono">{aoeAngle}°</span></div>
                  <input type="range" min="15" max="360" value={aoeAngle} onChange={(e) => updateSelectedAoE("angle", parseInt(e.target.value))} className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500" />
                </div>
              )}
              {selectedAoEType === "rect" && (
                <div>
                  <div className="flex justify-between text-gray-400 mb-1"><span>Largeur du rayon</span><span className="text-amber-400 font-mono">{aoeWidth}%</span></div>
                  <input type="range" min="5" max="60" value={aoeWidth} onChange={(e) => updateSelectedAoE("width", parseInt(e.target.value))} className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500" />
                </div>
              )}
              {selectedAoEType !== "circle" && (
                <div>
                  <div className="flex justify-between text-gray-400 mb-1"><span>Direction / Angle</span><span className="text-amber-400 font-mono">{aoeDirection}°</span></div>
                  <input type="range" min="0" max="360" value={aoeDirection} onChange={(e) => updateSelectedAoE("direction", parseInt(e.target.value))} className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500" />
                </div>
              )}
              <div>
                <div className="flex justify-between text-gray-400 mb-1"><span>{selectedAoEType === "circle" ? "Rayon" : selectedAoEType === "rect" ? "Longueur" : "Portée"}</span><span className="text-amber-400 font-mono">{aoeRange}%</span></div>
                <input type="range" min="5" max="100" value={aoeRange} onChange={(e) => updateSelectedAoE("range", parseInt(e.target.value))} className="w-full h-1 bg-gray-800 rounded appearance-none accent-amber-500" />
              </div>
            </div>

            {currentState.aoes.length > 0 && (
              <div className="pt-3 border-t border-gray-800/60 space-y-1.5 max-h-[120px] overflow-y-auto">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Attaques actives ({currentState.aoes.length})</span>
                {currentState.aoes.map((a, idx) => (
                  <div key={a.id} onClick={() => selectAoE(a)} className={`flex items-center justify-between p-2 rounded text-xs cursor-pointer border ${selectedAoEId === a.id ? "bg-amber-500/10 border-amber-500 text-amber-400" : "bg-[#0d0f14] border-gray-800 text-gray-400"}`}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      {a.type === "cone" ? "Cône" : a.type === "circle" ? "Cercle" : "Ligne"} #{idx + 1} ({a.range}%)
                    </span>
                    <Trash2 size={12} onClick={(e) => { e.stopPropagation(); removeElement(a.id); }} className="text-gray-500 hover:text-red-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#141822] border border-gray-800/40 p-4 rounded-xl flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-400 flex items-center gap-1">📥 Export JSON</span>
              <span className="text-gray-500 font-mono">{totalItems} éléments</span>
            </div>
<div className="grid grid-cols-1 gap-2">
  <button 
    onClick={() => navigator.clipboard.writeText(positionsJson)} 
    className="py-2 text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer font-bold"
  >
    <Copy size={12} /> Copier pour Keystatic
  </button>
  <p className="text-[10px] text-gray-500 text-center">
    Colle dans le champ "positions" de Keystatic
  </p>
</div>
          </div>

        </div>

      </div>
    </div>
  );
}