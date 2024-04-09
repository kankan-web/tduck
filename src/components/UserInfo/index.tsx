import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { useRequest } from "ahooks";

import styles from "./index.module.scss";

import { LOGIN_PATHNAME } from "../../routers/constant";
// import { getUserInfoService } from "../../servers/user";
import { removeToken } from "../../util/user-token";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { logoutReducer } from "../../stores/userReducer";

const UserInfo: FC = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();

	// const { data } = useRequest(getUserInfoService);
	// const { username, nickname } = data || {};
	const { username, nickname } = useGetUserInfo();

	const Logout = () => {
		dispatch(logoutReducer()); //清空了redux user数据
		removeToken(); //清空了localStorage token
		message.success("退出成功");
		nav(LOGIN_PATHNAME);
	};
	const UserInfo = (
		<>
			<span style={{ color: "#e8e8e8", marginLeft: "10px" }}>
				<UserOutlined />
				{nickname}
			</span>
			<Button type="link" onClick={Logout}>
				退出
			</Button>
		</>
	);
	const Login = <Link to={LOGIN_PATHNAME}>登陆</Link>;
	return <div>{username ? UserInfo : Login}</div>;
};
export default UserInfo;
