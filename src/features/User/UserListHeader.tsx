import { HiOutlinePlusSmall } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {
  title: string;
  buttonText?: string;
  navigateTo?: string;
};

function PageHeader({ title, buttonText, navigateTo }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-2xl leading-8 text-textGray">{title}</h3>

      {buttonText && navigateTo && (
        <div className="w-auto">
          <Button type="main" onClick={() => navigate(navigateTo)}>
            <HiOutlinePlusSmall className="w-5 h-5" /> {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}

export default PageHeader;
