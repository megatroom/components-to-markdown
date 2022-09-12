import React, { useState } from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

import BrowserWindow from '../BrowserWindow';

import ComponentExample from '!!raw-loader!./ComponentExample';
import brachiosaurus from './brachiosaurus.md';
import stegosaurus from './stegosaurus.md';

import styles from './styles.module.css';

const templates = {
  brachiosaurus,
  stegosaurus,
};

const templateNames = [
  { value: 'brachiosaurus', label: 'Brachiosaurus (default)' },
  { value: 'stegosaurus', label: 'Stegosaurus (Properties Table)' },
];

export default function HowItWorks(): JSX.Element {
  const [template, setTemplate] = useState(templateNames[0]);
  const ButtonDoc = templates[template.value];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2
          className={clsx(
            'margin-bottom--lg text--center',
            styles.sectionTitle
          )}
        >
          How it works
        </h2>
      </div>
      <div className={styles.fullWidthContainer}>
        <div className="row margin-bottom--lg">
          <div className="col col--6">
            <div className={styles.howItWorkColumn}>
              <h3>1. Write Your Component</h3>
              <p>
                You will develop your code in the conventional way using types:
              </p>
              <CodeBlock language="tsx" title="Button.tsx">
                {ComponentExample}
              </CodeBlock>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.howItWorkColumn}>
              <h3>2. Choose a template</h3>
              <p>
                Then you can create your own{' '}
                <a href={useBaseUrl('/docs/getting-started/template')}>
                  template
                </a>{' '}
                or select one of the available templates:
              </p>
              <div className="margin-bottom--lg">
                <div className="dropdown dropdown--hoverable">
                  <button className="button button--primary">
                    {template.label}
                  </button>
                  <ul className="dropdown__menu">
                    {templateNames.map((option) => (
                      <li>
                        <a
                          className={clsx('dropdown__link', {
                            'dropdown__link--active':
                              option.value === template.value,
                          })}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setTemplate(option);
                          }}
                        >
                          {option.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <h3>3. Generate the Documentation</h3>
              <p>
                Now just{' '}
                <a
                  href={useBaseUrl('/docs/getting-started/introduction#usage')}
                >
                  generate your awesome documentation
                </a>
                .
              </p>
              <p>Below is a demo according to the template chosen above:</p>
              <BrowserWindow
                minHeight={400}
                url="https://your-awesome-documentation.com"
              >
                <ButtonDoc />
              </BrowserWindow>
            </div>
          </div>
        </div>
      </div>
      <div className="container text--center">
        <a
          className="button button--outline button--lg button--primary"
          href={useBaseUrl('/demo/introduction')}
        >
          See full demo of all templates
        </a>
      </div>
    </section>
  );
}
