import { FC } from "react";
import { Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import Lib from "./ComponentLib/ComponentLib";
import Layers from "./Layers/Layers";

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
			children: <Layers />
		}
	];
	return <Tabs items={tabsItems} defaultActiveKey="componentLib" />;
};
export default LeftPanel;
