import { compile } from 'handlebars';

const parseMarkdown = (template: Buffer) => {
  const render = compile(template.toString());

  return function renderMarkdown(name: string, data: unknown) {
    const parsedData = {
      name,
      data,
      // propTitleIcons,
      // headingId: function () {
      //   return formatHeadingId(this.name);
      // }
    };

    return render(parsedData);
  };
};

export default parseMarkdown;
