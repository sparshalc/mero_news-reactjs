import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageURL, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageURL?"https://arctype.com/blog/content/images/2021/04/NULL.jpg":imageURL} alt='' className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{title}
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{
              left: '90%',
              zIndex: '1'
            }}>
             {source}
            </span> 
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div> 
      </div>
    )
  }
}

export default NewsItem