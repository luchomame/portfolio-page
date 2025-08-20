// lib/projects.ts
export type Project = {
  title: string;
  blurb: string;
  image?: string;
  tags: string[];
  codeUrl?: string;
  reportUrl?: string;
  level: "grad" | "undergrad";
  year?: string;
};

export const projects: Project[] = [
  {
    title: "fastMRI: ROI-Weighted U-Net",
    blurb:
      "ROI-weighted loss improved knee MRI reconstruction quality (↑SSIM/PSNR, ↓NMSE) vs baseline U-Net.",
    tags: ["PyTorch", "Lightning", "Computer Vision"],
    codeUrl: "https://github.com/luchomame/fastmri-roi-unet",
    reportUrl: "#",
    image: "/fastmri.png",
    level: "grad",
    year: "2025",
  },
  {
    title: "Financial Risk Scoring (NDR)",
    blurb:
      "Token-focused risk feature + FinBERT; VIX(t+7) boosted 5-class movement classification on S&P 500 constituents.",
    tags: ["NLP", "FinBERT", "DuckDB", "XGBoost", "Time Series"],
    codeUrl: "https://github.com/luchomame/financial-risk-scoring-nlp",
    reportUrl: "#",
    image: "/projects/ndr-risk.png",
    level: "grad",
    year: "2025",
  },
  {
    title: "TRiBX Activity Finder",
    blurb:
      "Real-time events map with DBSCAN clustering and weather-aware suggestions.",
    tags: ["React", "Mapbox", "DBSCAN", "Haversine"],
    codeUrl: "https://github.com/luchomame/activity-finder-tribx",
    reportUrl: "#",
    image: "/tribx.png",
    level: "grad",
    year: "2024",
  },
  {
    title: "SEIR Flu Simulation",
    blurb:
      "Classroom spread simulation; vaccination scenarios via interactive widget.",
    tags: ["Python", "ODEs", "Modeling"],
    codeUrl: "https://github.com/luchomame/seir-flu-sim",
    reportUrl: "#",
    image: "/projects/seir.png",
    level: "grad",
    year: "2024",
  },

  // Undergrad Projects
  {
    title: "Machine Learning Sentiment Analysis Tool",
    blurb:
      "Ensemble sentiment classifier trained on movie reviews & Twitter data (Naïve Bayes, Linear Regression, Stochastic methods).",
    tags: ["Python", "NLP", "Naïve Bayes"],
    codeUrl: "https://github.com/luchomame/ml-sentiment-analysis",
    reportUrl: "#",
    image: "/sentiment-analysis-tool-undergrad.png",
    level: "undergrad",
    year: "2020",
  },
  {
    title: "Guardian Tweet",
    blurb:
      "Hackathon-winning app (Southern Hacks 2020) that flagged local disaster tweets, analyzed sentiment, and routed users to shelters.",
    tags: ["Python", "TextBlob", "Hackathon"],
    codeUrl: "https://github.com/luchomame/guardian-tweet",
    reportUrl: "#",
    image: "/hackathon.jpg",
    level: "undergrad",
    year: "2020",
  },
  {
    title: "X3D Repository",
    blurb:
      "3-tier platform for sharing Extensible 3D graphics with upload, rating, and collaboration features.",
    tags: ["Web", "3D Graphics", "X3D"],
    codeUrl: "https://github.com/luchomame/x3d-repository",
    reportUrl: "#",
    image: "/batman_x3d.png",
    level: "undergrad",
    year: "2021",
  },
  {
    title: "React Native Learning Project",
    blurb:
      "Converted older web apps into React Native format as a self-driven learning project.",
    tags: ["React Native", "JavaScript"],
    codeUrl: "https://github.com/luchomame/react-native-learning",
    reportUrl: "#",
    image: "/react-native-learning.jpg",
    level: "undergrad",
    year: "2021",
  },
];
