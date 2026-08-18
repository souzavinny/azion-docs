/** Derived from src/i18n/menus/application-accelerator.menu.json — edit the JSON, not this file. */
import menu from '../menus/application-accelerator.menu.json';
import { menuMetaFromJson, navFromJson, type NavMenuJson } from '../nav-transform';

export const meta = menuMetaFromJson(menu as NavMenuJson, 'en');
export default navFromJson(menu as NavMenuJson, 'en');
