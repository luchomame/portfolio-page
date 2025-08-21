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
  imageFit?: "cover" | "contain"; // default: "cover"
  imageAspect?: "video" | "square" | "golden"; // default:
};

export const projects: Project[] = [
  {
    title: "fastMRI: ROI-Weighted U-Net",
    blurb:
      "ROI-weighted loss improved knee MRI reconstruction quality (↑SSIM/PSNR, ↓NMSE) vs baseline U-Net.",
    tags: ["PyTorch", "Lightning", "Computer Vision"],
    codeUrl: "https://github.com/luchomame/fastmri-cold-diffusion",
    reportUrl: "/papers/fastmri.pdf",
    image: "/projects/fastMRI.png",
    level: "grad",
    year: "2025",
  },
  {
    title: "Financial Risk Scoring",
    blurb:
      "Token-focused risk feature + FinBERT; VIX(t+7) boosted 5-class movement classification on S&P 500 constituents.",
    tags: ["NLP", "FinBERT", "DuckDB", "XGBoost", "Time Series"],
    codeUrl: "https://github.com/luchomame/financial-risk-scoring-nlp",
    reportUrl: "/papers/financial-risk-scoring-nlp.pdf",
    image: "/projects/practicum.png",
    level: "grad",
    year: "2025",
    imageFit: "cover",
  },
  {
    title: "TRiBX Activity Finder",
    blurb:
      "Real-time events map with DBSCAN clustering and weather-aware suggestions.",
    tags: ["React", "Mapbox", "DBSCAN", "Haversine"],
    codeUrl: "https://github.com/luchomame/activity-finder-tribx",
    reportUrl: "/papers/tribx.pdf",
    image: "/projects/tribx.png",
    level: "grad",
    year: "2024",
  },
  {
    title: "SEIR Flu Simulation",
    blurb:
      "Classroom spread simulation; vaccination scenarios via interactive widget.",
    tags: ["Python", "ODEs", "Modeling"],
    codeUrl: "https://github.com/luchomame/seir-flu-sim",
    reportUrl: "/papers/seir.pdf",
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
    image: "/projects/sentiment-analysis-tool-undergrad.png",
    level: "undergrad",
    year: "2020",
    codeUrl: "https://github.com/luchomame/SentimentAnalysisFinal",
  },
  {
    title: "Guardian Tweet",
    blurb:
      "Hackathon-winning app (Southern Hacks 2020) that flagged local disaster tweets, analyzed sentiment, and routed users to shelters.",
    tags: ["Python", "TextBlob", "Hackathon"],
    image: "/projects/hackathon.jpg",
    level: "undergrad",
    year: "2020",
    codeUrl: "https://github.com/luchomame/Guardian-Tweet",
  },
  {
    title: "X3D Repository",
    blurb:
      "3-tier platform for sharing Extensible 3D graphics with upload, rating, and collaboration features.",
    tags: ["Web", "3D Graphics", "X3D"],
    image: "/projects/batman_x3d.png",
    level: "undergrad",
    year: "2021",
    codeUrl: "https://github.com/luchomame/X3D_Repo",
  },
  {
    title: "React Native Learning Project",
    blurb:
      "Converted older web apps into React Native format as a self-driven learning project.",
    tags: ["React Native", "JavaScript"],
    image: "/projects/react-native-learning.jpg",
    level: "undergrad",
    year: "2021",
  },
];
