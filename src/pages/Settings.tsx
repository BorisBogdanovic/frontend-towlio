import { HiArrowLongLeft } from "react-icons/hi2";
import ContentHeader from "../ui/ContentHeader";

import ContentHeading from "../ui/ContentHeading";
import SettingsForm from "../features/Settings/SettingsForm";

function Settings() {
  return (
    <>
      <ContentHeader
        heading="Settings"
        icon={<HiArrowLongLeft className="h-4 w-4" />}
      />
      <div className=" border border-disabledBorderGray mt-4 rounded-xl  min-h-[500px]">
        <ContentHeading>Personal Information</ContentHeading>
        <SettingsForm />
      </div>
    </>
  );
}

export default Settings;
