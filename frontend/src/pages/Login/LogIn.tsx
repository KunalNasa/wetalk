import { useState } from "react"
import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {loading, login} = useLogin();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(identifier, password);
  }
  return (
    <div className='flex h-screen bg-white flex-col items-center justify-center mx-auto'>
      <div className='w-4/12 p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-green-500'> WeTalk</span>
				</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label className='label p-2'>
							<span className='text-base label-text'>Email/Username</span>
						</label>
          <input
          type="text"
          className='w-full input input-bordered h-10'
          placeholder="Enter username or email"
          value={identifier}
          onChange={(e) => {setIdentifier(e.target.value)}}
          />
        </div>
        <div>
            <label className='label p-2'>
							<span className='text-base label-text'>Password</span>
						</label>
          <input 
          type="password"
          className='w-full input input-bordered h-10'
          placeholder="Enter username or password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
          <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>
        <div>
        <button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default LogIn
