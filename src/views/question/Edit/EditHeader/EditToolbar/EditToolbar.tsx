import { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
	removeSelectedComponent,
	changeComponentHidden
} from "@/stores/componentsReducer";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
	const dispatch = useDispatch();
	const { selectedId } = useGetComponentInfo();
	//删除组件
	function handleDelete() {
		dispatch(removeSelectedComponent());
	}
	//隐藏组件
	function handleHidden() {
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
	}
	return (
		<Space>
			<Tooltip title="删除">
				<Button
					shape="circle"
					icon={<DeleteOutlined />}
					onClick={handleDelete}
				></Button>
			</Tooltip>
			<Tooltip title="隐藏">
				<Button
					shape="circle"
					icon={<EyeInvisibleOutlined />}
					onClick={handleHidden}
				></Button>
			</Tooltip>
		</Space>
	);
};

export default EditToolbar;
