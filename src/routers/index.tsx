import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";

import Home from "../views/home";
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import NotFound from "../views/error/404";

import Star from "../views/manage/Star";
import Trash from "../views/manage/Trash";
import List from "../views/manage/List";

import Edit from "../views/question/Edit";
import Stat from "../views/question/Stat";
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "login",
				element: <Login />
			},
			{
				path: "register",
				element: <Register />
			},
			{
				path: "manage",
				element: <ManageLayout />,
				children: [
					{
						path: "list",
						element: <List />
					},
					{
						path: "star",
						element: <Star />
					},
					{
						path: "trash",
						element: <Trash />
					}
				]
			},
			{
				path: "*", //404路由，都写在最后
				element: <NotFound />
			}
		]
	},
	{
		path: "question",
		element: <QuestionLayout />,
		children: [
			{
				path: "edit/:id",
				element: <Edit />
			},
			{
				path: "stat/:id",
				element: <Stat />
			}
		]
	}
]);
export default router;
