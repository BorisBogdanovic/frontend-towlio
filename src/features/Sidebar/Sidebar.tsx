import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useChatUsers } from "../../hooks/useChatUsers";
import {
  HiChartPie,
  HiUserPlus,
  HiClipboardDocumentList,
  HiMiniCog8Tooth,
  HiBriefcase,
  HiOutlinePlusSmall,
  HiUserGroup,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import SidebarSubheading from "./SidebarSubheading";
import SidebarLogo from "./SidebarLogo";
import SidebarAccordion from "./SidebarAccordion";
import SidebarLink from "./SidebarLink";
import SidebarUserInfo from "./SidebarUserInfo";
import { ChatUser } from "../../types/chat";

function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: users = [] } = useChatUsers("");

  // 🔥 TOTAL UNREAD (UMESTO BOOLEAN)
  const totalUnread = users.reduce(
    (sum, u: ChatUser) => sum + (u.unread_count ?? 0),
    0,
  );

  return (
    <nav className="fixed flex h-screen w-xs flex-col justify-between border-r border-r-disabledBorderGray bg-white px-4 py-8 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div>
        <SidebarLogo />
        <SidebarSubheading>MENU</SidebarSubheading>

        <SidebarLink
          to="/"
          icon={<HiChartPie className="h-6 w-6 text-iconColor" />}
          label="Business analytics"
        />

        {/* 🔥 INBOX SA COUNTEROM */}
        <SidebarLink
          to="/inbox"
          icon={<HiChatBubbleLeftRight className="h-6 w-6 text-iconColor" />}
          label="Inbox"
          unreadCount={totalUnread}
        />

        <SidebarAccordion
          icon={<HiBriefcase className="h-6 w-6 text-iconColor" />}
          label="Clients"
        >
          <SidebarLink
            to="/create-client"
            icon={<HiOutlinePlusSmall className="h-6 w-6 text-iconColor" />}
            label="Create Client"
            nested
          />

          <SidebarLink
            to="/clients"
            icon={
              <HiClipboardDocumentList className="h-6 w-6 text-iconColor" />
            }
            label="All Clients"
            nested
          />
        </SidebarAccordion>

        {user?.is_admin && (
          <SidebarAccordion
            icon={<HiUserGroup className="h-6 w-6 text-iconColor" />}
            label="Salespeople"
          >
            <SidebarLink
              to="/create-user"
              icon={<HiUserPlus className="h-6 w-6 text-iconColor" />}
              label="Add Salesperson"
              nested
            />

            <SidebarLink
              to="/users"
              icon={
                <HiClipboardDocumentList className="h-6 w-6 text-iconColor" />
              }
              label="Salespeople List"
              nested
            />
          </SidebarAccordion>
        )}
      </div>

      <div>
        <SidebarSubheading>SETTINGS</SidebarSubheading>

        <SidebarLink
          to="/settings"
          icon={<HiMiniCog8Tooth className="h-6 w-6 text-iconColor" />}
          label="Settings"
        />

        <div className="my-6 h-[1px] w-full bg-disabledBorderGray" />

        {user && (
          <SidebarUserInfo
            name={user.name}
            last_name={user.last_name}
            profile_image_path={user.profile_image_path}
          />
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
