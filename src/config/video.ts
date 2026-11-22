export type DemoVideo = {
  type: "mp4" | "youtube";
  url: string;
  poster: string;
  captions?: string;
};

// An empty URL deliberately shows working alternatives instead of a play button.
export const leadflowDemoVideo: DemoVideo = {
  type: "mp4",
  url: "",
  poster: "/og-cover.png",
  captions: "",
};

export function youtubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const id = host === "youtu.be" ? parsed.pathname.slice(1)
      : ["youtube.com", "youtube-nocookie.com"].includes(host)
        ? parsed.searchParams.get("v") || parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
        : null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
