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
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=39c619431eea4d4d86d6deb9162f8730"
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles: parseData.articles })
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
        </div>
    )
  }
}

export default News