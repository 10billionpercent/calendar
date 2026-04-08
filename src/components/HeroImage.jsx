import { useRef } from "react";
import { Upload, X } from "lucide-react";

export function HeroImage({ src, onUpload, theme, accentColor }) {
  const fileInputRef = useRef(null);

  const handleDoubleClick = () => {
    fileInputRef.current?.click();
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
      className="relative w-full h-48 md:h-full overflow-hidden cursor-pointer group rounded-xl"
      style={!src ? bgStyle : undefined}
      onDoubleClick={handleDoubleClick}
    >
      {src ? (
        <>
          <img
            src={src}
            alt="Calendar hero"
            className="w-full h-full object-cover"
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white/60 group-hover:text-white/80 transition-colors">
          <Upload className="w-10 h-10 mb-2" style={{ color: accentColor }} />
          <p className="text-sm font-medium">Double-click to upload</p>
          <p className="text-xs mt-1 opacity-75">PNG, JPG, GIF up to 5MB</p>
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
