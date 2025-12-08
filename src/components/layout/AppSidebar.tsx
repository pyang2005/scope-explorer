import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  PenTool,
  Archive,
  Settings,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Search,
  BarChart3,
} from "lucide-react";

const mainNavItems = [
  {
    title: "仪表盘",
    titleEn: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "模板管理",
    titleEn: "Templates",
    href: "/templates",
    icon: FileText,
  },
  {
    title: "文档起草",
    titleEn: "Draft",
    href: "/draft",
    icon: FilePlus,
  },
  {
    title: "签署中心",
    titleEn: "Sign",
    href: "/signing",
    icon: PenTool,
  },
  {
    title: "归档检索",
    titleEn: "Archive",
    href: "/archive",
    icon: Archive,
  },
  {
    title: "报表分析",
    titleEn: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

const adminNavItems = [
  {
    title: "用户管理",
    titleEn: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "权限设置",
    titleEn: "Permissions",
    href: "/admin/permissions",
    icon: Shield,
  },
  {
    title: "系统设置",
    titleEn: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-accent-glow">
            <FileCheck className="h-5 w-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-sidebar-foreground">EasySign</h1>
              <p className="text-xs text-sidebar-foreground/60">文档签署系统</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="mb-2">
          {!collapsed && (
            <span className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
              主要功能
            </span>
          )}
        </div>
        {mainNavItems.map((item, index) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )
            }
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <item.icon className={cn("h-5 w-5 shrink-0", location.pathname === item.href && "text-accent")} />
            {!collapsed && <span className="animate-fade-in">{item.title}</span>}
            {collapsed && (
              <span className="absolute left-full ml-2 hidden rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                {item.title}
              </span>
            )}
          </NavLink>
        ))}

        <div className="my-4 border-t border-sidebar-border" />

        <div className="mb-2">
          {!collapsed && (
            <span className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
              系统管理
            </span>
          )}
        </div>
        {adminNavItems.map((item, index) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )
            }
          >
            <item.icon className={cn("h-5 w-5 shrink-0", location.pathname === item.href && "text-accent")} />
            {!collapsed && <span className="animate-fade-in">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}
