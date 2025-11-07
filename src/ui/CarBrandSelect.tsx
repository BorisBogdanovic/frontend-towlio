import { useEffect, useRef, useState } from "react";
import { useCarBrands } from "../hooks/useCarBrands";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { useDebounce } from "../hooks/useDebounce";

interface CarBrandSelectProps {
  value: number | null;
  onSelect: (brandId: number | null) => void;
}
interface Brand {
  id: number;
  name: string;
}

export function CarBrandSelect({ value, onSelect }: CarBrandSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const { data: brands = [], isLoading } = useCarBrands(debouncedSearchTerm);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value === null) {
      setSelectedBrand(null);
      setSearchTerm("");
    }
  }, [value]);

  const handleSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSearchTerm("");
    setShowDropdown(false);
    onSelect(brand.id);
  };

  const handleFocus = () => {
    setSearchTerm("");
    setShowDropdown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedBrand(null);
    setShowDropdown(true);

    if (e.target.value === "") {
      onSelect(null);
    }
  };
  ///EVENT
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Choose brand"
          value={searchTerm.length > 0 ? searchTerm : selectedBrand?.name || ""}
          onFocus={handleFocus}
          onChange={handleChange}
          className="border border-gray-300 rounded-md w-full p-2 pr-10 placeholder:text-sm placeholder:text-textGray  placeholder:leading-5 text-textGray py-3 pl-4"
        />
        <HiMiniChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-iconColor w-6 h-6" />
      </div>

      {showDropdown && (
        <ul className="absolute left-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg max-h-60 overflow-y-auto w-full z-10 shadow">
          {isLoading && (
            <li className="p-2 text-sm text-gray-400">
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

          {!isLoading && brands.length > 0 && (
            <>
              {brands.map((brand: Brand) => (
                <li
                  key={brand.id}
                  onMouseDown={() => handleSelect(brand)}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between text-textGray text-sm"
                >
                  <span>{brand.name}</span>
                </li>
              ))}
            </>
          )}

          {!isLoading && brands.length === 0 && (
            <li className="p-2 text-gray-500 text-sm">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CarBrandSelect;
