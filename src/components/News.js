import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

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
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39c619431eea4d4d86d6deb9162f8730&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles: parseData.articles, 
      totalResults: parseData.totalResults ,
      loading: false })
  }

  handleNextClick = async () => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39c619431eea4d4d86d6deb9162f8730&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles,
      loading: false
    })
  }
 
  }

  handlePrevioiusClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39c619431eea4d4d86d6deb9162f8730&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false
    })
  }

  render() {
    return (
        <div className='container my-3'>
          <h1 className='text-center'>MeroNews - Top Headlines</h1>
          {this.state.loading && <Spinner/>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description= {element.description?element.description:""} imageURL= {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            })}
          </div>
            <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevioiusClick}> &larr; Previous</button>
              <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}

export default News