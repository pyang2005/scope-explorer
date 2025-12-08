import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { FileCheck, FileClock, FileText, Users, TrendingUp, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">欢迎回来，管理员</h1>
          <p className="text-muted-foreground">这是您的文档签署工作台概览</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="待处理任务"
            value={12}
            change="较昨日 +3"
            changeType="negative"
            icon={FileClock}
            iconColor="text-warning"
            delay={0}
          />
          <StatsCard
            title="本月已签署"
            value={86}
            change="较上月 +23%"
            changeType="positive"
            icon={FileCheck}
            iconColor="text-success"
            delay={50}
          />
          <StatsCard
            title="归档文档"
            value="1,234"
            change="总计"
            changeType="neutral"
            icon={FileText}
            iconColor="text-primary"
            delay={100}
          />
          <StatsCard
            title="活跃用户"
            value={48}
            change="本周在线"
            changeType="neutral"
            icon={Users}
            iconColor="text-info"
            delay={150}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Task List - 2 columns */}
          <div className="lg:col-span-2">
            <TaskList />
          </div>

          {/* Activity Summary */}
          <div className="animate-slide-up rounded-xl border border-border bg-card p-4 shadow-md" style={{ animationDelay: "250ms" }}>
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">本周概览</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-success/20 p-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-sm font-medium">签署效率</span>
                </div>
                <span className="text-lg font-bold text-success">+18%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-info/20 p-2">
                    <FileCheck className="h-4 w-4 text-info" />
                  </div>
                  <span className="text-sm font-medium">完成文档</span>
                </div>
                <span className="text-lg font-bold text-card-foreground">24 份</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-warning/20 p-2">
                    <Calendar className="h-4 w-4 text-warning" />
                  </div>
                  <span className="text-sm font-medium">平均用时</span>
                </div>
                <span className="text-lg font-bold text-card-foreground">1.5 天</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <RecentDocuments />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
