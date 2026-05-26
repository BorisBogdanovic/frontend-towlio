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

  const totalUnread = users.reduce(
    (sum, u: ChatUser) => sum + (u.unread_count ?? 0),
    0,
  );

  return (
    <nav
      className="
      fixed flex h-screen w-xs flex-col justify-between 
      bg-[var(--sidebar-bg)]
      border-r border-[var(--color-disabledBorderGray)]
      px-4 py-8 
      shadow-[0_4px_4px_rgba(0,0,0,0.25)]
    "
    >
      {/* TOP */}
      <div>
        <SidebarLogo />

        <SidebarSubheading>MENU</SidebarSubheading>

        <SidebarLink
          to="/"
          icon={
            <HiChartPie className="h-6 w-6 text-[var(--color-iconColor)]" />
          }
          label="Business analytics"
        />

        <SidebarLink
          to="/inbox"
          icon={
            <HiChatBubbleLeftRight className="h-6 w-6 text-[var(--color-iconColor)]" />
          }
          label="Inbox"
          unreadCount={totalUnread}
        />

        <SidebarAccordion
          icon={
            <HiBriefcase className="h-6 w-6 text-[var(--color-iconColor)]" />
          }
          label="Clients"
        >
          <SidebarLink
            to="/create-client"
            icon={
              <HiOutlinePlusSmall className="h-6 w-6 text-[var(--color-iconColor)]" />
            }
            label="Create Client"
            nested
          />

          <SidebarLink
            to="/clients"
            icon={
              <HiClipboardDocumentList className="h-6 w-6 text-[var(--color-iconColor)]" />
            }
            label="All Clients"
            nested
          />
        </SidebarAccordion>

        {user?.is_admin && (
          <SidebarAccordion
            icon={
              <HiUserGroup className="h-6 w-6 text-[var(--color-iconColor)]" />
            }
            label="Salespeople"
          >
            <SidebarLink
              to="/create-user"
              icon={
                <HiUserPlus className="h-6 w-6 text-[var(--color-iconColor)]" />
              }
              label="Add Salesperson"
              nested
            />

            <SidebarLink
              to="/users"
              icon={
                <HiClipboardDocumentList className="h-6 w-6 text-[var(--color-iconColor)]" />
              }
              label="Salespeople List"
              nested
            />
          </SidebarAccordion>
        )}
      </div>

      {/* BOTTOM */}
      <div>
        <SidebarSubheading>SETTINGS</SidebarSubheading>

        <SidebarLink
          to="/settings"
          icon={
            <HiMiniCog8Tooth className="h-6 w-6 text-[var(--color-iconColor)]" />
          }
          label="Settings"
        />

        <div className="my-6 h-[1px] w-full bg-[var(--color-disabledBorderGray)]" />

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
