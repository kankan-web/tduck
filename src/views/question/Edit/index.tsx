import React, { FC, useEffect } from "react";
// import useLoadQuestioin from "../../../hooks/useLoadQuestion";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas/EditCanvas";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import EditHeader from "./EditHeader/EditHeader";
import { useDispatch } from "react-redux";
import { useTitle } from "ahooks";
import { changeSelectedId } from "@/stores/componentsReducer";
import useGetPageInfo from "@/hooks/useGetPageInfo";

const Edit: FC = () => {
	// const { loading, error } = useLoadQuestioin();
	const { loading, error } = useLoadQuestionData();
	const { title } = useGetPageInfo();
	useTitle(`问卷编辑 - ${title}`);

	const dispatch = useDispatch();
	function clearSelectedId() {
		dispatch(changeSelectedId(""));
	}

	return (
		<div className={styles.container}>
			<EditHeader />
			<div className={styles["content-wrapper"]}>
				<div className={styles.content}>
					<div className={styles.left}>
						<LeftPanel />
					</div>
					<div className={styles.main} onClick={clearSelectedId}>
						<div className={styles["canvas-wrapper"]}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Edit;
