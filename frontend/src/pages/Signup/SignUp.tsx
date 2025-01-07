import { useState } from "react"
import GenderCheckbox from "./GenderCheckbox"
import { Link } from "react-router-dom"
import useSignup from "../../hooks/useSignup"

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName : '',
        userName : '',
        emailId : '',
        password : '',
        confirmPassword : '',
        gender : '',
    })
    const {signup, loading} = useSignup();
    const handleFormSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await signup(inputs);
    }
    const handleGenderInput = async (gender : string) => {
      setInputs({...inputs, gender})
    }
  return (
    <div className='flex flex-col bg-white items-center justify-center h-screen mx-auto'>
			<div className='w-4/12 p-6 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg '>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type="text"
              className='w-full input input-bordered h-10'
              placeholder="Enter full name"
              value={inputs.fullName}
              onChange={(e) => {setInputs({...inputs, fullName : e.target.value })}}
            />        
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type="text"
              className='w-full input input-bordered h-10'
              placeholder="Enter username"
              value={inputs.userName}
              onChange={(e) => {setInputs({...inputs, userName : e.target.value })}}
            />        
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              type="text"
              className='w-full input input-bordered h-10'
              placeholder="Enter email"
              value={inputs.emailId}
              onChange={(e) => {setInputs({...inputs, emailId : e.target.value })}}
            />        
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type="password"
              className='w-full input input-bordered h-10'
              placeholder="Enter password"
              value={inputs.password}
              onChange={(e) => {setInputs({...inputs, password : e.target.value })}}
            />        
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type="password"
              className='w-full input input-bordered h-10'
              placeholder="Confirm password"
              value={inputs.confirmPassword}
              onChange={(e) => {setInputs({...inputs, confirmPassword : e.target.value })}}
            />      
            <GenderCheckbox handleGenderInput = {handleGenderInput} selectedGender = {inputs.gender}/>  
          </div>
          <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to= '/login'>
						Already have an account?
					</Link>

          <div className="py-2">
            <button className='btn btn-block btn-sm mt-2' disabled = {loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Signup"}
						</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
