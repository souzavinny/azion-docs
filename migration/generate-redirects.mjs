#!/usr/bin/env node
/**
 * generate-redirects.mjs — gera entradas de redirect no formato do
 * cicd/massive-redirect/*.json a partir do migration/de-para.csv.
 *
 * Uso:
 *   node migration/generate-redirects.mjs --fase F1            # uma fase
 *   node migration/generate-redirects.mjs --fase F1 --lang en  # filtra idioma
 *
 * Emite no stdout um objeto { "en": [...], "pt-br": [...] } com entradas
 * { from, moved } (URLs completas), apenas para linhas em que a URL muda
 * (url_norm ≠ novo_lar sem o prefixo de idioma) e cuja ação gera redirect
 * (exclui MANTER e REESCREVER-EM-LUGAR de mesma URL; APOSENTAR-301 incluída).
 *
 * Formato do CSV (ver migration/README.md): url_norm SEM prefixo de idioma
 * (/documentacao/... ou /documentation/...); novo_lar COM prefixo
 * (/pt-br/... ou /en/...). O merge nos JSONs do cicd/ é manual por fase,
 * no PR do entregável correspondente.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const BASE = 'https://www.azion.com';
const CSV = join(dirname(fileURLToPath(import.meta.url)), 'de-para.csv');

function parseArgs() {
	const args = process.argv.slice(2);
	const get = (flag) => {
		const i = args.indexOf(flag);
		return i >= 0 ? args[i + 1] : undefined;
	};
	return { fase: get('--fase'), lang: get('--lang') };
}

// Parser CSV mínimo com suporte a aspas (motivo/título contêm vírgulas).
function parseCsv(text) {
	const rows = [];
	let row = [], field = '', inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (inQuotes) {
			if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
			else if (c === '"') inQuotes = false;
			else field += c;
		} else if (c === '"') inQuotes = true;
		else if (c === ',') { row.push(field); field = ''; }
		else if (c === '\n' || c === '\r') {
			if (c === '\r' && text[i + 1] === '\n') i++;
			row.push(field); field = '';
			if (row.length > 1 || row[0] !== '') rows.push(row);
			row = [];
		} else field += c;
	}
	if (field !== '' || row.length) { row.push(field); rows.push(row); }
	return rows;
}

const { fase, lang } = parseArgs();
if (!fase || !/^F[0-5]$/.test(fase)) {
	console.error('Uso: node migration/generate-redirects.mjs --fase F0..F5 [--lang en|pt-br]');
	process.exit(1);
}

const rows = parseCsv(readFileSync(CSV, 'utf-8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));

const out = { en: [], 'pt-br': [] };
for (const r of rows.slice(1)) {
	if (r[col.fase] !== fase) continue;
	const rowLang = r[col.lang];
	if (lang && rowLang !== lang) continue;
	const urlNorm = r[col.url_norm];
	const novoLar = r[col.novo_lar];
	const from = `${BASE}/${rowLang}${urlNorm}`;
	const moved = `${BASE}${novoLar}`;
	if (from === moved) continue; // URL não muda: sem redirect
	out[rowLang].push({ from, moved });
}

console.error(`fase ${fase}: en=${out.en.length} pt-br=${out['pt-br'].length} entradas`);
console.log(JSON.stringify(out, null, 2));
