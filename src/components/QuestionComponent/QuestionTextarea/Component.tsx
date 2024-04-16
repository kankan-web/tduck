import React, { FC } from "react";
import { Typography, Input } from "antd";
import {
	QuestionTextAreaPropsType,
	QuestionTextAreaDefaultProps
} from "./type";

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextArea: FC<QuestionTextAreaPropsType> = (
	props: QuestionTextAreaPropsType
) => {
	const { title, placeholder } = { ...QuestionTextAreaDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<TextArea placeholder={placeholder}></TextArea>
			</div>
		</div>
	);
};
export default QuestionTextArea;
