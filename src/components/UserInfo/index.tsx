import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";

import styles from "./index.module.scss";

import { LOGIN_PATHNAME } from "../../routers/index";
import { getUserInfoService } from "../../servers/user";
import { removeToken } from "../../util/user-token";

const UserInfo: FC = () => {
	const nav = useNavigate();
	const { data } = useRequest(getUserInfoService);
	const { username, nickname } = data || {};
	const Logout = () => {
		removeToken();
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
