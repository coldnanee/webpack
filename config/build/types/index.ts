import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export type TConfig = Configuration & DevServerConfiguration;

type TBuildMode = "development" | "production";
type TBuildPlatform = "desktop" | "mobile";

type TBuildPaths = {
	entry: string;
	html: string;
	output: string;
	src: string;
	public: string;
};

export type TBuildOptions = {
	port?: number;
	paths: TBuildPaths;
	mode?: TBuildMode;
	analyzer?: boolean;
	platform?: TBuildPlatform;
};

export type TBuildEnv = {
	port?: number;
	mode?: TBuildMode;
	analyzer?: boolean;
	platform?: TBuildPlatform;
};
