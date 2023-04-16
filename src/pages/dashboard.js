import React from 'react'
import { auth, db } from '../../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, where } from 'firebase/firestore';
import { query, onSnapshot, orderBy } from 'firebase/firestore';
import Dream from '@/components/Dream';
import { toast } from 'react-toastify';
import Link from 'next/link';

const dashboard = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [allPost, setAllPost] = useState([]);

  const getData = async () => {
    if(loading) return;
    if(!user) return router.push('/auth/login');
    const collectionRef = collection(db, 'posts');
    const q =  query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPost(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    });
    return unsubscribe;
  }

  const deletePost = async (id) => {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
    toast.error("Your post have been deleted", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  }

  useEffect(() => {
    getData();
  }, [user, loading])
  
  return (
    <div className='max-w-xl mx-auto'>
      {user && (
        <div className= {`my-4 p-5 sm:p-10 shadow-md rounded-md bg-white  `} >
          {/* <h1 className='text-xl mb-3 font-bold'>My Profile</h1> */}
          <div className='flex gap-6'>
            <img src={user.photoURL} className='w-24 h-24 rounded-full'/>
            <div>
              <h1 className='sm:text-lg text-base font-bold'>Name</h1>
              <p className='text-sm sm:text-base py-1 px-2 bg-gray-100 rounded-md'>{user.displayName}</p>
              <h1 className='sm:text-lg text-base font-bold'>Email</h1>
              <p className='text-sm sm:text-base py-1 px-2 bg-gray-100 rounded-md'>{user.email}</p>
              <button onClick={() => {auth.signOut()}} className='bg-slate-800 text-slate-50 rounded-md font-semibold text-sm px-3 py-2 mt-4'>Sign out</button>
            </div>
          </div>
        </div>
      )}
      
      <h2 className='mb-2 text-xl font-bold text-center'>My Post</h2>
      <div>
        {allPost.length === 0 && 
          <div className='text-center'>
            <p className='mt-1'>There is no post yet.</p>
            <Link href={'/community'}>
              <button className='bg-cyan-500 text-white font-semibold text-lg  py-2 px-3 rounded-md mt-3 mx-auto'>Create Post</button>
            </Link>
          </div>
        }
        {allPost.map((post) => (
          <Dream key={post.id} {...post}>
            <button className='bg-red-500 text-white font-semibold text-sm  py-1 px-2 rounded-md mt-3' onClick={() => deletePost(post.id)}>Delete</button>
          </Dream>
        ))}
      </div>
    </div>
    
  )
}

export default dashboard