// import "./App.css";
import React, { Component, useState } from "react";

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

class TOC extends Component {
  render() {
    return (
      <nav>
        <ol>
          <li>
            <a
              href="1.html"
              onClick={function (ev) {
                ev.preventDefault();
              }}
            >
              HTML
            </a>
          </li>
          <li>
            <a href="2.html">CSS</a>
          </li>
        </ol>
      </nav>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <article>
        <h3>world</h3>
      </article>
    );
  }
}

function App() {
  const [content, setContent] = useState([
    { id: 1, title: "TITLE", desc: "TITLE dectiption" },
    { id: 2, title: "TITLE2", desc: "TITLE dectiption" },
    { id: 3, title: "TITLE3", desc: "TITLE dectiption" },
  ]);

  return (
    <div className="App">
      <Subject title="Title" sub="Hello, world!"></Subject>
      <TOC data={content}></TOC>
      <Content></Content>
    </div>
  );
}

export default App;
