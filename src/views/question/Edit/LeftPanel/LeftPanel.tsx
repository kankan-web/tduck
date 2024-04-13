import { FC } from "react";
import { Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import Lib from "./ComponentLib/ComponentLib";

const LeftPanel: FC = () => {
	const tabsItems = [
		{
			key: "componentLid",
			label: (
				<span>
					<AppstoreOutlined />
					组件库
				</span>
			),
			children: <Lib />
		},
		{
			key: "layers",
			label: (
				<span>
					<BarsOutlined />
					图层
				</span>
			),
			children: <div>图层</div>
		}
	];
	return <Tabs items={tabsItems} defaultActiveKey="componentLib" />;
};
export default LeftPanel;
