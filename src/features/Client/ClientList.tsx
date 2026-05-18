import { useEffect, useState } from "react";
import { useClients } from "../../hooks/useClients";
import UserListHeader from "../User/UserListHeader";
import Pagination from "../../ui/Pagination";
import Button from "../../ui/Button";
import { HiTrash, HiMiniPencilSquare, HiDocument } from "react-icons/hi2";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import ClientFilters from "./ClientFilters";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function ClientList() {
  const search = useSelector((state: RootState) => state.client.search);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useClients(page);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const clients = data?.data || [];
  const pagination = data?.meta;

  const headers = [
    "Client Name",
    "Address",
    "Phone",
    "Email",
    "Car Brand",
    "Car Model",
    "License Plate",
    "VIN (Chassis Number)",
    "Towlio Package",
    "Salesperson",
    "Start Date",
    "Expired Date",
    "Status",
    "Production Year",
    "City",
    "Country",
    "Actions",
  ];

  return (
    <>
      <UserListHeader
        title="Client List"
        buttonText="Add Client"
        navigateTo="/create-client"
      />

      <ClientFilters />

      <div className="w-full overflow-x-auto mt-4">
        <div className="min-w-[5440px]">
          {/* Table Header */}
          <div className="flex items-center bg-[#F0F5FF]">
            {headers.map((text, index) => (
              <div
                key={index}
                className={`min-w-[320px] px-6 py-3 text-center text-primary font-medium text-sm leading-5 ${
                  index < headers.length - 1
                    ? "border-r border-disabledBorderGray"
                    : ""
                }`}
              >
                {text}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="h-[640px] max-h-[640px] overflow-y-auto">
            {isLoading && (
              <div className="flex justify-center items-center h-full w-[1500px]">
                <Ring2
                  size="40"
                  stroke="5"
                  strokeLength="0.25"
                  bgOpacity="0.1"
                  speed="0.8"
                  color="#21409a"
                />
              </div>
            )}

            {!isLoading && clients.length === 0 && (
              <div className="flex justify-center items-center h-full text-gray-500 w-[1500px]">
                No clients found
              </div>
            )}

            {!isLoading &&
              clients.map((client, rowIndex) => (
                <div
                  key={client.id}
                  className={`flex items-center ${
                    rowIndex % 2 === 0 ? "bg-sectionBg" : ""
                  }`}
                >
                  {[
                    `${client.client_name} ${client.client_last_name}`,
                    client.address,
                    client.phone,
                    client.email,
                    client.car_brand?.name,
                    client.car_model?.name,
                    client.licence_plate,
                    client.vin,
                    client.service?.name,
                    client.sales_person,
                    client.start_date,
                    client.expired_date,
                    client.status,
                    client.production_year,
                    client.city,
                    client.country,
                    "actions",
                  ].map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className={`min-w-[320px] px-6 min-h-16 flex items-center  text-sm font-medium text-textGray border-r border-disabledBorderGray ${
                        colIndex === headers.length - 1 ? "" : "border-r"
                      }`}
                    >
                      {colIndex === 12 ? (
                        <div className="flex justify-center w-full">
                          {value ? (
                            <span className="text-activeText font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="text-bdoRed font-medium">
                              Expired
                            </span>
                          )}
                        </div>
                      ) : colIndex === 9 ? (
                        <div className="flex justify-start w-full gap-4">
                          <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-2 border-primary">
                            <img
                              src={getProfileImageUrl(
                                client.sales_person?.profile_image_path,
                              )}
                              alt="profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-sm font-medium text-textGray">
                              {client.sales_person?.name || "N/A"}{" "}
                              {client.sales_person?.last_name || ""}
                            </span>
                          </div>
                        </div>
                      ) : colIndex === headers.length - 1 ? (
                        <div className="flex justify-center w-full">
                          <div className="flex items-center justify-start gap-4">
                            <Button type="small">
                              <HiTrash className="text-textGray" />
                            </Button>
                            <Button type="small">
                              <HiMiniPencilSquare className="text-textGray" />
                            </Button>
                            <Button type="small">
                              <HiDocument className="text-textGray" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center w-full">
                          {String(value)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={(page) => !isLoading && setPage(page)}
          />
        </div>
      )}
    </>
  );
}

export default ClientList;
