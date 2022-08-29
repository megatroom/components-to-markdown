import type { DocumentationObject, PropDescriptor } from 'react-docgen';
import readFile from '../system/readFile';
import { extractErrorMessage } from '../system/_stdout';
import type { ComponentDoc, ComponentProp } from '../typings/ComponentData';
import type { ConfigHook } from '../typings/ConfigOptions';
import type { ProcessedFile } from '../typings/ProcessedFile';
import parseReactComp from './parseReactComp';
import { formatComment, parseTSDoc } from './parseTSDoc';

function extractPropFromComponent(
  name: string,
  prop: PropDescriptor
): ComponentProp {
  const descriptionDoc = parseTSDoc(formatComment(prop.description || ''));

  return {
    ...descriptionDoc,
    name,
    required: prop.required || false,
    requiredText: prop.required ? 'Yes' : 'No',
    type: {
      name: prop.tsType?.name,
      raw: prop.tsType?.raw || prop.tsType?.name || 'unknown',
    },
  };
}

function extractDocDataFromComponentData(
  componentObj: DocumentationObject
): ComponentDoc {
  const descriptionDoc = parseTSDoc(
    formatComment(componentObj.description || '')
  );

  return {
    name: componentObj.displayName || 'Unknown Component',
    properties: Object.entries(componentObj.props || []).map(([name, prop]) =>
      extractPropFromComponent(name, prop)
    ),
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
