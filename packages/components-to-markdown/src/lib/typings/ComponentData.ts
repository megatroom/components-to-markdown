import { DocumentationObject } from 'react-docgen';
import { DocData } from './DocData';

export interface ComponentDoc extends DocData {
  name: string;
}

export interface ComponentData {
  name: string;
  documentations: DocumentationObject[];
  components?: ComponentDoc[];
}
