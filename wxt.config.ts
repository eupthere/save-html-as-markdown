import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  manifest: () => ({
    name: "Save HTML as Markdown",
    permissions: ["activeTab", "downloads"],
    browser_specific_settings: {
      gecko: {
        data_collection_permissions: {
          required: ["none"],
        },
      },
    },
  }),
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
