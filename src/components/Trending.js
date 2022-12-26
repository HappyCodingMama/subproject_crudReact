import React from 'react';
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import './trending.scss';

const Trending = ({ blogs }) => {
  return (
    <div className='topstories-blog-heading'>
      <div className='container-topstories'>
        <div className='blog-heading-topstories'>
          <BsCheck2Circle className='heading-icons' />
          <h2>Your Picks</h2>
        </div>
        <div className='topstories-contents'>
          {blogs
            ?.filter((item, idx) => idx < 3)
            .map((item) => (
              <div className='topstories-item-id' key={item.id}>
                <Link to={`/detail/${item.id}`}>
                  <div className='topstories-img-position'>
                    <div className='topstories-img-size'>
                      <img
                        src={item.imgUrl}
                        alt={item.title}
                        className='topstories-img'
                      />
                    </div>
                    <div className='topstories-items'>
                      <span className='topstories-text'>{item.title}</span>
                      <div className='topstories-meta-info'>
                        <span>
                          {item.author} |{' '}
                          {item?.timestamp.toDate().toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
