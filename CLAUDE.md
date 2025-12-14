# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

PRがapproveされたときに [lgtmeow.com](https://lgtmeow.com/) からランダムな猫のLGTM画像を自動投稿するGitHub App。Probotフレームワークを使用。

## コマンド

- `npm run build` - TypeScriptをdist/にコンパイル
- `npm start` - コンパイル済みアプリをProbotで実行
- `npm run dev` - ビルドと実行を一度に行う

## アーキテクチャ

- **フレームワーク**: Probot (GitHub Appフレームワーク)
- **言語**: TypeScript (strict mode)
- **エントリーポイント**: `src/index.ts` がProbotアプリ関数をエクスポート
- **イベントハンドラー**: `pull_request_review.submitted` イベントをリッスン

## ローカル開発

`.env` ファイルに以下を設定:
- `APP_ID` - GitHub App ID
- `PRIVATE_KEY_PATH` - .pemファイルへのパス
- `WEBHOOK_SECRET` - Webhook secret
- `WEBHOOK_PROXY_URL` - smee.io URL（ローカルへのWebhook転送用）

## Pull Requestルール

### ブランチとターゲット
- 現在のブランチをそのまま使用（ブランチはユーザーが作成）
- PRタイトルは日本語で記述
- ターゲットブランチは特に指定がない限り `main`

### PR説明欄
- `.github/PULL_REQUEST_TEMPLATE.md` のテンプレートに従う
- 関連するissueがある場合は `#<issue番号>` を記載
- issue番号はブランチ名から取得（例: `feature/issue7/add-docs` → issue `#7`）

### 記載すべき内容
- 変更内容の詳細よりも、**なぜ**その変更が必要なのかを重視
- 影響を受ける機能やAPIエンドポイントがあれば明記

### 記載してはいけない内容
- `fix #issue` や `close #issue` は使用しない（1つのissueに複数のPRがある場合があるため）
- 「全てのテストをパス」「Linter/型チェックを通過」などは記載しない（当然のことであり、わざわざ書くべきではない）
