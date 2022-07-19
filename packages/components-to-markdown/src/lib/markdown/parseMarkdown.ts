import { compile } from 'handlebars';
import { ComponentData } from '../typings/ComponentData';

const parseMarkdown = (template: Buffer) => {
  const render = compile(template.toString());

  return function renderMarkdown(componentData: ComponentData): string {
    return render(componentData);
  };
};

export default parseMarkdown;
