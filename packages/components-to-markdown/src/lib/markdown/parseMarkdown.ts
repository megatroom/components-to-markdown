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

const parseMarkdown = (template: Buffer) => {
  const render = Handlebars.compile(template.toString());

  return function renderMarkdown(componentData: ComponentData): string {
    return render(componentData);
  };
};

export default parseMarkdown;
