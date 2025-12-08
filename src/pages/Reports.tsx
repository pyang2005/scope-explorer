import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  FileCheck,
  Clock,
  Users,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: "7月", dispatched: 45, signed: 42 },
  { month: "8月", dispatched: 52, signed: 48 },
  { month: "9月", dispatched: 61, signed: 58 },
  { month: "10月", dispatched: 55, signed: 52 },
  { month: "11月", dispatched: 72, signed: 68 },
  { month: "12月", dispatched: 86, signed: 78 },
];

const departmentData = [
  { name: "行政部", value: 35, color: "hsl(217, 91%, 40%)" },
  { name: "财务部", value: 28, color: "hsl(38, 92%, 50%)" },
  { name: "人力资源部", value: 22, color: "hsl(142, 76%, 36%)" },
  { name: "技术部", value: 18, color: "hsl(199, 89%, 48%)" },
  { name: "其他", value: 12, color: "hsl(215, 16%, 47%)" },
];

const turnaroundData = [
  { day: "周一", avgHours: 12 },
  { day: "周二", avgHours: 8 },
  { day: "周三", avgHours: 15 },
  { day: "周四", avgHours: 10 },
  { day: "周五", avgHours: 6 },
  { day: "周六", avgHours: 4 },
  { day: "周日", avgHours: 3 },
];

const topSigners = [
  { name: "张三", completed: 45, pending: 3 },
  { name: "李四", completed: 38, pending: 5 },
  { name: "王五", completed: 32, pending: 2 },
  { name: "赵六", completed: 28, pending: 8 },
  { name: "钱七", completed: 25, pending: 4 },
];

export default function Reports() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">报表分析</h1>
            <p className="text-muted-foreground">查看签署统计和效率分析报告</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="2024-12">
              <SelectTrigger className="w-[150px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-12">2024年12月</SelectItem>
                <SelectItem value="2024-11">2024年11月</SelectItem>
                <SelectItem value="2024-10">2024年10月</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              导出报表
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-primary/10 p-3">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <Badge className="gap-1 bg-success/10 text-success">
                <ArrowUpRight className="h-3 w-3" />
                +12%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">本月签署完成</p>
              <p className="text-3xl font-bold text-card-foreground">86</p>
            </div>
          </div>

          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-warning/10 p-3">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <Badge className="gap-1 bg-success/10 text-success">
                <ArrowDownRight className="h-3 w-3" />
                -18%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">平均签署时长</p>
              <p className="text-3xl font-bold text-card-foreground">1.2 天</p>
            </div>
          </div>

          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-success/10 p-3">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <Badge className="gap-1 bg-success/10 text-success">
                <ArrowUpRight className="h-3 w-3" />
                +5%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">签署完成率</p>
              <p className="text-3xl font-bold text-card-foreground">94.2%</p>
            </div>
          </div>

          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-info/10 p-3">
                <Users className="h-6 w-6 text-info" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">活跃签署人</p>
              <p className="text-3xl font-bold text-card-foreground">48</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Trend */}
          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "200ms" }}>
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">月度发文趋势</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="dispatched" name="发文数" fill="hsl(217, 91%, 40%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="signed" name="签署完成" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "250ms" }}>
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">部门发文分布</h2>
            <div className="flex items-center gap-8">
              <div className="h-[250px] w-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {departmentData.map((dept, index) => (
                  <div key={dept.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                      <span className="text-sm text-card-foreground">{dept.name}</span>
                    </div>
                    <span className="font-medium text-card-foreground">{dept.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Turnaround Time */}
          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-2" style={{ animationDelay: "300ms" }}>
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">签署周转时间分析</h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnaroundData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" unit="h" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value} 小时`, "平均用时"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgHours"
                    stroke="hsl(38, 92%, 50%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(38, 92%, 50%)", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Signers */}
          <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "350ms" }}>
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">签署人排行</h2>
            <div className="space-y-4">
              {topSigners.map((signer, index) => (
                <div key={signer.name} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                      index === 0 && "bg-accent text-accent-foreground",
                      index === 1 && "bg-muted-foreground/20 text-muted-foreground",
                      index === 2 && "bg-warning/20 text-warning",
                      index > 2 && "bg-muted text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">{signer.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-success">完成 {signer.completed}</span>
                      <span>•</span>
                      <span className="text-warning">待处理 {signer.pending}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-card-foreground">{signer.completed}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
