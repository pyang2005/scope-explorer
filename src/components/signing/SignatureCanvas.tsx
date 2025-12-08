import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, RotateCcw, Check, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignatureCanvasProps {
  onSave: (signature: string) => void;
  onCancel: () => void;
  width?: number;
  height?: number;
}

export function SignatureCanvas({
  onSave,
  onCancel,
  width = 500,
  height = 200,
}: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [strokeColor, setStrokeColor] = useState("#1a365d");
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const colors = [
    { name: "深蓝", value: "#1a365d" },
    { name: "黑色", value: "#000000" },
    { name: "红色", value: "#dc2626" },
  ];

  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
    }
    return ctx;
  }, [strokeWidth, strokeColor]);

  const getCoordinates = useCallback(
    (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e) {
        const touch = e.touches[0];
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const coords = getCoordinates(e);
      if (!coords) return;

      setIsDrawing(true);
      lastPointRef.current = coords;

      const ctx = getContext();
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
      }
    },
    [getCoordinates, getContext]
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawing) return;

      const coords = getCoordinates(e);
      if (!coords) return;

      const ctx = getContext();
      if (ctx && lastPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        lastPointRef.current = coords;
        setHasContent(true);
      }
    },
    [isDrawing, getCoordinates, getContext]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    lastPointRef.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasContent(false);
    }
  }, []);

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && hasContent) {
      const signature = canvas.toDataURL("image/png");
      onSave(signature);
    }
  }, [hasContent, onSave]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 p-3">
        {/* Color Selection */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">颜色:</span>
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setStrokeColor(color.value)}
                className={cn(
                  "h-7 w-7 rounded-full border-2 transition-all",
                  strokeColor === color.value
                    ? "border-primary scale-110 shadow-md"
                    : "border-border hover:border-primary/50"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Stroke Width */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">粗细:</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setStrokeWidth(Math.max(1, strokeWidth - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center text-sm font-medium">{strokeWidth}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setStrokeWidth(Math.min(10, strokeWidth + 1))}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Clear Button */}
        <Button variant="outline" size="sm" onClick={clearCanvas} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          清除
        </Button>
      </div>

      {/* Canvas */}
      <div className="relative rounded-lg border-2 border-dashed border-border bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full cursor-crosshair touch-none"
          style={{ aspectRatio: `${width}/${height}` }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasContent && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground/50">在此处签名...</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasContent}
          className="gap-2 bg-gradient-primary shadow-primary-glow"
        >
          <Check className="h-4 w-4" />
          确认签名
        </Button>
      </div>
    </div>
  );
}
