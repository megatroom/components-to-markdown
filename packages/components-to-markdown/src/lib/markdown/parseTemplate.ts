import * as Handlebars from 'handlebars';
import type { ComponentData } from '../typings/ComponentData';
import type { TemplateHelper } from '../typings/ConfigOptions';
import headingId from '../helpers/headingId';
import markdownToJSX from '../helpers/markdownToJSX';

Handlebars.registerHelper('headingId', headingId);
Handlebars.registerHelper('markdownToJSX', markdownToJSX);

export type RenderMarkdown = (componentData: ComponentData) => string;
export type ParseTemplate = (
  template: Buffer,
  helpers: TemplateHelper[]
) => RenderMarkdown;

const parseTemplate: ParseTemplate = (template, helpers) => {
  for (const helper of helpers) {
    Handlebars.registerHelper(helper.name, helper.helper);
  }

  const render = Handlebars.compile(template.toString(), {});

  return function renderMarkdown(componentData) {
    return render(componentData);
  };
};

export default parseTemplate;
