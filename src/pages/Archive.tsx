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
  Search,
  FileText,
  MoreVertical,
  Eye,
  Download,
  QrCode,
  Calendar,
  Building2,
  Filter,
  SlidersHorizontal,
  CheckCircle,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchivedDocument {
  id: string;
  title: string;
  docNumber: string;
  type: string;
  department: string;
  archiveDate: string;
  signers: string[];
  verified: boolean;
  hash: string;
}

const mockDocuments: ArchivedDocument[] = [
  {
    id: "1",
    title: "2024年度工作总结报告",
    docNumber: "DOC-2024-001234",
    type: "报告",
    department: "行政部",
    archiveDate: "2024-12-01",
    signers: ["张三", "李四", "王五"],
    verified: true,
    hash: "a1b2c3d4e5f6...",
  },
  {
    id: "2",
    title: "战略合作框架协议",
    docNumber: "DOC-2024-001235",
    type: "合同",
    department: "商务部",
    archiveDate: "2024-11-28",
    signers: ["张三", "外部签署方"],
    verified: true,
    hash: "f6e5d4c3b2a1...",
  },
  {
    id: "3",
    title: "设备采购审批单",
    docNumber: "DOC-2024-001236",
    type: "申请",
    department: "采购部",
    archiveDate: "2024-11-25",
    signers: ["李四", "财务总监", "总经理"],
    verified: true,
    hash: "1a2b3c4d5e6f...",
  },
  {
    id: "4",
    title: "Q3季度财务报表",
    docNumber: "DOC-2024-001237",
    type: "报告",
    department: "财务部",
    archiveDate: "2024-11-20",
    signers: ["财务经理", "审计员"],
    verified: true,
    hash: "9z8y7x6w5v4u...",
  },
  {
    id: "5",
    title: "员工培训计划",
    docNumber: "DOC-2024-001238",
    type: "计划",
    department: "人力资源部",
    archiveDate: "2024-11-15",
    signers: ["HR总监", "培训经理"],
    verified: true,
    hash: "m3n4o5p6q7r8...",
  },
];

const departments = ["全部部门", "行政部", "商务部", "采购部", "财务部", "人力资源部"];
const years = ["2024", "2023", "2022", "2021"];
const types = ["全部类型", "报告", "合同", "申请", "计划", "通知"];

export default function Archive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("全部部门");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedType, setSelectedType] = useState("全部类型");

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.docNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "全部部门" || doc.department === selectedDepartment;
    const matchesType = selectedType === "全部类型" || doc.type === selectedType;
    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">归档检索</h1>
          <p className="text-muted-foreground">搜索、查看和验证已归档的文档</p>
        </div>

        {/* Search and Filters */}
        <div className="animate-slide-up space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Main Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索文档标题、编号、内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 text-lg"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">筛选:</span>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}年
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[150px]">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="ml-auto">
              高级搜索
            </Button>
          </div>
        </div>

        {/* Results Stats */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            找到 <span className="font-semibold text-foreground">{filteredDocuments.length}</span>{" "}
            份文档
          </p>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            批量导出
          </Button>
        </div>

        {/* Document List */}
        <div className="space-y-4">
          {filteredDocuments.map((doc, index) => (
            <div
              key={doc.id}
              className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Document Info */}
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-card-foreground">{doc.title}</h3>
                      {doc.verified && (
                        <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5">
                          <Shield className="h-3 w-3 text-success" />
                          <span className="text-xs font-medium text-success">已验证</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-mono text-xs">{doc.docNumber}</span>
                      <Badge variant="outline">{doc.type}</Badge>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {doc.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        归档于 {doc.archiveDate}
                      </span>
                    </div>
                    {/* Signers */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">签署人:</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.signers.map((signer, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {signer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {/* Hash */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">SHA-256:</span>
                      <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                        {doc.hash}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    预览
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    下载
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <QrCode className="h-4 w-4" />
                    验证
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看签署记录</DropdownMenuItem>
                      <DropdownMenuItem>下载带水印版本</DropdownMenuItem>
                      <DropdownMenuItem>查看审计日志</DropdownMenuItem>
                      <DropdownMenuItem>分享文档</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
              <Search className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">未找到匹配的文档</p>
              <p className="text-sm text-muted-foreground">请尝试调整搜索条件</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
