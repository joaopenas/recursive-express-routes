const routes = [];

function getRecursivePaths(stack, initialPath = '') {
  stack.forEach((layer) => {
    if (layer.route) {
      routes.push({
        id: routes.length + 1,
        count: 0,
        endpoint: `${initialPath}${layer.route.path}`,
        called: false
      });
      return;
    }

    if (layer.name != 'router') return;

    if (!layer.handle.stack) return;

    if (layer.regexp) {
      initialPath = layer.regexp
        .toString()
        .replaceAll('/^', '')
        .replaceAll('\\', '')
        .split('?')[0]
        .slice(0, -1);
    }
    getRecursivePaths(layer.handle.stack, initialPath);
  });
}
