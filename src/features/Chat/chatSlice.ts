import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatUser, ChatMessage } from "../../types/chat";

interface ChatState {
  selectedUser: ChatUser | null;
  messages: ChatMessage[];
  onlineUsers: number[];
}

const initialState: ChatState = {
  selectedUser: null,
  messages: [],
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<ChatUser | null>) {
      state.selectedUser = action.payload;
      state.messages = [];
    },

    clearSelectedUser(state) {
      state.selectedUser = null;
      state.messages = [];
    },

    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },

    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },

    setOnlineUsers(state, action: PayloadAction<number[]>) {
      state.onlineUsers = action.payload;
    },

    addOnlineUser(state, action: PayloadAction<number>) {
      const userId = action.payload;

      if (!state.onlineUsers.includes(userId)) {
        state.onlineUsers.push(userId);
      }
    },

    removeOnlineUser(state, action: PayloadAction<number>) {
      const userId = action.payload;

      state.onlineUsers = state.onlineUsers.filter((id) => id !== userId);
    },
  },
});

export const {
  setSelectedUser,
  clearSelectedUser,
  setMessages,
  addMessage,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
} = chatSlice.actions;

export default chatSlice.reducer;
