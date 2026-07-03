// サイト全体の差し替え必須設定値。本番移行時はこの2つを書き換える。

// 家族モニター申し込みフォーム（Googleフォーム）の本番URL。
// ⚠️ 差し替え必須：本番のフォームURLが決まったらここを書き換える。
// フォーム回答は連携先のスプレッドシートに自動集約される。
export const FORM_URL = 'https://forms.gle/j5j61WtzYTnhFY2Z8';

// GA4 測定ID（例 'G-XXXXXXXXXX'）。
// 空文字のうちは計測スクリプトを一切ロードしない（サイトは正常表示）。
export const GA_MEASUREMENT_ID = '';

// 事業用の問い合わせメールアドレス（受信は稼働済み・PP/特商法/名刺と共通）。
export const SUPPORT_EMAIL = 'support@tanect.jp';
