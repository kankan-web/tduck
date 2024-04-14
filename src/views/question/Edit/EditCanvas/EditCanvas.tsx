import React, { FC, MouseEvent } from "react";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import styles from "./EditCanvas.module.scss";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { ComponentsInfoType } from "../../../../stores/componentsReducer";
import { getComponentConfigByType } from "../../../../components/QuestionComponent";
import { changeSelectedId } from "../../../../stores/componentsReducer";

//临时静态展示一下 Title Input的效果
// import QuestionInput from "../../../components/QuestionComponent/QuestionInput/Component";
// import QuestionTitle from "../../../components/QuestionComponent/QuestionTitle/Component";
type PropsType = {
	loading: boolean;
};

function getComponent(componentInfo: ComponentsInfoType) {
	const { type, props } = componentInfo;
	const componentConf = getComponentConfigByType(type);
	if (componentConf == null) return null;
	const { Component } = componentConf;
	return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
	const { componentList, selectedId } = useGetComponentInfo();
	const dispatch = useDispatch();

	function handleClick(event: MouseEvent, id: string) {
		event.stopPropagation();
		dispatch(changeSelectedId(id));
	}
	if (loading) {
		return (
			<div style={{ textAlign: "center", marginTop: "24px" }}>
				<Spin />
			</div>
		);
	}
	return (
		<div className={styles.canvas}>
			{componentList
				.filter(c => !c.isHidden)
				.map(c => {
					const { fe_id, isLocked } = c;
					//拼接class name
					const wrapperDefaultClassName = styles["component-wrapper"];
					const selectedClassName = styles.selected;
					const lockedClassName = styles.locked;
					const wrapperClassName = classNames({
						[wrapperDefaultClassName]: true,
						[selectedClassName]: fe_id === selectedId,
						[lockedClassName]: isLocked
					});
					return (
						<div
							key={fe_id}
							className={wrapperClassName}
							onClick={e => handleClick(e, fe_id)}
						>
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
