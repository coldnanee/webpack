import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDom from "react-dom/client";
import { Suspense } from "react";

import { App } from "./components/app";
import { AboutPageLazy } from "@/pages/about/About.lazy";

import { ShopPageLazy } from "@/pages/shop/Shop.lazy";

const root = document.querySelector("#root");

if (!root) {
	throw new Error("root mount not found!");
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/about",
				element: (
					<Suspense fallback={<h1>Loading...</h1>}>
						<AboutPageLazy />
					</Suspense>
				)
			},
			{
				path: "/shop",
				element: (
					<Suspense fallback={<h1>Loading...</h1>}>
						<ShopPageLazy />
					</Suspense>
				)
			}
		]
	}
]);

ReactDom.createRoot(root).render(<RouterProvider router={router} />);
