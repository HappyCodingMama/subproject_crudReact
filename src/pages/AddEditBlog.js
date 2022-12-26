import React, { useState, useEffect } from 'react';
import { storage, db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import './addEditBlog.scss';
import {
  addDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  collection,
} from 'firebase/firestore';

const initialState = {
  title: '',
  trending: 'no',
  category: '',
  description: '',
};

const categoryOption = [
  'Technology',
  'Food',
  'Sports',
  'Politics',
  'Business',
  'Finance',
];

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log('Image upload to firease successfully.');
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, 'blogs', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleTags = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };
  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, 'blogs'), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          console.log('Blog created successfully.');
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, 'blogs', id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          console.log('Blog updated successfully.');
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      window.alert('All fields are mandatory to fill.');
    }

    navigate('/');
  };

  return (
    <div className='container-addeditblog'>
      <div className='addeditblog-box'>
        <div className='form-title'>{id ? 'Update Blog' : 'Create Blog'}</div>
      </div>
      <div className='addeditblog-content'>
        <form className='blog-form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='edit-input'
            placeholder='Title'
            name='title'
            value={title}
            onChange={handleChange}
          />

          <div className='edit-news'>
            <p>Is it your pick?</p>
            <div className='form-check'>
              <input
                type='radio'
                className='form-check-input'
                name='radioOption'
                value='yes'
                checked={trending === 'yes'}
                onChange={handleTrending}
              />
              <label htmlFor='radioOption' className='form-check-label'>
                Yes
              </label>
              <input
                type='radio'
                className='form-check-input'
                name='radioOption'
                value='no'
                checked={trending === 'no'}
                onChange={handleTrending}
              />
              <label htmlFor='radioOption' className='form-check-label'>
                No
              </label>
            </div>
          </div>
          <div className='category-box'>
            <select
              value={category}
              onChange={onCategoryChange}
              className='category-dropdown'
            >
              <option>Please select category</option>
              {categoryOption.map((option, index) => (
                <option value={option || ''} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='textarea-box'>
            <textarea
              name='description'
              placeholder='Description'
              value={description}
              className='description-box'
              onChange={handleChange}
            />
          </div>
          <input
            type='file'
            className='file-upload'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className='btn btn-add'
            type='submit'
            disabled={progress !== null && progress < 100}
          >
            {id ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;
