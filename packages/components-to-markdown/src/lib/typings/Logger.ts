export interface Logger {
  logError: (message?: any, ...optionalParams: any[]) => void;
  logWarning: (message?: any, ...optionalParams: any[]) => void;
  logInfo: (message?: any, ...optionalParams: any[]) => void;
  logDebug: (message?: any, ...optionalParams: any[]) => void;
  logTrace: (message?: any, ...optionalParams: any[]) => void;
  logStep: (step: number, emoji: string, description: string) => void;
  isTrace: () => boolean;
}
