import { UserState } from "@/states/userState";
import { User } from "@prisma/client";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<{user: User}>) => {
      state.users = state.users.concat(action.payload.user);
    },
    deleteUser: (state, action: PayloadAction<{userId: string}>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.userId);
      state.users.splice(index, 1);
    },
    editUser: (state, action: PayloadAction<{user: User}>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.user.id);
      state.users[index] = action.payload.user;
    },
  },
});

export const { createUser, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;