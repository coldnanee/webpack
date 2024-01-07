import path from "path";
import type { Configuration } from "webpack";

import { TBuildOptions } from "./types";

export const buildResolvers = (
	options: TBuildOptions
): Configuration["resolve"] => ({
	extensions: [".tsx", ".ts", ".js"], // расширения, которые нужно обработать. позволяет при импорте не указывать расширение файла. !порядок в массиве важен
	alias: {
		"@": path.resolve(__dirname, options.paths.src)
	}
});
