import React, { FC, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { STAT_COLORS } from "@/constant/index";
import { QuestionRadioStatPropsType } from "./type";
function format(n: number) {
	return (n * 100).toFixed(2);
}
const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
	const sum = useMemo(() => {
		return stat.reduce((acc, cur) => acc + cur.count, 0);
	}, [stat]);
	return (
		<div style={{ width: "300px", height: "400px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						dataKey="count"
						data={stat}
						cx="50%"
						cy="50%"
						outerRadius={80}
						fill="#8884d8"
						label={i => `${i.name}:${format(i.count / sum)}%`}
					>
						{stat.map((i, index) => {
							return (
								<Cell
									key={i.name}
									fill={STAT_COLORS[index % STAT_COLORS.length]}
								/>
							);
						})}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
export default StatComponent;
