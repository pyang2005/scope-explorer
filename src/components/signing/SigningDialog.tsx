import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignatureCanvas } from "./SignatureCanvas";
import { SealUpload } from "./SealUpload";
import { PresetSeals } from "./PresetSeals";
import { PenTool, Upload, Stamp, Check, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SigningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentTitle?: string;
  onComplete?: (data: SigningData) => void;
}

interface SigningData {
  type: "signature" | "seal";
  image: string;
  sealName?: string;
  timestamp: Date;
}

export function SigningDialog({
  open,
  onOpenChange,
  documentTitle = "未命名文档",
  onComplete,
}: SigningDialogProps) {
  const [activeTab, setActiveTab] = useState("signature");
  const [completedItems, setCompletedItems] = useState<SigningData[]>([]);

  const handleSignatureSave = (signature: string) => {
    const data: SigningData = {
      type: "signature",
      image: signature,
      timestamp: new Date(),
    };
    setCompletedItems((prev) => [...prev, data]);
    toast.success("签名已保存");
  };

  const handleSealUpload = (seal: { name: string; image: string }) => {
    const data: SigningData = {
      type: "seal",
      image: seal.image,
      sealName: seal.name,
      timestamp: new Date(),
    };
    setCompletedItems((prev) => [...prev, data]);
    toast.success(`印章 "${seal.name}" 已上传`);
  };

  const handlePresetSealSelect = (seal: { id: string; name: string; image: string }) => {
    const data: SigningData = {
      type: "seal",
      image: seal.image,
      sealName: seal.name,
      timestamp: new Date(),
    };
    setCompletedItems((prev) => [...prev, data]);
    toast.success(`已选择印章 "${seal.name}"`);
  };

  const handleComplete = () => {
    if (completedItems.length === 0) {
      toast.error("请先完成签名或盖章");
      return;
    }
    onComplete?.(completedItems[completedItems.length - 1]);
    onOpenChange(false);
    toast.success("签署完成！");
    setCompletedItems([]);
  };

  const handleCancel = () => {
    setCompletedItems([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-primary p-2.5 shadow-primary-glow">
              <PenTool className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl">在线签署</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {documentTitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Completed Items Preview */}
        {completedItems.length > 0 && (
          <div className="rounded-lg border border-success/30 bg-success/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-success">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">已添加签章</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {completedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.type === "signature" ? "签名" : item.sealName}
                    className="h-12 w-auto max-w-[80px] object-contain"
                  />
                  <Badge variant="secondary" className="text-xs">
                    {item.type === "signature" ? "手写签名" : item.sealName}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="signature" className="gap-2">
              <PenTool className="h-4 w-4" />
              手写签名
            </TabsTrigger>
            <TabsTrigger value="preset" className="gap-2">
              <Stamp className="h-4 w-4" />
              预设印章
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              上传印章
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signature" className="mt-6">
            <SignatureCanvas
              onSave={handleSignatureSave}
              onCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="preset" className="mt-6">
            <PresetSeals
              onSelect={handlePresetSealSelect}
              onCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <SealUpload onUpload={handleSealUpload} onCancel={handleCancel} />
          </TabsContent>
        </Tabs>

        {/* Complete Button */}
        {completedItems.length > 0 && (
          <div className="flex justify-end border-t border-border pt-4">
            <Button
              onClick={handleComplete}
              className="gap-2 bg-gradient-accent shadow-accent-glow"
            >
              <Check className="h-4 w-4" />
              完成签署
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
