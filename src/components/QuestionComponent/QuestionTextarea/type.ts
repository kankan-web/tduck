export type QuestionTextAreaPropsType = {
	title?: string;
	placeholder?: string;
	onChange?: (newProps: QuestionTextAreaPropsType) => void;
	disabled?: boolean;
};
export const QuestionTextAreaDefaultProps: QuestionTextAreaPropsType = {
	title: "输入框标题",
	placeholder: "请输入",
	disabled: false
};
