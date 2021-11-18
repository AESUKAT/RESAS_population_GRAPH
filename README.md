# RESAS_population_GRAPH

## 注意

Node.jsにて作成しています。

## 使用方法

main内の物を全てダウンロードしてください。  

[RESAS](https://opendata.resas-portal.go.jp/)よりAPIkeyを取得してください  

作成したkeyは`/src`内の`RESAS_Api_Key.js`へ記入してください  

`export default 'YOUR_API_KEY';`

Highchartsが未インストールの場合は以下のコマンドを入力してください

`npm install -save highcharts-react-official highcharts`  

以下、起動方法  
  
`cd 'Your_folder_address'`  

`$ npm install`  
　　
`$ npm install --save-dev eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks prettier eslint-plugin-prettier husky lint-staged`

`.eslintrc.js`の中身を`eslintrc.js`のものに書き換える

`$ npm start`
  
終了時、`ctrl + c` の後、 `Y`で終了
