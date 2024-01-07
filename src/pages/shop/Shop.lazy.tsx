import { lazy } from "react";

export const ShopPageLazy = lazy(
	() => import(/* webpackChunkName: "shop" */ "./index")
);
