import React, { Component } from 'react';
// axiosをインポート
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.getQiitaPosts = this.getQiitaPosts.bind(this);
    this.state = {
      // ここを`React`など検索したいワードに変えられる
      query: '御朱印'
    }
  }

  // APIを叩く
  getQiitaPosts() {
    //axios.get(APIのエンドポイント,パラメータの引数)
    axios.get('https://alis.to/api/search/articles', {
        params: {
          "page": "1",
          "limit": "100",
          "tag": this.state.query,
        }
      })
      // response にAPIからのレスポンスが格納される
      .then((response) => {
        // data にレスポンスから帰ってきた1つ目の記事の情報を格納
        const data = response.data[0];
        this.setState({
          title: data.title,
          url: data.article_id,
          user_id: data.user_id,
        });
        // コンソールから response と title と url を確認
        console.debug(response, "ressponse");
        console.debug(this.state.title, "title")
        console.debug(this.state.url, "article_id")
      })
      .catch((error) => {
        console.debug(error);
      });
  }

  // 表示されるHTMLを記述
  render() {
    return (
      <div className="App">
        <h1 className="app-title">Hello Qiita API</h1>
        <p>タイトル: {this.state.title}</p>
        
        {/* <p>ID: <a target="__blank" href="https://alis.to/{this.state.user_id}/article/{this.state.article_id}">{this.state.url}</a></p> */}
        <input
          type="button"
          value="検索"
          onClick={() => this.getQiitaPosts()}
        />
      </div>
    )
  }
}

export default App;