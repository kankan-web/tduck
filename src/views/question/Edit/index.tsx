import React, { FC, useEffect } from "react";
// import useLoadQuestioin from "../../../hooks/useLoadQuestion";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";

const Edit: FC = () => {
	// const { loading, error } = useLoadQuestioin();
	const { loading, error } = useLoadQuestionData();

	return (
		<div className={styles.container}>
			<div style={{ backgroundColor: "#fff" }}>Header</div>
			<div className={styles["content-wrapper"]}>
				<div className={styles.content}>
					<div className={styles.left}>Left</div>
					<div className={styles.main}>
						<div className={styles["canvas-wrapper"]}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>Right</div>
				</div>
			</div>
		</div>
	);
};
export default Edit;
