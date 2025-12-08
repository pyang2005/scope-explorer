import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  FileUp,
  ArrowRight,
  Users,
  Calendar,
  Plus,
  X,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  category: string;
  preview?: string;
}

const mockTemplates: Template[] = [
  { id: "1", name: "公文发文模板", category: "公文" },
  { id: "2", name: "合同协议模板", category: "合同" },
  { id: "3", name: "会议纪要模板", category: "纪要" },
  { id: "4", name: "采购申请表", category: "申请" },
  { id: "5", name: "报销审批单", category: "申请" },
  { id: "6", name: "工作报告模板", category: "报告" },
];

interface Signer {
  id: string;
  name: string;
  role: string;
  order: number;
}

export default function Draft() {
  const [activeTab, setActiveTab] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [signers, setSigners] = useState<Signer[]>([
    { id: "1", name: "部门经理", role: "审批", order: 1 },
  ]);
  const [dragActive, setDragActive] = useState(false);

  const addSigner = () => {
    const newSigner: Signer = {
      id: Date.now().toString(),
      name: "",
      role: "签署",
      order: signers.length + 1,
    };
    setSigners([...signers, newSigner]);
  };

  const removeSigner = (id: string) => {
    setSigners(signers.filter((s) => s.id !== id));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">文档起草</h1>
          <p className="text-muted-foreground">创建新文档或上传已有文件发起签署流程</p>
        </div>

        {/* Mode Selection */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50">
            <TabsTrigger value="template" className="gap-2">
              <FileText className="h-4 w-4" />
              基于模板创建
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              上传文件
            </TabsTrigger>
          </TabsList>

          {/* Template Mode */}
          <TabsContent value="template" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Template Selection */}
              <div className="lg:col-span-2">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-card-foreground">选择模板</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mockTemplates.map((template, index) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-background p-4 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-md",
                          selectedTemplate === template.id &&
                            "border-primary bg-primary/5 shadow-glow"
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {selectedTemplate === template.id && (
                          <div className="absolute -right-2 -top-2 rounded-full bg-primary p-1 shadow-md">
                            <CheckCircle className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-card-foreground">{template.name}</p>
                          <Badge variant="outline" className="mt-1">
                            {template.category}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Document Form */}
                  {selectedTemplate && (
                    <div className="mt-8 animate-fade-in space-y-6 border-t border-border pt-6">
                      <h3 className="text-lg font-semibold text-card-foreground">填写文档信息</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Label htmlFor="title">文档标题</Label>
                          <Input
                            id="title"
                            placeholder="请输入文档标题"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="docNumber">文档编号</Label>
                          <div className="relative mt-1.5">
                            <Input
                              id="docNumber"
                              placeholder="自动生成"
                              className="pr-24"
                              disabled
                            />
                            <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-success/10 text-success">
                              <Sparkles className="mr-1 h-3 w-3" />
                              自动生成
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="department">所属部门</Label>
                          <Select>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="选择部门" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">行政部</SelectItem>
                              <SelectItem value="finance">财务部</SelectItem>
                              <SelectItem value="hr">人力资源部</SelectItem>
                              <SelectItem value="tech">技术部</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="content">正文内容</Label>
                          <Textarea
                            id="content"
                            placeholder="请输入文档正文内容..."
                            className="mt-1.5 min-h-[200px]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Workflow Configuration */}
              <div className="space-y-6">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "100ms" }}>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    签署流程
                  </h2>
                  <div className="space-y-3">
                    {signers.map((signer, index) => (
                      <div
                        key={signer.id}
                        className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="选择或输入签署人"
                            value={signer.name}
                            className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                          />
                        </div>
                        <Badge variant="outline">{signer.role}</Badge>
                        {signers.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeSigner(signer.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={addSigner}
                    >
                      <Plus className="h-4 w-4" />
                      添加签署人
                    </Button>
                  </div>
                </div>

                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "150ms" }}>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    时间设置
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label>签署截止日期</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>签署模式</Label>
                      <Select defaultValue="online">
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">纯在线签署</SelectItem>
                          <SelectItem value="offline">纯线下签署</SelectItem>
                          <SelectItem value="hybrid">混合签署</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-primary py-6 text-lg shadow-glow"
                  disabled={!selectedTemplate}
                >
                  发起签署流程
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Upload Mode */}
          <TabsContent value="upload" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-card-foreground">上传文件</h2>

                  {/* Drag & Drop Zone */}
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 transition-all duration-300",
                      dragActive && "border-primary bg-primary/5"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="rounded-xl bg-primary/10 p-4">
                      <FileUp className="h-12 w-12 text-primary" />
                    </div>
                    <p className="mt-4 text-lg font-medium text-card-foreground">
                      拖拽文件到此处上传
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      支持 PDF、Word、图片格式
                    </p>
                    <Button variant="outline" className="mt-4">
                      选择文件
                    </Button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="uploadTitle">文档标题</Label>
                      <Input id="uploadTitle" placeholder="请输入文档标题" className="mt-1.5" />
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-accent" />
                        系统将自动通过 OCR 识别文档内容，提取标题、编号等信息用于索引
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Same workflow config as template mode */}
              <div className="space-y-6">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "100ms" }}>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    签署流程
                  </h2>
                  <div className="space-y-3">
                    {signers.map((signer, index) => (
                      <div
                        key={signer.id}
                        className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="选择或输入签署人"
                            value={signer.name}
                            className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                          />
                        </div>
                        <Badge variant="outline">{signer.role}</Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-2" onClick={addSigner}>
                      <Plus className="h-4 w-4" />
                      添加签署人
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary py-6 text-lg shadow-glow">
                  发起签署流程
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
