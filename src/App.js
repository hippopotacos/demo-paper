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
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 1280" width="960" height="1280">
  <style>
    h1 {
      color: red;
    }
  </style>
  <g>
    <foreignObject x="0" y="0" width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        <h1>Hello, world!</h1>
      </div>
    </foreignObject>
  </g>
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
      // self.document.getElementById('canvas').getContext('2d').drawImage(img, 0, 0, 200, 200);
      // DOMURL.revokeObjectURL(url);
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
