import { FileText, Download, Eye, MoreHorizontal, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  type: string;
  status: "completed" | "in_progress" | "rejected";
  updatedAt: string;
  signedCount: number;
  totalSigners: number;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "2024年度预算报告",
    type: "报告",
    status: "completed",
    updatedAt: "2024-12-08 14:30",
    signedCount: 5,
    totalSigners: 5,
  },
  {
    id: "2",
    title: "战略合作框架协议",
    type: "合同",
    status: "in_progress",
    updatedAt: "2024-12-08 11:20",
    signedCount: 3,
    totalSigners: 6,
  },
  {
    id: "3",
    title: "设备采购申请表",
    type: "申请",
    status: "in_progress",
    updatedAt: "2024-12-07 16:45",
    signedCount: 2,
    totalSigners: 4,
  },
  {
    id: "4",
    title: "部门会议纪要 - 11月",
    type: "纪要",
    status: "rejected",
    updatedAt: "2024-12-07 10:15",
    signedCount: 1,
    totalSigners: 3,
  },
];

const statusConfig = {
  completed: {
    label: "已完成",
    icon: CheckCircle,
    className: "bg-success/10 text-success border-success/20",
  },
  in_progress: {
    label: "签署中",
    icon: Clock,
    className: "bg-info/10 text-info border-info/20",
  },
  rejected: {
    label: "已拒绝",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function RecentDocuments() {
  return (
    <div className="animate-slide-up rounded-xl border border-border bg-card shadow-md" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-semibold text-card-foreground">最近文档</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          查看全部
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                文档名称
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                类型
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                签署进度
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                状态
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                更新时间
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockDocuments.map((doc) => {
              const status = statusConfig[doc.status];
              const StatusIcon = status.icon;
              const progress = (doc.signedCount / doc.totalSigners) * 100;

              return (
                <tr key={doc.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-card-foreground">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{doc.type}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            doc.status === "completed" && "bg-success",
                            doc.status === "in_progress" && "bg-info",
                            doc.status === "rejected" && "bg-destructive"
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {doc.signedCount}/{doc.totalSigners}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("gap-1", status.className)}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{doc.updatedAt}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>下载PDF</DropdownMenuItem>
                          <DropdownMenuItem>查看签署记录</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
