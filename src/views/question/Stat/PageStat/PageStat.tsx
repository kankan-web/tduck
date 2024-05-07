import React, { FC, useState } from "react";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { Typography, Spin, Table, Pagination } from "antd";
import { getQuestionStatListService } from "@/servers/stat";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { STAT_PAGE_SIZE } from "@/constant/index";

type PropsType = {
	selectedComponentId: string;
	setSelectedComponentId: (id: string) => void;
	setSelectedComponentType: (type: string) => void;
};
const { Title } = Typography;
const PageStat: FC<PropsType> = (props: PropsType) => {
	const {
		selectedComponentId,
		setSelectedComponentId,
		setSelectedComponentType
	} = props;
	const { id = "" } = useParams();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
	const [total, setTotal] = useState(0);
	const [list, setList] = useState([]);
	const { componentList } = useGetComponentInfo();
	const { loading } = useRequest(
		async () => {
			const res = await getQuestionStatListService(id, {
				page,
				pageSize
			});
			return res;
		},
		{
			refreshDeps: [id, page, pageSize],
			onSuccess(res) {
				const { total, list = [] } = res;
				console.log("shuj1", total, list);
				setTotal(total);
				setList(list);
			}
		}
	);

	const columns = componentList.map(c => {
		const { fe_id, title, props = {}, type } = c;
		const colTitle = props!.title || title;
		return {
			title: (
				<div
					style={{ cursor: "pointer" }}
					onClick={() => {
						setSelectedComponentId(fe_id);
						setSelectedComponentType(type);
					}}
				>
					<span
						style={{
							color: fe_id === selectedComponentId ? "#1890ff" : "inherit"
						}}
					>
						{colTitle}
					</span>
				</div>
			),
			dataIndex: fe_id
		};
	});

	const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
	const TableElem = (
		<>
			<Table columns={columns} dataSource={dataSource} pagination={false} />
			<div style={{ textAlign: "center", marginTop: "20px" }}>
				<Pagination
					total={total}
					pageSize={pageSize}
					current={page}
					onChange={page => setPage(page)}
					onShowSizeChange={(page, pageSize) => {
						setPageSize(pageSize);
						setPage(page);
					}}
				/>
			</div>
		</>
	);
	return (
		<div>
			<Title level={3}>答卷数量：{!loading && total}</Title>
			{loading && (
				<div style={{ textAlign: "center" }}>
					<Spin />
				</div>
			)}
			{!loading && TableElem}
		</div>
	);
};
export default PageStat;
