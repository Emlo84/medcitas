import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    typecheck: {
      tsconfig: "tsconfig.vitest.json",
    },
    setupFiles: "src/tests/setupTests.ts",
    include: ["src/tests/**/*.{test,spec}.{ts,tsx}"],
    server: {
      deps: {
        inline: ["@testing-library/react"],
      },
    },
  },
});
