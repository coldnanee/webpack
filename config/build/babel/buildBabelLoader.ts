import type { TBuildOptions } from "../types";

import { removeAttributesBabelPlugin } from "./removeAttributesBabelPlugin";
import type { PluginItem } from "@babel/core";

export const buildBabelLoader = (options: TBuildOptions) => {
	const { mode } = options;

	const isProd = mode === "production";

	const plugins: Array<
		string | [() => PluginItem, { props: string[] }] | (() => PluginItem)
	> = ["react-refresh/babel"];

	if (isProd) {
		plugins.push([
			removeAttributesBabelPlugin,
			{
				props: ["data-testid"]
			}
		]);
	}

	return {
		test: /\.(js|ts|jsx|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				plugins,
				envName: "development"
			}
		}
	};
};
