"use strict";
var vendor = require("./vendor.c8c6d3c2.js");
const p = function polyfill(modulePath = ".", importFunctionName = "__import__") {
  try {
    self[importFunctionName] = new Function("u", `return import(u)`);
  } catch (error) {
    const baseURL = new URL(modulePath, location);
    const cleanup = (script) => {
      URL.revokeObjectURL(script.src);
      script.remove();
    };
    self[importFunctionName] = (url) => new Promise((resolve, reject) => {
      const absURL = new URL(url, baseURL);
      if (self[importFunctionName].moduleMap[absURL]) {
        return resolve(self[importFunctionName].moduleMap[absURL]);
      }
      const moduleBlob = new Blob([
        `import * as m from '${absURL}';`,
        `${importFunctionName}.moduleMap['${absURL}']=m;`
      ], {type: "text/javascript"});
      const script = Object.assign(document.createElement("script"), {
        type: "module",
        src: URL.createObjectURL(moduleBlob),
        onerror() {
          reject(new Error(`Failed to import: ${url}`));
          cleanup(script);
        },
        onload() {
          resolve(self[importFunctionName].moduleMap[absURL]);
          cleanup(script);
        }
      });
      document.head.appendChild(script);
    });
    self[importFunctionName].moduleMap = {};
  }
};
false;
var _sfc_main = vendor.defineComponent({
  setup() {
    const fn = vendor.throttle(() => {
    }, 100);
    return {
      fn
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vendor.openBlock(), vendor.createBlock("div", null, "home");
}
_sfc_main.render = _sfc_render;
var _sfc_main$1 = vendor.defineComponent({
  name: "App",
  components: {
    Home: _sfc_main
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Home = vendor.resolveComponent("Home");
  return vendor.openBlock(), vendor.createBlock(_component_Home);
}
_sfc_main$1.render = _sfc_render$1;
vendor.createApp(_sfc_main$1).mount("#app");
