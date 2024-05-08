import Component from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";
import { QuestionRadioDefaultProps } from "./type";

export * from "./type";

//单选组件设置
export default {
	title: "单选",
	type: "questionRadio",
	Component,
	PropComponent,
	defaultProps: QuestionRadioDefaultProps,
	StatComponent
};
