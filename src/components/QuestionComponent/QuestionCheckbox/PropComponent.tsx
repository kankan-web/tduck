import { FC } from "react";
import { Checkbox, Form, Input } from "antd";
import {
	QuestionCheckboxDefaultProps,
	QuestionCheckboxPropsType
} from "./type";

const PropComponent: FC<QuestionCheckboxPropsType> = (
	props: QuestionCheckboxPropsType
) => {
	const { title, isVertical, list = [], onChange, disabled } = props;
	const [form] = Form.useForm();
	function handleValuesChange() {
		//调用onChange
	}
	return (
		<Form
			layout="vertical"
			form={form}
			initialValues={{ title, isVertical, list }}
			disabled={disabled}
			onValuesChange={handleValuesChange}
		>
			<Form.Item
				label="标题"
				name="title"
				rules={[{ required: true, message: "请输入标题" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	);
};
export default PropComponent;
