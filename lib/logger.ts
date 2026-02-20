export const logger = {
  error(...args: unknown[]) {
    if (import.meta.env.DEV) {
      console.error('[save-md]', ...args);
    }
  },
};
