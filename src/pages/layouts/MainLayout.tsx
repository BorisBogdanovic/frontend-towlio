import { Outlet } from "react-router-dom";
import GrediantBg from "../../ui/GrediantBg";
import Content from "../../ui/Content";
import Container from "../../ui/Container";
import Footer from "../../ui/Footer";
import AppTopBar from "../../features/AppTopBar/AppTopBar";
import Sidebar from "../../features/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[320px] shrink-0">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 bg-white flex flex-col relative">
        <GrediantBg />
        <AppTopBar />

        <main className="relative z-10 p-4 sm:p-6 flex-1 overflow-y-auto">
          <Container>
            <Content>
              <Outlet />
            </Content>
          </Container>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
