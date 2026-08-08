/** Derived from src/i18n/menus/agreements.menu.json — edit the JSON, not this file. */
import menu from '../menus/agreements.menu.json';
import { menuMetaFromJson, navFromJson, type NavMenuJson } from '../nav-transform';

export const meta = menuMetaFromJson(menu as NavMenuJson, 'pt-br');
export default navFromJson(menu as NavMenuJson, 'pt-br');
