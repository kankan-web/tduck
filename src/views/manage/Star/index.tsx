import React, { FC, useState } from "react";
import { useTitle, useDebounceFn, useRequest } from "ahooks";
import { Typography, Empty } from "antd";
import styles from "../common.module.scss";
import QuestionCard from "../../../components/QuestionCard";
const { Title } = Typography;
const Star: FC = () => {
	useTitle("阿蛋问卷 - 星标问卷");
	const [questionList, setQuestionList] = useState([
		{ _id: "q1", title: "问卷1", isPublished: false, isStar: true, answerCount: 3, createdAt: "3月10日 13:23" },
		{ _id: "q3", title: "问卷3", isPublished: false, isStar: true, answerCount: 3, createdAt: "3月12日 13:23" }
	]);
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>星标问卷</Title>
				</div>
				<div className={styles.right}>搜索</div>
			</div>
			<div className={styles.content}>
				{/* 问卷列表 */}
				{questionList.length === 0 && <Empty description="暂无数据" />}
				{questionList.length > 0 &&
					questionList.map(q => {
						const { _id } = q;
						return <QuestionCard key={_id} {...q} />;
					})}
			</div>
			<div className={styles.footer}>分页</div>
		</>
	);
};
export default Star;
