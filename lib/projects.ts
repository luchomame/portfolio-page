// lib/projects.ts
export type Project = {
  title: string;
  blurb: string;
  image?: string; // e.g. "/projects/fastmri.png"
  tags: string[];
  codeUrl?: string;
  reportUrl?: string;
  level: "grad" | "undergrad";
  year?: string; // optional; e.g. "2024"
};

export const projects: Project[] = [
  {
    title: "fastMRI: ROI-Weighted U-Net",
    blurb:
      "ROI-weighted loss improved knee MRI reconstruction quality (↑SSIM/PSNR, ↓NMSE) vs baseline U-Net.",
    tags: ["PyTorch", "Lightning", "Computer Vision"],
    codeUrl: "https://github.com/luchomame/fastmri-roi-unet",
    reportUrl: "#",
    image: "/projects/fastmri.png", // optional placeholder
    level: "grad",
    year: "2024",
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
    year: "2024",
  },
  {
    title: "TRiBX Activity Finder",
    blurb:
      "Real-time events map with DBSCAN clustering and weather-aware suggestions.",
    tags: ["React", "Mapbox", "DBSCAN", "Haversine"],
    codeUrl: "https://github.com/luchomame/activity-finder-tribx",
    reportUrl: "#",
    image: "/projects/tribx.png",
    level: "grad",
    year: "2023",
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
    year: "2023",
  },
  // Undergrad Projects
  {
    title: "Machine Learning Sentiment Analysis Tool",
    blurb:
      "Ensemble sentiment classifier trained on movie reviews & Twitter data (Naïve Bayes, Linear Regression, Stochastic methods).",
    tags: ["Python", "NLP", "Naïve Bayes"],
    codeUrl: "https://github.com/luchomame/ml-sentiment-analysis", // placeholder
    reportUrl: "#",
    image: "/projects/ml-sentiment.png", // add later
    level: "undergrad",
    year: "2020",
  },
  {
    title: "Guardian Tweet",
    blurb:
      "Hackathon-winning app (Southern Hacks 2020) that flagged local disaster tweets, analyzed sentiment, and routed users to shelters.",
    tags: ["Python", "TextBlob", "Hackathon"],
    codeUrl: "https://github.com/luchomame/guardian-tweet", // placeholder
    reportUrl: "#",
    image: "/projects/guardian-tweet.png",
    level: "undergrad",
    year: "2020",
  },
  {
    title: "X3D Repository",
    blurb:
      "3-tier platform for sharing Extensible 3D graphics with upload, rating, and collaboration features.",
    tags: ["Web", "3D Graphics", "X3D"],
    codeUrl: "https://github.com/luchomame/x3d-repository", // placeholder
    reportUrl: "#",
    image: "/projects/x3d-repository.png",
    level: "undergrad",
    year: "2021",
  },
  {
    title: "React Native Learning Project",
    blurb:
      "Converted older web apps into React Native format as a self-driven learning project.",
    tags: ["React Native", "JavaScript"],
    codeUrl: "https://github.com/luchomame/react-native-learning", // placeholder
    reportUrl: "#",
    image: "/projects/react-native-learning.png",
    level: "undergrad",
    year: "2021",
  },
];
