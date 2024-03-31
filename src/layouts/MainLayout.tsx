import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Flex } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo/index";
import UserInfo from "../components/UserInfo";
const { Header, Footer, Sider, Content } = Layout;

const MainLayout: FC = () => {
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
				<Outlet />
			</Content>
			<Footer className={styles.footer}>
				问卷系统 &copy; 2024- present. Created by 阿娟蛋
			</Footer>
		</Layout>
	);
};
export default MainLayout;
