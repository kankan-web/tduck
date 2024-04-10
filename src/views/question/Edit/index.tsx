import React, { FC, useEffect } from "react";
import useLoadQuestioin from "../../../hooks/useLoadQuestion";
import styles from "./index.module.scss";
const Edit: FC = () => {
	const { loading, data } = useLoadQuestioin();

	return (
		<div className={styles.container}>
			<div style={{ backgroundColor: "#fff" }}>Header</div>
			<div className={styles["content-wrapper"]}>
				<div className={styles.content}>
					<div className={styles.left}>Left</div>
					<div className={styles.main}>
						<div className={styles["canvas-wrapper"]}>
							<div style={{ height: "900px" }}>画布，测试滚动</div>
						</div>
					</div>
					<div className={styles.right}>Right</div>
				</div>
			</div>
		</div>
	);
};
export default Edit;
