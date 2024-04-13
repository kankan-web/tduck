import { FC } from "react";
import { Typography } from "antd";
import {
	componentConfigGroup,
	ComponentConfigType
} from "../../../../../components/QuestionComponent";
import styles from "./ComponentLib.module.scss";

const { Title } = Typography;
function getComponent(c: ComponentConfigType) {
	const { title, type, Component } = c;
	return (
		<div className={styles.wrapper}>
			<div className={styles.component}>
				<Component />
			</div>
		</div>
	);
}
const Lib: FC = () => {
	return (
		<>
			{componentConfigGroup.map((group, index) => {
				const { groupId, groupName, components } = group;
				return (
					<div key={groupId}>
						<Title
							level={3}
							style={{ fontSize: "16px", marginTop: index > 0 ? "16px" : "0" }}
						>
							{groupName}
							<div>{components.map(c => getComponent(c))}</div>
						</Title>
					</div>
				);
			})}
		</>
	);
};
export default Lib;
