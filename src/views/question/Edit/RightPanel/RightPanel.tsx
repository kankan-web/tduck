import { FC } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp/ComponentProp";

const RightPanel: FC = () => {
	const tabsItems = [
		{
			key: "prop",
			label: (
				<span>
					<FileTextOutlined />
					属性
				</span>
			),
			children: <ComponentProp />
		},
		{
			key: "setting",
			label: (
				<span>
					<SettingOutlined />
					页面设置
				</span>
			),
			children: <div>页面设置</div>
		}
	];
	return <Tabs items={tabsItems} defaultActiveKey="componentLib" />;
};
export default RightPanel;
