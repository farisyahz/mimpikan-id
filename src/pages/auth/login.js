import {FcGoogle} from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {useAuthState} from "react-firebase-hooks/auth"

const login = () => {
  const router = useRouter();
  const user = useAuthState(auth);
  console.log(user)
  const googleProvider = new GoogleAuthProvider()
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(user === null){
      router.push('/');
    }else{
      console.log("login");
    }
  }, [user])
  return(
    <div className="rounded-lg shadow-lg p-7 max-w-[400px] mx-auto mt-32 bg-white">
      <h2 className="text-center font-semibold text-lg">Join Now</h2>
      <div className="py-4">
        <button className="bg-slate-700 text-slate-100 flex w-full rounded-md py-3 px-5 justify-center gap-2 items-center" onClick={GoogleLogin}>
          <FcGoogle className="text-2xl "/>
          Sign in with Google</button>
      </div>
    </div>
  )
}

export default login