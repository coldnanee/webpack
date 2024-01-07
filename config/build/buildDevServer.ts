import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import type { TBuildOptions } from "./types";

export const buildDevServer = (
	options: TBuildOptions
): DevServerConfiguration => {
	const { port } = options;

	return {
		port: port ?? 3000, // порт для запуска
		open: false, // автоматическое открытие браузера
		historyApiFallback: true, // настраивает правильный роутинг при SPA. при деплое - проксируем на index.html через nginx
		hot: true // позволяет обновлять код без перезагрузки страницы / hmr. ! без дополнений работает только с чистым ts/js
	};
};
