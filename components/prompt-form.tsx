// file: components/CloudOnboardingForm.tsx
// To run this code, install the following packages:
// npm install react-hook-form@7.52.1 zod@3.23.8 @hookform/resolvers@3.6.0 sonner@1.5.0 date-fns@3.6.0
// npx shadcn add button form input label textarea popover command dialog sheet badge scroll-area

"use client";

import { useEffect, useState, useTransition, useId } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
interface AsmsEntry {
  id: string;
  name: string;
  innovationOwner: string;
  opsOwner: string;
  budgetApprover: string;
}

const mockAsmsData: AsmsEntry[] = [
  {
    id: "asms-1234",
    name: "ASMS-1234 (Project A)",
    innovationOwner: "Sarah Connor",
    opsOwner: "Kyle Reese",
    budgetApprover: "Miles Dyson",
  },
  {
    id: "asms-5678",
    name: "ASMS-5678 (Project B)",
    innovationOwner: "Ellen Ripley",
    opsOwner: "Cpl. Hicks",
    budgetApprover: "Carter Burke",
  },
  {
    id: "asms-9012",
    name: "ASMS-9012 (Project C)",
    innovationOwner: "Jules Winnfield",
    opsOwner: "Vincent Vega",
    budgetApprover: "Marsellus Wallace",
  },
  {
    id: "asms-3456",
    name: "ASMS-3456 (Project D)",
    innovationOwner: "Marty McFly",
    opsOwner: "Doc Brown",
    budgetApprover: "Biff Tannen",
  },
];

// Mock API Call
async function fetchAsms(query: string): Promise<AsmsEntry[]> {
  // TODO: Replace with a real API call to fetch ASMS data
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
  const lowercasedQuery = query.toLowerCase();
  return mockAsmsData.filter((asms) =>
    asms.name.toLowerCase().includes(lowercasedQuery)
  );
}

// Mock save function
async function saveOnboardingForm(data: z.infer<typeof formSchema>) {
  // TODO: Replace with a real API call to save form data
  console.log("Saving form data:", data);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2s save
  return { success: true };
}

// Form Schema
const formSchema = z.object({
  asmsId: z.string().min(1, { message: "An ASMS is required." }),
  innovationOwner: z
    .string()
    .min(1, { message: "Innovation Owner is required." }),
  opsOwner: z.string().min(1, { message: "Operations Owner is required." }),
  budgetApprover: z
    .string()
    .min(1, { message: "Budget Approver is required." }),
  businessJustification: z.string().min(100, {
    message: "Business Justification must be at least 100 characters.",
  }),
});

export function CloudOnboardingForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const formId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      asmsId: "",
      innovationOwner: "",
      opsOwner: "",
      budgetApprover: "",
      businessJustification: "",
    },
  });

  const [openCombobox, setOpenCombobox] = useState(false);
  const [asmsSearchResults, setAsmsSearchResults] = useState<AsmsEntry[]>([]);
  const selectedAsms = form.watch("asmsId");
  const businessJustificationValue = form.watch("businessJustification");
  const isFormValid = form.formState.isValid && !form.formState.isSubmitting;

  // Effect to auto-fill owner fields when an ASMS is selected
  useEffect(() => {
    if (selectedAsms) {
      const entry = mockAsmsData.find((a) => a.id === selectedAsms);
      if (entry) {
        form.setValue("innovationOwner", entry.innovationOwner, {
          shouldValidate: true,
        });
        form.setValue("opsOwner", entry.opsOwner, { shouldValidate: true });
        form.setValue("budgetApprover", entry.budgetApprover, {
          shouldValidate: true,
        });
      }
    }
  }, [selectedAsms, form]);

  const handleSearch = async (query: string) => {
    // Call the mock async function to filter ASMS data
    const results = await fetchAsms(query);
    setAsmsSearchResults(results);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await saveOnboardingForm(values);
        toast.success("Cloud onboarding request submitted.");
        router.push("/my-requests");
      } catch (error) {
        toast.error("Failed to submit request. Please try again.");
      }
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-8"
        aria-busy={isPending}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Cloud Onboarding Request
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete the form to provision a new cloud environment.
          </p>
        </div>
        <Form {...form}>
          <div className="space-y-6">
            {/* ASMS Autocomplete Field */}
            <FormField
              control={form.control}
              name="asmsId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor={field.name}>
                    ASMS<span className="text-destructive">*</span>
                  </FormLabel>
                  <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          aria-controls={`asms-list-${formId}`}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? mockAsmsData.find(
                                (asms) => asms.id === field.value
                              )?.name
                            : "Select ASMS..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search ASMS..."
                          onValueChange={handleSearch}
                          autoFocus
                        />
                        <CommandEmpty
                          className="py-6 text-center text-sm"
                          aria-live="polite"
                        >
                          No ASMS found.
                        </CommandEmpty>
                        <CommandGroup role="listbox" id={`asms-list-${formId}`}>
                          {asmsSearchResults.map((asms) => (
                            <CommandItem
                              key={asms.id}
                              value={asms.id}
                              onSelect={() => {
                                form.setValue("asmsId", asms.id);
                                setOpenCombobox(false);
                              }}
                              aria-selected={asms.id === field.value}
                              role="option"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  asms.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {asms.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The ASMS number identifies the project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedAsms && (
              <>
                {/* Auto-filled owner fields */}
                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="innovationOwner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name}>
                          Innovation Owner
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={field.name}
                            {...field}
                            readOnly
                            aria-readonly="true"
                            required
                            tabIndex={-1}
                            className="cursor-not-allowed"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="opsOwner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name}>
                          Operations Owner
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={field.name}
                            {...field}
                            readOnly
                            aria-readonly="true"
                            required
                            tabIndex={-1}
                            className="cursor-not-allowed"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budgetApprover"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name}>
                          Budget Approver
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={field.name}
                            {...field}
                            readOnly
                            aria-readonly="true"
                            required
                            tabIndex={-1}
                            className="cursor-not-allowed"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Business Justification */}
                <FormField
                  control={form.control}
                  name="businessJustification"
                  render={({ field }) => {
                    const charactersRemaining = Math.max(
                      0,
                      100 - (field.value?.length || 0)
                    );
                    const descriptionId = `${formId}-justification-desc`;
                    return (
                      <FormItem>
                        <FormLabel htmlFor={field.name}>
                          Business Justification
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id={field.name}
                            placeholder="Provide a detailed explanation (min. 100 characters) for this cloud environment."
                            className="resize-none"
                            {...field}
                            aria-required="true"
                            required
                            aria-invalid={
                              form.formState.errors.businessJustification
                                ? "true"
                                : undefined
                            }
                            aria-describedby={descriptionId}
                          />
                        </FormControl>
                        <FormDescription id={descriptionId} aria-live="polite">
                          Characters remaining: {charactersRemaining}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || isPending}
            >
              {isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </Form>
      </form>
    </div>
  );
}
