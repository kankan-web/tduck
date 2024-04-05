import { message } from "antd";
import axios from "axios";
import { getToken } from "../util/user-token";
const instance = axios.create({
	timeout: 10 * 1000
});
//request拦截：每次请求都要带上token
instance.interceptors.request.use(
	config => {
		config.headers["Authorization"] = `Bearer ${getToken()}`;
		return config;
	},
	error => Promise.reject(error)
);
//response拦截：统一处理errno和msg
instance.interceptors.response.use(res => {
	const resData = (res.data || {}) as ResType;
	const { code, data, msg } = resData;
	if (code !== "S001") {
		if (msg) {
			message.error(msg);
		}
		throw new Error(msg);
	}
	return data as any;
});

export default instance;
export type ResType = {
	code: string;
	data?: ResDataType;
	msg: string;
};
export type ResDataType = {
	[key: string]: any;
};
