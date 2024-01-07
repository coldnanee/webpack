import cl from "./index.module.scss";

import { User } from "../user";

import { Outlet, Link } from "react-router-dom";

export const App = () => {
	const getError = () => {
		throw new Error("GET ERROR");
	};

	return (
		<>
			<h1 data-testid="App.title-test">Hello world!</h1>
			<button
				data-testid="button-test"
				onClick={getError}
				className={cl.button}
			>
				BUTTON
			</button>
			<Link to={"/about"}>About</Link>
			<Link to={"/shop"}>Shop</Link>
			<User />
			<Outlet />
		</>
	);
};
