import { FC, useEffect, useState } from "react";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import PieDemo from "../PieDemo";
import BarDemo from "../BarDemo";
import { getComponentStatService } from "@/servers/stat";
const { Title } = Typography;
type PropType = {
	selectedComponentId: string;
	selectedComponentType: string;
};
const ChartStat: FC<PropType> = (props: PropType) => {
	const { selectedComponentId, selectedComponentType } = props;
	const { id = "" } = useParams();

	const [stat, setStat] = useState([]);
	const { run } = useRequest(
		async (questionId, componentId) =>
			await getComponentStatService(questionId, componentId),
		{
			manual: true,
			onSuccess(res) {
				console.log("res", res);
				setStat(res.stat);
			}
		}
	);
	useEffect(() => {
		if (selectedComponentId) run(id, selectedComponentId);
	}, [id, selectedComponentId]);

	function getStatElem() {
		if (!selectedComponentId) return <div>未选中组件</div>;
		return <div>{JSON.stringify(stat)}</div>;
	}
	return (
		<>
			<Title level={3}>图标统计</Title>
			<div>
				{/* <PieDemo /> */}
				{/* <BarDemo></BarDemo> */}
				{getStatElem()}
			</div>
		</>
	);
};
export default ChartStat;
