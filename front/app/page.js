'use client'

import Image from "next/image";
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API

export default function Home() {

  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '' });

  // Fetch books on component mount
  useEffect(() => {
    fetch(`${API}/books`)
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
    fetch(`${API}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
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
    </div>
  );
}
