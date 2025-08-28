import { useState, useEffect } from "react";
import { AsmsEntry } from "@/app/gen/lib/types";

const mockAsmsDatabase: AsmsEntry[] = [
  {
    id: "asms_1",
    name: "Project Phoenix",
    innovationOwner: "Alice Johnson",
    opsOwner: "Bob Williams",
    budgetApprover: "Charlie Brown",
  },
  {
    id: "asms_2",
    name: "Data Lake Initiative",
    innovationOwner: "Diana Prince",
    opsOwner: "Eve Adams",
    budgetApprover: "Frank Miller",
  },
  {
    id: "asms_3",
    name: "Mobile App Refresh",
    innovationOwner: "Grace Hopper",
    opsOwner: "Heidi Lamarr",
    budgetApprover: "Ivan Petrov",
  },
  {
    id: "asms_4",
    name: "Mercury Service Platform",
    innovationOwner: "Jane Foster",
    opsOwner: "Kevin Bacon",
    budgetApprover: "Laura Palmer",
  },
];

export const useSearchAsms = (query: string) => {
  const [results, setResults] = useState<AsmsEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        setIsLoading(true);
        setTimeout(() => {
          const filteredResults = mockAsmsDatabase.filter((asms) =>
            asms.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filteredResults);
          setIsLoading(false);
        }, 500);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  return { results, isLoading };
};
