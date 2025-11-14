import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Input from "../../ui/Input";
import { useDebounce } from "../../hooks/useDebounce";
import { setSearch } from "./ClientSlice";
import { RootState } from "../../app/store";

function ClientFilters() {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.client.search);

  const [localSearch, setLocalSearch] = useState<string>(search);

  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="mt-4 flex items-center gap-4">
      <div>
        <Input
          placeholder="Search clients"
          type="text"
          icon={<HiMagnifyingGlass color="#667085" size={24} />}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ClientFilters;
