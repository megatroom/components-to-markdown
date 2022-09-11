---
sidebar_position: 3
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Documentation

This documentation is our main channel of communication and the only source of truth for all material about the project. Helping with the evolution of documentation is just as important as the evolution of the code itself.

## Quick update

The fastest way to update the documentation is to do it directly from the browser, just follow the steps in the topics below.

### 1. Find the Markdown file

Scroll to the bottom of the document in question, then click on the **"Edit this page"** link.

<BrowserWindow url={useBaseUrl('/docs/getting-started/introduction')}>

![Edit this page](/img/contribue/edit-link.png)

</BrowserWindow>

### 2. Edit the Markdown file

You will be redirected to the GitHub repository where the file is located. Click on the **"Edit this file"** button.

Scroll down to the bottom of the document page and describe what you changed and why. Select the **"Create a new branch for this commit and start a pull request."** then click the "Propose changes" button.

<BrowserWindow>

![Editing Markdown](/img/contribue/editing-markdown.png)

</BrowserWindow>

### 3. Create the pull request

In the C2M repository, create a pull request that describes changes and includes additional context that would help maintainers review. Once you submit the PR, a maintainer will guide you through the triage and merge process.

## Running the documentation locally

### 1. Fork the project

Follow the steps in topic [Project setup](/docs/contribute/code#project-setup) to fork the project into your local development environment.

### 2. Running Documentation Website

To run the documentation website, run:

```bash
yarn serve website
```

The browser will open automatically with the website.
