import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
	EditOutlined,
	LineChartOutlined,
	StarOutlined,
	CopyOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import {
	updateQuestionService,
	duplicateQuestionService
} from "../../servers/question";
type PropsType = {
	_id: string; // 服务端 mongodb ，自动，_id 不重复
	title: string;
	isStar: boolean;
	isPublished: boolean;
	answerCount: number;
	createdAt: string;
};
const { confirm } = Modal;
const QuestionCard: FC<PropsType> = (props: PropsType) => {
	const nav = useNavigate();
	const { _id, title, createdAt, answerCount, isPublished, isStar } = props;
	//修改标星
	const [isStarState, setIsStarState] = useState(isStar);
	const { loading: ChangeStartLoading, run: changeStar } = useRequest(
		async () => {
			await updateQuestionService(_id, {
				isStar: !isStarState
			});
		},
		{
			manual: true,
			onSuccess() {
				setIsStarState(!isStarState); //更新星标
				message.success("更新成功");
			}
		}
	);
	//复制问卷
	const { loading: duplicateLoading, run: duplicate } = useRequest(
		async () => await duplicateQuestionService(_id),
		{
			manual: true,
			onSuccess(res: any) {
				message.success("复制成功");
				nav(`/question/edit/${res._id}`); //跳转到问卷
			}
		}
	);
	//删除问卷
	const [isDeletedState, setIsDeletedState] = useState(false);
	const { loading: deleteLoading, run: deleteQuestion } = useRequest(
		async () => await updateQuestionService(_id, { isDeleted: true }),
		{
			manual: true,
			onSuccess() {
				message.success("删除成功");
				setIsDeletedState(true);
			}
		}
	);
	//如果已经删除的问卷，那么就不要再渲染卡片了
	if (isDeletedState) return null;
	const del = () => {
		confirm({
			title: "确定删除问卷？",
			okText: "删除",
			cancelText: "取消",
			icon: <ExclamationCircleOutlined />,
			onOk: deleteQuestion,
			onCancel: () => message.info("取消删除")
		});
	};
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.left}>
					<Link
						to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
					>
						<Space>
							{isStarState && <StarOutlined style={{ color: "red" }} />}
							{title}
						</Space>
					</Link>
				</div>
				<div className={styles.right}>
					<Space>
						<div className={styles.right}>
							{isPublished ? (
								<Tag color="processing">已发布</Tag>
							) : (
								<Tag>未发布</Tag>
							)}
						</div>
						<span>答卷:{answerCount}</span>
						<span>{createdAt}</span>
					</Space>
				</div>
			</div>
			<Divider style={{ margin: "12px 0" }} />
			<div className={styles["button-container"]}>
				<div className={styles.left}>
					<Space>
						<Button
							icon={<EditOutlined />}
							type="text"
							size="small"
							onClick={() => nav(`/question/edit/${_id}`)}
						>
							编辑问卷
						</Button>
						<Button
							icon={<LineChartOutlined />}
							type="text"
							size="small"
							onClick={() => nav(`/question/stat/${_id}`)}
						>
							问卷统计
						</Button>
					</Space>
				</div>
				<div className={styles.right}>
					<Space>
						<Button
							type="text"
							icon={<StarOutlined />}
							size="small"
							onClick={changeStar}
							disabled={ChangeStartLoading}
						>
							{isStarState ? "取消星标" : "标星"}
						</Button>
						<Popconfirm
							title="是否要复制问卷"
							onConfirm={duplicate}
							okText="确定"
							cancelText="取消"
						>
							<Button
								type="text"
								icon={<CopyOutlined />}
								size="small"
								disabled={duplicateLoading}
							>
								复制
							</Button>
						</Popconfirm>

						<Button
							type="text"
							icon={<DeleteOutlined />}
							size="small"
							onClick={del}
							disabled={deleteLoading}
						>
							删除
						</Button>
					</Space>
				</div>
			</div>
		</div>
	);
};
export default QuestionCard;
