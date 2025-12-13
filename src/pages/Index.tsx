import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { FileCheck, FileClock, FileText, Users, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n";

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">{t.dashboard.welcome}</h1>
          <p className="text-muted-foreground">{t.dashboard.overview}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title={t.dashboard.pendingTasks}
            value={12}
            change={`${t.dashboard.comparedToYesterday} +3`}
            changeType="negative"
            icon={FileClock}
            iconColor="text-warning"
            delay={0}
          />
          <StatsCard
            title={t.dashboard.signedThisMonth}
            value={86}
            change={`${t.dashboard.comparedToLastMonth} +23%`}
            changeType="positive"
            icon={FileCheck}
            iconColor="text-success"
            delay={50}
          />
          <StatsCard
            title={t.dashboard.archivedDocs}
            value="1,234"
            change={t.dashboard.total}
            changeType="neutral"
            icon={FileText}
            iconColor="text-primary"
            delay={100}
          />
          <StatsCard
            title={t.dashboard.activeUsers}
            value={48}
            change={t.dashboard.onlineThisWeek}
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
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">{t.dashboard.weeklyOverview}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-success/20 p-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-sm font-medium">{t.dashboard.signingEfficiency}</span>
                </div>
                <span className="text-lg font-bold text-success">+18%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-info/20 p-2">
                    <FileCheck className="h-4 w-4 text-info" />
                  </div>
                  <span className="text-sm font-medium">{t.dashboard.completedDocs}</span>
                </div>
                <span className="text-lg font-bold text-card-foreground">24 {t.dashboard.docs}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-warning/20 p-2">
                    <Calendar className="h-4 w-4 text-warning" />
                  </div>
                  <span className="text-sm font-medium">{t.dashboard.avgTime}</span>
                </div>
                <span className="text-lg font-bold text-card-foreground">1.5 {t.dashboard.days}</span>
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
