import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Stamp, Building2, User, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface PresetSeal {
  id: string;
  name: string;
  type: "company" | "personal" | "contract" | "finance";
  image: string;
  description: string;
}

interface PresetSealsProps {
  onSelect: (seal: PresetSeal) => void;
  onCancel: () => void;
}

// Generate SVG seal images dynamically
const generateSealSVG = (text: string, color: string = "#dc2626") => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="55" fill="none" stroke="${color}" stroke-width="4"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="${color}" stroke-width="2"/>
      <text x="60" y="45" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="${color}">${text.slice(0, 4)}</text>
      <text x="60" y="65" text-anchor="middle" font-family="SimHei, sans-serif" font-size="14" fill="${color}">${text.slice(4, 8) || ''}</text>
      <text x="60" y="85" text-anchor="middle" font-family="SimHei, sans-serif" font-size="12" fill="${color}">专用章</text>
      <polygon points="60,90 55,100 65,100" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
};

const presetSeals: PresetSeal[] = [
  {
    id: "1",
    name: "公司公章",
    type: "company",
    image: generateSealSVG("公司公章", "#dc2626"),
    description: "用于正式对外文件和合同",
  },
  {
    id: "2",
    name: "合同专用章",
    type: "contract",
    image: generateSealSVG("合同专用", "#dc2626"),
    description: "仅用于签署各类合同文件",
  },
  {
    id: "3",
    name: "财务专用章",
    type: "finance",
    image: generateSealSVG("财务专用", "#1a365d"),
    description: "用于财务相关文件和报表",
  },
  {
    id: "4",
    name: "个人签章",
    type: "personal",
    image: generateSealSVG("个人签章", "#0f766e"),
    description: "法人或个人代表签章",
  },
];

const typeConfig = {
  company: { label: "公司章", icon: Building2, className: "bg-primary/10 text-primary" },
  personal: { label: "个人章", icon: User, className: "bg-success/10 text-success" },
  contract: { label: "合同章", icon: FileCheck, className: "bg-accent/10 text-accent" },
  finance: { label: "财务章", icon: Stamp, className: "bg-info/10 text-info" },
};

export function PresetSeals({ onSelect, onCancel }: PresetSealsProps) {
  const [selectedSeal, setSelectedSeal] = useState<PresetSeal | null>(null);

  const handleConfirm = () => {
    if (selectedSeal) {
      onSelect(selectedSeal);
    }
  };

  return (
    <div className="space-y-6">
      {/* Seal Grid */}
      <div className="grid grid-cols-2 gap-4">
        {presetSeals.map((seal) => {
          const config = typeConfig[seal.type];
          const TypeIcon = config.icon;
          const isSelected = selectedSeal?.id === seal.id;

          return (
            <div
              key={seal.id}
              className={cn(
                "group relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300",
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              )}
              onClick={() => setSelectedSeal(seal)}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute -right-2 -top-2 rounded-full bg-primary p-1 shadow-lg">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}

              {/* Seal Image */}
              <div className="mb-3 flex justify-center">
                <div className="relative rounded-lg bg-white p-3 shadow-sm">
                  <img
                    src={seal.image}
                    alt={seal.name}
                    className="h-20 w-20 object-contain transition-transform group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Seal Info */}
              <div className="space-y-2 text-center">
                <h4 className="font-semibold text-foreground">{seal.name}</h4>
                <Badge variant="secondary" className={cn("gap-1", config.className)}>
                  <TypeIcon className="h-3 w-3" />
                  {config.label}
                </Badge>
                <p className="text-xs text-muted-foreground">{seal.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">提示：</span>
          预设印章为系统标准模板，如需使用自定义印章，请切换到"上传印章"选项。
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!selectedSeal}
          className="gap-2 bg-gradient-primary shadow-primary-glow"
        >
          <Check className="h-4 w-4" />
          使用此印章
        </Button>
      </div>
    </div>
  );
}
