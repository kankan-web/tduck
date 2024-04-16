import { FC } from "react";
import { Input, Form } from "antd";
import { QuestionInfoPropsType, QuestionInfoDefaultPropsType } from "./type";

const { TextArea } = Input;
const PropComponent: FC<QuestionInfoPropsType> = (
	props: QuestionInfoPropsType
) => {
	const { title, desc, disabled, onChange } = {
		...QuestionInfoDefaultPropsType,
		...props
	};
	const [form] = Form.useForm();

	function handleValuesChange() {
		if (onChange) {
			onChange(form.getFieldsValue());
		}
	}
	return (
		<Form
			layout="vertical"
			initialValues={{ title, desc }}
			onValuesChange={handleValuesChange}
			disabled={disabled}
			form={form}
		>
			<Form.Item
				label="标题"
				name="title"
				rules={[{ required: true, message: "请输入问卷标题" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="描述" name="desc">
				<TextArea />
			</Form.Item>
		</Form>
	);
};
export default PropComponent;
