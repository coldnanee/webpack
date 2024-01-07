import type { TConfig } from "./types";

import type { TBuildOptions } from "./types";

import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";

export const buildWebpackConfig = (options: TBuildOptions): TConfig => {
	const {
		paths: { entry, output },
		mode
	} = options;

	const isDev = mode === "development";

	const config = {
		entry: entry, // точек входа в приложение может быть несколько (указываются в паре: ключ - значение. ключ- название, значение - путь)
		output: {
			path: output, // путь к папке сборки
			filename: "[name].[contenthash].js", // имя файла. name - от названия entrypoint. contenthash - hash содержимого файла, если содержимое не менялось - hash остается без изменения
			assetModuleFilename: "assets/[name][ext]", // все assets складываются в соответствующую папку с исходным расширением
			chunkFilename: "[name].[contenthash].js", // имя файла чанков
			clean: true // очистка старых файлов сборки,
		},
		mode: mode ?? "development", // dev/prod. при prod удалены все комментарии/переносы. dev - комментарии к коду / дополнительный код, без сжатия
		plugins: buildPlugins(options),

		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),

		devtool: isDev ? "eval-cheap-module-source-map" : "source-map", // настройка source map.улучшает читаемость кода при дебаге. в документации представлено большое количество разных вариантов. https://webpack.js.org/configuration/devtool/
		devServer: isDev ? buildDevServer(options) : undefined
	};

	return config;
};
