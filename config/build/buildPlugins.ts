import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { type Configuration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import type { TBuildOptions } from "./types";
import path from "path";

export const buildPlugins = (
	options: TBuildOptions
): Configuration["plugins"] => {
	const {
		mode,
		analyzer,
		paths: { html, output },
		paths,
		platform
	} = options;

	const isProd = mode === "production";
	const isDev = mode === "development";

	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			template: html, // указываем путь к html файлу
			favicon: path.resolve(paths.public, "favicon.ico")
		}),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform ?? "desktop")
		})
	];

	if (isDev) {
		plugins.push(
			new ForkTsCheckerWebpackPlugin(),
			new ReactRefreshWebpackPlugin()
		); // проверка типов выносится в отдельный процесс, чтобы не затягивать сборку
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash:8].css", // имя файла. name - от названия entrypoint. contenthash - hash содержимого файла, если содержимое не менялось - hash остается без изменения
				chunkFilename: "css/[name].[contenthash:8].css" // имя для чанков
			}),
			// new ProgressPlugin(), // отображение процентов сборки проекта. (!может замедлять сборку)
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, "locales"),
						to: path.resolve(output, "locales")
					}
				] // указываем папку locales в которую при билде скопируются переводы
			})
		);
	}

	if (analyzer) {
		plugins.push(
			new BundleAnalyzerPlugin() // анализ итоговых бандлов при сборке)
		);
	}

	return plugins;
};
