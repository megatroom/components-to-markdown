import {
  DocExcerpt,
  DocNode,
  DocNodeKind,
  ExcerptKind,
  TSDocConfiguration,
  TSDocParser,
  TSDocTagDefinition,
  TSDocTagSyntaxKind,
} from '@microsoft/tsdoc';
import {
  DocData,
  DocDataModifier,
  DocDataParam,
  DocDataEntity,
  DocDataBlockTag,
  DocDataSection,
  DocDataSectionTag,
} from '../typings/DocData';

const buildConfiguration = () => {
  const customConfiguration = new TSDocConfiguration();

  const customInlineDefinition = new TSDocTagDefinition({
    tagName: '@customInline',
    syntaxKind: TSDocTagSyntaxKind.InlineTag,
    allowMultiple: true,
  });

  // NOTE: Defining this causes a new DocBlock to be created under docComment.customBlocks.
  // Otherwise, a simple DocBlockTag would appear inline in the @remarks section.
  const customBlockDefinition = new TSDocTagDefinition({
    tagName: '@customBlock',
    syntaxKind: TSDocTagSyntaxKind.BlockTag,
  });

  // NOTE: Defining this causes @customModifier to be removed from its section,
  // and added to the docComment.modifierTagSet
  const customModifierDefinition = new TSDocTagDefinition({
    tagName: '@customModifier',
    syntaxKind: TSDocTagSyntaxKind.ModifierTag,
  });

  customConfiguration.addTagDefinitions([
    customInlineDefinition,
    customBlockDefinition,
    customModifierDefinition,
  ]);

  return customConfiguration;
};

interface DocTreeAst {
  kind?: DocNodeKind | string;
  excerptKind?: ExcerptKind;
  content?: string;
  children?: DocTreeAst[];
}

function dumpTSDocTree(docNode: DocNode, indent: string): DocTreeAst {
  const result: DocTreeAst = {};
  const children: DocTreeAst[] = [];

  if (docNode instanceof DocExcerpt) {
    const content: string = docNode.content.toString();
    result.excerptKind = docNode.excerptKind;
    result.content = content;
  } else {
    result.kind = docNode.kind;
  }

  for (const child of docNode.getChildNodes()) {
    children.push(dumpTSDocTree(child, indent + '  '));
  }

  if (children.length > 0) {
    result.children = children;
  }

  return result;
}

function trimWhitespace(text: string): string {
  return text.replace(/^\s+|\s+$/g, '');
}

function getContentRecursive(docTree: DocTreeAst): string {
  let result = docTree.content || '';

  if (!docTree.children) return result;

  for (const child of docTree.children) {
    result += getContentRecursive(child);
  }

  return result;
}

function getBlockTagFromSection(
  index: number,
  parentDocTree: DocTreeAst
): DocDataSectionTag {
  const tagName = parentDocTree.children?.[index].children?.[0].content;
  const description = parentDocTree.children?.[index + 1].children?.[0].content;

  if (tagName === '@since' && description) {
    return {
      since: trimWhitespace(description),
    };
  }

  return {};
}

function getSectionContentRecursive(
  result: DocDataSection,
  docTree: DocTreeAst
): void {
  result.description += docTree.content || '';

  if (!docTree.children) return;

  for (let i = 0; i < docTree.children.length; i++) {
    if (docTree.children[i].kind === DocNodeKind.SoftBreak && i > 0) {
      result.description += ' ';
      continue;
    }

    if (docTree.children[i].kind === DocNodeKind.BlockTag) {
      result.tags = {
        ...result.tags,
        ...getBlockTagFromSection(i, docTree),
      };
      break;
    }

    getSectionContentRecursive(result, docTree.children[i]);
  }

  if (docTree.kind === DocNodeKind.Paragraph) {
    result.description = `${result.description.trim()}\n\n`;
  }
}

function getSectionContent(docTree: DocTreeAst): DocDataSection {
  const result: DocDataSection = {
    description: docTree.content || '',
    tags: {},
  };

  if (!docTree.children) return result;

  for (let i = 0; i < docTree.children.length; i++) {
    getSectionContentRecursive(result, docTree.children[i] as DocTreeAst);
  }

  return result;
}

