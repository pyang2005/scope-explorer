import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image, X, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SealUploadProps {
  onUpload: (seal: { name: string; image: string }) => void;
  onCancel: () => void;
}

export function SealUpload({ onUpload, onCancel }: SealUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [sealName, setSealName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    setError(null);
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("请上传图片文件 (PNG, JPG, GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("文件大小不能超过 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = () => {
    if (!preview) {
      setError("请上传印章图片");
      return;
    }
    if (!sealName.trim()) {
      setError("请输入印章名称");
      return;
    }
    onUpload({ name: sealName.trim(), image: preview });
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Seal Name Input */}
      <div className="space-y-2">
        <Label htmlFor="sealName">印章名称</Label>
        <Input
          id="sealName"
          placeholder="例如：公司合同专用章"
          value={sealName}
          onChange={(e) => setSealName(e.target.value)}
        />
      </div>

      {/* Upload Area */}
      <div className="space-y-2">
        <Label>印章图片</Label>
        <div
          className={cn(
            "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
            preview && "border-solid border-border"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !preview && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />

          {preview ? (
            <div className="relative p-4">
              <img
                src={preview}
                alt="印章预览"
                className="max-h-[180px] max-w-full object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  clearPreview();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  点击或拖拽上传印章图片
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  支持 PNG、JPG、GIF 格式，最大 5MB
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  建议上传透明背景的 PNG 格式图片
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Tips */}
      <div className="rounded-lg bg-info/10 p-4">
        <h4 className="mb-2 font-medium text-info">上传提示</h4>
        <ul className="space-y-1 text-sm text-info/80">
          <li>• 建议使用透明背景的 PNG 格式图片</li>
          <li>• 印章图片尺寸建议不小于 200x200 像素</li>
          <li>• 确保印章图片清晰、完整</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!preview || !sealName.trim()}
          className="gap-2 bg-gradient-primary shadow-primary-glow"
        >
          <Check className="h-4 w-4" />
          确认上传
        </Button>
      </div>
    </div>
  );
}
