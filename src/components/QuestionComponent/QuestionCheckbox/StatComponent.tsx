import React, { FC, PureComponent } from "react";
import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";
import { QuestionCheckboxStatPropsType } from "./type";

const BarDemo: FC<QuestionCheckboxStatPropsType> = ({ stat = [] }) => {
	return (
		<div style={{ width: "300px", height: "400px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={300}
					height={400}
					data={stat}
					margin={{
						top: 5,
						right: 30,
						left: 0,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />

					<Bar
						dataKey="count"
						fill="#82ca9d"
						activeBar={<Rectangle fill="gold" stroke="purple" />}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
export default BarDemo;
