import Container from "../../ui/Container";
import ThemeToggle from "../../ui/ThemeToggle";
import DateAndTime from "./DateAndTime";
import NotificationBar from "./NotificationBar";

function AppTopBar() {
  return (
    <div className="border-b border-b-disabledBorderGray border-opacity-25 relative w-full z-10">
      <Container>
        <div className="flex items-center justify-between py-3.5">
          <DateAndTime />

          <div className="flex items-center gap-3">
            <NotificationBar />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AppTopBar;
