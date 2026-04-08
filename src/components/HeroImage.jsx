import { useRef } from "react";
import { Upload } from "lucide-react";

export function HeroImage({ src, onUpload, theme, accentColor }) {
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
      className="relative w-full md:h-full overflow-hidden cursor-pointer group select-none touch-none"
      style={!src ? bgStyle : undefined}
      // Desktop standard
      onDoubleClick={triggerUpload}
      // Mobile Long Press
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {src ? (
        <img
          src={src}
          alt="Calendar hero"
          className="w-full h-full object-cover min-h-[50dvh]"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 transition-colors">
          <Upload className="w-10 h-10 mb-2" style={{ color: accentColor }} />
          <p className="text-sm font-medium text-center" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
            Double-click or Long-press to upload
          </p>
          <p className="text-xs mt-1 opacity-50 text-center" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}