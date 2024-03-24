import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Flex } from "antd";
import styles from "./MainLayout.module.scss";
const { Header, Footer, Sider, Content } = Layout;

const MainLayout: FC = () => {
	return (
		<Layout>
			<Header className={styles.head}>
				<div className={styles.left}>Logo</div>
				<div className={styles.right}>登陆</div>
			</Header>
			<Content className={styles.main}>
				<Outlet />
			</Content>
			<Footer className={styles.footer}>问卷系统 &copy; 2024- present. Created by 阿娟蛋</Footer>
		</Layout>
	);
};
export default MainLayout;
