export {};

declare global {
  interface Window {
    turnstile?: {
      execute(widgetId?: string): string | Promise<string> | void;
      reset(widgetId?: string): void;
    };
  }
}
