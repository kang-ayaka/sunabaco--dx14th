# 🩺 往診サポートアプリ 開発・公開計画（GitHub + Render）

## 🎯 ゴール
- 看護師・医師チームが使える往診サポートアプリを作成
- GitHubでコード管理し、Renderでオンライン公開（スマホ・PC対応）
- プログラミング初心者でもチーム運用可能な形で構築

---

## 🗂️ 0. 機能一覧（実装順）

1. 📆 往診先管理（カレンダー形式）
　-　カレンダー or 日別一覧で往診施設を管理。施設ごとの患者・情報・リンクあり。
　　表示形式:
　　　カレンダー形式（週・月）or 日別リスト形式（選択可能）
　　表示項目（1施設ごと）:
　　　施設名
　　　担当医師
　　　患者数
　　　希望時間 🕒
　　　注意事項
　　　担当者名・連絡先 📞
　　　かかりつけ薬局名
　　リンク機能:
　　「📂 患者情報一覧」（個別プロフィールへ）
　　「📝 過去の診療メモ」
　　「📷 書類・写真フォルダ」
  
2. 🗺️ ルート表示（Google Maps連携）Google Maps連携。効率的な巡回ルートを生成。訪問希望時間や事前連絡要マーク付き
　- 特徴:
　　　Google Maps API連携 → 出発地から各訪問先の最適ルートを自動計算
　　　各施設の訪問希望時間・優先度に基づき、ルートを最適化（Visit順の提案）
　　　表示切替：「マップビュー」⇄「リストビュー」
　　各施設表示:
　　　施設名
　　　アイコン表示（📞 事前連絡 / 🕒 希望時間あり / 🆘 緊急）　電話発信ボタン付き

3. 🔍 加算検索（簡易検索DB）算定項目をキーワードやカテゴリから検索。クリニック独自ルールも反映可
 -　検索機能:
　　　フリーワード検索バー（「褥瘡」「皮膚生検」「抗真菌薬」など）
　　　カテゴリ選択式でも閲覧可（皮膚科 / 在宅医療 / 処置 など）
　　表示内容例:
　　　褥瘡 → J001-4 重度褥瘡処置（1日につき）
　　　1. 100平方cm未満 90点
　　　2. 100〜500平方cm未満 98点
　　　3. 500平方cm以上 120点
　　[クリニック内ルール]：100cm未満でも複数部位あれば算定

4. 📷 書類アップロード（写真保存）撮影→即フォルダ保存。施設/患者ごとに保管・タグづけ可
　 -　基本機能:
　　　カメラ起動 → 撮影 → 「患者名」「施設名」「書類種別」で自動タグ保存
　　保存先：
　　　施設ページまたは患者プロフィール内の「📷 書類フォルダ」
　　書類種別:
　　　保険証 / 医療証 / お薬手帳 / 処方箋 / その他

5. ✅ チェックリスト提出（テンプレート）往診後の依頼タスクをチェック式で提出。事務に自動通知
　-　機能概要:
   　テンプレート式 or フリーフォーマットでチェック項目を選択・記入
　　　提出後は自動で事務スタッフへ通知（Slack・メール連携も可能）
　　使用例:
　　　◻︎ 紹介状作成依頼（〇〇さん）
　　　◻︎ 次回分の軟膏の処方確認（Dr.B）
　　　◻︎ 電話連絡（〇〇薬局）
　　備考欄：
　　　自由記載あり
6. 🧑‍⚕️ 医師ノート共有（編集履歴あり）医師ごとに専用ページ。器材や処置の使い方などの指示を最新状態で共有可能
　-　医師ごとの専用ページ:
　　　医師名別でページを分けて整理（例：Dr.A、Dr.B、Dr.C）
　　各ノートの内容例:
　　　使用器材（例：液体窒素セット・皮膚鉗子）
　　　処置手順や独自ルール（例：「麻酔後すぐ処置しないで5分待つ」など）
　　　NG事項（例：「エタノール消毒は使用不可」など）
　　その他機能:
　　　ノートの更新履歴（変更日時・誰が編集したか）
　　　通知機能（内容変更時にチームへ通知）
7. 💬 チャット機能（将来的に）LINE風のリアルタイムチャット。タグ・通知・写真送信可
---

