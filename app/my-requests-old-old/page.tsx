// file: app/my-requests/page.tsx
// To run this code, install the following packages:
// npx shadcn add sheet button scroll-area badge
// The Toaster component from sonner should be added to your root layout.

"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock Data
interface CloudRequest {
  id: string;
  asms: string;
  innovationOwner: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
  details: {
    opsOwner: string;
    budgetApprover: string;
    businessJustification: string;
  };
}

const mockRequests: CloudRequest[] = [
  {
    id: "req-abc-1",
    asms: "ASMS-1234",
    innovationOwner: "Sarah Connor",
    status: "Pending",
    createdAt: new Date("2025-08-20T10:00:00Z"),
    details: {
      opsOwner: "Kyle Reese",
      budgetApprover: "Miles Dyson",
      businessJustification:
        "This is a sample business justification for Project A. It's a critical project for the company's Q4 goals and requires a robust cloud environment to handle expected traffic.",
    },
  },
  {
    id: "req-xyz-2",
    asms: "ASMS-5678",
    innovationOwner: "Ellen Ripley",
    status: "Approved",
    createdAt: new Date("2025-08-18T14:30:00Z"),
    details: {
      opsOwner: "Cpl. Hicks",
      budgetApprover: "Carter Burke",
      businessJustification:
        "Justification for Project B, a long-term R&D initiative that requires significant computational resources to run simulations and process large datasets.",
    },
  },
  {
    id: "req-def-3",
    asms: "ASMS-9012",
    innovationOwner: "Jules Winnfield",
    status: "Rejected",
    createdAt: new Date("2025-08-15T09:15:00Z"),
    details: {
      opsOwner: "Vincent Vega",
      budgetApprover: "Marsellus Wallace",
      businessJustification:
        "This project aims to streamline our supply chain logistics by utilizing a new AI model. The system needs to be scalable to handle global operations.",
    },
  },
];

export default function MyRequestsPage() {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CloudRequest | null>(
    null
  );

  const handleRequestClick = (request: CloudRequest) => {
    setSelectedRequest(request);
    setOpenSheet(true);
  };

  const getStatusBadge = (status: CloudRequest["status"]) => {
    switch (status) {
      case "Approved":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 hover:bg-green-100"
          >
            <CheckCircle2 className="mr-1 h-4 w-4" /> Approved
          </Badge>
        );
      case "Pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
          >
            <Clock className="mr-1 h-4 w-4" /> Pending
          </Badge>
        );
      case "Rejected":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-700 hover:bg-red-100"
          >
            <XCircle className="mr-1 h-4 w-4" /> Rejected
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Cloud Requests</h1>
        <Button asChild>
          <Link href="/test">
            New Request
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="hidden md:grid md:grid-cols-5 gap-4 py-2 text-sm font-medium text-muted-foreground border-b">
          <div className="col-span-2">ASMS & Owner</div>
          <div>Status</div>
          <div>Submitted On</div>
          <div></div>
        </div>
        {mockRequests.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
              {mockRequests.map((request) => (
                <div
                  key={request.id}
                  className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 border rounded-md p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleRequestClick(request)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleRequestClick(request);
                    }
                  }}
                >
                  <div className="col-span-2">
                    <div className="font-medium">{request.asms}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.innovationOwner}
                    </div>
                  </div>
                  <div className="text-sm">
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="text-sm text-muted-foreground hidden md:block">
                    {format(request.createdAt, "PPP")}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`View details for request ${request.asms}`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            You have no pending cloud requests.
          </div>
        )}
      </div>

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="w-full sm:max-w-md md:max-w-xl">
          <SheetHeader>
            <SheetTitle>Request Details</SheetTitle>
            <SheetDescription>
              Overview for ASMS: {selectedRequest?.asms}
            </SheetDescription>
          </SheetHeader>
          {selectedRequest && (
            <ScrollArea className="h-[calc(100vh-140px)] p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Request Info</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="font-medium">ASMS</div>
                    <div>{selectedRequest.asms}</div>

                    <div className="font-medium">Status</div>
                    <div>{getStatusBadge(selectedRequest.status)}</div>

                    <div className="font-medium">Submitted</div>
                    <div>{format(selectedRequest.createdAt, "PPP")}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Owners</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="font-medium">Innovation Owner</div>
                    <div>{selectedRequest.innovationOwner}</div>

                    <div className="font-medium">Operations Owner</div>
                    <div>{selectedRequest.details.opsOwner}</div>

                    <div className="font-medium">Budget Approver</div>
                    <div>{selectedRequest.details.budgetApprover}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Business Justification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.details.businessJustification}
                  </p>
                </div>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
