import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Use Your Template',
    image: '/img/undraw_prototyping_process_re_7a6p.svg',
    description: (
      <>
        Choose one of the available templates or create your own with{' '}
        <a href="https://handlebarsjs.com/" target="_blank">
          Handlebars
        </a>{' '}
        and customize all the content.
      </>
    ),
  },
  {
    title: 'Multi-Framework Support',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Markdown is the language used by most frameworks, like Docusaurus and
        Storybook for example.
      </>
    ),
  },
  {
    title: 'Use as a CLI or library',
    image: '/img/undraw_static_assets_rpm6.svg',
    description: (
      <>
        Generate all documentation with just one command, or extend its
        functionality by importing it into your JavaScript/TypeScript code.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
