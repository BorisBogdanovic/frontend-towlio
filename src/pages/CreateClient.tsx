import { HiArrowLongLeft } from "react-icons/hi2";
import CreateClientForm from "../features/Client/CreateClientForm";
import Button from "../ui/Button";
import ContentHeader from "../ui/ContentHeader";
import { useNavigate } from "react-router-dom";
import ContentHeading from "../ui/ContentHeading";

function CreateClient() {
  const navigate = useNavigate();
  return (
    <>
      <ContentHeader
        heading="Create Client"
        icon={<HiArrowLongLeft className="h-4 w-4" />}
        button={
          <Button onClick={() => navigate("/")} type="secondary">
            Cancel
          </Button>
        }
      />

      <div className=" border border-disabledBorderGray mt-4 rounded-xl overflow-hidden min-h-[500px]">
        <ContentHeading>Basic Client information</ContentHeading>
        <CreateClientForm />
      </div>
    </>
  );
}

export default CreateClient;
