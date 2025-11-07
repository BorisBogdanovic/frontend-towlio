import { HiArrowLongLeft } from "react-icons/hi2";
import InviteForm from "../features/Invite/InviteFrom";
import ContentHeader from "../ui/ContentHeader";
import ContentHeading from "../ui/ContentHeading";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  return (
    <>
      <ContentHeader
        heading="Create User"
        icon={<HiArrowLongLeft className="h-4 w-4" />}
        button={
          <Button onClick={() => navigate("/")} type="secondary">
            {" "}
            Cancel{" "}
          </Button>
        }
      />
      <div className=" border border-disabledBorderGray mt-4 rounded-xl overflow-hidden min-h-[500px]">
        <ContentHeading>Basic information</ContentHeading>
        <InviteForm />
      </div>
    </>
  );
}

export default CreateUser;
