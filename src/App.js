import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      plainText: ''
    }
    this.doChange = this.doChange.bind(this);
  }

  componentDidUpdate() {
    // 原稿用紙のフォーマット
    const column = 20;
    const textWidth = 12;
    const spaceFurigana = 13;
    const spaceCenter = 20.2;
    const textPosX = 542;
    const textPosY = 44;

    // 改行や、一行あたりの文字数制限の対応
    const textbox = this.state.plainText;
    const textlist = textbox.split('\n');
    let tempArray = [];
    let newtextlist = [];
    textlist.forEach(function(el, i){
      let sepatateArray = [];
      for (let i = 0; i < el.length / column; i++) {
          sepatateArray.push(el.substr(i * column, column));
      }
      tempArray = newtextlist;
      newtextlist = tempArray.concat(sepatateArray);
    });

    // 出力前にリセット
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 400);
    
    // 一行ごとに画像を出力する
    newtextlist.forEach(function(el, i){
      const data =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 1280" width="960" height="1280">
          <style>
            .text {
              height: 360px;
              font-size: 12px;
              line-height: 1;
              letter-spacing: 0.48em;
              -ms-writing-mode: tb-rl;
              writing-mode: vertical-rl;
              text-orientation: upright;
              font-kerning: normal;
              font-feature-settings: "palt";
              white-space: pre-line;
              font-family: "游明朝", YuMincho, "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif;
            }
          </style>
          <g>
            <foreignObject x="0" y="0" width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <div class="text">${el}</div>
              </div>
            </foreignObject>
          </g>
        </svg>`;
      const svg = new Blob([data], {
          type: 'image/svg+xml'
      });

      const DOMURL = window.URL || window.webkitURL || window;
      const url = DOMURL.createObjectURL(svg);
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = url;

      image.onload = () => {
        if(i === 0){
          ctx.drawImage(image, textPosX, textPosY);
        }else if((1 <= i) && (i <= 9)){
          ctx.drawImage(image, textPosX-(textWidth+spaceFurigana)*i, textPosY);
        }else if((10 <= i) && (i <= 19)){
          ctx.drawImage(image, textPosX-(textWidth+spaceFurigana)*i-spaceCenter, textPosY);
        }else{
            console.log('20行目まで出力しています。');
        }
        DOMURL.revokeObjectURL(url);
      }
    });
  }

  doChange(e){
    this.setState({
      plainText: e.target.value
    });
  }

  render(){
    return <div className="wrapper">
      <div className="wrapper__inner">
        <h1 className="heading">Paper</h1>
        <div className="box">
          <div className="box__inner">
            <div>
              <canvas id="canvas" width="600" height="460" />
            </div>
          </div>
          <textarea className="textarea" placeholder="入力すると上に文字が出てきますよ" onChange={this.doChange} value={this.state.plainText}></textarea>
        </div>
      </div>
    </div>;
  }
}

export default App;