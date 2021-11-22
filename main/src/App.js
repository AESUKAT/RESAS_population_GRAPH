// Reactをインポート
import React, { Component } from 'react';
// グラフを描画するHighchartsをインポート
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// RESAS_APIを利用するためのAPIKEYを取得する
import apiKey from './RESAS_Api_Key.js';

// 動作を行うApp本体
class App extends Component {
  // 今回扱うデータを格納するstateを生成
  constructor() {
    super();
    this.state = {
      // 都道府県が選択済みかどうかを判別する
      selected: Array(47).fill(false),
      // APIから返された都道府県名と都道府県コード
      prefectures: {},
      // 選択済みの都道府県データを格納
      series: []
    };
    this._changeSelection = this._changeSelection.bind(this);
  }

  // 47都道府県の名称とコードを取得
  componentDidMount() {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'X-API-KEY': apiKey }
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ prefectures: res.result });
      });
  }

  // チェックを操作した際の処理
  _changeSelection(index) {
    // 判定用のコピーファイルを作成
    const selected_copy = this.state.selected.slice();
    // selectedのチェック状況を反転
    selected_copy[index] = !selected_copy[index];

    // チェックされていない場合
    if (!this.state.selected[index]) {
      // データを取得
      fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${index + 1}`,
        {
          headers: { 'X-API-KEY': apiKey }
        }
      )
        .then(response => response.json())
        // 年度別人口のリストを取得
        .then(res => {
          let tmp = [];
          Object.keys(res.result.data[0].data).forEach(i => {
            tmp.push(res.result.data[0].data[i].value);
          });
          // 都道府県名と年度別人口リストをまとめる
          const res_series = {
            name: this.state.prefectures[index].prefName,
            data: tmp
          };
          // seriesに格納
          this.setState({
            selected: selected_copy,
            series: [...this.state.series, res_series]
          });
        });
    // チェック済みの場合
    } else {
      const series_copy = this.state.series.slice();
      // seriesから削除
      for (let i = 0; i < series_copy.length; i++) {
        if (series_copy[i].name === this.state.prefectures[index].prefName) {
          series_copy.splice(i, 1);
        }
      }
      this.setState({
        selected: selected_copy,
        series: series_copy
      });
    }
  }

  // チェックボックスを作成
  renderItem(props) {
    return (
      // 都道府県コードをkeyに5px間隔で一覧表示
      // checkboxに各都道府県名と選択状況を反映
      <div
        key={props.prefCode}
        style={{ margin: '5px', display: 'inline-block' }}
      >
        <input
          type="checkbox"
          checked={this.state.selected[props.prefCode - 1]}
          onChange={() => this._changeSelection(props.prefCode - 1)}
        />
        {props.prefName}
      </div>
    );
  }

  // 描画と実行
  render() {
    // 都道府県名とコードをobjへ
    const obj = this.state.prefectures;
    // グラフのoptionを設定
    const options = {
      // グラフタイトル
      title: {
        text: '総人口推移'
      },
      yAxis: {
        title: {
          text: '人口数'
        }
      },
      // x軸の表示設定
      plotOptions: {
        title: {
          text: '年度'
        },
        series: {
          pointInterval: 5,
          pointStart: 1965
        }
      },
      series: this.state.series
    };
    // ページタイトルとHighchartsによる描画を実行
    return (
      <div>
        <h1 style={{background: "#C4C4C4"}}>都道府県別人口推移グラフ</h1>
        <h4>都道府県</h4>
        {Object.keys(obj).map(i => this.renderItem(obj[i]))}
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default App;
