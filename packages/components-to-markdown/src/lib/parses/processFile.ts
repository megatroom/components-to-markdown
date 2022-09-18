import type { DocumentationObject, PropDescriptor } from 'react-docgen';
import readFile from '../system/readFile';
import { extractErrorMessage } from '../system/_stdout';
import type {
  ComponentDoc,
  ComponentProp,
  ComponentPropType,
} from '../typings/ComponentData';
import type { ConfigHook } from '../typings/ConfigOptions';
import type { ProcessedFile } from '../typings/ProcessedFile';
import parseReactComp from './parseReactComp';
import { formatComment, parseTSDoc } from './parseTSDoc';

const UNKNOWN_TYPE = 'unknown';

function extractPropType(prop: PropDescriptor): ComponentPropType {
  if (prop.tsType) {
    return {
      kind: 'typescript',
      name: prop.tsType.name,
      raw: prop.tsType.raw || prop.tsType.name || UNKNOWN_TYPE,
    };
  }

  if (prop.type) {
    return {
      kind: 'prop-types',
      name: prop.type.name,
      raw: prop.type.raw || prop.type.name || UNKNOWN_TYPE,
    };
  }

  return {
    kind: UNKNOWN_TYPE,
    name: UNKNOWN_TYPE,
    raw: UNKNOWN_TYPE,
  };
}

function extractPropFromComponent(
  name: string,
  prop: PropDescriptor
): ComponentProp {
  const descriptionDoc = parseTSDoc(formatComment(prop.description || ''));
  const result: ComponentProp = {
    ...descriptionDoc,
    name,
    required: prop.required || false,
    requiredText: prop.required ? 'Yes' : 'No',
    type: extractPropType(prop),
  };

  if (result.type.kind === 'prop-types' && prop.defaultValue) {
    result.defaultValue = {
      content: `\`${prop.defaultValue.value}\``,
    };
  }

  return result;
}

export function extractDocDataFromComponentData(
  componentObj: DocumentationObject
): ComponentDoc {
  const descriptionDoc = parseTSDoc(
    formatComment(componentObj.description || '')
  );

  const properties = Object.entries(componentObj.props || []).map(
    ([name, prop]) => extractPropFromComponent(name, prop)
  );

  return {
    name: componentObj.displayName || 'Unknown Component',
    properties,
    isTypeScript:
      properties.findIndex((p) => p.type.kind === 'typescript') > -1,
    isPropType: properties.findIndex((p) => p.type.kind === 'prop-types') > -1,
    ...descriptionDoc,
  };
}

export default async function processFile(
  file: string,
  extractModuleName: ConfigHook['moduleName']
): Promise<ProcessedFile> {
  try {
    const content = await readFile(file);
    const componentData = parseReactComp(file, content, extractModuleName);

    componentData.components = componentData.documentations.map(
      (data: DocumentationObject) => extractDocDataFromComponentData(data)
    );

    return { file, componentData };
  } catch (error) {
    console.log({ error });
    return { file, error: extractErrorMessage(error) };
  }
}
