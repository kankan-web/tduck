import React, { FC, useState } from "react";
import { useRequest, useTitle } from "ahooks";
import {
	Typography,
	Empty,
	Table,
	Tag,
	Button,
	Space,
	Modal,
	Spin,
	message
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "../common.module.scss";
import useLoadQuestionList from "../../../hooks/useLoadQuestionList";
import { ListSearch, ListPage } from "../../../components/index";
import {
	updateQuestionService,
	deleteQuestionsService
} from "../../../servers/question";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
	useTitle("阿蛋问卷 - 回收站");
	const {
		data = {},
		loading,
		refresh
	} = useLoadQuestionList({ isDeleted: true });
	const { list = [], total = 0 } = data;
	//记录选中的id
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	//恢复
	const { run: recover } = useRequest(
		async () => {
			for await (const id of selectedIds) {
				await updateQuestionService(id, { isDeleted: false });
			}
		},
		{
			manual: true,
			debounceWait: 500, //防抖
			onSuccess() {
				message.success("恢复成功");
				refresh(); //批量删除后手动刷新页面
				setSelectedIds([]);
			}
		}
	);

	//彻底删除
	const { run: deleteQuestion } = useRequest(
		async () => {
			await deleteQuestionsService(selectedIds);
		},
		{
			manual: true,
			onSuccess() {
				message.success("删除成功");
				refresh();
				setSelectedIds([]);
			}
		}
	);
	const del = () => {
		confirm({
			title: "确定彻底删除该问卷？",
			content: "删除以后不可以找回",
			icon: <ExclamationCircleOutlined />,
			okText: "确定",
			cancelText: "取消",
			onOk: deleteQuestion
		});
	};
	const TableColumns = [
		{
			title: "标题",
			dataIndex: "title"
			// key:'title'//循环列的key，他会默认取dataIndex的值
		},
		{
			title: "是否发布",
			dataIndex: "isPublished",
			render: (isPublished: boolean) => {
				return isPublished ? (
					<Tag color="processing">已发布</Tag>
				) : (
					<Tag>未发布</Tag>
				);
			}
		},
		{
			title: "答卷",
			dataIndex: "answerCount"
		},
		{
			title: "创建时间",
			dataIndex: "createdAt"
		}
	];
	//可以将jsx定义为一个变量
	const tableElement = (
		<>
			<div style={{ marginBottom: "16px" }}>
				<Space>
					<Button
						type="primary"
						disabled={selectedIds.length === 0}
						onClick={recover}
					>
						恢复
					</Button>
					<Button danger disabled={selectedIds.length === 0} onClick={del}>
						彻底删除
					</Button>
				</Space>
			</div>
			<Table
				dataSource={list}
				columns={TableColumns}
				rowKey={q => q._id}
				pagination={false}
				rowSelection={{
					type: "checkbox",
					onChange: selectedRowKeys => {
						setSelectedIds(selectedRowKeys as string[]);
					}
				}}
			/>
		</>
	);
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<div style={{ textAlign: "center", paddingTop: "100px" }}>
						<Spin />
					</div>
				)}
				{/* 问卷列表 */}
				{!loading && list.length === 0 && <Empty description="暂无数据" />}
				{!loading && list.length > 0 && tableElement}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	);
};
export default Trash;
