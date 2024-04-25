import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import { Spin, Result, Button } from "antd";
import useLoadQuestionData from "@/hooks/useLoadQuestionData";
import useGetPageInfo from "@/hooks/useGetPageInfo";
import styles from "./index.module.scss";

const Stat: FC = () => {
	const nav = useNavigate();
	const { loading } = useLoadQuestionData();
	const { isPublished, title } = useGetPageInfo();
	//修改标题
	useTitle(`问卷统计-${title}`);

	//loading Element
	const loadingElem = (
		<div style={{ textAlign: "center", marginTop: "60px" }}>
			<Spin />
		</div>
	);
	//content Elem
	function getContentElem() {
		if (typeof isPublished === "boolean" && !isPublished) {
			return (
				<div style={{ flex: "1" }}>
					<Result
						status="warning"
						title="该页面尚未发布"
						extra={
							<Button type="primary" onClick={() => nav(-1)}>
								返回
							</Button>
						}
					/>
				</div>
			);
		}
		return (
			<>
				<div className={styles.left}>左侧</div>
				<div className={styles.main}>中间</div>
				<div className={styles.right}>右侧</div>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<div>Header</div>
			<div className={styles["content-wrapper"]}>
				{loading && loadingElem}
				{!loading && <div className={styles.content}>{getContentElem()}</div>}
			</div>
		</div>
	);
};
export default Stat;
