import React, { FC, useEffect } from "react";
import { Space, Typography, Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { REGISTER_PATHNAME } from "../../../routers";
const { Title } = Typography;

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";
const rememberUser = (username: string, password: string) => {
	localStorage.setItem(USERNAME_KEY, username);
	localStorage.setItem(PASSWORD_KEY, password);
};
const deleteUserFromStorage = () => {
	localStorage.removeItem(USERNAME_KEY);
	localStorage.removeItem(PASSWORD_KEY);
};
const getUserInfoFromStorage = () => {
	const username = localStorage.getItem(USERNAME_KEY);
	const password = localStorage.getItem(PASSWORD_KEY);
	return { username, password };
};
const Login: FC = () => {
	const [form] = Form.useForm(); //第三方hook
	useEffect(() => {
		const { username, password } = getUserInfoFromStorage();
		form.setFieldsValue({ username, password });
	}, []);
	const onFinsh = (value: any) => {
		const { username, password, remember } = value;
		if (remember) {
			rememberUser(username, password);
		} else {
			deleteUserFromStorage();
		}
	};
	return (
		<div className={styles.container}>
			<div>
				<Space>
					<Title level={2}>
						<UserAddOutlined />
					</Title>
					<Title level={2}>登陆</Title>
				</Space>
			</div>
			<div>
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 20 }}
					onFinish={onFinsh}
					initialValues={{ remember: true }}
					form={form}
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: "请输入用户名" },
							{
								type: "string",
								min: 5,
								max: 20,
								message: "字符长度在5-20之间"
							},
							{ pattern: /^\w+$/, message: "只能是字母数字下划线" }
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: "请输入密码" }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="remember"
						valuePropName="checked"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 20 }}
					>
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 20 }}>
						<Space>
							<Button type="primary" htmlType="submit">
								登陆
							</Button>
							<Link to={REGISTER_PATHNAME}>注册新用户</Link>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
export default Login;
