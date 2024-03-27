import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { Input } from "antd";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../../constant";
const { Search } = Input;
const ListSearch: FC = () => {
	const nav = useNavigate();
	const { pathname } = useLocation();
	const [value, setValue] = useState("");
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event);
	};
	//获取url参赛，并设置到input vule
	//#MARK:有点不太理解为什么要这样取值
	const [searchParams] = useSearchParams();
	useEffect(() => {
		const curValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
		setValue(curValue);
	}, [searchParams]);
	const handleSearch = (data: string) => {
		nav({
			pathname,
			search: `${LIST_SEARCH_PARAM_KEY}=${data}`
		});
	};
	return (
		<Search
			allowClear
			placeholder="请输入关键字"
			value={value}
			onChange={handleChange}
			onSearch={handleSearch}
			style={{ width: "260px" }}
		/>
	);
};
export default ListSearch;
