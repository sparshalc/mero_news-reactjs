import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
    articles: [],
    loader: false,
    page: 1
  }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=39c619431eea4d4d86d6deb9162f8730&page=1&pageSize=6"
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles: parseData.articles, totalResults: parseData.totalResults })
  }

  handleNextClick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){}else{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=39c619431eea4d4d86d6deb9162f8730&page=${this.state.page + 1}&pageSize=6`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles
    })
  }
  }

  handlePrevioiusClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=39c619431eea4d4d86d6deb9162f8730&page=${this.state.page - 1}&pageSize=6`;
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles
    })
  }

  render() {
    return (
        <div className='container my-3'>
          <h1 className='text-center'>MeroNews - Top Headlines</h1>
          <div className="row">
            {this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description= {element.description?element.description:""} imageURL= {element.urlToImage} newsUrl={element.url}/>
              </div>
            })}
          </div>
            <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevioiusClick}> &larr; Previous</button>
              <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}

export default News