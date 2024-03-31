import React, { FC, useEffect } from "react";
import useLoadQuestioin from "../../../hooks/useLoadQuestion";
const Edit: FC = () => {
	const { loading, data } = useLoadQuestioin();

	return (
		<div>
			<p>Edit page</p>
			{loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
		</div>
	);
};
export default Edit;
