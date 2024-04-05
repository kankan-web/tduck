import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTitle, useRequest, useDebounceFn } from "ahooks";
import { Typography, Spin, Empty } from "antd";
import styles from "../common.module.scss";
import { ListSearch, QuestionCard } from "../../../components/index";
import useLoadQuestionList from "../../../hooks/useLoadQuestionList";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../../servers/question.ts";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../../constant";
const { Title } = Typography;
const List: FC = () => {
	useTitle("阿蛋问卷 - 我的问卷");
	const [start, setStart] = useState(false);
	const [page, setPage] = useState(1); //List内部的数据，不在url参数中体现
	const [list, setList] = useState([]); //全部的列表数据，上划加载更多，累计
	const [total, setTotal] = useState(0);
	const haveMoreData = total > list.length;

	const [searchParams] = useSearchParams(); //url参数，虽然没有page pageSize，但有keyword
	const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
	//keyword变化时，重置信息
	useEffect(() => {
		setStart(false);
		setPage(1);
		setList([]);
		setTotal(0);
	}, [keyword]);
	//真正加载
	const { run: load, loading } = useRequest(
		async () => {
			const data = getQuestionListService({
				page,
				pageSize: LIST_PAGE_SIZE,
				keyword
			});
			return data;
		},
		{
			manual: true,
			onSuccess(result) {
				const { list: l = [], total = 0 } = result;
				setList(list.concat(l)); //累积
				setTotal(total);
				setPage(page + 1);
			}
		}
	);
	//触发加载-防抖
	const containerRef = useRef<HTMLDivElement>(null);
	const { run: tryLoadMore } = useDebounceFn(
		() => {
			const elem = containerRef.current;
			if (elem === null) return;
			const domRect = elem.getBoundingClientRect();
			if (domRect === null) return;
			const { bottom } = domRect;
			if (bottom <= document.body.clientHeight) {
				load();
				setStart(true);
			}
		},
		{
			wait: 1000
		}
	);
	//1.当页面加载，或者url参数（keyword）变化时，触发加载
	useEffect(() => {
		tryLoadMore(); //页面初始化
	}, [searchParams]);
	//2.当页面滚动时，要尝试触发加载
	useEffect(() => {
		if (haveMoreData) {
			window.addEventListener("scroll", tryLoadMore); //防抖
		}
		return () => {
			window.removeEventListener("scroll", tryLoadMore); //接绑事件，重要！！！
		};
	}, [searchParams, haveMoreData]);

	//loadMore elem
	const loadMoreContentElem = useMemo(() => {
		if (!start || loading) return <Spin />;
		if (total === 0) return <Empty description="暂无数据" />;
		if (!haveMoreData) return <span>没有更多了...</span>;
		return <span>开始加载下一页</span>;
	}, [start, haveMoreData, loading, total]);
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
				{/* 问卷列表 */}
				{list.length > 0 &&
					list.map((q: any) => {
						const { _id } = q;
						return <QuestionCard key={_id} {...q} />;
					})}
			</div>
			<div className={styles.footer}>
				<div ref={containerRef}>{loadMoreContentElem}</div>
			</div>
		</>
	);
};
export default List;
