import { useEffect, useRef, useState } from "react";
import { useCarModels } from "../hooks/useCarModels";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { useDebounce } from "../hooks/useDebounce";

interface CarModel {
  id: number;
  name: string;
}

interface CarModelSelectProps {
  brandId: number | null;
  onSelect: (modelId: number) => void;
}

export function CarModelSelect({ brandId, onSelect }: CarModelSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    data: models = [],
    isLoading,
    refetch,
  } = useCarModels(brandId, debouncedSearchTerm);

  useEffect(() => {
    setSelectedName("");
    setSearchTerm("");
  }, [brandId]);

  const handleSelect = (model: CarModel) => {
    setSelectedName(model.name);
    setSearchTerm("");
    setShowDropdown(false);
    onSelect(model.id);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    if (models.length === 0 && brandId) refetch();
  };

  // ✅ FIX: koristi "mousedown" umesto "click"
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      // Ignoriši klikove na dugmad (submit i sl.)
      if (target.tagName === "BUTTON" || target.closest("button")) return;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!brandId) {
    return (
      <div className="relative w-full">
        <input
          disabled
          placeholder="Select brand first"
          className="border border-gray-300 rounded-md w-full p-2 pr-10 placeholder:text-sm text-gray-400 bg-gray-100 cursor-not-allowed py-3 pl-4"
        />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Choose model"
          value={searchTerm || selectedName}
          onFocus={handleFocus}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedName("");
            setShowDropdown(true);
          }}
          className="border border-gray-300 rounded-md w-full p-2 pr-10 placeholder:text-textGray placeholder:text-sm text-textGray py-3 pl-4"
        />
        <HiMiniChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-iconColor w-6 h-6" />
      </div>

      {showDropdown && (
        <ul className="absolute left-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg max-h-60 overflow-y-auto w-full z-10 shadow">
          {isLoading && (
            <li className="p-2 text-sm text-gray-400">
              {" "}
              <Ring2
                size="20"
                stroke="2"
                strokeLength="0.25"
                bgOpacity="0.1"
                speed="0.8"
                color="blue"
              />
            </li>
          )}

          {!isLoading && models.length > 0 && (
            <>
              {models.map((model) => (
                <li
                  key={model.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(model);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between text-textGray text-sm"
                >
                  <span>{model.name}</span>
                </li>
              ))}
            </>
          )}

          {!isLoading && models.length === 0 && (
            <li className="p-2 text-gray-500 text-sm">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CarModelSelect;
