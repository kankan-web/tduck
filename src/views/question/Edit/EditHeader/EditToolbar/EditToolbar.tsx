import { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	UnlockOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLocked
} from "@/stores/componentsReducer";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
	const dispatch = useDispatch();
	const { selectedId, selectedComponent } = useGetComponentInfo();
	const { isLocked } = selectedComponent || {};
	//删除组件
	function handleDelete() {
		dispatch(removeSelectedComponent());
	}
	//隐藏组件
	function handleHidden() {
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
	}
	//锁定组件
	function handleLocked() {
		dispatch(toggleComponentLocked({ fe_id: selectedId }));
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
			<Tooltip title={isLocked ? "解锁" : "锁定"}>
				<Button
					shape="circle"
					icon={isLocked ? <UnlockOutlined /> : <LockOutlined />}
					type={isLocked ? "primary" : "default"}
					onClick={handleLocked}
				></Button>
			</Tooltip>
		</Space>
	);
};

export default EditToolbar;
