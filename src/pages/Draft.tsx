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
import { useLanguage } from "@/i18n";

interface Template {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
}

interface Signer {
  id: string;
  name: string;
  role: string;
  order: number;
}

export default function Draft() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [signers, setSigners] = useState<Signer[]>([
    { id: "1", name: language === 'zh' ? "部门经理" : "Department Manager", role: language === 'zh' ? "审批" : "Approval", order: 1 },
  ]);
  const [dragActive, setDragActive] = useState(false);

  const mockTemplates: Template[] = [
    { id: "1", name: "公文发文模板", nameEn: "Official Document Template", category: "公文", categoryEn: "Official" },
    { id: "2", name: "合同协议模板", nameEn: "Contract Template", category: "合同", categoryEn: "Contract" },
    { id: "3", name: "会议纪要模板", nameEn: "Meeting Minutes Template", category: "纪要", categoryEn: "Minutes" },
    { id: "4", name: "采购申请表", nameEn: "Procurement Form", category: "申请", categoryEn: "Application" },
    { id: "5", name: "报销审批单", nameEn: "Reimbursement Form", category: "申请", categoryEn: "Application" },
    { id: "6", name: "工作报告模板", nameEn: "Work Report Template", category: "报告", categoryEn: "Report" },
  ];

  const addSigner = () => {
    const newSigner: Signer = {
      id: Date.now().toString(),
      name: "",
      role: language === 'zh' ? "签署" : "Sign",
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
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">{t.draft.title}</h1>
          <p className="text-muted-foreground">{t.draft.subtitle}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50">
            <TabsTrigger value="template" className="gap-2">
              <FileText className="h-4 w-4" />
              {t.draft.fromTemplate}
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              {t.draft.uploadFile}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-card-foreground">{t.draft.selectTemplate}</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mockTemplates.map((template, index) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-background p-4 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-md",
                          selectedTemplate === template.id && "border-primary bg-primary/5 shadow-glow"
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
                          <p className="font-medium text-card-foreground">
                            {language === 'zh' ? template.name : template.nameEn}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {language === 'zh' ? template.category : template.categoryEn}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedTemplate && (
                    <div className="mt-8 animate-fade-in space-y-6 border-t border-border pt-6">
                      <h3 className="text-lg font-semibold text-card-foreground">{t.draft.fillDocInfo}</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Label htmlFor="title">{t.draft.docTitle}</Label>
                          <Input id="title" placeholder={t.draft.docTitlePlaceholder} className="mt-1.5" />
                        </div>
                        <div>
                          <Label htmlFor="docNumber">{t.draft.docNumber}</Label>
                          <div className="relative mt-1.5">
                            <Input id="docNumber" placeholder={t.draft.autoGenerate} className="pr-24" disabled />
                            <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-success/10 text-success">
                              <Sparkles className="mr-1 h-3 w-3" />
                              {t.draft.autoGenerate}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="department">{t.draft.department}</Label>
                          <Select>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder={t.draft.selectDepartment} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">{t.draft.adminDept}</SelectItem>
                              <SelectItem value="finance">{t.draft.financeDept}</SelectItem>
                              <SelectItem value="hr">{t.draft.hrDept}</SelectItem>
                              <SelectItem value="tech">{t.draft.techDept}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="content">{t.draft.content}</Label>
                          <Textarea id="content" placeholder={t.draft.contentPlaceholder} className="mt-1.5 min-h-[200px]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "100ms" }}>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    {t.draft.signingWorkflow}
                  </h2>
                  <div className="space-y-3">
                    {signers.map((signer, index) => (
                      <div key={signer.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Input placeholder={t.draft.selectOrInputSigner} value={signer.name} className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" />
                        </div>
                        <Badge variant="outline">{signer.role}</Badge>
                        {signers.length > 1 && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeSigner(signer.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-2" onClick={addSigner}>
                      <Plus className="h-4 w-4" />
                      {t.draft.addSigner}
                    </Button>
                  </div>
                </div>

                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "150ms" }}>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    {t.draft.timeSettings}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label>{t.draft.dueDate}</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>{t.draft.signingMode}</Label>
                      <Select defaultValue="online">
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">{t.draft.onlineOnly}</SelectItem>
                          <SelectItem value="offline">{t.draft.offlineOnly}</SelectItem>
                          <SelectItem value="hybrid">{t.draft.hybrid}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary py-6 text-lg shadow-glow" disabled={!selectedTemplate}>
                  {t.draft.startSigningProcess}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-card-foreground">{t.draft.uploadTitle}</h2>
                  <div
                    className={cn("flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 transition-all duration-300", dragActive && "border-primary bg-primary/5")}
                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  >
                    <div className="rounded-xl bg-primary/10 p-4"><FileUp className="h-12 w-12 text-primary" /></div>
                    <p className="mt-4 text-lg font-medium text-card-foreground">{t.draft.dragDropHint}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.draft.supportedFormats}</p>
                    <Button variant="outline" className="mt-4">{t.templates.selectFile}</Button>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="uploadTitle">{t.draft.docTitle}</Label>
                      <Input id="uploadTitle" placeholder={t.draft.docTitlePlaceholder} className="mt-1.5" />
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-accent" />
                        {t.draft.ocrHint}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "100ms" }}>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    {t.draft.signingWorkflow}
                  </h2>
                  <div className="space-y-3">
                    {signers.map((signer, index) => (
                      <div key={signer.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</div>
                        <div className="flex-1"><Input placeholder={t.draft.selectOrInputSigner} value={signer.name} className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" /></div>
                        <Badge variant="outline">{signer.role}</Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-2" onClick={addSigner}>
                      <Plus className="h-4 w-4" />
                      {t.draft.addSigner}
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary py-6 text-lg shadow-glow">
                  {t.draft.startSigningProcess}
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
