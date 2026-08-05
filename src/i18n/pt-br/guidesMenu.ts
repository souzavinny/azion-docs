/**
 * Guides sidebar — derived from src/i18n/guides.menu.json (hand-curated source of truth).
 * Edit the JSON, not this file. Validated by `npm run lint:navcheck`.
 *
 * Guides live in their own top-level section, so this tree groups them by pillar and
 * product only: there is no "Guides" level inside it, because the split from Reference
 * already happened at the root.
 */
import menu from '../guides.menu.json';
import { navFromJson, type NavMenuJson } from '../nav-transform';

export default navFromJson(menu as NavMenuJson, 'pt-br');
