import { parse, defaultHandlers, resolver } from 'react-docgen';
import { createDisplayNameHandler } from 'react-docgen-displayname-handler';
import annotationResolver = require('react-docgen-annotation-resolver');
import type { ComponentData } from '../typings/ComponentData';
import type { NodePath } from 'ast-types/lib/node-path';
import type { ASTNode } from 'ast-types';
import type { ConfigHook } from '../typings/ConfigOptions';

const allResolvers = (
  ast: ASTNode,
  recast: {
    visit: (
      node: NodePath,
      handlers: { [handlerName: string]: () => boolean | undefined }
    ) => void;
  }
) => {
  const findAllExportedComponentDefinitions =
    resolver.findAllExportedComponentDefinitions;
  const annotatedComponents = annotationResolver(ast, recast);
  const exportedComponents = findAllExportedComponentDefinitions(ast, recast);
  return annotatedComponents.concat(exportedComponents);
};

const parseReactComp = (
  filePath: string,
  content: Buffer,
  extractModuleName: ConfigHook['moduleName']
): ComponentData => {
  const handlers = defaultHandlers.concat(createDisplayNameHandler(filePath));

  const doc = parse(content, allResolvers as any, handlers, {
    filename: filePath,
  });

  const documentations = Array.isArray(doc) ? doc : [doc];

  if (documentations.length === 0) {
    throw new Error('No component found');
  }

  const componentsName: string[] =
    documentations.map((doc) => doc.displayName || 'Unknown Component') || [];

  return {
    name: extractModuleName(filePath, { componentsName }),
    documentations,
  };
};

export default parseReactComp;
