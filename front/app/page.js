'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';

import req from './utils.js'

export default function Home() {

  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '' });

  // Fetch books on component mount
  useEffect(() => {
    req.get('books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();


    const token = localStorage.getItem('token')

    req.post('books', JSON.stringify(form))
    .then(res => res.json())
    .then(newBook => {
      setBooks([...books, newBook]);
      setForm({ title: '', author: '' }); // Reset form
    })
    .catch(err => console.error("Error adding book:", err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Book List</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>

      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <button type="submit">Add Book</button>
      </form>
      <Link href='/login'>Login</Link>
    </div>
  );
}
