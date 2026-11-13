/** Discovery uses existing routes and curriculum notes; it never shortens a lesson to fit. */
export type GradeBand = "K–2" | "3–5" | "6–7";
export type GradeSelection = "ALL" | GradeBand;
export type Purpose = "all" | "discuss" | "investigate" | "design" | "act" | "reflect";
export type TimeChoice = "all" | "15" | "30" | "60" | "sequence";
export type DiscoveryRoute = { title: string; time: string; description: string; steps: number[]; print: string };
export type DiscoveryLesson = {
  id: string; title: string; question: string; image: string; tone: string;
  length: string; activity: string; materials: string; routes?: DiscoveryRoute[];
  steps: { title: string; time: string }[];
  printable: { href: string; bwHref: string; pages: number; pagePlan: string[] };
  teacher: { curriculum: string[]; adaptations: { band: GradeBand; fit: string; move: string }[] };
};
export const purposes: { value: Purpose; label: string }[] = [
  { value: "all", label: "Any learning purpose" },
  { value: "discuss", label: "Discuss & listen" },
  { value: "investigate", label: "Investigate evidence" },
  { value: "design", label: "Design & improve" },
  { value: "act", label: "Plan useful action" },
  { value: "reflect", label: "Reflect & follow up" },
];
export const times: { value: TimeChoice; label: string }[] = [
  { value: "all", label: "Any length" }, { value: "15", label: "Up to 15 minutes" },
  { value: "30", label: "Up to 30 minutes" }, { value: "60", label: "Up to 60 minutes" },
  { value: "sequence", label: "Several sessions / project" },
];
// Exact route titles keep matches meaningful: a short reflection is not the full design lesson.
export const routePurposes: Record<string, Purpose[]> = {
  "Belonging lesson": ["discuss", "design"], "Belonging check-back": ["reflect"],
  "Fair class decision": ["discuss", "design"], "Surrey equity lab": ["investigate", "discuss"],
  "Representation + student voice": ["investigate", "act"], "Source check + participation": ["investigate", "act"],
  "B.C. provincial party inquiry": ["investigate", "discuss"], "Voting is one piece": ["discuss", "act"],
  "AI power + accountability": ["investigate", "discuss"], "After the election": ["reflect", "act"],
  "Core learning pathway": ["investigate", "discuss"], "Governance extension": ["investigate", "discuss"],
  "Knowledge + AI consent extension": ["investigate", "discuss"],
  "Rights Repair lesson": ["discuss", "design"], "Rights check-back": ["reflect"],
  "AI privacy extension": ["investigate", "discuss"], "Access Makeover lesson": ["design"],
  "AI access extension": ["design", "investigate"], "Wayfinding design lesson": ["design"],
  "AI translation extension": ["investigate", "discuss"], "Access planning lesson": ["design"],
  "AI + environment extension": ["investigate", "discuss"], "Planning launch": ["investigate", "act"],
  "Approved action + follow-up": ["act", "reflect"],
};
const wholeLessonPurposes: Record<string, Purpose[]> = {
  "responding-to-racism": ["discuss", "act"], "animal-welfare": ["investigate", "act", "reflect"],
};
const fitOrder: Record<string, number> = { "Core lesson": 0, "Teacher-led + core": 1, "Core + extension": 2, "Teacher-led": 3, Extension: 4 };
export function routesFor(lesson: DiscoveryLesson): DiscoveryRoute[] {
  return lesson.routes?.length ? lesson.routes : [{ title: "Full learning pathway", time: lesson.length,
    description: lesson.activity, steps: lesson.steps.map((_, i) => i), print: lesson.printable.pagePlan.join(" ") }];
}
export function timeFits(label: string, choice: TimeChoice): boolean {
  if (choice === "all") return true;
  const sequence = /blocks?|sessions?|lessons?|project|[×x]/i.test(label);
  if (choice === "sequence") return sequence;
  if (sequence) return false;
  const match = label.trim().match(/^(\d+)(?:\s*[–—-]\s*(\d+))?\s*(?:min|minutes)$/i);
  return !!match && Number(match[2] ?? match[1]) <= Number(choice);
}
export function routeContext(route: DiscoveryRoute): string | null {
  if (/check-back/i.test(route.title)) return "Revisit work already started";
  if (/extension/i.test(route.title)) return "Build on earlier learning";
  if (/^Approved action/i.test(route.title)) return "Use after project approval";
  if (/After the election/i.test(route.title)) return "Choose a current promise or issue first";
  return null;
}
export function subjectsFor(lesson: DiscoveryLesson): string[] {
  return lesson.teacher.curriculum.filter(value => value.includes(":"))
    .map(value => value.split(":")[0].trim());
}
export function discoverLessons<T extends DiscoveryLesson>(lessons: T[], filters: {
  grade: GradeSelection; time: TimeChoice; purpose: Purpose; subject: string;
}): { lesson: T; routes: DiscoveryRoute[] }[] {
  return lessons.map(lesson => ({ lesson, routes: routesFor(lesson).filter(route =>
    timeFits(route.time, filters.time) && (filters.purpose === "all" ||
      (lesson.routes?.length ? routePurposes[route.title] : wholeLessonPurposes[lesson.id])?.includes(filters.purpose))) }))
    .filter(({ lesson, routes }) => routes.length > 0 && (filters.subject === "all" || subjectsFor(lesson).includes(filters.subject)))
    .sort((a, b) => filters.grade === "ALL" ? 0 :
      (fitOrder[a.lesson.teacher.adaptations.find(v => v.band === filters.grade)?.fit ?? "Extension"] ?? 4) -
      (fitOrder[b.lesson.teacher.adaptations.find(v => v.band === filters.grade)?.fit ?? "Extension"] ?? 4));
}
