import { FilePlus, FileText, Upload, QrCode, Search, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  gradient: string;
}

const quickActions: QuickAction[] = [
  {
    icon: FilePlus,
    label: "新建文档",
    description: "基于模板创建新文档",
    href: "/draft",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Upload,
    label: "上传文件",
    description: "导入已有文件进行签署",
    href: "/draft?mode=upload",
    gradient: "from-info to-info/70",
  },
  {
    icon: PenTool,
    label: "快速签署",
    description: "处理待签署文档",
    href: "/signing",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: QrCode,
    label: "扫码验真",
    description: "验证文档真伪",
    href: "/verify",
    gradient: "from-success to-success/70",
  },
  {
    icon: Search,
    label: "文档检索",
    description: "搜索历史归档文档",
    href: "/archive",
    gradient: "from-warning to-warning/70",
  },
  {
    icon: FileText,
    label: "模板中心",
    description: "管理文档模板",
    href: "/templates",
    gradient: "from-destructive to-destructive/70",
  },
];

export function QuickActions() {
  return (
    <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
      <h2 className="mb-4 text-lg font-semibold text-foreground">快速操作</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {quickActions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: `${(index + 2) * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110",
                action.gradient
              )}
            >
              <action.icon className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="font-medium text-card-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
