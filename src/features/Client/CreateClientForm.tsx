import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import CarBrandSelect from "../../ui/CarBrandSelect";
import CarModelSelect from "../../ui/CarModelSelect";
import { useState } from "react";
import ServiceDropdown from "../../ui/ServiceDropdown";
import PhoneHelerUi from "../../ui/PhoneHelperUi";
import { useCreateClient } from "../../hooks/useCreateClient";
import { CreateClientData } from "../../types/client";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

function ClientForm() {
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientData>();
  const { mutate: createClientMutate, isPending } = useCreateClient();

  const onSubmit = (data: CreateClientData) => {
    setSubmitted(true);
    if (!selectedBrandId || !selectedModelId || !selectedServiceId) {
      return;
    }

    createClientMutate(
      {
        ...data,
        car_brand_id: selectedBrandId,
        car_model_id: selectedModelId,
        towlio_service_id: selectedServiceId,
      },
      {
        onSuccess: () => {
          setSelectedBrandId(null);
          setSelectedModelId(null);
          setSelectedServiceId(null);

          reset();
          setSubmitted(false);
        },
      }
    );
  };
  const onInvalid = () => {
    setSubmitted(true);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="px-4 pt-6 pb-8"
    >
      <div className="flex justify-around gap-8 ">
        <div className="w-1/2 flex flex-col gap-8">
          <div className="flex justify-between ">
            <span className="text-sm text-textGray leading-5">Name*</span>
            <div className="relative w-sm">
              <Input
                placeholder="Client Name"
                className="w-sm"
                {...register("client_name", {
                  required: "Name is required",
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                })}
              />
              {errors.client_name && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.client_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">Last Name*</span>
            <div className="relative w-sm">
              <Input
                placeholder="Client Last Name"
                {...register("client_last_name", {
                  required: "Last name is required",
                  maxLength: {
                    value: 50,
                    message: "Last name cannot exceed 50 characters",
                  },
                })}
              />
              {errors.client_last_name && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.client_last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Client Address*
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="Client Address"
                {...register("address", {
                  required: "Address is required",
                  maxLength: {
                    value: 255,
                    message: "Address cannot exceed 255 characters",
                  },
                })}
              />
              {errors.address && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Client City*
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="Client City"
                {...register("city", {
                  required: "City is required",
                  maxLength: {
                    value: 50,
                    message: "City cannot exceed 50 characters",
                  },
                })}
              />
              {errors.city && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Client Country*
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="Client Country"
                {...register("country", {
                  required: "Country is required",
                  maxLength: {
                    value: 50,
                    message: "Country cannot exceed 50 characters",
                  },
                })}
              />
              {errors.country && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Client Email*
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="Client Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Client Phone*
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="Enter client phone number"
                className="w-sm"
                icon={<PhoneHelerUi />}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[0-9\-\s]{6,20}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
              {errors.phone && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-8">
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">Car Brand*</span>
            <div className="relative w-sm text-textGray text-sm">
              <CarBrandSelect
                value={selectedBrandId}
                onSelect={(id) => {
                  setSelectedBrandId(id ? Number(id) : null);
                  setSelectedModelId(null);
                }}
              />

              {submitted && !selectedBrandId && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  Car brand is required
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">Car Model*</span>
            <div className="relative w-sm text-textGray text-sm">
              <CarModelSelect
                brandId={selectedBrandId}
                onSelect={(id) => setSelectedModelId(Number(id))}
              />
              {submitted && !selectedModelId && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  Car model is required
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Towlio Service*
            </span>
            <div className="relative w-sm">
              <ServiceDropdown
                selectedValue={selectedServiceId}
                onSelect={(id) => setSelectedServiceId(id)}
              />
              {submitted && !selectedServiceId && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  Service is required
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Licence Plate*
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="Licence Plate"
                className="w-sm"
                {...register("licence_plate", {
                  required: "Licence plate is required",
                  maxLength: {
                    value: 50,
                    message: "Licence plate cannot exceed 50 characters",
                  },
                })}
              />
              {errors.licence_plate && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.licence_plate.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              VIN(Viacle Identification Number)*
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="VIN"
                className="w-sm"
                {...register("vin", {
                  required: "VIN is required",
                  minLength: {
                    value: 17,
                    message: "VIN must be 17 characters",
                  },
                  maxLength: {
                    value: 17,
                    message: "VIN must be 17 characters",
                  },
                  pattern: {
                    value: /^[A-HJ-NPR-Z0-9]{17}$/,
                    message: "VIN contains invalid characters",
                  },
                })}
              />
              {errors.vin && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.vin.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-textGray leading-5">
              Production Year
            </span>
            <div className="relative w-sm">
              <Input
                placeholder="Production Year"
                className="w-sm"
                {...register("production_year", {
                  required: "Production Year is required",
                  validate: (value) => {
                    const num = Number(value);
                    const currentYear = new Date().getFullYear();

                    if (!Number.isInteger(num))
                      return "Production year must be an integer";
                    if (num < 1900)
                      return "Production year cannot be before 1900";
                    if (num > currentYear)
                      return `Production year cannot be after ${currentYear}`;
                    return true;
                  },
                })}
              />
              {errors.production_year && (
                <p className="absolute text-bdoRed text-sm left-0 top-full mt-1">
                  {errors.production_year.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-1/4 ml-auto">
            <Button htmlType="submit" type="main" disabled={isPending}>
              <span className="flex items-center gap-2 whitespace-nowrap">
                {isPending ? (
                  <Ring2
                    size="20"
                    stroke="3"
                    strokeLength="0.25"
                    bgOpacity="0.1"
                    speed="0.8"
                    color="white"
                  />
                ) : null}
                {isPending ? "Creating..." : "Create Client"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ClientForm;
