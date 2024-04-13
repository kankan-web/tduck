import { FC } from "react";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import {
	componentConfigGroup,
	ComponentConfigType
} from "../../../../../components/QuestionComponent";
import { addComponent } from "../../../../../stores/componentsReducer";
import styles from "./ComponentLib.module.scss";

const { Title } = Typography;
function getComponent(c: ComponentConfigType) {
	const { title, type, Component, defaultProps } = c;
	const dispatch = useDispatch();

	function handleClick() {
		dispatch(
			addComponent({
				fe_id: nanoid(),
				title,
				type,
				props: defaultProps
			})
		);
	}
	return (
		<div key={type} className={styles.wrapper} onClick={handleClick}>
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
