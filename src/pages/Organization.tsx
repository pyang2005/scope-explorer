import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  HelpCircle,
  Pencil,
  ChevronRight,
  ChevronDown,
  Building2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n";

interface OrgNode {
  id: string;
  name: string;
  members: number;
  positions: number;
  manager?: string;
  managerExtra?: string;
  children?: OrgNode[];
}

interface Employee {
  id: string;
  name: string;
  empNo: string;
  posNo?: string;
  type: "contractor" | "formal" | "intern";
  position: string;
  status: "onDuty" | "leave";
  flag?: string;
}

const orgTree: OrgNode[] = [
  {
    id: "aos",
    name: "Anton Oil Service DMCC(AOS) IFMS",
    members: 12,
    positions: 12,
    manager: "Yu Wang",
    children: [
      {
        id: "hr",
        name: "Human Resources",
        members: 1,
        positions: 3,
        manager: "Kui Li",
      },
      {
        id: "it",
        name: "Information Technology",
        members: 10,
        positions: 8,
        manager: "Ammar Albu-Salih",
        managerExtra: "+2",
      },
    ],
  },
];

const employees: Employee[] = [
  { id: "1", name: "Sheng Yang Yu", empNo: "#10000", posNo: "MJN-544", type: "contractor", position: "—", status: "onDuty" },
  { id: "2", name: "Kais Al-Aasam", empNo: "#17860 IT Business Manager", type: "formal", position: "IT Business Manager", status: "onDuty", flag: "🇦🇪" },
  { id: "3", name: "Haider Molan", empNo: "#31586 IT Site Assurance Manager", type: "formal", position: "IT Site Assurance Manager", status: "onDuty", flag: "🇦🇪" },
  { id: "4", name: "Ammar Albu-Salih", empNo: "#22045 Deputy IT Manager", type: "formal", position: "Deputy IT Manager", status: "onDuty", flag: "🇮🇶" },
  { id: "5", name: "Yu Wang", empNo: "#10245 General Manager", type: "formal", position: "General Manager", status: "onDuty", flag: "🇨🇳" },
  { id: "6", name: "Kui Li", empNo: "#11003 HR Manager", type: "formal", position: "HR Manager", status: "onDuty", flag: "🇨🇳" },
  { id: "7", name: "Mohammed Saeed", empNo: "#33210 IT Engineer", type: "formal", position: "IT Engineer", status: "onDuty", flag: "🇮🇶" },
  { id: "8", name: "Ali Hassan", empNo: "#33455 IT Engineer", type: "formal", position: "IT Engineer", status: "onDuty", flag: "🇮🇶" },
  { id: "9", name: "Wei Chen", empNo: "#10876 Software Engineer", type: "formal", position: "Software Engineer", status: "onDuty", flag: "🇨🇳" },
  { id: "10", name: "Lina Zhao", empNo: "#10987 HR Specialist", type: "intern", position: "HR Specialist", status: "onDuty", flag: "🇨🇳" },
  { id: "11", name: "Omar Faisal", empNo: "#34110 Network Engineer", type: "formal", position: "Network Engineer", status: "onDuty", flag: "🇦🇪" },
  { id: "12", name: "Karim Nabil", empNo: "#34221 Field Technician", type: "contractor", position: "Field Technician", status: "leave", flag: "🇦🇪" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TreeNode({
  node,
  selectedId,
  onSelect,
  depth = 0,
}: {
  node: OrgNode;
  selectedId: string;
  onSelect: (id: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = !!node.children?.length;
  const isSelected = selectedId === node.id;

  return (
    <div>
      <div
        className={cn(
          "group flex items-start gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50",
          isSelected && "bg-primary/5"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <button
          onClick={() => hasChildren && setExpanded(!expanded)}
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground"
        >
          {hasChildren ? (
            expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          )}
        </button>
        <div className="flex-1 cursor-pointer" onClick={() => onSelect(node.id)}>
          <div className="text-sm font-medium text-foreground">{node.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {node.members} 人 · {node.positions} 个岗位
          </div>
          {node.manager && (
            <div className="text-xs text-muted-foreground">
              经理 {node.manager} {node.managerExtra}
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </div>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const avatarPalette = [
  "bg-primary/10 text-primary",
  "bg-accent/20 text-accent-foreground",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-secondary text-secondary-foreground",
];

export default function Organization() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState("aos");
  const [search, setSearch] = useState("");

  const typeLabel: Record<Employee["type"], string> = {
    contractor: t.organization.contractor,
    formal: t.organization.formal,
    intern: t.organization.intern,
  };
  const typeClass: Record<Employee["type"], string> = {
    contractor: "bg-accent/20 text-accent-foreground border-accent/30",
    formal: "bg-primary/10 text-primary border-primary/20",
    intern: "bg-warning/10 text-warning border-warning/20",
  };

  const filtered = employees.filter(
    (e) =>
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.empNo.toLowerCase().includes(search.toLowerCase()) ||
      (e.posNo || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.organization.title}</h1>
            <p className="text-muted-foreground">{t.organization.subtitle}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Org tree */}
          <div className="animate-slide-up rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Building2 className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">{t.organization.treeTitle}</h2>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="px-4 py-3">
              <div className="text-xs text-muted-foreground">{t.organization.defaultScope}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{t.organization.allMembers}</div>
              <p className="mt-1 text-xs text-muted-foreground">{t.organization.treeHint}</p>
            </div>
            <div className="px-2 pb-4">
              {orgTree.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="animate-slide-up space-y-4">
            <div className="flex items-start justify-between rounded-xl border border-border bg-card p-5 shadow-sm">
              <div>
                <div className="text-xs text-muted-foreground">{t.organization.currentScope}</div>
                <h2 className="mt-1 text-xl font-bold text-foreground">{t.organization.allMembers}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.organization.scopeHint}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-muted-foreground">{t.organization.operations}</span>
                <div className="flex items-center gap-2">
                  <Button className="bg-gradient-primary shadow-glow">
                    <Plus className="mr-1.5 h-4 w-4" />
                    {t.organization.addOrg}
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder={t.organization.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setSearch("")}>
                {t.organization.reset}
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="employees" className="rounded-xl border border-border bg-card shadow-sm">
              <TabsList className="m-4 mb-0 bg-transparent p-0">
                <TabsTrigger
                  value="employees"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  {t.organization.employees} ({employees.length})
                </TabsTrigger>
                <TabsTrigger
                  value="positions"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  {t.organization.positions} ({employees.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employees" className="m-0 border-t border-border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30 text-sm text-muted-foreground">
                      <th className="px-5 py-3 text-left font-medium">{t.organization.employee}</th>
                      <th className="px-5 py-3 text-left font-medium">{t.organization.employmentType}</th>
                      <th className="px-5 py-3 text-left font-medium">{t.organization.position}</th>
                      <th className="px-5 py-3 text-right font-medium">{t.organization.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((emp, i) => (
                      <tr key={emp.id} className="transition-colors hover:bg-muted/30">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                                avatarPalette[i % avatarPalette.length]
                              )}
                            >
                              {getInitials(emp.name)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                {emp.name}
                                {emp.flag && <span className="text-xs">{emp.flag}</span>}
                              </div>
                              <div className="text-xs text-muted-foreground">{emp.empNo}</div>
                              {emp.posNo && (
                                <div className="text-xs text-muted-foreground">{emp.posNo}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <Badge variant="outline" className={typeClass[emp.type]}>
                            {typeLabel[emp.type]}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-sm text-foreground">{emp.position}</td>
                        <td className="px-5 py-3 text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              emp.status === "onDuty"
                                ? "bg-success/10 text-success border-success/20"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {emp.status === "onDuty" ? t.organization.onDuty : t.organization.leave}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>

              <TabsContent value="positions" className="m-0 border-t border-border p-8 text-center text-sm text-muted-foreground">
                {t.common.noData}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}