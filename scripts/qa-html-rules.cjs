module.exports = HTMLHint => HTMLHint.addRule({
  id: 'lk-valid-nesting', description: 'High-confidence invalid nesting and malformed attribute names',
  init(parser, reporter) {
    const stack = [], voids = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
    const blocks = new Set('address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hr main nav ol p pre section table ul'.split(' '));
    parser.addListener('tagstart', e => {
      const tag = e.tagName.toLowerCase(), parent = stack.at(-1);
      const problem = (tag === 'a' && stack.includes('a')) || (tag === 'form' && stack.includes('form')) ||
        (['button', 'input', 'select', 'textarea', 'a'].includes(tag) && stack.includes('button')) ||
        (blocks.has(tag) && stack.includes('p')) ||
        (['ul', 'ol'].includes(parent) && !['li', 'script', 'template'].includes(tag));
      if (problem) reporter.error(`Invalid nesting: <${tag}> inside <${parent}>.`, e.line, e.col, this, e.raw);
      for (const attr of e.attrs) if (/[\s"'<>/=\x00-\x1f]/.test(attr.name)) reporter.error(`Invalid attribute name: ${attr.name}`, e.line, e.col, this, e.raw);
      if (!voids.has(tag) && !e.close) stack.push(tag);
    });
    parser.addListener('tagend', e => { const i = stack.lastIndexOf(e.tagName.toLowerCase()); if (i >= 0) stack.length = i; });
  },
});
