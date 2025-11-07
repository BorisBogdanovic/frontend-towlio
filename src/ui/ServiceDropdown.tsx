import { useState, useRef, useEffect } from "react";
import { HiMiniChevronDown } from "react-icons/hi2";
import { useServices } from "../hooks/useServices";

interface Service {
  id: number;
  name: string;
  price: number;
}

interface ServiceDropdownProps {
  selectedValue: number | null;
  onSelect: (id: number | null) => void;
}

function ServiceDropdown({ selectedValue, onSelect }: ServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useServices();
  const services: Service[] = data?.data || [];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (item: Service) => {
    onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedService = services.find((s) => s.id === selectedValue);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={isLoading}
        className="h-[50px] flex items-center justify-between pl-4 pr-2 border border-gray-300 rounded-lg text-textGray text-sm cursor-pointer w-full bg-white"
      >
        {selectedService
          ? `${selectedService.name} (${selectedService.price}€)`
          : isLoading
          ? "Choose package"
          : "Choose package"}
        <HiMiniChevronDown className=" text-iconColor w-6 h-6" />
      </button>

      {isOpen && !isError && (
        <ul className="absolute left-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg max-h-60 overflow-y-auto w-full z-10 shadow">
          {services.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between"
            >
              <span>{item.name}</span>
              <span className="text-sm text-gray-500">{item.price}€</span>
            </li>
          ))}
        </ul>
      )}

      {isError && (
        <p className="text-red-500 text-sm mt-1">Failed to load services</p>
      )}
    </div>
  );
}

export default ServiceDropdown;
