import React, { FC } from "react";
import { Spin } from "antd";
import styles from "./editCanvas.module.scss";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ComponentsInfoType } from "../../../stores/componentsReducer";
import { getComponentConfigByType } from "../../../components/QuestionComponent";

//临时静态展示一下 Title Input的效果
// import QuestionInput from "../../../components/QuestionComponent/QuestionInput/Component";
// import QuestionTitle from "../../../components/QuestionComponent/QuestionTitle/Component";
type PropsType = {
	loading: boolean;
};

function getComponent(componentInfo: ComponentsInfoType) {
	console.log("组件结果是：", componentInfo);
	const { type, props } = componentInfo;
	const componentConf = getComponentConfigByType(type);
	if (componentConf == null) return null;
	const { Component } = componentConf;
	return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
	const { componentList } = useGetComponentInfo();
	if (loading) {
		return (
			<div>
				<Spin />
			</div>
		);
	}
	return (
		<div className={styles.canvas}>
			{componentList.map(c => {
				const { fe_id } = c;
				return (
					<div key={fe_id} className={styles["component-wrapper"]}>
						<div className={styles.component}>{getComponent(c)}</div>
					</div>
				);
			})}
			{/* <div className={styles["component-wrapper"]}>
				<div className={styles.component}>
					<QuestionTitle />
				</div>
			</div>

			<div className={styles["component-wrapper"]}>
				<div className={styles.component}>
					<QuestionInput />
				</div>
			</div> */}
		</div>
	);
};

export default EditCanvas;
