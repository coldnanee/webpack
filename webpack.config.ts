// для использования внутри конфига typescript - устанавливаем ts-node, @types/node, @types/webpack

import path from "path";

import type { TConfig, TBuildEnv } from "./config/build/types";

import { buildWebpackConfig } from "./config/build/buildWebpackConfig";

export default (env: TBuildEnv): TConfig => {
	const config: TConfig = buildWebpackConfig({
		...env,
		paths: {
			entry: path.resolve(__dirname, "src", "index.tsx"),
			output: path.resolve(__dirname, "build"),
			html: path.resolve(__dirname, "public", "index.html"),
			src: path.resolve(__dirname, "src"),
			public: path.resolve(__dirname, "public")
		}
	});

	return config;
};

// 1:19:30
