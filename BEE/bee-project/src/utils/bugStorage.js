const BUG_STORAGE_KEY = "gs_bug_reports";

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function loadBugReports() {
  return safeParse(localStorage.getItem(BUG_STORAGE_KEY) || "[]", []);
}

export function saveBugReports(reports) {
  localStorage.setItem(BUG_STORAGE_KEY, JSON.stringify(reports));
}

export function addBugReport({ email, title, details }) {
  const reports = loadBugReports();
  reports.unshift({
    id: `bug_${Date.now()}`,
    email,
    title,
    details,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  saveBugReports(reports);
  return reports;
}

export function resolveBugReport(id) {
  const reports = loadBugReports();
  const index = reports.findIndex((item) => item.id === id);
  if (index !== -1) {
    reports[index].status = "resolved";
    reports[index].updatedAt = new Date().toISOString();
    saveBugReports(reports);
  }
  return reports;
}

export function deleteBugReport(id) {
  const reports = loadBugReports().filter((item) => item.id !== id);
  saveBugReports(reports);
  return reports;
}
