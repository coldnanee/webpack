// code shift - работа с нодами (их изменение)

import type { PluginItem } from "@babel/core";

export const removeAttributesBabelPlugin = (): PluginItem => {
	return {
		visitor: {
			Program(path, state) {
				const forbiddenProps = state.opts.props || [];
				path.traverse({
					JSXIdentifier(current) {
						const nodeName = current.node.name;
						if (forbiddenProps.includes(nodeName)) {
							current.parentPath.remove();
						}
					}
				});
			}
		}
	};
};

// обходим дерево - проверяем название ноды - в случае необходимости удаляем
