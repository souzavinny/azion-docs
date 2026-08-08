/** Derived from src/i18n/menus/certificate-manager.menu.json — edit the JSON, not this file. */
import menu from '../menus/certificate-manager.menu.json';
import { menuMetaFromJson, navFromJson, type NavMenuJson } from '../nav-transform';

export const meta = menuMetaFromJson(menu as NavMenuJson, 'en');
export default navFromJson(menu as NavMenuJson, 'en');
