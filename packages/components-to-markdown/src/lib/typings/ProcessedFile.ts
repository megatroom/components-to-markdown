import type { ComponentData } from './ComponentData';

export interface ProcessedFile {
  file: string;
  error?: string;
  componentData?: ComponentData;
}
