import { parse, defaultHandlers, resolver } from 'react-docgen';
import { createDisplayNameHandler } from 'react-docgen-displayname-handler';
import annotationResolver = require('react-docgen-annotation-resolver');
import { randomUUID } from 'crypto';
import { ComponentData } from '../typings/ComponentData';
import { NodePath } from 'ast-types/lib/node-path';
import { ASTNode } from 'ast-types';

const generateRandomName = () => `Unknown Component #${randomUUID()}`;

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

const parseReactComp = (filePath: string, content: Buffer): ComponentData => {
  const handlers = defaultHandlers.concat(createDisplayNameHandler(filePath));

  const doc = parse(content, allResolvers as any, handlers, {
    filename: filePath,
  });

  const documentations = Array.isArray(doc) ? doc : [doc];

  if (documentations.length === 0) {
    throw new Error('No component found');
  }

  return {
    name: documentations[0].displayName || generateRandomName(),
    documentations,
  };
};

export default parseReactComp;
