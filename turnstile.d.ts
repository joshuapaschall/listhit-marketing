export {};

declare global {
  interface Window {
    turnstile?: {
      render(container: HTMLElement, options: Record<string, unknown>): string;
      execute(widgetId: string): void;
      reset(widgetId?: string): void;
      remove(widgetId: string): void;
    };
  }
}
