import React, { Component } from 'react'
import axios from 'axios';

export class Add extends Component {
  constructor(props) {
    super(props)

    this.onFileChange = this.onFileChange.bind(this);
    this.onUpload = this.onUpload.bind(this);

    this.state = {
      author: '',
      title: '',
      path: '',
      class: '',
      year: 0,
      subject: '',
      mentor: '',
      keywords: '',
      document: ''
    }
  }

  onFileChange(e) {
    this.setState({ document: e.target.files[0] });
  }

  onUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('document', this.state.document);
    axios.post("/paper/upload", formData, {
    }).then(res => {
      var keywords = '';
      let i;
      for(i = 0; i< res.data.keywords.length; i++){
        keywords = keywords + res.data.keywords[i] + ';\n'
      }
      keywords = keywords.replace(/\,/g, ' ');
      this.setState({
        author: res.data.author,
      title: res.data.title,
      path: res.data.path,
      class: res.data.class,
      year: parseInt(res.data.year),
      subject: res.data.subject,
      mentor: res.data.mentor,
      keywords: keywords
      });
    });
  }

  addPaper = (e) => {
    const paper = this.state;
    console.log(paper)
    fetch(`/paper/add?author=${paper.author}&title=${paper.title}&path=${paper.path}&class=${paper.class}&year=${paper.year}&subject=${paper.subject}&mentor=${paper.mentor}&keywords=${paper.keywords}`);
    this.setState({
        author: '',
        title: '',
        class: '',
        year: 0,
        subject: '',
        mentor: '',
        keywords: '',
        document: ''
    });
  }

  render() {
    const paper = this.state;
    return (
      <div>
        <form onSubmit={this.addPaper}>
          Autor:<br/>
          <input type="text" name="author" placeholder="Author" value={paper.author}            onChange={e => this.setState({[e.target.name]: e.target.value})} />
          <br/>
          Tema: <br/>
          <input type="text" name="title" placeholder="Title" value={paper.title}               onChange={e => this.setState({[e.target.name]: e.target.value})} />
          <br/>
          Trida: <br/>
          <input type="text" name="class" maxLength="1" placeholder="Class" value={paper.class} onChange={e => this.setState({[e.target.name]: e.target.value})} />
          <br/>
          Rocnik: <br/>
          <input type="number" name="year" maxLength="4" placeholder="Year" value={paper.year}  onChange={e => this.setState({[e.target.name]: e.target.value})} />
          <br/>
          Predmet: <br/>
          <input type="text" name="subject" placeholder="Subject" value={paper.subject}         onChange={e => this.setState({[e.target.name]: e.target.value})} />
          <br/>
          Ucitel: <br/>
          <input type="text" name="mentor" placeholder="Mentor" value={paper.mentor}            onChange={e => this.setState({[e.target.name]: e.target.value})} />
          <br/>
          Keywords: <br/>
          <textarea type="text" name="keywords" placeholder="Keywords" value={paper.keywords} style={{width: '400px', height: '75px'}}            onChange={e => this.setState({[e.target.name]: e.target.value})} />
          <br/>
          <input type="submit" value="Add paper" />
        </form>
        <div>
          <h1>File upload</h1>
          <input type="file" name="file upload" onChange={this.onFileChange} />
          <button type="submit" onClick={this.onUpload}>Upload</button>
        </div>
      </div>
    )
  }
}

export default Add

