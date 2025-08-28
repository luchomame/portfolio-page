// file: lib/types.ts
// Shared types for the application

export interface AsmsEntry {
  id: string;
  name: string;
  innovationOwner: string;
  opsOwner: string;
  budgetApprover: string;
}

export interface OnboardingRequest {
  id: string;
  asmsName: string;
  innovationOwner: string;
  opsOwner: string;
  budgetApprover: string;
  justification: string;
  status: "Approved" | "Pending" | "Rejected";
  submittedDate: Date;
}
