import React, { FC, useState } from "react";
import { useTitle, useDebounceFn, useRequest } from "ahooks";
import { Typography, Empty, Spin } from "antd";
import styles from "../common.module.scss";
import QuestionCard from "../../../components/QuestionCard";
import useLoadQuestionList from "../../../hooks/useLoadQuestionList";
import { ListSearch, ListPage } from "../../../components/index";
const { Title } = Typography;
const Star: FC = () => {
	useTitle("阿蛋问卷 - 星标问卷");
	//方法二：使用use Request
	// const { data = {}, loading } = useRequest(getQuestionListService);
	//方法三：使用自定义hooks
	const { data = {}, loading } = useLoadQuestionList({ isStar: true });
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
					<Title level={3}>星标问卷</Title>
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
				{!loading && list.length === 0 && <Empty description="暂无数据" />}
				{!loading &&
					list.length > 0 &&
					list.map((q: any) => {
						const { _id } = q;
						return <QuestionCard key={_id} {...q} />;
					})}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	);
};
export default Star;
