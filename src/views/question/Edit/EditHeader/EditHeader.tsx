import { ChangeEvent, FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Space, Typography, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import styles from "./EditHeader.module.scss";
import EditToolbar from "./EditToolbar/EditToolbar";
import useGetPageInfo from "@/hooks/useGetPageInfo";
import { changePageTitle } from "@/stores/pageInfoReducer";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "@/servers/question";

const { Title } = Typography;
//显示和修改标题
const TitleElem: FC = () => {
	const { title } = useGetPageInfo();
	const dispatch = useDispatch();

	const [editState, setEditState] = useState(false);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const newTitle = event.target.value.trim();
		if (!newTitle) return;
		dispatch(changePageTitle(newTitle));
	}

	if (editState) {
		return (
			<Input
				value={title}
				onChange={handleChange}
				onPressEnter={() => setEditState(false)}
				onBlur={() => setEditState(false)}
			/>
		);
	}

	return (
		<Space>
			<Title>{title}</Title>
			<Button
				icon={<EditOutlined />}
				type="text"
				onClick={() => setEditState(true)}
			></Button>
		</Space>
	);
};
//保存
const SaveButton: FC = () => {
	const { id } = useParams();
	const { componentList = [] } = useGetComponentInfo();
	const pageInfo = useGetPageInfo();
	const { loading, run: save } = useRequest(
		async () => {
			if (!id) return;
			await updateQuestionService(id, { ...pageInfo, componentList });
		},
		{ manual: true }
	);
	//快捷键
	useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
		if (!loading) save();
	});
	//#MARK:自动保存（不是定期保存，不是定时器）
	useDebounceEffect(
		() => {
			save();
		},
		[componentList, pageInfo],
		{ wait: 1000 }
	);
	return (
		<Button
			onClick={save}
			disabled={loading}
			icon={loading ? <LoadingOutlined /> : null}
		>
			保存
		</Button>
	);
};
//发布按钮
//删除，假删除 isDelete=true（更新）
//发布，isPublish=true（更新）
const PublishButton: FC = () => {
	const nav = useNavigate();
	const { id } = useParams();
	const { componentList = [] } = useGetComponentInfo();
	const pageInfo = useGetPageInfo();

	const { loading, run: pub } = useRequest(
		async () => {
			if (!id) return;
			await updateQuestionService(id, {
				...pageInfo,
				componentList,
				isPublished: true //标示这问卷已经被发布
			});
		},
		{
			manual: true,
			onSuccess() {
				message.success("发布成功");
				nav("/question/stat/" + id); //发布成功，跳转到统计页面
			}
		}
	);

	return (
		<Button type="primary" onClick={pub} disabled={loading}>
			发布
		</Button>
	);
};
const EditHeader: FC = () => {
	const nav = useNavigate();
	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<TitleElem />
					</Space>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<Space>
						<SaveButton />

						<PublishButton />
					</Space>
				</div>
			</div>
		</div>
	);
};
export default EditHeader;
