import { DocData } from '../typings/DocData';
import { parseTSDoc, formatComment } from './parseTSDoc';

const defaultDocData: DocData = {
  description: '',
  tags: [],
  modifiers: [],
  params: [],
};

it('should parse simple description', () => {
  const content = 'This is a simple description';
  const expected = {
    ...defaultDocData,
    description: 'This is a simple description',
  };

  expect(parseTSDoc(formatComment(content))).toEqual(expected);
});

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
      'The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002), and The Return of the King (2003). Produced and distributed by New Line Cinema with the co-production of WingNut Films, the series is an international venture between New Zealand and the United States.\n' +
      'The films feature an ensemble cast including Elijah Wood, Ian McKellen, Liv Tyler, Viggo Mortensen, Sean Astin, Cate Blanchett, John Rhys-Davies, Christopher Lee, Billy Boyd, Dominic Monaghan, Orlando Bloom, Hugo Weaving, Andy Serkis and Sean Bean.\n\n' +
      "Set in the fictional world of Middle-earth, the films follow the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker, the Dark Lord Sauron. The Fellowship eventually splits up and Frodo continues the quest with his loyal companion Sam and the treacherous Gollum. Meanwhile, Aragorn, heir in exile to the throne of Gondor, along with Legolas, Gimli, Boromir, Merry, Pippin and the wizard Gandalf, unite to save the Free Peoples of Middle-earth from the forces of Sauron and rally them in the War of the Ring to aid Frodo by distracting Sauron's attention.",
  };

  expect(parseTSDoc(formatComment(content))).toEqual(expected);
});

it('should parse @remarks', () => {
  const content = `A fancy component

@remarks
This is a remark paragraph.`;
  const expected = {
    ...defaultDocData,
    description: 'A fancy component',
    tags: [
      {
        name: '@remarks',
        description: 'This is a remark paragraph.',
      },
    ],
  };

  expect(parseTSDoc(formatComment(content))).toEqual(expected);
});

it('should parse @beta', () => {
  const content = `A beta component
@beta`;
  const expected = {
    ...defaultDocData,
    description: 'A beta component',
    modifiers: [
      {
        name: '@beta',
        description: '',
      },
    ],
  };

  expect(parseTSDoc(formatComment(content))).toEqual(expected);
});

it('should parse @alpha', () => {
  const content = `A alpha component
@alpha`;
  const expected = {
    ...defaultDocData,
    description: 'A alpha component',
    modifiers: [
      {
        name: '@alpha',
        description: '',
      },
    ],
  };

  expect(parseTSDoc(formatComment(content))).toEqual(expected);
});

it('should parse @deprecated', () => {
  const content = `The base class for controls that can be rendered.

@deprecated Use the new {@link Control} base class instead.`;
  const expected = {
    ...defaultDocData,
    description: 'The base class for controls that can be rendered.',
    tags: [
      {
        name: '@deprecated',
        description: 'Use the new {@link Control} base class instead.',
      },
    ],
  };

  expect(parseTSDoc(formatComment(content))).toEqual(expected);
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

it('should parse @returns', () => {
  const content = '@returns The arithmetic mean of `x` and `y`';
  const expected = {
    ...defaultDocData,
    tags: [
      {
        name: '@returns',
        description: 'The arithmetic mean of `x` and `y`',
      },
    ],
  };

  expect(parseTSDoc(formatComment(content))).toEqual(expected);
});
