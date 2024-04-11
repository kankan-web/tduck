import React, { FC } from "react";
import useLoadQuestioin from "../../../hooks/useLoadQuestion";

const Stat: FC = () => {
	// const { loading, data } = useLoadQuestioin();

	return (
		<div>
			<p>Stat page</p>
			{/* {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>} */}
		</div>
	);
};
export default Stat;
