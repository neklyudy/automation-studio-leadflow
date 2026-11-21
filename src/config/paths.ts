export const basePath = import.meta.env.BASE_URL;

/** Keep links and assets inside the project when hosted under /repository/. */
export function localUrl(path: string) {
  if (import.meta.env.VITE_GITHUB_PAGES === "true") {
    path = path.replace(/^\/projects\/leadflow(?=#|$)/, "/projects/leadflow/");
  }
  return path.startsWith("/") && !path.startsWith("//")
    ? basePath + path.slice(1)
    : path;
}

export function appPath(path: string) {
  const prefix = basePath.replace(/\/$/, "");
  return prefix && (path === prefix || path.startsWith(prefix + "/"))
    ? path.slice(prefix.length) || "/"
    : path;
}
