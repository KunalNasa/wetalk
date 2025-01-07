import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation";

const Conversations = () => {
  const {conversations, loading} = useGetConversations();
  
  return (
    <div>    
      {conversations?.map((conversation, index) => (
        <Conversation
        key={conversation._id}
        conversation={conversation}
        lastIdx={index === conversations.length - 1 ? true : false}
        />
      ))}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}

    </div>
  )
}

export default Conversations
