import React, { Component } from 'react';
import paper from './paper.jpg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
    this.doChange = this.doChange.bind(this);
  }

  doChange(e){
    this.setState({
      text: e.target.value
    })
  }

  render(){
    return(
      <div className="wrapper">
        <div className="wrapper__inner">
          <h1>paper app</h1>
          <div>ここに出力テスト→{this.state.text}</div>
          <textarea className="textarea" placeholder="ここに入力してください" value={this.state.text} onChange={this.doChange}></textarea>
        </div>
      </div>
    );
  }
}

export default App;
