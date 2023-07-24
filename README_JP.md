# DIY PCパーツリストマネージャー
[中文](README_CH.md) | [English](README.md)  

DIY PCパーツリストマネージャーへようこそ！このアプリケーションはElectronをベースとしたプロジェクトで、DIY PCパーツリストの管理を行います。ローカルで複数のパーツリストを作成、保存、管理することができ、また印刷やスクリーンショット共有の機能も提供しています。

![logo](./public/img/totem.png)

## ユーザーインターフェース
![メインインターフェース](./screenshot/screenshot_1.png)

![新しいパーツリストインターフェース](./screenshot/screenshot_2.png)

## 機能
- 既存のパーツリストの表示
- 特定のパーツリストの読み込み
- 特定のパーツリストの削除
- 新しいパーツリストの作成
- 各パーツの合計価格の計算
- すべてのパーツの合計価格の計算
- パーツの行の追加または削除
- 新しいパーツリストの保存
- 複数のパーツリストの一括インポート
- 1つのJSONファイルから新しいパーツリストのインポート
- すべてのパーツリストのバックアップ（エクスポート）
- すべてのパーツリストの表示
- すべてのパーツリストの削除
- パーツリストの印刷
- パーツリストのスクリーンショットの作成
- パーツリストのCSV形式ファイルへのエクスポート
- パーツリストのJSONデータのコピー

## インストール方法
[Releases](https://github.com/Karasukaigan/pc-parts-lists-manager/releases)から、事前にパッケージ化されたプログラムを直接ダウンロードすることができます。Node.jsや他の依存関係をインストールする必要はありません。

もしNode.jsの知識があるか、またはいくつかのコードを変更したい場合は、ソースコードからアプリケーションを実行することもできます。

### ソースコードの取得

- GitHubからプロジェクトをクローンする：
  ```
  git clone https://github.com/Karasukaigan/pc-parts-lists-manager.git
  ```

- プロジェクトを直接ダウンロードする：
  [GitHubページ](https://github.com/your-username/pc-parts-lists-manager)の右上にある「Code」ボタンをクリックし、「Download ZIP」をクリックしてZIP圧縮パッケージをダウンロードし、ローカルディレクトリに解凍してください。

**Node.js**がインストールされていることを確認してください。インストールされていない場合は、[Node.jsウェブサイト](https://nodejs.org/)から最新バージョンをダウンロードしてインストールできます。

### 依存関係のインストール

プロジェクトディレクトリに入った後、以下のコマンドを使用して依存関係をインストールします：
```
npm install
```

### アプリケーションの実行

すべての依存関係をインストールした後、以下のコマンドを使用してDIY PCパーツリストマネージャーを実行します：
```
npm start
```
これにより、Electronアプリケーションが起動し、PCパーツリストマネージャーのインターフェースが開きます。

### アプリケーションのパッケージ化

他のコンピューターで使用するためにDIY PCパーツリストマネージャーを実行可能ファイル（exe）にパッケージ化したい場合は、次のコマンドを使用します：
```
npm run package
```
このコマンドにより、`dist/`ディレクトリに実行可能ファイルが生成されます。