/**
 * remark-mermaid — hands ```mermaid fences to the browser instead of the
 * syntax highlighter.
 *
 * Expressive Code turns every fenced block into a highlighted <pre>, mermaid
 * fences included. This plugin runs first and replaces the code node with a
 * raw HTML node, so Expressive Code never sees it and the diagram source
 * reaches the page intact for src/components/Mermaid.astro to render.
 *
 * The fence stays a fence in the .mdx source, which is what the style guide
 * requires: an agent fetching the markdown twin reads the diagram as text.
 */
const escapeHtml = (raw) =>
	raw
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

export default function remarkMermaid() {
	return function (tree) {
		const walk = (node) => {
			if (!node.children) return;
			node.children.forEach((child, index) => {
				if (child.type === 'code' && child.lang === 'mermaid') {
					node.children[index] = {
						type: 'html',
						value: `<pre class="mermaid" data-mermaid-source="${escapeHtml(
							child.value
						)}">${escapeHtml(child.value)}</pre>`,
					};
					return;
				}
				walk(child);
			});
		};
		walk(tree);
	};
}
