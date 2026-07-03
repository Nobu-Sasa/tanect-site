// @ts-check
import { defineConfig } from 'astro/config';

// tanect.jp 接続（Phase 1）: カスタムドメイン www.tanect.jp をルート配信するため
// SITE を本番ドメイン、BASE を '' に設定。GitHub Pages のプロジェクトパス配信ではなくなった。
const SITE = 'https://www.tanect.jp';
const BASE = '';

// コーポレートサイト化に伴い、Tanect Home のLP・ガイドを /home/ 配下へ移設した。
// モニターへ配布済みの旧URL（トップ直下）を壊さないための恒久リダイレクト。
// 静的ビルドでは meta refresh のHTMLが旧パスに生成される。
// 注意: Astro は redirects の遷移先に base を自動付与しないため、ここで BASE を前置する。
const movedGuides = [
  'install',
  'family-setup',
  'first-settings',
  'family-roles',
  'support-parent',
  'view-activity',
  'weekly-family',
  'release-notes',
];

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE || '/',
  trailingSlash: 'ignore',
  redirects: Object.fromEntries(
    movedGuides.map((slug) => [`/${slug}`, `${BASE}/home/${slug}`])
  ),
});
