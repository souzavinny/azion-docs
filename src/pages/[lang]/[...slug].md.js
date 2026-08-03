import { allPages } from '~/content';
import { getLangFromSlug, stripLangFromSlug, getSlugFromPermalink } from '~/util';
import firstDeploySkillEn from '~/data/agent-skills/first-deploy.en.md?raw';
import firstDeploySkillPtBr from '~/data/agent-skills/first-deploy.pt-br.md?raw';

// Curated Agent Skill renderings served as a page's .md twin, keyed by
// namespace and language. Edit the sidecar files under src/data/agent-skills.
const AGENT_SKILL_OVERRIDES = {
	documentation_get_started_first_deploy: {
		en: firstDeploySkillEn,
		'pt-br': firstDeploySkillPtBr,
	},
};

function removeFrontMatter(body) {
	return body.replace(/^---[\s\S]*?---\n?/, '');
}

function getMarkdownContent(title, body) {
	return `# ${title}\n\n${removeFrontMatter(body)}`;
}

function getJsxAttrs(tag) {
	const attrs = {};
	const re = /(\w+)="([^"]*)"/g;
	let match;
	while ((match = re.exec(tag))) {
		attrs[match[1]] = match[2];
	}
	return attrs;
}

function toMdTwinLink(link) {
	return /^\/(en|pt-br)\//.test(link) ? link.replace(/\/$/, '') + '.md' : link;
}

// Agent-readable rendering: serves the page as an Agent Skill — YAML
// frontmatter (name derived from the namespace, description from the page
// description) followed by plain markdown with the MDX plumbing stripped
// (imports/exports/JSX wrappers) and the known component vocabulary rewritten.
// The copyable prompt is inlined as a fenced block. Only agent-setup pages.
function getSkillFrontMatter(data) {
	const name = data.namespace.replace(/^documentation_/, 'azion-').replace(/_/g, '-');
	const description = String(data.description || '').replace(/\s+/g, ' ').trim();
	return `---\nname: ${name}\ndescription: >-\n  ${description}\n---\n\n`;
}

function getAgentReadableMarkdown(title, body) {
	let prompt = '';
	let content = removeFrontMatter(body);

	content = content.replace(/export const agentPrompt = `([\s\S]*?)`;\n?/, (_, captured) => {
		prompt = captured;
		return '';
	});

	content = content.replace(
		/<Code lang="(\w+)" code={`([\s\S]*?)`} \/>/g,
		(_, lang, code) => '```' + lang + '\n' + code + '\n```'
	);

	let stepNumber = 0;
	let numberNextLine = false;
	const lines = content.split('\n').map((line) => {
		const trimmed = line.trim();
		if (trimmed.startsWith('import ')) return null;
		if (/^<div class="step">/.test(trimmed)) {
			stepNumber++;
			numberNextLine = true;
			return null;
		}
		if (/^<\/?div\b/.test(trimmed) || trimmed === '</div>') return null;
		if (/^<\/?Steps>/.test(trimmed)) return null;
		if (/^<h1\b/.test(trimmed)) return null;
		if (/^<span\b/.test(trimmed)) return null;
		if (/^<AgentToolFilter\b/.test(trimmed)) return null;
		if (/^<ReadableColumn\b/.test(trimmed)) return null;
		if (numberNextLine && trimmed) {
			numberNextLine = false;
			return `${stepNumber}. ${trimmed}`;
		}
		const paragraph = trimmed.match(/^<p [^>]*>(.*)<\/p>$/);
		if (paragraph) return paragraph[1];
		if (/^<AgentCopyPrompt\b/.test(trimmed)) {
			return prompt ? '```text\n' + prompt + '\n```' : null;
		}
		if (/^<DocsCard\b[^>]*\/>$/.test(trimmed)) {
			const attrs = getJsxAttrs(trimmed);
			return `- [${attrs.title}](${toMdTwinLink(attrs.link)})${attrs.description ? ': ' + attrs.description : ''}`;
		}
		if (/^<LinkButton\b[^>]*\/>$/.test(trimmed)) {
			const attrs = getJsxAttrs(trimmed);
			if (!attrs.link || attrs.link.startsWith('#')) return null;
			return `[${attrs.label}](${attrs.link})`;
		}
		return line;
	});

	const cleaned = lines
		.filter((line) => line !== null)
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();

	return `# ${title}\n\n${cleaned}\n`;
}

function getMarkdownBasedOnCards(title, description, productCards) {
	if (!productCards || !Array.isArray(productCards)) {
		return '';
	}

	let content = '';
	
	// Adicionar título principal e descrição
	if (title) {
		content += `# ${title}\n\n`;
	}
	
	if (description) {
		content += `${description}\n\n`;
	}

	const productCardsSections = productCards
		.map((productCard) => {
			if (!productCard.title || !productCard.cards || !Array.isArray(productCard.cards)) {
				return '';
			}

			let section = `## ${productCard.title}\n\n`;

			const cardsSections = productCard.cards
				.map((card) => {
					if (!card.title) {
						return '';
					}

					let cardSection = `### ${card.title}\n\n`;

					if (card.description) {
						cardSection += `${card.description}\n\n`;
					}

					if (card.link) {
						// Remove trailing slash and add .md extension
						const convertedLink = card.link.replace(/\/$/, '') + '.md';
						cardSection += `[${card.title}](${convertedLink})\n\n`;
					}

					return cardSection;
				})
				.join('');

			section += cardsSections;
			return section;
		})
		.join('\n');

	return content + productCardsSections;
}

export async function getStaticPaths() {
	return allPages.map((page) => {
		const permalink = getSlugFromPermalink(page);
		const lang = getLangFromSlug(page.slug);
		const slug = typeof permalink === 'string' ? permalink : stripLangFromSlug(page.slug);

		return {
			params: { lang, slug: slug },
			props: { page },
		};
	});
}

export async function GET({ props }) {
	const { page } = props;
	const { body, data } = page;
	const { title, description, product_cards } = data;

	let content = '';

	const skillOverride = data.namespace && AGENT_SKILL_OVERRIDES[data.namespace];

	if (skillOverride) {
		content = skillOverride[getLangFromSlug(page.slug)] || skillOverride.en;
	} else if (product_cards && Array.isArray(product_cards)) {
		content = getMarkdownBasedOnCards(title, description, product_cards);
	} else if (body && data.namespace && data.namespace.startsWith('documentation_agent_setup')) {
		content = getSkillFrontMatter(data) + getAgentReadableMarkdown(title, body);
	} else if (body) {
		content = getMarkdownContent(title, body);
	}

	return new Response(content, {
		status: 200,
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
}
