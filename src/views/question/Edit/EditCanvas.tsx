import React, { FC } from "react";
import styles from "./editCanvas.module.scss";

//临时静态展示一下 Title Input的效果
import QuestionInput from "../../../components/QuestionComponent/QuestionInput";
import QuestionTitle from "../../../components/QuestionComponent/QuestionTitle";

const EditCanvas: FC = () => {
	return (
		<div className={styles.canvas}>
			<div className={styles["component-wrapper"]}>
				<div className={styles.component}>
					<QuestionTitle />
				</div>
			</div>

			<div className={styles["component-wrapper"]}>
				<div className={styles.component}>
					<QuestionInput />
				</div>
			</div>
		</div>
	);
};

export default EditCanvas;
