import * as Handlebars from 'handlebars';
import { ComponentData } from '../typings/ComponentData';

const tagTitles = {
  '@remarks': 'Remarks',
  '@returns': 'Return Value',
  '@deprecated': 'Deprecated 🚨',
};

Handlebars.registerHelper(
  'formatTagTitle',
  function (name: keyof typeof tagTitles) {
    return tagTitles[name] || name;
  }
);

export type RenderMarkdown = (componentData: ComponentData) => string;
export type ParseMarkdown = (template: Buffer) => RenderMarkdown;

const parseMarkdown: ParseMarkdown = (template) => {
  const render = Handlebars.compile(template.toString());

  return function renderMarkdown(componentData) {
    return render(componentData);
  };
};

export default parseMarkdown;
