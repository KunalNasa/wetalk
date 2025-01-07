import { useState } from "react"
import useSendMessage from "../../hooks/useSendMessage";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
    const [messageInput, setMessageInput] = useState<string>("");
    const {loading, sendMessage} = useSendMessage();
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage(messageInput);
        setMessageInput("");
    }
  return (
    <div>
        <form className='px-4 my-3 flex gap-2' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                value={messageInput}
                className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                onChange={(e) => {setMessageInput(e.target.value)}}
                type="text" />
            </div>
                <button type='submit' className='text-xl'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
        </form>
    </div>
  )
}

export default MessageInput
