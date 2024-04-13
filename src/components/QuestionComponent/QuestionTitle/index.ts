import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTitleDefaultProps } from "./type";

export * from "./type";
//Title组件的配置
export default {
	title: "标题",
	type: "questionTitle",
	PropComponent,
	Component,
	defaultProps: QuestionTitleDefaultProps
};
