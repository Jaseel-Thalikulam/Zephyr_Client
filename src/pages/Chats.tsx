import { useEffect, useState } from "react";
import ChatBody from "../components/ChatBody";
import ChatList, { ISelectedUser } from "../components/ChatList";
("../interceptor/Interceptor");

function Chats(): JSX.Element {
  const [showChatList, setShowChatList] = useState(true );
  const[selectedUser,setSelectedUser]=useState<ISelectedUser|null>(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

  

   
    
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  }, []);

  return (
    <div className="h-screen lg:p-10 bg-white">
      <div className="grid md:grid-cols-12 rounded-xl  grid-rows-10  0  h-full">
      {windowWidth < 768 ? (
          showChatList ? <ChatList setShowChatList={setShowChatList} setSelectedUser={setSelectedUser} selectedUser={selectedUser} /> : <ChatBody setShowChatList={setShowChatList} selectedUser={selectedUser}/>
        ) : (
          <>
              <ChatList setShowChatList={setShowChatList} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
            <ChatBody setShowChatList={setShowChatList} selectedUser={selectedUser}/>
          </>
        )}

        <div className="configurations col-span-1 bg-amber-300 hidden lg:block row-span-10 md:hidden"></div>
      </div>
    </div>
  );
}

export default Chats;
