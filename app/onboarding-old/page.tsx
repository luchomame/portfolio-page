// file: app/onboarding/page.tsx
// --- Dependency Installation ---
//
// 1. External Libraries:
// npm install react-hook-form@7.52.1 zod@3.23.8 @hookform/resolvers@3.9.0 sonner@1.5.0 lucide-react@0.412.0 date-fns@3.6.0
//
// 2. ShadCN UI Components (run this command in your project root):
// npx shadcn@latest add form input textarea button card command popover label badge sheet table skeleton sonner
//
// 3. Toaster (add this to your root layout.tsx):
// import { Toaster } from "@/components/ui/sonner";
// ...
// <body>
//   <main>{children}</main>
//   <Toaster richColors />
// </body>

"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  FormDescription,
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
import { cn } from "@/lib/utils";
import { useSearchAsms } from "@/lib/hooks/use-asms-search-old";
import { AsmsEntry } from "@/lib/types-old";

// Zod schema for validation
const onboardingFormSchema = z
  .object({
    asmsId: z.string({ required_error: "Please select an ASMS." }),
    innovationOwner: z.string(),
    opsOwner: z.string(),
    budgetApprover: z.string(),
    justification: z.string().optional(),
  })
  .refine(
    (data) => {
      // Justification is only required if an ASMS is selected
      if (data.asmsId) {
        return data.justification && data.justification.length >= 100;
      }
      return true;
    },
    {
      message: "Business justification must be at least 100 characters.",
      path: ["justification"],
    }
  );

type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

// Mock function to simulate saving data
const saveRequest = (data: OnboardingFormValues): Promise<{ id: string }> => {
  console.log("Saving request:", data);
  // TODO: Replace with actual API call to your backend
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: crypto.randomUUID() }), 1500)
  );
};

export default function CloudOnboardingPage() {
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { results, isLoading: isSearching } = useSearchAsms(searchQuery);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    mode: "onChange",
    defaultValues: {
      asmsId: "",
      innovationOwner: "",
      opsOwner: "",
      budgetApprover: "",
      justification: "",
    },
  });

  const selectedAsmsId = useWatch({ control: form.control, name: "asmsId" });
  const justification = useWatch({
    control: form.control,
    name: "justification",
  });

  const selectedAsms = results.find((asms) => asms.id === selectedAsmsId);

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

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>New Cloud Onboarding Request</CardTitle>
          <CardDescription>
            Search for an ASMS to begin the onboarding process. Fields marked
            with an asterisk (*) are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              aria-busy={form.formState.isSubmitting}
            >
              <FormField
                control={form.control}
                name="asmsId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel id="asms-label">
                      ASMS <span aria-hidden="true">*</span>
                    </FormLabel>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={popoverOpen}
                            aria-controls="asms-list"
                            aria-labelledby="asms-label"
                            aria-required="true"
                            aria-invalid={!!form.formState.errors.asmsId}
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
                            aria-label="Search ASMS"
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
                                  role="option"
                                  aria-selected={field.value === asms.id}
                                  onSelect={() => {
                                    form.setValue("asmsId", asms.id);
                                    form.setValue(
                                      "innovationOwner",
                                      asms.innovationOwner
                                    );
                                    form.setValue("opsOwner", asms.opsOwner);
                                    form.setValue(
                                      "budgetApprover",
                                      asms.budgetApprover
                                    );
                                    form.trigger("justification"); // Re-validate justification
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

              {selectedAsmsId && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="innovationOwner">Innovation Owner</Label>
                      <Input
                        id="innovationOwner"
                        value={form.getValues("innovationOwner")}
                        readOnly
                        aria-readonly="true"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="opsOwner">Operations Owner</Label>
                      <Input
                        id="opsOwner"
                        value={form.getValues("opsOwner")}
                        readOnly
                        aria-readonly="true"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budgetApprover">Budget Approver</Label>
                    <Input
                      id="budgetApprover"
                      value={form.getValues("budgetApprover")}
                      readOnly
                      aria-readonly="true"
                      tabIndex={-1}
                    />
                  </div>
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
                            placeholder="Provide a detailed business case for this new cloud environment..."
                            {...field}
                            className="min-h-[120px]"
                            required
                            aria-required="true"
                            aria-invalid={!!form.formState.errors.justification}
                            aria-describedby="justification-help"
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          <FormDescription
                            id="justification-help"
                            className="mt-2 text-right"
                            aria-live="polite"
                          >
                            {justification?.length || 0}/100 characters
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="w-full"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
