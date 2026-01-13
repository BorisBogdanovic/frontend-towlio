import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  last_name: string;
  profile_image_path: string;
}

interface Message {
  id: number;
  from_id: number;
  to_id: number;
  message: string;
  type: string; // npr. "text"
  created_at: string;
}

interface ChatState {
  selectedUser: User | null;
  messages: Message[];
}

const initialState: ChatState = {
  selectedUser: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
      state.messages = [];
    },

    clearSelectedUser(state) {
      state.selectedUser = null;
      state.messages = [];
    },

    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload; // NOVO
    },

    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { setSelectedUser, clearSelectedUser, setMessages, addMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
