import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Edit,
  Copy,
  Clock,
  User,
  FolderOpen,
  Hash,
  BarChart3,
  Calendar,
  FileCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  category: string;
  version: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
  usageCount: number;
  description?: string;
  content?: string;
  creator?: string;
  updatedAt?: string;
}

interface TemplateViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
}

const statusConfig = {
  active: { label: "启用中", className: "bg-success/10 text-success border-success/20" },
  draft: { label: "草稿", className: "bg-warning/10 text-warning border-warning/20" },
  archived: { label: "已归档", className: "bg-muted text-muted-foreground" },
};

// Mock detailed content for demo
const getMockContent = (template: Template | null) => {
  if (!template) return "";
  
  const contents: Record<string, string> = {
    "公文发文模板": `【标题】关于{{事项}}的通知

各部门：

根据{{依据}}相关要求，现就{{事项}}有关事项通知如下：

一、{{第一条内容}}

二、{{第二条内容}}

三、{{第三条内容}}

特此通知。

                                    {{发文单位}}
                                    {{发文日期}}`,
    "合同协议模板": `合同编号：{{合同编号}}

                    {{合同名称}}

甲方：{{甲方名称}}
地址：{{甲方地址}}
法定代表人：{{甲方法定代表人}}

乙方：{{乙方名称}}
地址：{{乙方地址}}
法定代表人：{{乙方法定代表人}}

根据《中华人民共和国民法典》等相关法律法规，甲乙双方经友好协商，就{{合同事项}}达成如下协议：

第一条 {{条款一}}

第二条 {{条款二}}

第三条 {{条款三}}

甲方签章：                    乙方签章：
日期：{{签署日期}}            日期：{{签署日期}}`,
    "会议纪要模板": `                    会议纪要

会议名称：{{会议名称}}
会议时间：{{会议时间}}
会议地点：{{会议地点}}
主持人：{{主持人}}
参会人员：{{参会人员}}
记录人：{{记录人}}

一、会议议题
{{会议议题}}

二、讨论内容
{{讨论内容}}

三、决议事项
{{决议事项}}

四、待办事项
{{待办事项}}

                                    {{记录日期}}`,
  };
  
  return contents[template.name] || `{{文档标题}}

这是模板 "${template.name}" 的内容预览。

{{内容区域}}

{{签署区域}}`;
};

export function TemplateViewDialog({
  open,
  onOpenChange,
  template,
}: TemplateViewDialogProps) {
  const navigate = useNavigate();

  if (!template) return null;

  const status = statusConfig[template.status];
  const content = getMockContent(template);

  const handleUseTemplate = () => {
    onOpenChange(false);
    navigate("/draft", { state: { templateId: template.id, templateName: template.name } });
    toast.success(`已选择模板: ${template.name}`);
  };

  const handleCopyTemplate = () => {
    toast.success("模板已复制");
  };

  const handleDownload = () => {
    toast.success("模板下载中...");
  };

  // Extract variables from content
  const variables = content.match(/\{\{([^}]+)\}\}/g)?.map((v) => v.replace(/\{\{|\}\}/g, "")) || [];
  const uniqueVariables = [...new Set(variables)];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{template.name}</DialogTitle>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className={status.className}>
                    {status.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {template.version}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-1 h-4 w-4" />
                下载
              </Button>
              <Button
                size="sm"
                className="bg-gradient-primary"
                onClick={handleUseTemplate}
              >
                <FileCheck className="mr-1 h-4 w-4" />
                使用模板
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="preview" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="flex-shrink-0 grid w-full grid-cols-3">
            <TabsTrigger value="preview">内容预览</TabsTrigger>
            <TabsTrigger value="info">模板信息</TabsTrigger>
            <TabsTrigger value="variables">变量列表</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto mt-4">
            <TabsContent value="preview" className="h-full m-0">
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                  {content}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="info" className="m-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                  <h3 className="font-semibold text-foreground">基本信息</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">分类：</span>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">版本：</span>
                      <span className="text-foreground">{template.version}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">创建者：</span>
                      <span className="text-foreground">系统管理员</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                  <h3 className="font-semibold text-foreground">使用统计</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">使用次数：</span>
                      <span className="font-semibold text-primary">
                        {template.usageCount} 次
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">创建时间：</span>
                      <span className="text-foreground">{template.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">更新时间：</span>
                      <span className="text-foreground">2024-12-10</span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 rounded-xl border border-border bg-card p-4 space-y-3">
                  <h3 className="font-semibold text-foreground">模板说明</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    此模板适用于{template.category}类型文档的创建和签署流程。
                    包含预设的格式和必填字段，支持自定义变量替换。
                    创建文档时可根据实际需要修改相关内容。
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={handleCopyTemplate}>
                  <Copy className="mr-2 h-4 w-4" />
                  复制模板
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  编辑模板
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="variables" className="m-0">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground">可替换变量</h3>
                  <p className="text-sm text-muted-foreground">
                    使用此模板时，以下变量将被替换为实际内容
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {uniqueVariables.map((variable, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
                    >
                      <code className="text-sm font-medium text-primary">
                        {`{{${variable}}}`}
                      </code>
                    </div>
                  ))}
                </div>
                {uniqueVariables.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    此模板暂无可替换变量
                  </p>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
