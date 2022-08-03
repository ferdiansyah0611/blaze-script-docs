import { defineConfig } from "vite";
import path from "path";

const fileRegex = /\.tsx$/

function blazePlugin() {
  return {
    name: 'transform-file',

    transform(src, id) {
      if (fileRegex.test(id)) {
        src += `
if (import.meta.hot) {
    import.meta.hot.accept((modules) => {
        window.$hmr = modules.default
        window.$createApp.forEach((app) => {
          app.reload()
        })
    });
}`
        return {
          code: src,
          map: null
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [blazePlugin()],
  resolve: {
    alias: {
      "@blaze": path.resolve(__dirname, "./.blaze"),
      "@blaze.d": path.resolve(__dirname, "./.blaze/blaze.d"),
      "@blaze.utils": path.resolve(__dirname, "./.blaze/utils"),
      "@root": path.resolve(__dirname, "./.blaze"),
      "@route": path.resolve(__dirname, "./src/route"),
      "@component": path.resolve(__dirname, "./src/component"),
      "@style": path.resolve(__dirname, "./src/style"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@app": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsxFactory: "this.$h.h",
    jsxFragment: "this.$h.Fragment"
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      }
    }
  }
});
