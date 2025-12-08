import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  FileText,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Eye,
  FolderOpen,
  Grid3X3,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  category: string;
  version: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
  usageCount: number;
  thumbnail?: string;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "公文发文模板",
    category: "公文",
    version: "V2.0",
    status: "active",
    createdAt: "2024-11-15",
    usageCount: 156,
  },
  {
    id: "2",
    name: "合同协议模板",
    category: "合同",
    version: "V1.5",
    status: "active",
    createdAt: "2024-10-20",
    usageCount: 89,
  },
  {
    id: "3",
    name: "会议纪要模板",
    category: "纪要",
    version: "V1.0",
    status: "active",
    createdAt: "2024-09-10",
    usageCount: 234,
  },
  {
    id: "4",
    name: "采购申请表",
    category: "申请",
    version: "V1.2",
    status: "draft",
    createdAt: "2024-12-01",
    usageCount: 0,
  },
  {
    id: "5",
    name: "报销审批单",
    category: "申请",
    version: "V3.0",
    status: "active",
    createdAt: "2024-08-05",
    usageCount: 412,
  },
  {
    id: "6",
    name: "工作报告模板",
    category: "报告",
    version: "V2.1",
    status: "active",
    createdAt: "2024-11-25",
    usageCount: 67,
  },
];

const categories = ["全部", "公文", "合同", "纪要", "申请", "报告", "通知"];

const statusConfig = {
  active: { label: "启用中", className: "bg-success/10 text-success border-success/20" },
  draft: { label: "草稿", className: "bg-warning/10 text-warning border-warning/20" },
  archived: { label: "已归档", className: "bg-muted text-muted-foreground" },
};

export default function Templates() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesCategory = selectedCategory === "全部" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">模板管理</h1>
            <p className="text-muted-foreground">管理和创建文档模板，支持分类和版本控制</p>
          </div>
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="mr-2 h-4 w-4" />
            新建模板
          </Button>
        </div>

        {/* Filters */}
        <div className="animate-slide-up flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索模板名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <FolderOpen className="mr-2 h-4 w-4" />
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className={cn("rounded-r-none", viewMode === "grid" && "bg-muted")}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("rounded-l-none", viewMode === "list" && "bg-muted")}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Templates Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map((template, index) => {
              const status = statusConfig[template.status];
              return (
                <div
                  key={template.id}
                  className="animate-scale-in group rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Template Preview */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-gradient-to-br from-muted to-muted/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button size="sm" variant="secondary">
                        <Eye className="mr-1 h-3 w-3" />
                        预览
                      </Button>
                      <Button size="sm" className="bg-gradient-primary">
                        使用
                      </Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-card-foreground">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.category}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            复制
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{template.version}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        使用 {template.usageCount} 次
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="animate-slide-up rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    模板名称
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    分类
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    版本
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    状态
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    使用次数
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    创建时间
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTemplates.map((template) => {
                  const status = statusConfig[template.status];
                  return (
                    <tr key={template.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-card-foreground">{template.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{template.category}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{template.version}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{template.usageCount}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{template.createdAt}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                复制
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                删除
                              </DropdownMenuItem>
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
        )}
      </div>
    </AppLayout>
  );
}
