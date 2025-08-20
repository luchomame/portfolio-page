// app/sitemap.ts
export default function sitemap() {
  const base = "https://your-domain.com";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/experience`, lastModified: new Date() },
    { url: `${base}/education`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
