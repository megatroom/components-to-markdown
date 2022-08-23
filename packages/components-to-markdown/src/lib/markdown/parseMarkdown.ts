import * as Handlebars from 'handlebars';
import GithubSlugger = require('github-slugger');
import { ComponentData } from '../typings/ComponentData';

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
export type ParseMarkdown = (template: Buffer) => RenderMarkdown;

const parseMarkdown: ParseMarkdown = (template) => {
  const render = Handlebars.compile(template.toString(), { noEscape: true });

  return function renderMarkdown(componentData) {
    return render(componentData);
  };
};

export default parseMarkdown;
