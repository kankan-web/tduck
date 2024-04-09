import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Flex, Spin } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo/index";
import UserInfo from "../components/UserInfo";
import useLoadUserData from "../hooks/useLoadUserData";
const { Header, Footer, Sider, Content } = Layout;

const MainLayout: FC = () => {
	const { waitingState } = useLoadUserData();
	return (
		<Layout>
			<Header className={styles.header}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.right}>
					<UserInfo />
				</div>
			</Header>
			<Content className={styles.main}>
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
			</Content>
			<Footer className={styles.footer}>
				问卷系统 &copy; 2024- present. Created by 阿娟蛋
			</Footer>
		</Layout>
	);
};
export default MainLayout;
