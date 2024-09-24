import { defineConfig } from "umi";
import { BASEURL } from "./src/constants";

export default defineConfig({
  routes: [{ path: "/", component: "index" }],
  npmClient: "pnpm",
  proxy: {
    "/api": {
      target: BASEURL,
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  postcssLoader: {
    plugins: [
      require("postcss-pxtorem")({
        rootValue: 10,
        propList: ["*"],
        exclude: "node_modules",
      }),
    ],
  },
});
