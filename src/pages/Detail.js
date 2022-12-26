import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import './detail.scss';

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, 'blogs');
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get('tags')));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };
    getBlogsData();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, 'blogs', id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };

  return (
    <div className='single-container container'>
      <div className='single'>
        <div
          className='blog-title-box'
          style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
        >
          <div className='detail-blog-title'>
            <h2>{blog?.title}</h2>
            <span className='meta-info text-start'>
              <p className='author'>
                By {blog?.author} | {blog?.timestamp.toDate().toDateString()}
              </p>
            </span>
          </div>
        </div>
        <div className='container-blog-single-content'>
          <div className='container-blog-single'>
            <p className='text-start'>{blog?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
