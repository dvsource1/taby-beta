import { PluginOption } from "vite";

export default function buildTailwind(): PluginOption {
  return {
    name: "build-tailwindcss",
    renderDynamicImport() {
      return {
        left: `
        {
          const dynamicImport = (path) => import(path);
          dynamicImport(
          `,
        right: ")}",
      };
    },
  };
}
