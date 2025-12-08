import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SigningDialog } from "@/components/signing/SigningDialog";
import {
  Search,
  FileText,
  MoreVertical,
  Eye,
  PenTool,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  ArrowRight,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SigningTask {
  id: string;
  title: string;
  type: string;
  sender: {
    name: string;
    avatar?: string;
  };
  status: "pending" | "completed" | "rejected" | "expired";
  priority: "urgent" | "normal" | "low";
  dueDate: string;
  signingMode: "online" | "offline" | "hybrid";
  currentStep: number;
  totalSteps: number;
  createdAt: string;
}

const mockTasks: SigningTask[] = [
  {
    id: "1",
    title: "2024年度战略合作协议",
    type: "合同",
    sender: { name: "张三" },
    status: "pending",
    priority: "urgent",
    dueDate: "2024-12-10",
    signingMode: "online",
    currentStep: 2,
    totalSteps: 4,
    createdAt: "2024-12-08 09:30",
  },
  {
    id: "2",
    title: "项目验收报告",
    type: "报告",
    sender: { name: "李四" },
    status: "pending",
    priority: "normal",
    dueDate: "2024-12-15",
    signingMode: "hybrid",
    currentStep: 1,
    totalSteps: 3,
    createdAt: "2024-12-07 14:20",
  },
  {
    id: "3",
    title: "设备采购合同",
    type: "合同",
    sender: { name: "王五" },
    status: "completed",
    priority: "normal",
    dueDate: "2024-12-08",
    signingMode: "online",
    currentStep: 5,
    totalSteps: 5,
    createdAt: "2024-12-05 10:00",
  },
  {
    id: "4",
    title: "人事任命通知",
    type: "通知",
    sender: { name: "赵六" },
    status: "rejected",
    priority: "urgent",
    dueDate: "2024-12-06",
    signingMode: "offline",
    currentStep: 2,
    totalSteps: 4,
    createdAt: "2024-12-04 16:45",
  },
];

const statusConfig = {
  pending: {
    label: "待签署",
    icon: Clock,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  completed: {
    label: "已完成",
    icon: CheckCircle,
    className: "bg-success/10 text-success border-success/20",
  },
  rejected: {
    label: "已拒绝",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  expired: {
    label: "已过期",
    icon: AlertCircle,
    className: "bg-muted text-muted-foreground",
  },
};

const priorityConfig = {
  urgent: { label: "紧急", className: "bg-destructive text-destructive-foreground" },
  normal: { label: "普通", className: "bg-secondary text-secondary-foreground" },
  low: { label: "低", className: "bg-muted text-muted-foreground" },
};

const modeConfig = {
  online: { label: "在线签署", className: "text-success" },
  offline: { label: "线下签署", className: "text-info" },
  hybrid: { label: "混合签署", className: "text-accent" },
};

export default function Signing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [signingDialogOpen, setSigningDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SigningTask | null>(null);

  const handleSignClick = (task: SigningTask) => {
    setSelectedTask(task);
    setSigningDialogOpen(true);
  };

  const handleSigningComplete = () => {
    toast.success(`文档 "${selectedTask?.title}" 签署成功！`);
    setSelectedTask(null);
  };

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && task.status === "pending") ||
      (activeTab === "completed" && task.status === "completed") ||
      (activeTab === "rejected" && task.status === "rejected");
    return matchesSearch && matchesTab;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">签署中心</h1>
          <p className="text-muted-foreground">管理和处理您的待签署文档</p>
        </div>

        {/* Search and Filters */}
        <div className="animate-slide-up flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索文档名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              待签署
              <Badge variant="secondary" className="ml-1">
                {mockTasks.filter((t) => t.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              已完成
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2">
              <XCircle className="h-4 w-4" />
              已拒绝
            </TabsTrigger>
            <TabsTrigger value="all">全部</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredTasks.map((task, index) => {
                const status = statusConfig[task.status];
                const priority = priorityConfig[task.priority];
                const mode = modeConfig[task.signingMode];
                const StatusIcon = status.icon;
                const progress = (task.currentStep / task.totalSteps) * 100;

                return (
                  <div
                    key={task.id}
                    className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* Document Info */}
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-card-foreground">
                              {task.title}
                            </h3>
                            {task.priority === "urgent" && (
                              <Badge className={priority.className}>{priority.label}</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              发起人: {task.sender.name}
                            </span>
                            <Badge variant="outline">{task.type}</Badge>
                            <span className={cn("font-medium", mode.className)}>{mode.label}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              截止: {task.dueDate}
                            </span>
                          </div>
                          {/* Progress */}
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                              <div
                                className={cn(
                                  "h-full rounded-full transition-all",
                                  task.status === "completed" && "bg-success",
                                  task.status === "pending" && "bg-primary",
                                  task.status === "rejected" && "bg-destructive"
                                )}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {task.currentStep}/{task.totalSteps} 步骤
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={cn("gap-1", status.className)}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                        {task.status === "pending" && (
                          <Button 
                            className="bg-gradient-accent shadow-accent-glow gap-2"
                            onClick={() => handleSignClick(task)}
                          >
                            <PenTool className="h-4 w-4" />
                            立即签署
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        )}
                        {task.status === "completed" && (
                          <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            下载
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看详情</DropdownMenuItem>
                            <DropdownMenuItem>查看签署记录</DropdownMenuItem>
                            <DropdownMenuItem>发送提醒</DropdownMenuItem>
                            {task.status === "pending" && (
                              <DropdownMenuItem className="text-destructive">
                                拒绝签署
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
                  <FileText className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-lg font-medium text-muted-foreground">暂无签署任务</p>
                  <p className="text-sm text-muted-foreground">所有任务已处理完毕</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Signing Dialog */}
        <SigningDialog
          open={signingDialogOpen}
          onOpenChange={setSigningDialogOpen}
          documentTitle={selectedTask?.title}
          onComplete={handleSigningComplete}
        />
      </div>
    </AppLayout>
  );
}
