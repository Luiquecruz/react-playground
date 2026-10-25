'use client';

import {useState} from 'react';

const BookEvent = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 1000)
  }

  return (
    <div id="book-event">
      {submitted && (
        <p className="text-sm">Thank you for signing up!</p>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Adderss</label>
            <input type="email" id="email" value={email} placeholder="Enter you email address"
                   onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <button className="button-submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;