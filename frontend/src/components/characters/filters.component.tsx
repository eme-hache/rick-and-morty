import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxArrowLeft } from "react-icons/rx";
import { SPECIES_FILTER } from "../../schema/filters.schema";
import { useMainContext } from "../../context/main.context";
import Button from "../common/button.component";

const Filters = () => {
  const { showFilters, setShowFilters, setAppliedFilters } = useMainContext();
  const [localFilters, setLocalFilters] = useState<{ species?: string }>({});

  const handleFilterChange = (filter: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const handleFilterSubmit = () => {
    setAppliedFilters(localFilters.species === "All" ? undefined : localFilters);
    setShowFilters(false);
  };

  return (
    <div
      className={twMerge(
        "fixed w-screen h-screen top-0 left-0 md:absolute md:top-12 md:left-0 md:w-full md:h-auto p-6 bg-gray-100 md:rounded-lg border border-gray-300 shadow-lg transition-all duration-200 flex flex-col gap-6 md:gap-4",
        showFilters ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      <header className="flex items-center justify-between md:hidden">
        <button onClick={() => setShowFilters(false)} className="cursor-pointer">
          <RxArrowLeft className="text-4xl text-primary-600" />
        </button>
        <h3 className="text-base font-semibold">Filters</h3>
        <div />
      </header>

      <div className="flex flex-col gap-2">
        <h4 className="text-base font-medium text-gray-500">Species Filter</h4>
        <ul className="grid grid-cols-3 gap-2">
          {SPECIES_FILTER.map((filter) => (
            <li key={filter.label}>
              <button
                onClick={() => handleFilterChange("species", filter.value)}
                className={twMerge(
                  "w-full cursor-pointer px-2 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-primary-100 hover:text-primary-600",
                  localFilters.species === filter.value &&
                    "bg-primary-100 text-primary-600"
                )}
              >
                {filter.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={handleFilterSubmit} disabled={!localFilters}>
        Filter
      </Button>
    </div>
  );
};

export default Filters;
