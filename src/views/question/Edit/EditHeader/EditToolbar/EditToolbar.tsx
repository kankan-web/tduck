import { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	UnlockOutlined,
	CopyOutlined,
	BlockOutlined,
	UpOutlined,
	DownOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLocked,
	copySelectComponent,
	pasteCopiedComponent,
	moveComponent
} from "@/stores/componentsReducer";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
	const dispatch = useDispatch();
	const { selectedId, selectedComponent, copiedComponent, componentList } =
		useGetComponentInfo();
	const { isLocked } = selectedComponent || {};
	const length = componentList.length;
	const selectedIndex = componentList.findIndex(
		item => item.fe_id === selectedId
	);
	const isFirst = selectedIndex <= 0; //第一个
	const isLast = selectedIndex >= length - 1; //最后一个

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
	//上移组件
	function moveUp() {
		if (isFirst) return;
		dispatch(
			moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 })
		);
	}
	//下移组件
	function moveDown() {
		if (isLast) return;
		dispatch(
			moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 })
		);
	}
	//TODO：撤销、重做
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
			<Tooltip title="上移">
				<Button
					shape="circle"
					icon={<UpOutlined />}
					onClick={moveUp}
					disabled={isFirst}
				></Button>
			</Tooltip>
			<Tooltip title="下移">
				<Button
					shape="circle"
					icon={<DownOutlined />}
					onClick={moveDown}
					disabled={isLast}
				></Button>
			</Tooltip>
		</Space>
	);
};

export default EditToolbar;
