import { Clock, FileText, User, AlertCircle, CheckCircle, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n";

interface Task {
  id: string;
  title: string;
  titleEn: string;
  type: "sign" | "review" | "draft";
  status: "urgent" | "pending" | "normal";
  sender: string;
  senderEn: string;
  dueDate: string;
  dueDateEn: string;
  dueTime?: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "2024年度工作总结报告",
    titleEn: "2024 Annual Work Summary Report",
    type: "sign",
    status: "urgent",
    sender: "张三",
    senderEn: "Zhang San",
    dueDate: "今天",
    dueDateEn: "Today",
    dueTime: "18:00",
  },
  {
    id: "2",
    title: "项目合作协议书",
    titleEn: "Project Cooperation Agreement",
    type: "sign",
    status: "pending",
    sender: "李四",
    senderEn: "Li Si",
    dueDate: "明天",
    dueDateEn: "Tomorrow",
  },
  {
    id: "3",
    title: "采购申请表",
    titleEn: "Procurement Application Form",
    type: "review",
    status: "normal",
    sender: "王五",
    senderEn: "Wang Wu",
    dueDate: "3天后",
    dueDateEn: "In 3 days",
  },
  {
    id: "4",
    title: "会议纪要 - 12月第一周",
    titleEn: "Meeting Minutes - First Week of December",
    type: "draft",
    status: "normal",
    sender: "赵六",
    senderEn: "Zhao Liu",
    dueDate: "本周五",
    dueDateEn: "This Friday",
  },
];

export function TaskList() {
  const { language, t } = useLanguage();

  const statusConfig = {
    urgent: {
      label: t.taskList.urgent,
      variant: "destructive" as const,
      icon: AlertCircle,
    },
    pending: {
      label: t.taskList.pending,
      variant: "warning" as const,
      icon: Timer,
    },
    normal: {
      label: t.taskList.normal,
      variant: "secondary" as const,
      icon: Clock,
    },
  };

  const typeConfig = {
    sign: { label: t.taskList.toSign, color: "text-accent" },
    review: { label: t.taskList.toReview, color: "text-info" },
    draft: { label: t.taskList.toDraft, color: "text-success" },
  };

  return (
    <div className="animate-slide-up rounded-xl border border-border bg-card shadow-md" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-semibold text-card-foreground">{t.taskList.title}</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          {t.common.viewAll}
        </Button>
      </div>
      <div className="divide-y divide-border">
        {mockTasks.map((task) => {
          const status = statusConfig[task.status];
          const type = typeConfig[task.type];
          const StatusIcon = status.icon;

          return (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-lg bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-card-foreground">
                    {language === 'zh' ? task.title : task.titleEn}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {language === 'zh' ? task.sender : task.senderEn}
                    </span>
                    <span className={cn("font-medium", type.color)}>{type.label}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Badge
                    variant={status.variant === "warning" ? "outline" : status.variant}
                    className={cn(
                      "gap-1",
                      status.variant === "warning" && "border-warning bg-warning/10 text-warning"
                    )}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.taskList.due}: {language === 'zh' ? task.dueDate : task.dueDateEn}
                    {task.dueTime && ` ${task.dueTime}`}
                  </p>
                </div>
                <Button size="sm" className="bg-gradient-primary shadow-glow">
                  {t.taskList.process}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
