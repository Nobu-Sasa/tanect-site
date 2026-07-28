// サイト全体の差し替え必須設定値。

// GA4 測定ID（例 'G-XXXXXXXXXX'）。
// 空文字のうちは計測スクリプトを一切ロードしない（サイトは正常表示）。
export const GA_MEASUREMENT_ID = 'G-93XNZK1SPD';

// 事業用の問い合わせメールアドレス（受信は稼働済み・PP/特商法/名刺と共通）。
export const SUPPORT_EMAIL = 'support@tanect.jp';

/**
 * 検索エンジンに載せるページ（末尾スラッシュなしで書く）。ここが検索公開範囲の正本。
 *
 * このリスト1本で3つが同時に決まるので、ここ以外を編集する必要はない:
 *   1. 各ページの <meta name="robots">（BaseLayout が自動判定・載せないページは noindex,nofollow）
 *   2. canonical URL の出力有無（BaseLayout）
 *   3. sitemap.xml に載る URL（src/pages/sitemap.xml.ts）
 *
 * 2026-07-28 時点でコーポレート6ページのみ公開（Phase 3）。除外中のページと解除条件:
 *   - /tokushoho     … 「準備中」注記が付いているため。有料課金の開始時（2026年8月想定）に追加
 *   - /home 配下     … Tanect Home のLP・ガイド。家族モニター（検証）期間中のため据え置き
 * 参照: tanect-management CLAUDE.md / brand_foundation_setup.md §4・§8
 */
export const INDEXABLE_PATHS = [
  '/',
  '/about',
  '/company',
  '/dev-support',
  '/contact',
  '/privacy',
];
