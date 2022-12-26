import React, { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  getDocs,
  where,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import './home.scss';
import BlogSection from '../components/BlogSection';
import Trending from '../components/Trending';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTopStories = async () => {
    const blogRef = collection(db, 'blogs');
    const topQuery = query(blogRef, where('trending', '==', 'yes'));
    const querySnapshot = await getDocs(topQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTopStories();
    const unsub = onSnapshot(
      collection(db, 'blogs'),
      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setBlogs(list);
        setLoading(false);
        setActive('home');
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTopStories();
    };
  }, [setActive]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure wanted to delete that blog?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'blogs', id));
        console.log('Blog deleted successfully.');
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='container-home'>
      <div className='blogs-title-topstories'>
        <Trending blogs={trendBlogs} />
      </div>
      <div className='border-home'>
        <div className='blog-section'>
          <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
