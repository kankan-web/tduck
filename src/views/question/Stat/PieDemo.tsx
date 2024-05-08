import React, { FC } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { STAT_COLORS } from "@/constant/index";

const data01 = [
	{ name: "Group A", value: 400 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 300 },
	{ name: "Group D", value: 200 },
	{ name: "Group E", value: 278 },
	{ name: "Group F", value: 189 }
];
const PieDemo: FC = () => {
	return (
		<div style={{ width: "300px", height: "400px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						dataKey="value"
						data={data01}
						cx="50%"
						cy="50%"
						outerRadius={80}
						fill="#8884d8"
						label={i => `${i.name}:${i.value}`}
					>
						{data01.map((i, index) => {
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
export default PieDemo;
