import { FC } from "react";
import { Typography } from "antd";
import { componentConfigGroup } from "../../../../../components/QuestionComponent";

const { Title } = Typography;
const Lib: FC = () => {
	return (
		<>
			{componentConfigGroup.map((group, index) => {
				const { groupId, groupName } = group;
				return (
					<div key={groupId}>
						<Title
							level={3}
							style={{ fontSize: "16px", marginTop: index > 0 ? "16px" : "0" }}
						>
							{groupName}
						</Title>
					</div>
				);
			})}
		</>
	);
};
export default Lib;
