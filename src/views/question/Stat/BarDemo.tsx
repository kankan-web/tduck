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

const data = [
	{
		name: "Page A",
		uv: 4000
	},
	{
		name: "Page B",
		uv: 3000
	},
	{
		name: "Page C",
		uv: 2000
	},
	{
		name: "Page D",
		uv: 2780
	},
	{
		name: "Page E",
		uv: 1890
	},
	{
		name: "Page F",
		uv: 2390
	},
	{
		name: "Page G",
		uv: 3490
	}
];
const BarDemo: FC = () => {
	return (
		<div style={{ width: "300px", height: "400px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={300}
					height={400}
					data={data}
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
						dataKey="uv"
						fill="#82ca9d"
						activeBar={<Rectangle fill="gold" stroke="purple" />}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
export default BarDemo;
