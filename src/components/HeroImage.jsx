import { useRef } from "react";
import defaultImage from "../assets/hange_excited.jpg";

export function HeroImage({ src, onUpload, theme }) {
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePointerDown = () => {
    timerRef.current = setTimeout(() => {
      triggerUpload();
      if (window.navigator.vibrate) window.navigator.vibrate(50);
    }, 500);
  };

  const handlePointerUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    e.target.value = "";
  };

  const bgStyle =
    theme === "dark"
      ? {
          background: `linear-gradient(135deg, hsl(262, 10%, 15%) 0%, hsl(262, 10%, 25%) 100%)`,
        }
      : {
          background: `linear-gradient(135deg, hsl(262, 15%, 85%) 0%, hsl(262, 20%, 75%) 100%)`,
        };

  return (
    <div
      className="relative w-full h-60 md:h-full overflow-hidden cursor-pointer group select-none touch-none"
      style={!src ? bgStyle : undefined}
      onDoubleClick={triggerUpload}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <img
        src={src || defaultImage}
        alt="Calendar hero"
        className="w-full h-full object-cover"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
          Change Image
        </span>
      </div>
    </div>
  );
}