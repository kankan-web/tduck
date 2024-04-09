import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../../routers/constant";
import styles from "./index.module.scss";
import axios from "axios";
const { Title, Paragraph } = Typography;
const Home: FC = () => {
	const nav = useNavigate();
	useEffect(() => {
		axios.get("/api/test").then(res => {
			console.log(res);
		});
	}, []);
	return (
		<div>
			<div className={styles.container}>
				<Title>问卷调查｜在线投票</Title>
				<Paragraph>
					已经累计创建问卷 100份，发布问卷90份，收到答卷980份
				</Paragraph>
				<div>
					<Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
						开始使用
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Home;
