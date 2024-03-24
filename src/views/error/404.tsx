import { FC } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATHNAME } from "../../routers";
const NotFound: FC = () => {
	const nav = useNavigate();
	return (
		<Result
			status="404"
			title="404"
			subTitle="抱歉，您访问的页面不存在"
			extra={
				<Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
					返回首页
				</Button>
			}
		/>
	);
};
export default NotFound;
