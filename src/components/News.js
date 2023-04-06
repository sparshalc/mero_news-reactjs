import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'us',
    padgesSize: 6
  }
  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  capitalize = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state = {
    articles: [],
    loader: true, 
    page: 1,
    totalResults: 0
  }
  document.title = `Mero News | ${this.capitalize(this.props.category)}`
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8478efb3b34c40639bee786ee6c87ee4&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles: parseData.articles, 
      totalResults: parseData.totalResults ,
      loading: false })
  }


  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8478efb3b34c40639bee786ee6c87ee4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles)
    })
  };

  render() {
    return (
        <div className='container mt-5'>
          <h1 className='text-center border shadow-sm p-4'>MeroNews - Top <b> {this.capitalize(this.props.category)} </b>Headlines</h1>
          {this.state.loading && <Spinner/>}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >
          <div className="container">
          <div className="row mt-4">
            {this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description= {element.description?element.description:""} imageURL= {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            })}
          </div>
          </div>
          </InfiniteScroll>
        </div>
    )
  }
}

export default News