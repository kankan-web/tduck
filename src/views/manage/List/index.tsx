import React, { FC, useEffect, useState } from "react";
import { useTitle, useRequest } from "ahooks";
import { Typography, Spin } from "antd";
import styles from "../common.module.scss";
import { ListSearch, QuestionCard } from "../../../components/index";
import useLoadQuestionList from "../../../hooks/useLoadQuestionList";
const { Title } = Typography;
const List: FC = () => {
	useTitle("阿蛋问卷 - 我的问卷");
	//方法二：使用use Request
	// const { data = {}, loading } = useRequest(getQuestionListService);
	//方法三：使用自定义hooks
	const { data = {}, loading } = useLoadQuestionList();
	const { list = [], total = 0 } = data;
	// 方法一：代码直接书写
	// const [questionList, setQuestionList] = useState([]);
	// const [total, setTotal] = useState(0);
	// useEffect(() => {
	// 	async function load() {
	// 		const data = await getQuestionListService();
	// 		const { list = [], total = 0 } = data;
	// 		setQuestionList(list);
	// 		setTotal(total);
	// 	}
	// 	load();
	// }, []);
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<div style={{ textAlign: "center", paddingTop: "100px" }}>
						<Spin />
					</div>
				)}
				{/* 问卷列表 */}
				{!loading &&
					list.length > 0 &&
					list.map((q: any) => {
						const { _id } = q;
						return <QuestionCard key={_id} {...q} />;
					})}
			</div>
			<div className={styles.footer}>loaderMore...上划加载更多...</div>
		</>
	);
};
export default List;
