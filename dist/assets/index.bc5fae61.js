"use strict";
var vendor = require("./vendor.2b902ca7.js");
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
  name: "App",
  components: {}
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = vendor.resolveComponent("router-view");
  return vendor.openBlock(), vendor.createBlock(_component_router_view);
}
_sfc_main.render = _sfc_render;
let scriptRel;
const seen = {};
const __vitePreload = function preload(baseModule, deps) {
  if (true) {
    return baseModule();
  }
  if (scriptRel === void 0) {
    const relList = document.createElement("link").relList;
    scriptRel = relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
  }
  return Promise.all(deps.map((dep) => {
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res) => {
        link.addEventListener("load", res);
      });
    }
  })).then(() => baseModule());
};
const router = vendor.createRouter({
  history: vendor.createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => __vitePreload(() => Promise.resolve().then(function() {
        return require("./Home.4f483dda.js");
      }), false ? "__VITE_PRELOAD__" : void 0)
    }
  ]
});
vendor.createApp(_sfc_main).use(router).mount("#app");
