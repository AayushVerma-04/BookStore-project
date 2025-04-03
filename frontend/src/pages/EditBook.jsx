import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useAuthContext from '../hooks/UseAuthContext';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      enqueueSnackbar('Please login first', { variant: 'error' });
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/books/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setAbout(response.data.about);
      })
      .catch((error) => {
        enqueueSnackbar('Server error', { variant: 'error' });
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEditBook = () => {
    const data = { title, author, publishYear, about };
    setLoading(true);
    axios
      .put(`http://localhost:5555/api/books/${id}`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        enqueueSnackbar('Book edited successfully', { variant: 'success' });
        navigate('/books');
      })
      .catch((error) => {
        enqueueSnackbar('Error updating book', { variant: 'error' });
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Edit Book
        </h1>

        {loading && <Spinner />}

        <div className="space-y-6">
          <div>
            <label className="text-lg font-semibold text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-600">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-600">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-600">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleEditBook}
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
