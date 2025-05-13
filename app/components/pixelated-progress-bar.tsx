interface PixelatedProgressBarProps {
  progress: number
}

export default function PixelatedProgressBar({ progress }: PixelatedProgressBarProps) {
  return (
    <div className="w-full h-10 bg-[rgba(224,242,254,0.8)] flex relative overflow-hidden rounded-lg shadow-md border-4 border-[#0ea5e9]">
      {/* Create a single continuous bar instead of segments with spaces */}
      <div
        className="h-full bg-[#d94d8a] animate-pulse transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />

      {/* Add a subtle shine effect */}
      <div
        className="absolute top-0 left-0 h-full w-full pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
          transform: `translateX(${progress - 100}%)`,
          transition: "transform 0.3s ease-out",
        }}
      />
    </div>
  )
}
