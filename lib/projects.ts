export type Project = {
  title: string;
  blurb: string;
  image?: string;
  tags: string[];
  codeUrl?: string;
  reportUrl?: string;
};

export const projects: Project[] = [
  {
    title: "fastMRI: ROI-Weighted U-Net",
    blurb: "ROI-weighted loss improved knee MRI reconstruction quality (↑SSIM/PSNR, ↓NMSE) vs baseline U-Net.",
    tags: ["PyTorch", "Lightning", "Computer Vision"],
    codeUrl: "https://github.com/luchomame/fastmri-roi-unet",
    reportUrl: "#"
  },
  {
    title: "Financial Risk Scoring (NDR)",
    blurb: "Token-focused risk feature + FinBERT; VIX(t+7) boosted 5-class movement classification on S&P500 constituents.",
    tags: ["NLP", "FinBERT", "DuckDB", "XGBoost", "Time Series"],
    codeUrl: "https://github.com/luchomame/financial-risk-scoring-nlp",
    reportUrl: "#"
  },
  {
    title: "TRiBX Activity Finder",
    blurb: "Real-time events map with DBSCAN clustering and weather-aware suggestions.",
    tags: ["React", "Mapbox", "DBSCAN", "Haversine"],
    codeUrl: "https://github.com/luchomame/activity-finder-tribx",
    reportUrl: "#"
  },
  {
    title: "SEIR Flu Simulation",
    blurb: "Classroom spread simulation; vaccination scenarios via interactive widget.",
    tags: ["Python", "ODEs", "Modeling"],
    codeUrl: "https://github.com/luchomame/seir-flu-sim",
    reportUrl: "#"
  },
];
