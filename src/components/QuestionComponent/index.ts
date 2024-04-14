import type { FC } from "react";
import QuestionInputConfig, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { QuestionTitlePropsType } from "./QuestionTitle";

//统一，各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType &
	QuestionTitlePropsType;

//统一，组件的配置
export type ComponentConfigType = {
	title: string;
	type: string;
	//MARK:通过这种方式来定义组件数据的类型
	Component: FC<ComponentPropsType>;
	PropComponent: FC<ComponentPropsType>;
	defaultProps: ComponentPropsType;
};

//全部的组件配置的列表
const componentConfigList: ComponentConfigType[] = [
	QuestionInputConfig,
	QuestionTitleConfig
];
//组件分组
export const componentConfigGroup = [
	{
		groupId: "textGroup",
		groupName: "文本显示",
		components: [QuestionTitleConfig]
	},
	{
		groupId: "inputGroup",
		groupName: "用户输入",
		components: [QuestionInputConfig]
	}
];

//根据type获取组件的配置
export function getComponentConfigByType(type: string) {
	return componentConfigList.find(item => item.type === type);
}
