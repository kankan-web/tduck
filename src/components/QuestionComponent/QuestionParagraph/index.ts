import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionParagraphDefaultProps } from "./type";

export * from "./type";

//段落组件设置
export default {
	title: "输入框",
	type: "questionParagraph", //要和后端统一好
	Component, //画布显示的组件
	PropComponent, //修改组件属性显示的组件
	defaultProps: QuestionParagraphDefaultProps
};
