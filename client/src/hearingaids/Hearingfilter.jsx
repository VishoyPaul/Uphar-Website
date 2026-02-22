import React, { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const FILTER_SECTIONS = [
  { key: "brand", label: "Brand" },
  { key: "color", label: "Color" },
  { key: "price", label: "Price" },
];

const FilterPanel = ({
  activeFilter,
  setActiveFilter,
  filterOptions,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
}) => (
  <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      <button
        type="button"
        onClick={onClearFilters}
        className="text-xs font-medium text-pink-600 hover:text-pink-700"
      >
        Clear all
      </button>
    </div>

    <div className="flex min-h-[24rem]">
      <ul className="w-2/5 border-r border-gray-200 bg-gray-50 p-3 space-y-2 rounded-bl-2xl">
        {FILTER_SECTIONS.map((section) => (
          <li key={section.key}>
            <button
              type="button"
              onClick={() => setActiveFilter(section.key)}
              className={`w-full rounded-lg px-3 py-2 text-left transition ${
                activeFilter === section.key
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="w-3/5 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          {FILTER_SECTIONS.find((section) => section.key === activeFilter)?.label}
        </h3>

        <div className="space-y-2">
          {(filterOptions[activeFilter] || []).map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="accent-pink-500"
                checked={selectedFilters[activeFilter].includes(option.value)}
                onChange={() => onToggleFilter(activeFilter, option.value)}
              />
              {option.label}
            </label>
          ))}

          {(filterOptions[activeFilter] || []).length === 0 && (
            <p className="text-xs text-gray-500">No options available.</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const Hearingfilter = ({
  mode = "sidebar",
  filterOptions,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("brand");

  if (mode === "sidebar") {
    return (
      <div className="hidden lg:block lg:sticky lg:top-24">
        <FilterPanel
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onToggleFilter={onToggleFilter}
          onClearFilters={onClearFilters}
        />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 lg:hidden"
      >
        <FiFilter className="h-4 w-4" />
        Filters
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-[88%] max-w-sm bg-white p-4 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <FilterPanel
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onToggleFilter={onToggleFilter}
          onClearFilters={onClearFilters}
        />
      </div>
    </>
  );
};

export default Hearingfilter;
