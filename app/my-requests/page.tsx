// file: app/my-requests/page.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CheckCircle, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OnboardingRequest } from "@/lib/types-old";
import { Skeleton } from "@/components/ui/skeleton";

// --- Mock Data ---
// TODO: Fetch this data from your database
const mockRequests: OnboardingRequest[] = [
  {
    id: "req_1",
    asmsName: "Project Phoenix",
    innovationOwner: "Alice Johnson",
    opsOwner: "Bob Williams",
    budgetApprover: "Charlie Brown",
    justification:
      "This project is a critical rebuild of our legacy customer portal. It requires a modern, scalable cloud infrastructure to support microservices architecture and CI/CD pipelines for faster feature delivery and improved reliability.",
    status: "Approved",
    submittedDate: new Date("2025-08-15T10:30:00Z"),
  },
  {
    id: "req_2",
    asmsName: "Data Lake Initiative",
    innovationOwner: "Diana Prince",
    opsOwner: "Eve Adams",
    budgetApprover: "Frank Miller",
    justification:
      "To centralize our disparate data sources into a single data lake, enabling advanced analytics, machine learning model training, and business intelligence reporting across the entire organization.",
    status: "Pending",
    submittedDate: new Date("2025-08-22T14:00:00Z"),
  },
  {
    id: "req_3",
    asmsName: "Mobile App Refresh",
    innovationOwner: "Grace Hopper",
    opsOwner: "Heidi Lamarr",
    budgetApprover: "Ivan Petrov",
    justification:
      "Scope was too broad and budget was not clearly defined. Please resubmit with a more detailed project plan and cost analysis.",
    status: "Rejected",
    submittedDate: new Date("2025-07-30T09:00:00Z"),
  },
];

const StatusBadge = ({ status }: { status: OnboardingRequest["status"] }) => {
  const statusConfig = {
    Approved: {
      icon: <CheckCircle className="mr-1.5 h-3.5 w-3.5" />,
      variant: "secondary",
      label: "Approved",
    },
    Pending: {
      icon: <Clock className="mr-1.5 h-3.5 w-3.5" />,
      variant: "secondary",
      label: "Pending",
    },
    Rejected: {
      icon: <XCircle className="mr-1.5 h-3.5 w-3.5" />,
      variant: "destructive",
      label: "Rejected",
    },
  };
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className="capitalize">
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default function MyRequestsPage() {
  const [selectedRequest, setSelectedRequest] =
    useState<OnboardingRequest | null>(null);
  const isLoading = false; // Set to true while fetching data

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Onboarding Requests</CardTitle>
          <CardDescription>
            A list of your cloud onboarding requests. Click a row to see more
            details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">ASMS</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Submitted Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-5 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-5 w-32 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading &&
                mockRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedRequest(request)}
                    aria-label={`View details for ${request.asmsName}`}
                  >
                    <TableCell className="font-medium">
                      {request.asmsName}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {format(request.submittedDate, "MMMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!isLoading && mockRequests.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              You have not submitted any requests yet.
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet
        open={!!selectedRequest}
        onOpenChange={(isOpen) => !isOpen && setSelectedRequest(null)}
      >
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedRequest && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>{selectedRequest.asmsName}</SheetTitle>
                <SheetDescription>
                  Submitted on{" "}
                  {format(
                    selectedRequest.submittedDate,
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </SheetDescription>
                <div className="pt-2">
                  <StatusBadge status={selectedRequest.status} />
                </div>
              </SheetHeader>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    Business Justification
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {selectedRequest.justification}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Innovation Owner
                    </h4>
                    <p className="text-sm text-foreground">
                      {selectedRequest.innovationOwner}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Operations Owner
                    </h4>
                    <p className="text-sm text-foreground">
                      {selectedRequest.opsOwner}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Budget Approver
                    </h4>
                    <p className="text-sm text-foreground">
                      {selectedRequest.budgetApprover}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
