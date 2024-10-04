import React, { useState } from 'react';
import styles from '../styles/apply.module.css';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeOff, Mail } from 'lucide-react';
const Apply = () => {
  const router = useRouter();
  const [handle, setHandle] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordType, setPasswordType] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ handle, email, password, category }),
    };

    try {
      const response = await fetch('https://bio-branch-server.onrender.com/api/register', options);
      const data = await response.json();

      if (data.status === 'success') {
        toast.success('Registered successfully');
        localStorage.setItem('BioTreeToken', data.token);
        setSubmitted(true);
        router.push('/login');
      } else {
        toast.error('Try a different username');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <section className={`${styles.background} min-h-screen flex justify-center items-center`}>
        <div className="main">
          <div className="content bg-white border-2 px-4 py-8 rounded-md shadow-lg">
            <h1 className='text-center font-bold text-2xl'>Join the top 1% Creators</h1>
            <p className='text-center mb-3'>Get access to exclusive content</p>
            <form onSubmit={handleRegister} className='flex flex-col gap-3 text-lg' method='POST'>
              <span className='flex items-center shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <img className='w-6 mr-2' src="/svg/instagram.svg" alt="" />
                <input
                  className='focus:outline-none'
                  placeholder='Social Handle'
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
              </span>

              <span className='shadow-md border-2 px-3 py-2 rounded-md  flex items-center'>
                <Mail />
                <input
                  className='px-3 rounded-md focus:outline-none'
                  placeholder='Add Email'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              {/* <input
                className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'
                placeholder='Add Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
              <span className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none flex items-center'>
                {
                  isPasswordVisible ? (
                    <EyeOff onClick={() => setIsPasswordVisible(false)} className="cursor-pointer" />
                  ) : (
                    <Eye onClick={() => setIsPasswordVisible(true)} className="cursor-pointer" />
                  )
                }
                <input
                  className="px-3 focus:ring-0 border-none focus:outline-none ml-2"
                  placeholder='Add Password'
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>

              <h5 className='text-center text-sm text-blue-600'>Account Type</h5>
              <span className="flex justify-between">
                <label htmlFor="" className='flex gap-2'>
                  <input type="radio" value='Creator' checked={category === 'Creator'} onChange={handleCategoryChange} />
                  <p>Creator</p>
                </label>
                <label htmlFor="" className='flex gap-2'>
                  <input type="radio" value='Agency' checked={category === 'Agency'} onChange={handleCategoryChange} />
                  <p>Agency</p>
                </label>
                <label htmlFor="" className='flex gap-2'>
                  <input type="radio" value='Brand' checked={category === 'Brand'} onChange={handleCategoryChange} />
                  <p>Brand</p>
                </label>
              </span>

              <input type='submit' value='Apply' className='bg-blue-500 text-white px-3 py-2 rounded-md' />
            </form>

            <h4 className='text-center pt-3'>Already Have Account? <span className='text-indigo-600'><Link href="/login">Login</Link></span></h4>
          </div>
        </div>
      </section>
    </>
  );
};

export default Apply;
