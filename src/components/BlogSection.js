import React from 'react';
import { Link } from 'react-router-dom';
import { excerpt } from '../utility';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlinePaperClip } from 'react-icons/ai';
import './blogSection.scss';

const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div className='blogs-container'>
      <div className='blog-heading-daily'>
        <AiOutlinePaperClip />
        Inspiration
      </div>
      <div className='blog-items'>
        {blogs?.map((item) => (
          <div className='blogs-item' key={item.id}>
            <div className='blogs-img'>
              <img src={item.imgUrl} alt={item.title} />
            </div>

            <div className='blogs-contents'>
              <div className='text-start'>
                <div className='item-titles'>
                  <div className='item-category'>
                    <h5 className='category catg-color'>{item.category}</h5>
                  </div>
                  <div className='item-title'>
                    <span className='blog-title'>{item.title}</span>
                  </div>
                  <div className='item-meta-info'>
                    <span className='meta-info'>
                      <p className='author'>
                        {item.author} | {item.timestamp.toDate().toDateString()}
                      </p>
                    </span>
                  </div>
                </div>

                <div className='short-description'>
                  {excerpt(item.description, 120)}
                </div>

                <div className='item-detail'>
                  <div className='item-detail-readmore'>
                    <Link to={`/detail/${item.id}`}>
                      <button className='btn btn-read'>Read More</button>
                    </Link>
                  </div>
                  {userId && item.userId === userId && (
                    <div className='item-detail-icons'>
                      <div className='trash-icon'>
                        <FaRegTrashAlt onClick={() => handleDelete(item.id)} />
                      </div>

                      <Link to={`/update/${item.id}`}>
                        <div className='edit-icon'>
                          <FiEdit3 className='icon' />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
