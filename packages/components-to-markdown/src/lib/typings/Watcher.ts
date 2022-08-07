export interface Watcher {
  sources: string[];
  pattern: string[];
  scriptDirectory: string;
  onChange: (file: string, event: string) => void;
  onExit: () => void;
}
