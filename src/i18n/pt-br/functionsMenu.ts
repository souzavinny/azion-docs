/** Derived from src/i18n/menus/functions.menu.json — edit the JSON, not this file. */
import menu from '../menus/functions.menu.json';
import { menuMetaFromJson, navFromJson, type NavMenuJson } from '../nav-transform';

export const meta = menuMetaFromJson(menu as NavMenuJson, 'pt-br');
export default navFromJson(menu as NavMenuJson, 'pt-br');
