import React, {useState, useEffect} from 'react'
import { auth, db } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, query, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import AllDreams from '@/components/AllDreams';

const community = () => {
  const [post, setPost] = useState({dream:""});
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const collectionRef = collection(db, "posts");

  const submitPost = async (e) => {
    e.preventDefault();

    if(!user){
      toast.error("Please log in to your account 🙏", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      route.push('/auth/login')
      return;
    }

    if(!post.dream.trim()){
      toast.error("Your dream is empty 😂", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      setPost({dream:""});
      return;
    }

    if(post.dream.length > 300){
      toast.error("Your dream is too long 😂", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      return;
    }

    await addDoc(collectionRef, {
      ...post,
      timestamp : serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName
    });
    setPost({dream:""});
    toast.success("You have shared your dream ✨", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    })
  };
  
  return (
    <>
      <div className= {`my-4 p-5 shadow-md rounded-md bg-white max-w-xl mx-auto  group`} >
        <form onSubmit={submitPost}>
          <h1 className='font-semibold text-xl mb-3 text-slate-900'>Share your dream to others!</h1>
          <div className='flex flex-row items-start gap-2'>
            {user && <img src={user.photoURL} className='w-8 h-8 rounded-full my-1'/>}
            <div className='w-full'>
              <textarea name="dream" id="dream" className={`w-full bg-gray-100 text-slate-900 rounded-md p-2 h-10 group-hover:h-48 transition-all resize-none duration-300`}
                onChange={(e) => setPost({...post, dream:e.target.value})}
                value={post.dream}
                placeholder="What's your dream? and why?"
                ></textarea>
              <div className='flex justify-between items-center'>
                <p className={post.dream.length > 300 ? "text-red-600 text-sm" : "text-sm"}>{post.dream.length}/300</p>
                <button type="submit" className='bg-cyan-500 hover:bg-cyan-600 rounded-md py-1 px-6 text-base font-semibold text-white mt-3'>Post !</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className= {`max-w-xl mx-auto `} >
        <p className='mb-2 text-lg font-semibold'>See what other people dream</p>
        <AllDreams/>
      </div>
    </>
  )
}

export default community