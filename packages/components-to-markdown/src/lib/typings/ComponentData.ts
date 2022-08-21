import type { DocumentationObject, PropTypeDescriptor } from 'react-docgen';
import type { DocData } from './DocData';

interface ComponentPropType {
  name: PropTypeDescriptor['name'];
  raw?: string;
}
export interface ComponentProp extends DocData {
  name: string;
  required: boolean;
  requiredText: 'Yes' | 'No';
  type: ComponentPropType;
}

export interface ComponentDoc extends DocData {
  name: string;
  properties: ComponentProp[];
}

export interface ComponentData {
  name: string;
  documentations: DocumentationObject[];
  components?: ComponentDoc[];
}
