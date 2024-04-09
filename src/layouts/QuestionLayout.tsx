import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
const QuestionLayout: FC = () => {
	const { waitingState } = useLoadUserData();
	useNavPage(waitingState);
	return (
		<>
			<p>Question Layout</p>
			<div>
				{waitingState ? (
					<div
						style={{
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Spin />
					</div>
				) : (
					<Outlet />
				)}
			</div>
		</>
	);
};
export default QuestionLayout;