function fillBlockTagContentRecursive(
  entity: DocDataEntity,
  docTree: DocTreeAst
): DocDataEntity {
  if (docTree.excerptKind === ExcerptKind.BlockTag) {
    entity.name = docTree.content || '';
  } else if (docTree.content) {
    entity.content += docTree.content;
  }

  if (!docTree.children) return entity;

  for (let i = 0; i < docTree.children.length; i++) {
    if (docTree.children[i].kind === DocNodeKind.SoftBreak && i > 0) {
      entity.content += ' ';
      continue;
    }

    fillBlockTagContentRecursive(entity, docTree.children[i]);
  }

  if (docTree.kind === DocNodeKind.Paragraph) {
    entity.content = `${entity.content?.trim()}\n\n`;
  }

  return entity;
}

function getBlockContent(
  docTree: DocTreeAst,
  currDocData: DocData
): Partial<DocData> | null {
  const entity: DocDataEntity = {
    name: '',
    content: '',
  };

  fillBlockTagContentRecursive(entity, docTree);
  if (entity.content) {
    entity.content = trimWhitespace(entity.content || '');
  }

  const blockTag: DocDataBlockTag = {
    content: entity.content,
  };

  switch (entity.name) {
    case '@deprecated':
      return { deprecated: blockTag };
    case '@remarks':
      return { remarks: blockTag };
    case '@returns':
      return { returns: blockTag };
    case '@defaultValue':
      return { defaultValue: blockTag };
    case '@example':
      return {
        examples: ([] as DocDataBlockTag[]).concat(
          (currDocData.examples as DocDataBlockTag[]) || [],
          blockTag
        ),
      };
    default:
      return null;
  }
}

function getBlockTagContent(docTree: DocTreeAst): DocDataModifier | null {
  const entity: DocDataEntity = {
    name: '',
  };

  fillBlockTagContentRecursive(entity, docTree);

  switch (entity.name) {
    case '@alpha':
      return { alpha: true };
    case '@beta':
    case '@experimental':
      return { beta: true };
    case '@public':
      return { public: true };
    case '@internal':
      return { internal: true };
    case '@virtual':
      return { virtual: true };
    case '@override':
      return { override: true };
    case '@sealed':
      return { sealed: true };
    default:
      return null;
  }
}

function getParamCollection(docTree: DocTreeAst): DocDataParam[] {
  const result: DocDataParam[] = [];

  if (!docTree.children) return result;

  for (const paramBlock of docTree.children) {
    if (!paramBlock.children) return result;

    const entity: DocDataParam = {
      name: '',
      description: '',
    };

    for (const param of paramBlock.children) {
      if (param.excerptKind === ExcerptKind.ParamBlock_ParameterName) {
        entity.name = param.content || '';
      } else if (param.kind === DocNodeKind.Section) {
        entity.description = trimWhitespace(getContentRecursive(param));
      }
    }

    result.push(entity);
  }

  return result;
}

function convertDocTreeToDocData(docTree: DocTreeAst): DocData {
  let result: DocData = {
    description: '',
    hasModifiers: false,
    beta: false,
    alpha: false,
    public: false,
    internal: false,
    virtual: false,
    override: false,
    sealed: false,
    params: [],
  };

  if (!docTree.children) return result;

  for (const comments of docTree.children) {
    switch (comments.kind) {
      case DocNodeKind.Section: {
        const section = getSectionContent(comments);
        result.description = trimWhitespace(section.description);
        result = { ...result, ...section.tags };
        break;
      }
      case DocNodeKind.Block:
        result = {
          ...result,
          ...getBlockContent(comments, result),
        };
        break;
      case DocNodeKind.BlockTag:
        result = {
          ...result,
          ...getBlockTagContent(comments),
          hasModifiers: true,
        };
        break;
      case DocNodeKind.ParamCollection:
        result.params = result.params.concat(getParamCollection(comments));
        break;
      default:
        break;
    }
  }

  return result;
}

export const formatComment = (content: string) => {
  const str = content.replace(/\n/g, '\n * ');
  return `/**\n * ${str}\n */`;
};

export const parseTSDoc = (content: string) => {
  const tsDocParse = new TSDocParser(buildConfiguration());
  const parserContext = tsDocParse.parseString(content);
  const docComment = parserContext.docComment;

  const docTree = dumpTSDocTree(docComment, '');
  const docData = convertDocTreeToDocData(docTree);

  return docData;
};
