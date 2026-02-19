import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  manifest: {
    permissions: ["activeTab", "downloads"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
