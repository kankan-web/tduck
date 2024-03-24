import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { LOGIN_PATHNAME } from "../../routers/index";
const UserInfo: FC = () => {
	//#TODO：对于已经登陆的用户，显示什么？后面再写
	return (
		<>
			<Link to={LOGIN_PATHNAME}>登陆</Link>
		</>
	);
};
export default UserInfo;
