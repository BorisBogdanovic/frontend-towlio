import { HiArrowPath, HiMagnifyingGlass } from "react-icons/hi2";
import Input from "../../ui/Input";
import DropDown from "../../ui/DropDown";
import { useCities } from "../../hooks/useCities";
import { useStatuses } from "../../hooks/useStatuses";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  setCity,
  setStatus,
  setSearch,
  resetFilters,
} from "../../features/User/userSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

function UserFilters() {
  const dispatch = useDispatch();
  const { data } = useCities();
  const { data: statusesData } = useStatuses();

  const cities = data?.data ?? [];
  const statuses = statusesData?.data ?? [];

  const city = useSelector((state: RootState) => state.user.city);
  const status = useSelector((state: RootState) => state.user.status);
  const search = useSelector((state: RootState) => state.user.search);

  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 400);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);
  return (
    <div className="mt-4 flex items-center gap-4 ">
      <div>
        <Input
          placeholder="Search team members"
          type="text"
          icon={<HiMagnifyingGlass color="#667085" size={24} />}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      <DropDown
        placeholder="Filter by City"
        array={cities}
        selectedValue={city}
        onSelect={(val) => dispatch(setCity(val))}
      />
      <DropDown
        placeholder="Filter by Status"
        array={statuses}
        selectedValue={status}
        onSelect={(val) => dispatch(setStatus(val))}
      />
      <div>
        <Button onClick={handleReset} aria-label="Reset filters">
          <HiArrowPath className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}

export default UserFilters;
