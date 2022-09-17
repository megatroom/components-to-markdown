import { DocData } from '../typings/DocData';
import { parseTSDoc, formatComment } from './parseTSDoc';

const defaultDocData: DocData = {
  description: '',
  hasModifiers: false,
  beta: false,
  alpha: false,
  public: false,
  internal: false,
  virtual: false,
  override: false,
  sealed: false,
  params: [],
};

describe('parseTSDoc()', () => {
  it('should parse simple description', () => {
    const content = 'This is a simple description';
    const expected = {
      ...defaultDocData,
      description: 'This is a simple description',
    };

    expect(parseTSDoc(formatComment(content))).toEqual(expected);
  });

  describe('When has description', () => {
    it('should parse long description', () => {
      const content = `Lord of the Rings: The Fellowship of the Ring

The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002), and The Return of the King (2003). Produced and distributed by New Line Cinema with the co-production of WingNut Films, the series is an international venture between New Zealand and the United States.

The films feature an ensemble cast including Elijah Wood, Ian McKellen, Liv Tyler, Viggo Mortensen, Sean Astin, Cate Blanchett, John Rhys-Davies, Christopher Lee, Billy Boyd, Dominic Monaghan, Orlando Bloom, Hugo Weaving, Andy Serkis and Sean Bean.

Set in the fictional world of Middle-earth, the films follow the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker, the Dark Lord Sauron. The Fellowship eventually splits up and Frodo continues the quest with his loyal companion Sam and the treacherous Gollum. Meanwhile, Aragorn, heir in exile to the throne of Gondor, along with Legolas, Gimli, Boromir, Merry, Pippin and the wizard Gandalf, unite to save the Free Peoples of Middle-earth from the forces of Sauron and rally them in the War of the Ring to aid Frodo by distracting Sauron's attention.
`;
      const expected = {
        ...defaultDocData,
        description:
          'Lord of the Rings: The Fellowship of the Ring\n\n' +
          'The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002), and The Return of the King (2003). Produced and distributed by New Line Cinema with the co-production of WingNut Films, the series is an international venture between New Zealand and the United States.\n\n' +
          'The films feature an ensemble cast including Elijah Wood, Ian McKellen, Liv Tyler, Viggo Mortensen, Sean Astin, Cate Blanchett, John Rhys-Davies, Christopher Lee, Billy Boyd, Dominic Monaghan, Orlando Bloom, Hugo Weaving, Andy Serkis and Sean Bean.\n\n' +
          "Set in the fictional world of Middle-earth, the films follow the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker, the Dark Lord Sauron. The Fellowship eventually splits up and Frodo continues the quest with his loyal companion Sam and the treacherous Gollum. Meanwhile, Aragorn, heir in exile to the throne of Gondor, along with Legolas, Gimli, Boromir, Merry, Pippin and the wizard Gandalf, unite to save the Free Peoples of Middle-earth from the forces of Sauron and rally them in the War of the Ring to aid Frodo by distracting Sauron's attention.",
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it('should handle single paragraph with line breaks', () => {
      const content = `The Lord of the Rings is a series of three epic fantasy
adventure films directed by Peter Jackson,
based on the novel written by J. R. R. Tolkien.
The films are subtitled The Fellowship of the Ring (2001),
The Two Towers (2002), and The Return of the King (2003).
`;
      const expected = {
        ...defaultDocData,
        description:
          'The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002), and The Return of the King (2003).',
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it('should handle many paragraphs', () => {
      const content = `Line 1.a.
Line 1.b.
Line 1.c.

Line 2.a.
Line 2.b.
Line 2.c.

Line 3.a.
Line 3.b.
Line 3.c.
`;
      const expected = {
        ...defaultDocData,
        description: `Line 1.a. Line 1.b. Line 1.c.

Line 2.a. Line 2.b. Line 2.c.

Line 3.a. Line 3.b. Line 3.c.`,
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it('should handle inline tags', () => {
      const content = `With \`inline code\` and {@link https://site.com|link} and **bold text**
and a line break.

And some more text.
`;
      const expected = {
        ...defaultDocData,
        description: `With \`inline code\` and {@link https://site.com|link} and **bold text** and a line break.

And some more text.`,
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it('should handle code block', () => {
      const content = `Here some code:
\`\`\`jsx
const a = 1;
const b = 2;
console.log(a + b);
\`\`\`

Here two line breaks after this paragraph:

\`\`\`
console.log('Hello world!');
\`\`\`
`;
      const expected = {
        ...defaultDocData,
        description: `Here some code:

\`\`\`jsx
const a = 1;
const b = 2;
console.log(a + b);
\`\`\`

Here two line breaks after this paragraph:

\`\`\`
console.log('Hello world!');
\`\`\``,
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });
  });

  /**
   * Testes for Modifier kind of tags.
   * https://tsdoc.org/pages/spec/tag_kinds/#modifier-tags
   */
  describe('Modifier tags', () => {
    it.each([
      ['@alpha', 'alpha'],
      ['@beta', 'beta'],
      ['@experimental', 'beta'],
      ['@public', 'public'],
      ['@internal', 'internal'],
      ['@virtual', 'virtual'],
      ['@override', 'override'],
      ['@sealed', 'sealed'],
    ])('should parse %s as "%s: true"', (tagName, propName) => {
      const content = `A component with modifier
   ${tagName}`;
      const expected = {
        ...defaultDocData,
        description: 'A component with modifier',
        hasModifiers: true,
        [propName]: true,
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it('should parse two modifiers together', () => {
      const content = `A component with two modifiers
@alpha @public`;
      const expected = {
        ...defaultDocData,
        description: 'A component with two modifiers',
        hasModifiers: true,
        alpha: true,
        public: true,
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });
  });

  /**
   * Testes for Block kind of tags.
   * https://tsdoc.org/pages/spec/tag_kinds/#block-tags
   */
  describe('Block tags', () => {
    it('should parse @deprecated', () => {
      const content = `The base class for controls that can be rendered.

  @deprecated Use the new {@link Control} base class instead.`;
      const expected = {
        ...defaultDocData,
        description: 'The base class for controls that can be rendered.',
        deprecated: {
          content: 'Use the new {@link Control} base class instead.',
        },
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    describe('With @remarks', () => {
      it('should parse single paragraph', () => {
        const content = `A fancy component

    @remarks
    This is a remark paragraph.`;
        const expected = {
          ...defaultDocData,
          description: 'A fancy component',
          remarks: {
            content: 'This is a remark paragraph.',
          },
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });

      it('should parse many paragraphs', () => {
        const content = `A fancy component

@remarks
Soft break after.
Soft break after.
Hard break after.

Soft break after.
Soft break after.
Hard break after.

Soft break after.
Soft break after.
`;

        const expected = {
          ...defaultDocData,
          description: 'A fancy component',
          remarks: {
            content: `Soft break after. Soft break after. Hard break after.

Soft break after. Soft break after. Hard break after.

Soft break after. Soft break after.`,
          },
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });
    });

    it('should parse @returns', () => {
      const content = '@returns The arithmetic mean of `x` and `y`';
      const expected = {
        ...defaultDocData,
        returns: {
          content: 'The arithmetic mean of `x` and `y`',
        },
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    describe('should parse @defaultValue', () => {
      it('with only value', () => {
        const content = '@defaultValue `WarningStyle.DialogBox`';
        const expected = {
          ...defaultDocData,
          defaultValue: {
            content: '`WarningStyle.DialogBox`',
          },
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });

      it('with only description', () => {
        const content = '@defaultValue This is a description';
        const expected = {
          ...defaultDocData,
          defaultValue: {
            content: 'This is a description',
          },
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });

      it('with content', () => {
        const content = `
@defaultValue
The default is \`true\` unless
 \`WarningStyle.StatusMessage\` was requested.
  `;
        const expected = {
          ...defaultDocData,
          defaultValue: {
            content:
              'The default is `true` unless  `WarningStyle.StatusMessage` was requested.',
          },
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });

      it('with content and description', () => {
        const content = `
@defaultValue Warning cancellable with \`boolean\` type.
The default is \`true\` unless
 \`WarningStyle.StatusMessage\` was requested.
  `;
        const expected = {
          ...defaultDocData,
          defaultValue: {
            content:
              'Warning cancellable with `boolean` type. The default is `true` unless  `WarningStyle.StatusMessage` was requested.',
          },
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });
    });

    describe('should parse @example', () => {
      it('with only description', () => {
        const content = '@example This is a description';
        const expected = {
          ...defaultDocData,
          examples: [
            {
              content: 'This is a description',
            },
          ],
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });

      it('with description and content', () => {
        const content = `
@example Here's a simple example
\`\`\`
// Prints "2":
console.log(add(1,1));
\`\`\`
      `;
        const expected = {
          ...defaultDocData,
          examples: [
            {
              content: `Here's a simple example

\`\`\`
// Prints "2":
console.log(add(1,1));
\`\`\``,
            },
          ],
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });

      it('with two examples', () => {
        const content = `
@example
Here's a simple example:
\`\`\`
// Prints "2":
console.log(add(1,1));
\`\`\`
@example
Here's an example with negative numbers:
\`\`\`js
// Prints "0":
console.log(add(1,-1));
\`\`\`
      `;
        const expected = {
          ...defaultDocData,
          examples: [
            {
              content: `Here's a simple example:

\`\`\`
// Prints "2":
console.log(add(1,1));
\`\`\``,
            },
            {
              content: `Here's an example with negative numbers:

\`\`\`js
// Prints "0":
console.log(add(1,-1));
\`\`\``,
            },
          ],
        };

        expect(parseTSDoc(formatComment(content))).toEqual(expected);
      });
    });
  });

  it('should parse @param', () => {
    const content = `Simple calculator.
@param x - The first input number
@param y - The second input number`;
    const expected = {
      ...defaultDocData,
      description: 'Simple calculator.',
      params: [
        {
          name: 'x',
          description: 'The first input number',
        },
        {
          name: 'y',
          description: 'The second input number',
        },
      ],
    };

    expect(parseTSDoc(formatComment(content))).toEqual(expected);
  });

  describe('should parse @since', () => {
    it('with version', () => {
      const content = `Some component description.
    @since 1.1.0`;
      const expected = {
        ...defaultDocData,
        description: 'Some component description.',
        since: '1.1.0',
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it('with text', () => {
      const content = `Some component description.
    @since Some version text`;
      const expected = {
        ...defaultDocData,
        description: 'Some component description.',
        since: 'Some version text',
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it('without description', () => {
      const content = `Some component description.
    @since`;
      const expected = {
        ...defaultDocData,
        description: 'Some component description.',
        since: '',
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });

    it.skip('should parse @since after @defaultValue', () => {
      const content = `Some component description.
    @defaultValue This is a description
    @since 1.1.0
    `;
      const expected = {
        ...defaultDocData,
        description: 'Some component description.',
        since: '1.1.0',
        defaultValue: {
          content: 'This is a description',
        },
      };

      expect(parseTSDoc(formatComment(content))).toEqual(expected);
    });
  });
});
