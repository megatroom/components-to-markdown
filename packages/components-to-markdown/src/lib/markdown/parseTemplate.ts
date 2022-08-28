import * as Handlebars from 'handlebars';
import GithubSlugger = require('github-slugger');
import type { ComponentData } from '../typings/ComponentData';
import type { TemplateHelper } from '../typings/ConfigOptions';

Handlebars.registerHelper('headingId', function (text) {
  try {
    const githubSlugger = new GithubSlugger();
    return `{#${githubSlugger.slug(text)}}`;
  } catch (e) {
    console.error(e);
    return '';
  }
});

export type RenderMarkdown = (componentData: ComponentData) => string;
export type ParseTemplate = (
  template: Buffer,
  helpers: TemplateHelper[]
) => RenderMarkdown;

const parseTemplate: ParseTemplate = (template, helpers) => {
  for (const helper of helpers) {
    Handlebars.registerHelper(helper.name, helper.helper);
  }

  const render = Handlebars.compile(template.toString(), { noEscape: true });

  return function renderMarkdown(componentData) {
    return render(componentData);
  };
};

export default parseTemplate;
