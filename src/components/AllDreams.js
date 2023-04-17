import React, {useEffect, useState} from 'react'
import Dream from './Dream'
import { db } from '../../utils/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';


const AllDreams = () => {
  const [allPost, setAllPost] = useState([]);
  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q =  query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPost(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    });
    return unsubscribe;
  }

  useEffect(() => {
    getPosts();
  }, []);
  
  return (
    <>
      {allPost.length === 0 && <p>There is no post yet.</p>}
      {allPost.map((post) => (
        <Dream key={post.id} {...post}/>
      ))}
    </>
      
  )
}

export default AllDreams