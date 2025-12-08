import { Clock, FileText, User, AlertCircle, CheckCircle, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  type: "sign" | "review" | "draft";
  status: "urgent" | "pending" | "normal";
  sender: string;
  dueDate: string;
  dueTime?: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "2024年度工作总结报告",
    type: "sign",
    status: "urgent",
    sender: "张三",
    dueDate: "今天",
    dueTime: "18:00",
  },
  {
    id: "2",
    title: "项目合作协议书",
    type: "sign",
    status: "pending",
    sender: "李四",
    dueDate: "明天",
  },
  {
    id: "3",
    title: "采购申请表",
    type: "review",
    status: "normal",
    sender: "王五",
    dueDate: "3天后",
  },
  {
    id: "4",
    title: "会议纪要 - 12月第一周",
    type: "draft",
    status: "normal",
    sender: "赵六",
    dueDate: "本周五",
  },
];

const statusConfig = {
  urgent: {
    label: "紧急",
    variant: "destructive" as const,
    icon: AlertCircle,
  },
  pending: {
    label: "待处理",
    variant: "warning" as const,
    icon: Timer,
  },
  normal: {
    label: "普通",
    variant: "secondary" as const,
    icon: Clock,
  },
};

const typeConfig = {
  sign: { label: "待签署", color: "text-accent" },
  review: { label: "待审核", color: "text-info" },
  draft: { label: "待起草", color: "text-success" },
};

export function TaskList() {
  return (
    <div className="animate-slide-up rounded-xl border border-border bg-card shadow-md" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-semibold text-card-foreground">待办任务</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          查看全部
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
                  <p className="font-medium text-card-foreground">{task.title}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {task.sender}
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
                    截止: {task.dueDate}
                    {task.dueTime && ` ${task.dueTime}`}
                  </p>
                </div>
                <Button size="sm" className="bg-gradient-primary shadow-glow">
                  处理
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
