# tanect-site — タネクト コーポレートサイト ＋ Tanect Home LP

Astro 6 の静的サイト。`main` に push すると GitHub Actions（`.github/workflows/`）がビルドして
GitHub Pages へデプロイし、**https://www.tanect.jp** で配信される（カスタムドメイン・`public/CNAME`）。
**公開（push）は依頼されたときだけ行う。**

経営・事業のコンテキストは `~/src/tanect-management/CLAUDE.md` を参照。

## サイト構成

| パス | 内容 |
|---|---|
| `/` | コーポレートトップ（2本柱：Tanect Home / Tanect Develop） |
| `/about` `/company` `/contact` `/privacy` `/tokushoho` | コーポレート系（`PageLayout.astro` の1カラム文章ページ） |
| `/dev-support` | Tanect Develop（システム開発支援） |
| `/home/` 配下 | Tanect Home の LP ＋ ガイド8本 |

旧URL（トップ直下にあった頃のガイド）は `astro.config.mjs` の `redirects` で恒久転送している。

---

# ページを追加・変更したときのチェックリスト

## 1. 検索に出す／出さないを決める ← いちばん忘れやすい

**`src/config.ts` の `INDEXABLE_PATHS` が検索公開範囲の唯一の正本。**

- **既定は noindex**。このリストに無いパスは `BaseLayout` が自動で `noindex, nofollow` を出す
- 検索に出したいなら、**末尾スラッシュなし**でパスを1行追記する（例: `'/tokushoho'`）
- 追記するだけで **①各ページの meta robots ②canonical ③`sitemap.xml` の収録URL** が同時に決まる。
  他のファイルを触る必要はないし、ページ側に `noindex` を書く必要もない
- 新規ページを足しても、リストに入れない限り検索には出ない（安全側に倒れる設計）

### ⚠️ robots.txt では絶対に Disallow しない

`public/robots.txt` は意図的に `Allow: /` のみ（＋ Sitemap 行）。
**Disallow したパスはクローラーが本文を読めず `meta noindex` に気づけないため、
かえって URL だけが検索結果に載る**（逆効果）。
検索に出したくないページは「クロールは許可・meta noindex で除外」が正しい組み合わせ。

現在の非公開ページと解除条件:

| パス | 解除条件 |
|---|---|
| `/tokushoho` | 有料課金の開始時（2026年8月想定）。手順は `src/pages/tokushoho.astro` 冒頭のコメント |
| `/home/` 配下 | Tanect Home のモニター検証期間が終わったら |

## 2. ナビゲーションに載せるか決める

| ファイル | 役割 |
|---|---|
| `src/components/CorporateHeader.astro` | コーポレート系のヘッダー（`PageLayout` と `/` が使用） |
| `src/components/Header.astro` | Tanect Home LP（`/home/`）のヘッダー |
| `src/components/Footer.astro` | 全ページ共通フッター（サービス／運営情報の2ナビ） |

`/home/` 配下のガイドは `BaseLayout` を直接使い、独自のヘッダーを持つ。

## 3. URL を変えた・ページを移動したとき

`astro.config.mjs` の `redirects` に「旧URL → 新URL」を追加する。
モニターや名刺で配布済みのURLを壊さないため。

## 4. ビルドして実測で確かめる

```sh
npm run build

# 検索対象のページ一覧（robots meta が無い＝索引可）— INDEXABLE_PATHS と一致するはず
grep -L 'name="robots"' dist/**/index.html

# sitemap に載ったURL
cat dist/sitemap.xml
```

## 5. 公開後（検索に出すページを増やしたとき）

Google Search Console（プロパティ＝URLプレフィックス `https://www.tanect.jp`）で
サイトマップを再送信するか、URL検査から「インデックス登録をリクエスト」する。
検索結果に反映されるまで数日〜数週間かかる。

---

# 触るときの注意

## GA4 スニペットに `define:vars` を使わない ← Search Console の所有権確認が壊れる

`src/layouts/BaseLayout.astro` の GA4 初期化は、`set:html` で
**Google 公式スニペットの形（測定IDをリテラルで埋め込む）** をそのまま出力している。

`define:vars` を使うとスクリプトが IIFE で包まれ `gtag('config', gaId)` と**変数**の形になり、
Search Console がソースを文字列として探すため**トラッキングコードを検出できず、所有権確認に失敗する**
（2026-07-29 に実際に踏んだ。厄介なのは **GA の計測自体は正常に動く**こと＝
「計測が動いている」は「所有権確認が通る」の保証にならない）。

現在この所有権確認は **Google アナリティクス方式**で通っているため、
**GAスニペットの書式を変えると所有権確認が外れる可能性がある**。
書式を変えたくなったら、先に DNS認証（ドメインプロパティ）へ切り替えること。

## sitemap.xml は依存パッケージではなく自前のエンドポイント

`src/pages/sitemap.xml.ts`（Astro の静的エンドポイント）。`@astrojs/sitemap` は入れていない。
`INDEXABLE_PATHS` と同じリストを使うので、「sitemap には載っているのに noindex」が構造的に起きない。
`lastmod` は出さない（正確に維持できない日付は検索エンジンに無視されるうえ、毎ビルド差分が出るため）。

## canonical は検索に出すページにだけ出す

`noindex` と `canonical` の併用は検索エンジンへの矛盾した指示になるため、
`BaseLayout` は「索引可なら canonical、そうでなければ noindex」の排他で出力している。
