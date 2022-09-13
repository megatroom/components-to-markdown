import GithubSlugger = require('github-slugger');

/**
 * Generates an explicit Heading ID from the heading text.
 */
const headingId = (text: string): string => {
  if (!text) {
    return '';
  }

  try {
    const githubSlugger = new GithubSlugger();
    return `{#${githubSlugger.slug(text)}}`;
  } catch (e) {
    console.error(e);
    return '';
  }
};

export default headingId;
