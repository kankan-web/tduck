import { RouterProvider } from "react-router-dom";
import routerConfig from "./routers";
import "antd/dist/reset.css"; //引入初始化css
import "./App.css";

function App() {
	return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
