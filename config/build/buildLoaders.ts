import type { ModuleOptions } from "webpack";

import type { TBuildOptions } from "./types";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import ReactRefreshTypescript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

// loader - определенная цепочка обработчиков через которые проходят файлы с определенным расширением. порядок loader'ов имеет значение. пример цепочки loader'ов на примере scss: scss-loader -> css-loader -> style-loader
// loader'ы указываются в массиве rules

export const buildLoaders = (
	options: TBuildOptions
): ModuleOptions["rules"] => {
	const { mode } = options;

	const isDev = mode === "development";

	const svgLoader = {
		test: /\.svg$/,
		use: [
			{
				loader: "@svgr/webpack",
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: "convertColors",
								params: {
									currentColor: true
								}
							}
						]
					}
				}
			}
		]
	}; // работа с svg-иконками, как с react-компонентами. svgoConfig - упрощает работу с currentColor

	const imagesLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource"
	}; // работа с картинками

	const cssLoaderWithModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]" // для dev используем название класса по которому будет удобно дебажить код
			}
		}
	}; // настройка css-модулей

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// style-loader: компиляция в js-строки
			// minicss - css в единый файл, а не в js-строки
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// компиляция css в CommonJS
			cssLoaderWithModules,
			// Компиляция sass в css
			"sass-loader"
		]
	};

	// const tsLoader = {
	// 	// если бы использовался js, а не typescript - нужен был бы babel-loader
	// 	test: /\.tsx?$/, // расширения файлов для loader
	// 	use: [
	// 		{
	// 			loader: "ts-loader",
	// 			options: {
	// 				transpileOnly: isDev, // отключаем проверку типов в деве для ускорения билда
	// 				getCustomTransformers: () => ({
	// 					before: [isDev && ReactRefreshTypescript()].filter(Boolean)
	// 				}) // настройка hmr
	// 			}
	// 		}
	// 	], // название loader
	// 	exclude: /node_modules/ // игнорируемые папки
	// };

	const babelLoader = buildBabelLoader(options);

	return [imagesLoader, scssLoader, babelLoader, svgLoader];
};
