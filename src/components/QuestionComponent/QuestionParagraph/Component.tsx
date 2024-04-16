import { FC } from "react";
import { Typography } from "antd";
import {
	QuestionParagraphDefaultProps,
	QuestionParagraphPropsType
} from "./type";

const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (
	prop: QuestionParagraphPropsType
) => {
	const { text = "", isCenter = false } = {
		...QuestionParagraphDefaultProps,
		...prop
	};
	// 尽量不要使用 dangerouslySetInnerHTML ，不安全

	const textList = text.split("\n"); // 例如 ['hello', '123', '456']

	return (
		<Paragraph
			style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0" }}
		>
			{textList.map((t, index) => (
				<span key={index}>
					{index > 0 && <br />}
					{t}
				</span>
			))}
		</Paragraph>
	);
};
export default Component;
