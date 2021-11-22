// React関連のライブラリをインポート
import React from 'react';
import ReactDOM from 'react-dom';
// アプリ固有のファイルをインポート
import App from './App';

// Appコンポーネントを実行
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
