export {};

declare global {
  interface Window {
    turnstile?: {
      execute(widgetId?: string): string | Promise<string> | void;
      remove(widgetId: string): void;
      render(
        container: HTMLElement,
        options: {
          action?: string;
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "refresh-expired"?: "auto" | "manual" | "never";
          "response-field-name"?: string;
          retry?: "auto" | "never";
          size?: "normal" | "compact" | "flexible";
          sitekey: string;
        }
      ): string;
      reset(widgetId?: string): void;
    };
  }
}
