import { lazy } from "react";

export const AboutPageLazy = lazy(
	() => import(/* webpackChunkName: "about" */ "./index")
);
