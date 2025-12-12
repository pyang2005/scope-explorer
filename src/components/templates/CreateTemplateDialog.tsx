import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Type, FileUp, X, Check } from "lucide-react";
import { toast } from "sonner";

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const categories = ["公文", "合同", "纪要", "申请", "报告", "通知"];

export function CreateTemplateDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateTemplateDialogProps) {
  const [activeTab, setActiveTab] = useState("upload");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    content: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("请上传 PDF 或 Word 文档");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("文件大小不能超过 10MB");
      return;
    }
    setUploadedFile(file);
    if (!formData.name) {
      setFormData((prev) => ({
        ...prev,
        name: file.name.replace(/\.[^/.]+$/, ""),
      }));
    }
    toast.success("文件上传成功");
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("请输入模板名称");
      return;
    }
    if (!formData.category) {
      toast.error("请选择模板分类");
      return;
    }
    if (activeTab === "upload" && !uploadedFile) {
      toast.error("请上传模板文件");
      return;
    }
    if (activeTab === "editor" && !formData.content.trim()) {
      toast.error("请输入模板内容");
      return;
    }

    toast.success("模板创建成功");
    resetForm();
    onOpenChange(false);
    onSuccess?.();
  };

  const resetForm = () => {
    setFormData({ name: "", category: "", description: "", content: "" });
    setUploadedFile(null);
    setActiveTab("upload");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-primary" />
            新建模板
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                模板名称 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="输入模板名称"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>
                模板分类 <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">模板说明</Label>
            <Textarea
              id="description"
              placeholder="输入模板说明..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
            />
          </div>

          {/* Template Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="gap-2">
                <FileUp className="h-4 w-4" />
                上传文件
              </TabsTrigger>
              <TabsTrigger value="editor" className="gap-2">
                <Type className="h-4 w-4" />
                在线编辑
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-4">
              <div
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                      <Check className="h-8 w-8 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                    >
                      <X className="mr-1 h-3 w-3" />
                      移除文件
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        拖拽文件到此处或点击上传
                      </p>
                      <p className="text-sm text-muted-foreground">
                        支持 PDF、Word 格式，最大 10MB
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileSelect}
                        />
                        选择文件
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="editor" className="mt-4">
              <div className="space-y-2">
                <Label>模板内容</Label>
                <Textarea
                  placeholder="在此输入模板内容...&#10;&#10;提示：您可以使用 {{变量名}} 来定义可替换的字段，例如：&#10;- {{签署人}} - 签署人姓名&#10;- {{日期}} - 签署日期&#10;- {{部门}} - 所属部门"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  使用 {"{{变量名}}"} 格式定义可替换字段
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button className="bg-gradient-primary" onClick={handleSubmit}>
              创建模板
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
