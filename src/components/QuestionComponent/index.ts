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
	Component: FC<ComponentPropsType>;
	defaultProps: ComponentPropsType;
};
//全部的组件配置的列表
const componentConfigList: ComponentConfigType[] = [
	QuestionInputConfig,
	QuestionTitleConfig
];
export function getComponentConfigByType(type: string) {
	return componentConfigList.find(item => item.type === type);
}
