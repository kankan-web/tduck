import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
const QuestionLayout: FC = () => {
	const { waitingState } = useLoadUserData();
	useNavPage(waitingState);
	return (
		<div style={{ height: "100vh" }}>
			{waitingState ? (
				<div
					style={{
						textAlign: "center",
						marginTop: "60px"
					}}
				>
					<Spin />
				</div>
			) : (
				<Outlet />
			)}
		</div>
	);
};
export default QuestionLayout;
