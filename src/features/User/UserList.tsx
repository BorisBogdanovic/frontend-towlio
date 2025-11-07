import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { useUsers } from "../../hooks/useUser";
import { useSyncFiltersWithUrl } from "../../hooks/useSyncFiltersWithUrl";
import { setPage, resetFilters } from "../User/userSlice";
import UserListHeader from "./UserListHeader";
import UserFilters from "./UserFilters";
import SingleUser from "./SingleUser";
import Pagination from "../../ui/Pagination";
import { User } from "../../types/user";

function UserList() {
  useSyncFiltersWithUrl();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useUsers();

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  if (error) return <p>Error loading users</p>;

  const users = data?.data.users || [];

  return (
    <>
      <UserListHeader />
      <UserFilters />

      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[692px]">
          <Ring2
            size="40"
            stroke="5"
            strokeLength="0.25"
            bgOpacity="0.1"
            speed="0.8"
            color="#21409a"
          />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p>No users found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {users.map((user: User) => (
              <SingleUser user={user} key={user.id} />
            ))}
          </div>

          <div className="h-[80px] flex items-center justify-center absolute bottom-0 left-0 right-0 mx-auto">
            <Pagination
              currentPage={data?.data.pagination.current_page ?? 1}
              lastPage={data?.data.pagination.last_page ?? 1}
              onPageChange={(newPage) => dispatch(setPage(newPage))}
            />
          </div>
        </>
      )}
    </>
  );
}

export default UserList;
