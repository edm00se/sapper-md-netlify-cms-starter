import fs from 'fs';
import path from 'path';
import marked from 'marked';
import { siteUrl } from '../stores/_config.js';

const WHERE_ALL_THE_MARKDOWN_DYNAMIC_PAGES_ARE = 'content/pages';

export function getPages () {
  const slugs = fs.readdirSync(WHERE_ALL_THE_MARKDOWN_DYNAMIC_PAGES_ARE)
    .filter(file => path.extname(file) === '.md')
    .map(file => file.slice(0, -3));
  
  return slugs.map(getPage);
}

const renderHeadingWithAnchor = (slug) => (text, level) => {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `
    <h${level}>
      <a name="${escapedText}" aria-hidden="true" class="anchor" href="${slug}#${escapedText}">
        <span class="header-link"></span>
      </a>
      ${text}
    </h${level}>`;
};

export function getPage(slug) {

  const file = `${WHERE_ALL_THE_MARKDOWN_DYNAMIC_PAGES_ARE}/${slug}.md`;
  if (!fs.existsSync(file)) return null;

  const markdown = fs.readFileSync(file, 'utf-8');

  const { content, metadata } = processMarkdown(markdown);

  const renderer = new marked.Renderer();
  renderer.heading = renderHeadingWithAnchor(slug);

  const thumb = metadata.thumb;
  metadata.thumb = (thumb && thumb.indexOf(siteUrl) < 0) ? (siteUrl + '/' + thumb) : thumb;

  const html = marked(content, {
    headerIds: true,
    smartypants: true,
    renderer: renderer,
  });

  const alternateSlug = metadata.slug;
  return {
    slug: alternateSlug || slug,
    metadata,
    html,
  };
}

function processMarkdown(markdown) {
  const match = /---\n([\s\S]+?)\n---/.exec(markdown);
  const frontMatter = match[1];
  const content = markdown.slice(match[0].length);

  const metadata = {};
  frontMatter.split('\n').forEach(pair => {
    const colonIndex = pair.indexOf(':');
    metadata[pair.slice(0, colonIndex).trim()] = pair
      .slice(colonIndex + 1)
      .trim();
  });

  return { metadata, content };
}