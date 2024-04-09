import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateType } from "./type";
const INIT_STATE: UserStateType = { username: "", nickname: "" };
export const userSlice = createSlice({
	name: "user",
	initialState: INIT_STATE,
	reducers: {
		loginReducer: (
			state: UserStateType,
			action: PayloadAction<UserStateType>
		) => {
			return action.payload; //设置username nickname时用到的redux store
			//用不到immer
		},
		logoutReducer: () => INIT_STATE
	}
});
export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
