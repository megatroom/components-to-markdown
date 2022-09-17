import type { DocumentationObject, PropTypeDescriptor } from 'react-docgen';
import type { DocData } from './DocData';

export interface ComponentPropType {
  kind: 'typescript' | 'prop-types' | 'unknown';
  name: PropTypeDescriptor['name'] | 'unknown';
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
  isTypeScript: boolean;
  isPropType: boolean;
}

export interface ComponentData {
  name: string;
  documentations: DocumentationObject[];
  components?: ComponentDoc[];
}
