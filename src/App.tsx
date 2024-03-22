import { RouterProvider } from "react-router-dom";
import routerConfig from "./routers";
import "./App.css";

function App() {
	return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
