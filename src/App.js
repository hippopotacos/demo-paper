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

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = paper;
    image.onload = () =>{
      ctx.drawImage(image, 0, 0, 640, 465)
    }
  }

  componentDidUpdate(e) {
    console.log('updated');
    const self = this;
    console.log(self);
    const data =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0, 0, 200, 200' width='200' height='200'>
      <foreignObject width='100%' height='100%'>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
              .wrapper {
                  width: 100%;
                  height: 100vh;
                  font-kerning: normal;
                  font-feature-settings: "palt";
                  -webkit-font-feature-settings: "palt";
                  font-weight: 900;
              }
            </style>
            <h1>${e.target}/h1>
        </div>
      </foreignObject>
    </svg>`;

    const svg = new Blob([data], {
        type: 'image/svg+xml'
    });

    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svg);

    console.log(url);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      self.document.getElementById('canvas').getContext('2d').drawImage(img, 0, 0, 200, 200);
      DOMURL.revokeObjectURL(url);
    }
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
          <canvas
            id="canvas"
            width="640px"
            height="465px"
          />
          <div>ここに出力テスト→{this.state.text}</div>
          <textarea className="textarea" placeholder="ここに入力してください" value={this.state.text} onChange={this.doChange}></textarea>
        </div>
      </div>
    );
  }
}

export default App;
