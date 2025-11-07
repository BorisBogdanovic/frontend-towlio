import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setStatus,
  setSearch,
  setPage,
} from "../features/User/userSlice";
import { RootState } from "../app/store";

export function useSyncFiltersWithUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.user.city);
  const status = useSelector((state: RootState) => state.user.status);
  const search = useSelector((state: RootState) => state.user.search);
  const page = useSelector((state: RootState) => state.user.page);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search");
    const pageParam = searchParams.get("page");

    if (cityParam) dispatch(setCity(Number(cityParam)));
    if (statusParam) dispatch(setStatus(Number(statusParam)));
    if (searchParam) dispatch(setSearch(searchParam));
    if (pageParam) dispatch(setPage(Number(pageParam)));
  }, [dispatch, searchParams]);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (city) params.city = String(city);
    if (status) params.status = String(status);
    if (search) params.search = String(search);
    if (page && page > 1) params.page = String(page);

    setSearchParams(params);
  }, [city, status, search, page, setSearchParams]);
}
