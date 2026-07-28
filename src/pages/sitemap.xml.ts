// sitemap.xml — 検索エンジンに「このURLを見てほしい」と伝える一覧。
// 収録するURLは config.ts の INDEXABLE_PATHS が正本（各ページの noindex 判定と同じリストを使うので、
// 「sitemap には載っているのに noindex」という食い違いが起きない）。
// lastmod は出さない（正確に維持できない日付は検索エンジンに無視されるうえ、毎ビルド変わって差分が汚れるため）。
import type { APIRoute } from 'astro';
import { INDEXABLE_PATHS } from '../config';

export const GET: APIRoute = ({ site }) => {
  // astro.config.mjs で site を設定済みのため必ず存在する。
  const urls = INDEXABLE_PATHS.map(
    (path) => new URL(path === '/' ? '/' : `${path}/`, site!).href
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
