// file: components/cloud-onboarding-form.tsx
"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, ChevronsUpDown, Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useSearchAsms } from "@/lib/hooks/use-asms-search-old";
import { AsmsEntry } from "@/lib/types-old";

const STEPS = [
  { id: "select-asms", name: "Select ASMS" },
  { id: "confirm-details", name: "Confirm Details" },
  { id: "justification", name: "Business Justification" },
  { id: "review", name: "Review & Submit" },
];

const onboardingFormSchema = z.object({
  asmsId: z.string({ required_error: "Please select an ASMS." }),
  innovationOwner: z.string(),
  opsOwner: z.string(),
  budgetApprover: z.string(),
  justification: z
    .string()
    .min(100, "Business justification must be at least 100 characters."),
});

type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

const saveRequest = (data: OnboardingFormValues): Promise<{ id: string }> => {
  console.log("Saving request:", data);
  // TODO: Replace with actual API call
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: crypto.randomUUID() }), 1500)
  );
};

export function CloudOnboardingForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { results, isLoading: isSearching } = useSearchAsms(searchQuery);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    mode: "onChange",
  });

  const {
    formState: { errors, isSubmitting },
    watch,
    trigger,
    getValues,
  } = form;
  const selectedAsmsId = watch("asmsId");
  const justification = watch("justification");
  const selectedAsms = useMemo(
    () => results.find((asms) => asms.id === selectedAsmsId),
    [results, selectedAsmsId]
  );

  const next = async () => {
    let isValid = false;
    if (currentStep === 0) isValid = await trigger("asmsId");
    if (currentStep === 2) isValid = await trigger("justification");
    if (currentStep === 1 || isValid) {
      if (currentStep < STEPS.length - 1) setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    toast.loading("Submitting your request...");
    try {
      await saveRequest(data);
      toast.dismiss();
      toast.success("Onboarding request submitted successfully!");
      router.push("/my-requests");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to submit request. Please try again.");
    }
  };

  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>New Cloud Onboarding Request</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].name}
        </CardDescription>
        <div className="pt-2">
          <Progress
            value={progressValue}
            aria-label={`${STEPS[currentStep].name} step`}
          />
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden min-h-[300px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Select ASMS */}
                {currentStep === 0 && (
                  <FormField
                    control={form.control}
                    name="asmsId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel id="asms-label">
                          Search and select your ASMS{" "}
                          <span aria-hidden="true">*</span>
                        </FormLabel>
                        <Popover
                          open={popoverOpen}
                          onOpenChange={setPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={popoverOpen}
                                aria-controls="asms-list"
                                aria-labelledby="asms-label"
                                aria-required="true"
                                aria-invalid={!!errors.asmsId}
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {selectedAsms
                                  ? selectedAsms.name
                                  : "Select ASMS..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command shouldFilter={false}>
                              <CommandInput
                                placeholder="Search ASMS..."
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                              />
                              <CommandList id="asms-list">
                                {isSearching && (
                                  <CommandEmpty>Searching...</CommandEmpty>
                                )}
                                {!isSearching && results.length === 0 && (
                                  <CommandEmpty>No results found.</CommandEmpty>
                                )}
                                <CommandGroup>
                                  {results.map((asms: AsmsEntry) => (
                                    <CommandItem
                                      value={asms.name}
                                      key={asms.id}
                                      onSelect={() => {
                                        form.setValue("asmsId", asms.id);
                                        form.setValue(
                                          "innovationOwner",
                                          asms.innovationOwner
                                        );
                                        form.setValue(
                                          "opsOwner",
                                          asms.opsOwner
                                        );
                                        form.setValue(
                                          "budgetApprover",
                                          asms.budgetApprover
                                        );
                                        setPopoverOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === asms.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {asms.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {/* Step 2: Confirm Details */}
                {currentStep === 1 && selectedAsms && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Please confirm the details associated with{" "}
                      <span className="font-semibold text-foreground">
                        {selectedAsms.name}
                      </span>
                      .
                    </p>
                    <div className="space-y-2">
                      <Label>Innovation Owner</Label>
                      <Input
                        value={selectedAsms.innovationOwner}
                        readOnly
                        aria-readonly="true"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Operations Owner</Label>
                      <Input
                        value={selectedAsms.opsOwner}
                        readOnly
                        aria-readonly="true"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Approver</Label>
                      <Input
                        value={selectedAsms.budgetApprover}
                        readOnly
                        aria-readonly="true"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                )}
                {/* Step 3: Business Justification */}
                {currentStep === 2 && (
                  <FormField
                    control={form.control}
                    name="justification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="justification">
                          Business Justification{" "}
                          <span aria-hidden="true">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="justification"
                            placeholder="Provide a detailed business case..."
                            {...field}
                            className="min-h-[150px]"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.justification}
                            aria-describedby="justification-help"
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          <p
                            id="justification-help"
                            className="text-sm text-muted-foreground text-right"
                            aria-live="polite"
                          >
                            {justification?.length || 0}/100 characters
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
                {/* Step 4: Review */}
                {currentStep === 3 && selectedAsms && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Review Your Request
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Please review all information before submitting.
                      </p>
                    </div>
                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          ASMS
                        </span>
                        <span className="text-sm font-medium">
                          {selectedAsms.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Innovation Owner
                        </span>
                        <span className="text-sm font-medium">
                          {getValues("innovationOwner")}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                        Business Justification
                      </h4>
                      <p className="text-sm p-4 bg-muted rounded-md max-h-40 overflow-y-auto">
                        {getValues("justification")}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={prev} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        {currentStep < STEPS.length - 1 && (
          <Button onClick={next} disabled={!selectedAsmsId}>
            Next
          </Button>
        )}
        {currentStep === STEPS.length - 1 && (
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Request
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
