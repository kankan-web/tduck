import { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	UnlockOutlined,
	CopyOutlined,
	BlockOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLocked,
	copySelectComponent,
	pasteCopiedComponent
} from "@/stores/componentsReducer";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
	const dispatch = useDispatch();
	const { selectedId, selectedComponent, copiedComponent } =
		useGetComponentInfo();
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
	//复制组件
	function copy() {
		dispatch(copySelectComponent());
	}
	//粘贴组件
	function paste() {
		dispatch(pasteCopiedComponent());
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
			<Tooltip title="复制">
				<Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
			</Tooltip>
			<Tooltip title="粘贴">
				<Button
					shape="circle"
					icon={<BlockOutlined />}
					onClick={paste}
					disabled={copiedComponent == null}
				></Button>
			</Tooltip>
		</Space>
	);
};

export default EditToolbar;
