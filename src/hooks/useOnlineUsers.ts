import { useEffect } from "react";
import { PresenceChannel } from "pusher-js";
import { getPusher } from "../lib/pusher";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
} from "../features/Chat/chatSlice";

interface PresenceMember {
  id: string;
}

interface PresenceMembers {
  each: (callback: (member: PresenceMember) => void) => void;
}

export const useOnlineUsers = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(setOnlineUsers([]));
      return;
    }

    const pusher = getPusher();
    const channelName = "presence-online-users";

    const existingChannel = pusher.channel(channelName) as PresenceChannel;
    const channel =
      existingChannel || (pusher.subscribe(channelName) as PresenceChannel);

    const handleSubscription = (members: PresenceMembers) => {
      const users: number[] = [];

      members.each((member) => {
        users.push(Number(member.id));
      });

      dispatch(setOnlineUsers(users));
    };

    const handleMemberAdded = (member: PresenceMember) => {
      dispatch(addOnlineUser(Number(member.id)));
    };

    const handleMemberRemoved = (member: PresenceMember) => {
      dispatch(removeOnlineUser(Number(member.id)));
    };

    channel.bind("pusher:subscription_succeeded", handleSubscription);
    channel.bind("pusher:member_added", handleMemberAdded);
    channel.bind("pusher:member_removed", handleMemberRemoved);

    return () => {
      channel.unbind("pusher:subscription_succeeded", handleSubscription);
      channel.unbind("pusher:member_added", handleMemberAdded);
      channel.unbind("pusher:member_removed", handleMemberRemoved);
      pusher.unsubscribe(channelName);
    };
  }, [token, dispatch]);
};
