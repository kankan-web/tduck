import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import {
	Typography,
	Empty,
	Table,
	Tag,
	Button,
	Space,
	Modal,
	Spin
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "../common.module.scss";
import useLoadQuestionList from "../../../hooks/useLoadQuestionList";
import { ListSearch } from "../../../components/index";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
	useTitle("阿蛋问卷 - 回收站");
	const { data = {}, loading } = useLoadQuestionList({ isDeleted: true });
	const { list = [], total = 0 } = data;

	const [selectedIds, setSelectedIds] = useState<string[]>([]);
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
	const del = () => {
		confirm({
			title: "确定彻底删除该问卷？",
			content: "删除以后不可以找回",
			icon: <ExclamationCircleOutlined />,
			okText: "确定",
			cancelText: "取消",
			onOk: () => {
				alert("彻底删除该问卷");
			}
		});
	};
	//可以将jsx定义为一个变量
	const tableElement = (
		<>
			<div style={{ marginBottom: "16px" }}>
				<Space>
					<Button type="primary" disabled={selectedIds.length === 0}>
						恢复
					</Button>
					<Button danger disabled={selectedIds.length === 0} onClick={del}>
						删除
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
			<div className={styles.footer}>分页</div>
		</>
	);
};
export default Trash;
