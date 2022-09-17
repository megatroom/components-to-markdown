import { extractDocDataFromComponentData } from './processFile';

describe('extractDocDataFromComponentData()', () => {
  it('should return default values for empty object', () => {
    expect(extractDocDataFromComponentData({})).toEqual({
      name: 'Unknown Component',
      description: '',
      properties: [],
      params: [],
      isTypeScript: false,
      isPropType: false,
      hasModifiers: false,
      beta: false,
      alpha: false,
      public: false,
      internal: false,
      virtual: false,
      override: false,
      sealed: false,
    });
  });

  describe('When component has TypeScript typing', () => {
    it('should return properties', () => {
      expect(
        extractDocDataFromComponentData({
          description:
            'Buttons allow users to take actions, and make choices, with a single tap.\n\n@remarks\nButtons communicate actions that users can take.\n\n@beta\n@public',
          displayName: 'Button',
          methods: [],
          props: {
            children: {
              required: true,
              tsType: {
                name: 'ReactNode',
              },
              description: 'The text to display in the button.',
            },
            type: {
              required: false,
              tsType: {
                name: 'union',
                raw: "'button' | 'submit' | 'reset'",
                elements: [
                  {
                    name: 'literal',
                    value: "'button'",
                  },
                  {
                    name: 'literal',
                    value: "'submit'",
                  },
                  {
                    name: 'literal',
                    value: "'reset'",
                  },
                ],
              },
              description: "The button type.\n\n@defaultValue `'button'`",
              defaultValue: {
                value: "'button'",
                computed: false,
              },
            },
            variant: {
              required: false,
              tsType: {
                name: 'union',
                raw: "'default' | 'primary' | 'success' | 'danger'",
                elements: [
                  {
                    name: 'literal',
                    value: "'default'",
                  },
                  {
                    name: 'literal',
                    value: "'primary'",
                  },
                  {
                    name: 'literal',
                    value: "'success'",
                  },
                  {
                    name: 'literal',
                    value: "'danger'",
                  },
                ],
              },
              description:
                "The button variant.\n\n@since 1.1.0\n@defaultValue `'default'`",
              defaultValue: {
                value: "'default'",
                computed: false,
              },
            },
            onClick: {
              required: false,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(event: React.MouseEvent<HTMLButtonElement>) => void',
                signature: {
                  arguments: [
                    {
                      name: 'event',
                      type: {
                        name: 'ReactMouseEvent',
                        raw: 'React.MouseEvent<HTMLButtonElement>',
                        elements: [
                          {
                            name: 'HTMLButtonElement',
                          },
                        ],
                      },
                    },
                  ],
                  return: {
                    name: 'void',
                  },
                },
              },
              description:
                "Button click event handler.\n\n@example Logging the click event\n```tsx\nonClick={() => {\n console.log('Button clicked');\n}}\n```\n\n@param event The click event.\n@returns void",
            },
          },
        })
      ).toEqual({
        name: 'Button',
        description:
          'Buttons allow users to take actions, and make choices, with a single tap.',
        remarks: {
          content: 'Buttons communicate actions that users can take.',
        },
        properties: [
          {
            description: 'The text to display in the button.',
            hasModifiers: false,
            beta: false,
            alpha: false,
            public: false,
            internal: false,
            virtual: false,
            override: false,
            sealed: false,
            params: [],
            name: 'children',
            required: true,
            requiredText: 'Yes',
            type: {
              kind: 'typescript',
              name: 'ReactNode',
              raw: 'ReactNode',
            },
          },
          {
            description: 'The button type.',
            hasModifiers: false,
            beta: false,
            alpha: false,
            public: false,
            internal: false,
            virtual: false,
            override: false,
            sealed: false,
            params: [],
            defaultValue: {
              content: "`'button'`",
            },
            name: 'type',
            required: false,
            requiredText: 'No',
            type: {
              kind: 'typescript',
              name: 'union',
              raw: "'button' | 'submit' | 'reset'",
            },
          },
          {
            description: 'The button variant.',
            hasModifiers: false,
            beta: false,
            alpha: false,
            public: false,
            internal: false,
            virtual: false,
            override: false,
            sealed: false,
            params: [],
            since: '1.1.0',
            defaultValue: {
              content: "`'default'`",
            },
            name: 'variant',
            required: false,
            requiredText: 'No',
            type: {
              kind: 'typescript',
              name: 'union',
              raw: "'default' | 'primary' | 'success' | 'danger'",
            },
          },
          {
            description: 'Button click event handler.',
            hasModifiers: false,
            beta: false,
            alpha: false,
            public: false,
            internal: false,
            virtual: false,
            override: false,
            sealed: false,
            params: [
              {
                name: 'event',
                description: 'The click event.',
              },
            ],
            returns: {
              content: 'void',
            },
            examples: [
              {
                content:
                  "Logging the click event\n\n```tsx\nonClick={() => {\n console.log('Button clicked');\n}}\n```",
              },
            ],
            name: 'onClick',
            required: false,
            requiredText: 'No',
            type: {
              kind: 'typescript',
              name: 'signature',
              raw: '(event: React.MouseEvent<HTMLButtonElement>) => void',
            },
          },
        ],
        params: [],
        isTypeScript: true,
        isPropType: false,
        hasModifiers: true,
        beta: true,
        alpha: false,
        public: true,
        internal: false,
        virtual: false,
        override: false,
        sealed: false,
      });
    });
  });

  describe('When component has prop-types typing', () => {
    it('should return properties', () => {
      expect(
        extractDocDataFromComponentData({
          description:
            'Cards are surfaces that display content and actions on a single topic.',
          displayName: 'Card',
          methods: [],
          props: {
            children: {
              type: {
                name: 'node',
              },
              required: true,
              description: 'The content of the card.',
            },
            raised: {
              type: {
                name: 'bool',
              },
              required: false,
              description: 'The elevation of the card.',
              defaultValue: {
                value: 'false',
                computed: false,
              },
            },
          },
        })
      ).toEqual({
        name: 'Card',
        description:
          'Cards are surfaces that display content and actions on a single topic.',
        properties: [
          {
            name: 'children',
            description: 'The content of the card.',
            required: true,
            requiredText: 'Yes',
            type: {
              kind: 'prop-types',
              name: 'node',
              raw: 'node',
            },
            params: [],
            hasModifiers: false,
            beta: false,
            alpha: false,
            public: false,
            internal: false,
            virtual: false,
            override: false,
            sealed: false,
          },
          {
            name: 'raised',
            description: 'The elevation of the card.',
            required: false,
            requiredText: 'No',
            type: {
              kind: 'prop-types',
              name: 'bool',
              raw: 'bool',
            },
            defaultValue: {
              content: '`false`',
            },
            params: [],
            hasModifiers: false,
            beta: false,
            alpha: false,
            public: false,
            internal: false,
            virtual: false,
            override: false,
            sealed: false,
          },
        ],
        params: [],
        isTypeScript: false,
        isPropType: true,
        hasModifiers: false,
        beta: false,
        alpha: false,
        public: false,
        internal: false,
        virtual: false,
        override: false,
        sealed: false,
      });
    });
  });
});
