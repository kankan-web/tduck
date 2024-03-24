import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
const { Title } = Typography;
const Logo: FC = () => {
	return (
		<div className={styles.container}>
			<Link to="/">
				<Space>
					<Title>
						<FormOutlined />
					</Title>
					<Title>阿蛋问卷</Title>
				</Space>
			</Link>
		</div>
	);
};
export default Logo;
