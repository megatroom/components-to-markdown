import { parse } from 'react-docgen';

const parseReactComp = (content: Buffer) => {
  const doc = parse(content, undefined, undefined, {
    // babelrc: false,
    babelrcRoots: false,
    // configFile: false,
  });

  console.log({ doc });
};

export default parseReactComp;
