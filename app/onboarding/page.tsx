// file: app/onboarding/page.tsx
// --- Dependency Installation ---
//
// 1. External Libraries:
// npm install react-hook-form@7.52.1 zod@3.23.8 @hookform/resolvers@3.9.0 sonner@1.5.0 lucide-react@0.412.0 date-fns@3.6.0 framer-motion@11.3.8
//
// 2. ShadCN UI Components (run this command in your project root):
// npx shadcn@latest add form input textarea button card command popover label badge sheet table skeleton sonner progress
//
// 3. Toaster (add this to your root layout.tsx):
// import { Toaster } from "@/components/ui/sonner";
// ...
// <body>
//   <main>{children}</main>
//   <Toaster richColors />
// </body>

import { CloudOnboardingForm } from "@/components/cloud-onboarding-form";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col items-center justify-center p-4">
      <CloudOnboardingForm />
    </div>
  );
}
