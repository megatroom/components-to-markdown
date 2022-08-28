import type { ComponentData } from '../typings/ComponentData';
import type { ConfigHook } from '../typings/ConfigOptions';
import type { RenderMarkdown } from './parseTemplate';
import writeMarkdownFile from './writeMarkdownFile';

export default async function buildMarkdownContent(
  componentData: ComponentData,
  renderMarkdown: RenderMarkdown,
  outputDirectory: string,
  outputExtension: string,
  outputFileName: ConfigHook['outputFileName']
) {
  const markdown = renderMarkdown(componentData);
  const outputFile = outputFileName(componentData.name, outputExtension);

  writeMarkdownFile(outputDirectory, outputFile, markdown);
}
