import type { ComponentData } from '../typings/ComponentData';
import type { ConfigHook } from '../typings/ConfigOptions';
import type { RenderMarkdown } from './parseTemplate';
import writeMarkdownFile from './writeMarkdownFile';

function splitComponentData(componentData: ComponentData): ComponentData[] {
  const { components = [] } = componentData;
  const result: ComponentData[] = [];

  for (let i = 0; i < components.length; i++) {
    result.push({
      name: components[i].name,
      documentations: [componentData.documentations[i]],
      components: [components[i]],
    });
  }

  return result;
}

export default async function buildMarkdownContent(
  componentData: ComponentData,
  renderMarkdown: RenderMarkdown,
  outputDirectory: string,
  outputExtension: string,
  grouped: boolean,
  outputFileName: ConfigHook['outputFileName']
) {
  const splitData = grouped
    ? [componentData]
    : splitComponentData(componentData);

  for (const data of splitData) {
    const markdown = renderMarkdown(data);
    const outputFile = outputFileName(data.name, outputExtension);
    writeMarkdownFile(outputDirectory, outputFile, markdown);
  }
}