## 🚀 Renderへのデプロイ手順 (Deployment to Render)

このアプリケーションはRenderに静的サイトとしてデプロイすることができます。

### 準備事項
1.  **Renderアカウント:** [Render](https://render.com/) のアカウントを作成またはログインしてください。
2.  **GitHub連携:** RenderダッシュボードでGitHubアカウントを連携し、このリポジトリへのアクセスを許可してください。
3.  **Firebaseプロジェクト:** Firebaseプロジェクトがセットアップされ、必要なAPIキー（`REACT_APP_FIREBASE_API_KEY`など）が取得済みであること。これらのキーはRenderの環境変数として設定します。

### デプロイ方法

#### 方法1: `render.yaml` を使用する (推奨)
プロジェクトのルートディレクトリ（`home-visiting-app`フォルダと同じ階層、またはリポジトリの最上位）に配置された `render.yaml` ファイルは、Renderによって自動的に検出され、サービス設定の大部分を構成します。

1.  `render.yaml` ファイルがリポジトリのルートにあり、内容が適切であることを確認してください。
    *   もし `home-visiting-app` がリポジトリのサブディレクトリの場合、`render.yaml` 内の `serviceDir` を `home-visiting-app` に設定するか、Render UIで「Root Directory」を `home-visiting-app` に設定します。`render.yaml` を `home-visiting-app` 内に置いた場合は、Render UIでの「Root Directory」は空欄にします。
2.  Renderダッシュボードで "New" > "Blueprint" を選択し、このリポジトリを選択すると、`render.yaml` に基づいてサービスが提案されます。
3.  **環境変数の設定:** `render.yaml` にキーのリストが含まれていますが、**実際の値はRenderダッシュボードの「Environment」セクションで安全に設定する必要があります。** これは非常に重要です。
    *   `REACT_APP_FIREBASE_API_KEY`
    *   `REACT_APP_FIREBASE_AUTH_DOMAIN`
    *   `REACT_APP_FIREBASE_PROJECT_ID`
    *   `REACT_APP_FIREBASE_STORAGE_BUCKET`
    *   `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
    *   `REACT_APP_FIREBASE_APP_ID`
    *   `REACT_APP_FIREBASE_MEASUREMENT_ID` (任意)
4.  サービスを作成し、デプロイを開始します。

#### 方法2: Renderダッシュボードから手動で設定
1.  Renderダッシュボードで "New +" > "Static Site" を選択します。
2.  このGitHubリポジトリを選択します。
3.  以下の設定を行います:
    *   **Name:** サービス名（例: `home-visiting-app`）。
    *   **Region:** 最寄りのリージョンを選択。
    *   **Branch:** デプロイするブランチ（例: `main`）。
    *   **Root Directory:** `home-visiting-app` （もしこのフォルダがリポジトリのルートでない場合）。リポジトリ自体が `home-visiting-app` の場合は空欄。
    *   **Build Command:** `npm install && npm run build`。
        *   (Root Directory を `home-visiting-app` に設定した場合、これでOK。もしRoot Directoryが空で、`package.json` が `home-visiting-app` 内にある場合は、`cd home-visiting-app && npm install && npm run build` のように調整が必要になることがあります。)
    *   **Publish Directory:** `build` (Root Directory を `home-visiting-app` にした場合は、Renderは `home-visiting-app/build` を探します)。
    *   **Auto-Deploy:** "Yes" に設定すると、ブランチへのプッシュ時に自動で再デプロイされます。
4.  **環境変数の設定:** 「Environment」タブで、上記のFirebase APIキーをすべて設定します。これはアプリケーションがFirebaseに接続するために不可欠です。
5.  "Create Static Site" をクリックしてデプロイを開始します。

### デプロイ後
-   デプロイが成功すると、Renderが提供するURL（例: `your-service-name.onrender.com`）でアプリケーションにアクセスできます。
-   必要に応じて、「Settings」タブからカスタムドメインを設定できます。

---

## 🛠️ 1. 技術選定（初心者でも扱いやすい構成）

| 要素 | 使用ツール / 技術 | 理由 |
|------|--------------------|------|
| フロントエンド | React + Tailwind CSS | UIが綺麗で拡張性あり、無料テンプレ多数 |
| バックエンド | Firebase（Firestore / Storage） | ノーコードでDB構築＋写真保存できる |
| 認証 | Firebase Auth | Googleアカウントで簡単ログイン管理 |
| マップ | Google Maps API | 正確なナビ表示が可能（無料枠あり） |
| デプロイ | Render | GitHubと連携して簡単デプロイ可 |
| チャット | Ably または Firebase RealtimeDB | 将来的なリアルタイム連携に対応 |

---

## 🗓️ 2. スケジュール（ざっくり）

| 期間 | タスク | 備考 |
|------|--------|------|
| 1週目 | GitHubセットアップ / フォルダ構成作成 | 無料アカウントでOK |
| 2週目 | ①往診先管理画面（ダミーデータ表示） | Firebase連携 |
| 3週目 | ②ルートマップ表示 | Google Maps APIを使って施設を可視化 |
| 4週目 | ③加算検索画面 | JSONベースの簡易DBで構築 |
| 5週目 | ④書類アップロード画面 | Firebase Storageと連携し写真を保存 |
| 6週目 | ⑤チェックリスト提出機能 | チェック送信→DB保存 |
| 7週目 | ⑥医師ノートページ | Firestore＋ログ履歴付き |
| 8週目 | レンダリング・GitHub公開 | Render設定＋公開URL共有可能に！

---

## 🚀 プロトタイプ進捗状況 (Current Prototype Status)

- **プロジェクト初期化:** React (TypeScript) と Tailwind CSS を使用してプロジェクトの基本構造をセットアップしました。 (`home-visiting-app` ディレクトリ)
- **主要機能プロトタイプ:**
    - **往診先管理 (CalendarPage):** 最初のプロトタイプ機能として、往診先の一覧表示を実装しました (`src/pages/CalendarPage.tsx`)。このページは Firebase Firestore からデータを取得して表示します。
- **Firebase連携:**
    - Firebaseプロジェクトのセットアップ（Firestoreデータベース作成を含む）と、プロジェクトルートの `.env` ファイルに実際のAPIキーとプロジェクト情報を設定することが利用の前提となります。
    - `src/firebaseConfig.ts` がFirebaseの設定を管理し、`.env` ファイルから値を読み込みます。
    - **注意:** `.env` ファイルはリポジトリにコミットされません。別途、実際の認証情報をご用意ください。
- **ディレクトリ構成とファイル形式:**
    - `README.md` に記載のディレクトリ構成に沿って開発を進めてています。
    - 主要なReactコンポーネントは `.tsx` (TypeScript JSX) 形式で、その他のロジックファイルは `.ts` (TypeScript) 形式で作成されています（例: `App.tsx`, `src/services/firebaseService.ts`）。
- **その他機能のプレースホルダー:**
    - 他の主要機能（ルート表示、加算検索など）については、`src/pages/` ディレクトリ内にプレースホルダーのページコンポーネント (`RoutePage.tsx`, `BillingSearchPage.tsx`など) を作成済みです。

---

## 📁 3. ディレクトリ構成（イメージ）

/home-visiting-app/
├── public/
├── src/
│ ├── components/ # UIパーツ
│ ├── pages/ # 各画面（例：CalendarPage, RoutePage）
│ ├── services/ # FirebaseやMapsの連携処理
│ └── App.tsx
│ └── firebaseConfig.ts
├── .env # APIキー保存（Google Maps, Firebase）
├── README.md


---

## 🔑 4. 環境変数（.env例）

```env
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_GOOGLE_MAPS_API_KEY=xxxxx
