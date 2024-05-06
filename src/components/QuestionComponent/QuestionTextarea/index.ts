/**
 * @description 问卷 多行输入框
 * @author 双越老师
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTextAreaDefaultProps } from "./type";

export * from "./type";

// Title 组件的配置
export default {
	title: "输入框",
	type: "questionTextarea", // 要和后端统一好
	Component, //画布显示的组件
	PropComponent, //修改组件属性显示的组件
	defaultProps: QuestionTextAreaDefaultProps
};
