import type { FC } from "react";
import QuestionInputConfig, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConfig, {
	QuestionParagraphPropsType
} from "./QuestionParagraph";
import QuestionInfoConfig, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextAreaConfig, {
	QuestionTextAreaPropsType
} from "./QuestionTextarea";
import QuestionRadioConfig, { QuestionRadioPropsType } from "./QuestionRadio";
import QuestionCheckboxConfig, {
	QuestionCheckboxPropsType
} from "./QuestionCheckbox";

//统一，各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType &
	QuestionTitlePropsType &
	QuestionParagraphPropsType &
	QuestionInfoPropsType &
	QuestionTextAreaPropsType &
	QuestionRadioPropsType &
	QuestionCheckboxPropsType;

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
	QuestionTitleConfig,
	QuestionParagraphConfig,
	QuestionInfoConfig,
	QuestionTextAreaConfig,
	QuestionRadioConfig,
	QuestionCheckboxConfig
];

//组件分组
export const componentConfigGroup = [
	{
		groupId: "textGroup",
		groupName: "文本显示",
		components: [
			QuestionInfoConfig,
			QuestionTitleConfig,
			QuestionParagraphConfig
		]
	},
	{
		groupId: "inputGroup",
		groupName: "用户输入",
		components: [QuestionInputConfig, QuestionTextAreaConfig]
	},
	{
		groupId: "chooseGroup",
		groupName: "选择",
		components: [QuestionRadioConfig, QuestionCheckboxConfig]
	}
];

//根据type获取组件的配置
export function getComponentConfigByType(type: string) {
	return componentConfigList.find(item => item.type === type);
}
