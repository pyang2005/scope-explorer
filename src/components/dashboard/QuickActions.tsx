import { FilePlus, FileText, Upload, QrCode, Search, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n";

export function QuickActions() {
  const { t } = useLanguage();

  const quickActions = [
    {
      icon: FilePlus,
      label: t.quickActions.newDocument,
      description: t.quickActions.newDocumentDesc,
      href: "/draft",
      gradient: "from-primary to-primary/70",
    },
    {
      icon: Upload,
      label: t.quickActions.uploadFile,
      description: t.quickActions.uploadFileDesc,
      href: "/draft?mode=upload",
      gradient: "from-info to-info/70",
    },
    {
      icon: PenTool,
      label: t.quickActions.quickSign,
      description: t.quickActions.quickSignDesc,
      href: "/signing",
      gradient: "from-accent to-accent/70",
    },
    {
      icon: QrCode,
      label: t.quickActions.verifyDoc,
      description: t.quickActions.verifyDocDesc,
      href: "/verify",
      gradient: "from-success to-success/70",
    },
    {
      icon: Search,
      label: t.quickActions.searchDocs,
      description: t.quickActions.searchDocsDesc,
      href: "/archive",
      gradient: "from-warning to-warning/70",
    },
    {
      icon: FileText,
      label: t.quickActions.templateCenter,
      description: t.quickActions.templateCenterDesc,
      href: "/templates",
      gradient: "from-destructive to-destructive/70",
    },
  ];

  return (
    <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
      <h2 className="mb-4 text-lg font-semibold text-foreground">{t.quickActions.title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {quickActions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: `${(index + 2) * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110",
                action.gradient
              )}
            >
              <action.icon className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="font-medium text-card-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
