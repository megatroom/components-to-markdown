import { ComponentData, ComponentDoc } from '../typings/ComponentData';
import { TemplateHelper } from '../typings/ConfigOptions';
import parseTemplate from './parseTemplate';

const defaultComponentData: ComponentDoc = {
  name: '',
  properties: [],
  description: '',
  params: [],
  hasModifiers: false,
  beta: false,
  alpha: false,
  public: false,
  internal: false,
  virtual: false,
  override: false,
  sealed: false,
  isTypeScript: false,
  isPropType: false,
};

it('should parse template simple markdown heading', () => {
  const template = Buffer.from('# Title');
  const helpers: TemplateHelper[] = [];
  const componentData: ComponentData = {
    name: 'MyComponent',
    documentations: [],
  };

  const renderMarkdown = parseTemplate(template, helpers);

  expect(renderMarkdown(componentData)).toEqual('# Title');
});

it('should parse module name', () => {
  const template = Buffer.from('# {{name}}');
  const helpers: TemplateHelper[] = [];
  const componentData: ComponentData = {
    name: 'MyComponent',
    documentations: [],
  };

  const renderMarkdown = parseTemplate(template, helpers);

  expect(renderMarkdown(componentData)).toEqual('# MyComponent');
});

it('should parse components names', () => {
  const template = Buffer.from('{{#each components}}## {{name}} {{/each}}');
  const helpers: TemplateHelper[] = [];
  const componentData: ComponentData = {
    name: 'MyComponent',
    documentations: [],
    components: [
      {
        ...defaultComponentData,
        name: 'MyComponent1',
      },
      {
        ...defaultComponentData,
        name: 'MyComponent2',
      },
    ],
  };

  const renderMarkdown = parseTemplate(template, helpers);

  expect(renderMarkdown(componentData)).toEqual(
    '## MyComponent1 ## MyComponent2 '
  );
});

describe('With helper headingId', () => {
  it('should parse with component name', () => {
    const template = Buffer.from(
      `{{#each components}}## {{name}} {{headingId name}} {{/each}}`
    );
    const helpers: TemplateHelper[] = [];
    const componentData: ComponentData = {
      name: 'MyComponent',
      documentations: [],
      components: [
        {
          ...defaultComponentData,
          name: 'MyComponent',
        },
        {
          ...defaultComponentData,
          name: 'Weird_Component_Name_23',
        },
      ],
    };

    const renderMarkdown = parseTemplate(template, helpers);

    expect(renderMarkdown(componentData)).toEqual(
      '## MyComponent {#mycomponent} ## Weird_Component_Name_23 {#weird_component_name_23} '
    );
  });
});

describe('With custom helper', () => {
  it('should parse with component name', () => {
    const template = Buffer.from(
      `{{#each components}}## {{myCustomHelper name}} {{/each}}`
    );
    const helpers: TemplateHelper[] = [
      {
        name: 'myCustomHelper',
        helper: function (text) {
          return `${text.toUpperCase()}!!`;
        },
      },
    ];
    const componentData: ComponentData = {
      name: 'MyComponent',
      documentations: [],
      components: [
        {
          ...defaultComponentData,
          name: 'MyComponent1',
        },
        {
          ...defaultComponentData,
          name: 'MyComponent2',
        },
      ],
    };

    const renderMarkdown = parseTemplate(template, helpers);

    expect(renderMarkdown(componentData)).toEqual(
      '## MYCOMPONENT1!! ## MYCOMPONENT2!! '
    );
  });
});
