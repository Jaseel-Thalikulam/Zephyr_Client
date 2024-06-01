import { Badge, Button, Image, Input, message } from "antd";
import { PresetStatusColorType } from "antd/es/_util/colors";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ISelectedUser } from "./ChatList";
import { CheckCircleOutlined, SendOutlined } from "@ant-design/icons";
interface IChatBodyProps {
  setShowChatList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: ISelectedUser | null;
}

function ChatBody({ setShowChatList, selectedUser }: IChatBodyProps) {
  interface IUserStatus {
    Status: PresetStatusColorType;
    Text: React.ReactNode;
  }
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const statusOnline: IUserStatus = {
    Status: "success",
    Text: "Online",
  };
  const [currentUser, setCurrentUserStatus] =
    useState<IUserStatus>(statusOnline);

  const [showUserDetail, setShowUserDetail] = useState(false);
  const newmessages = [
    { content: "Hello!", isSender: true, time: "10:21 AM" },
    { content: "How are you?", isSender: false, time: "10:22 AM" },
    { content: "I am good, thanks!", isSender: true, time: "10:23 AM" },
    { content: "What about you?", isSender: true, time: "10:24 AM" },
    { content: "I am doing well.", isSender: false, time: "10:25 AM" },
    { content: "Great to hear!", isSender: true, time: "10:26 AM" },
    {
      content: "Do you want to catch up later?",
      isSender: false,
      time: "10:27 AM",
    },
    { content: "Sure, what time?", isSender: true, time: "10:28 AM" },
    { content: "How about 3 PM?", isSender: false, time: "10:29 AM" },
    { content: "Sounds good to me!", isSender: true, time: "10:30 AM" },
    { content: "See you then.", isSender: false, time: "10:31 AM" },
    { content: "Looking forward to it.", isSender: true, time: "10:32 AM" },
    {
      content: "By the way, did you finish the project?",
      isSender: false,
      time: "10:33 AM",
    },
    {
      content: "Yes, I did. It is all done.",
      isSender: true,
      time: "10:34 AM",
    },
    {
      content: "Fantastic! I will review it soon.",
      isSender: false,
      time: "10:35 AM",
    },
    { content: "Thank you!", isSender: true, time: "10:36 AM" },
    { content: "No problem.", isSender: false, time: "10:37 AM" },
    {
      content: "Let me know if you need anything else.",
      isSender: true,
      time: "10:38 AM",
    },
    { content: "Will do.", isSender: false, time: "10:39 AM" },
    { content: "Have a great day!", isSender: true, time: "10:40 AM" },
  ];
  const [messages, setMessages] = useState(newmessages);
  useEffect(() => {
    const timeLine = gsap.timeline({ defaults: { duration: 1 } });
    timeLine
      .from(".chat-body", { y: "100%", ease: "back.inOut" }, 0)
      .from(".content", { opacity: 0 });
    
  }, []);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [])
  
  
  useEffect(() => {
    // Scroll to the last message without affecting page scroll
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      const lastMessage = messagesContainer.querySelector('.chatMessages > div:last-child') as HTMLElement;
      if (lastMessage) {
        messagesContainer.scrollTo({
          top: lastMessage.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);
  
 

  return (
    <>
      <div className="chat-body md:col-span-8  grid grid-rows-11 h-full   row-span-10 ">
        {/* Header */}
        <div className=" row-span-1  grid grid-cols-12 pt-1 pl-1 shadow  h-full ">
          <div className="content col-span-2 md:col-span-1 h-full  flex items-center justify-center">
            <div className="lg:w-12 sm:w-14 w-12">
              <Image
                src="https://images.unsplash.com/photo-1592334873219-42ca023e48ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w3NjA4Mjc3NHx8ZW58MHx8fHx8"
                alt=""
                draggable={false}
                className="rounded-full h-full"
              />
            </div>
          </div>
          <div
            className="content col-span-10 md:col-span-11 flex flex-col pl-4"
            onClick={() => setShowUserDetail(!showUserDetail)}
          >
            <h1 className="md:text-lg xl:text-xl  font-bold text-black ">
              {selectedUser?.name ? selectedUser?.name : "Alex"}
            </h1>
            <Badge status={currentUser.Status} text={currentUser.Text} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col p-2 h-full row-span-9 overflow-y-scroll chatMessages" ref={messagesContainerRef} >
          {messages.map((message) => (
            <div
              
              className={`flex gap-1 h-full mb-1 ${
                message.isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`w-fit p-1  ${
                  message.isSender
                    ? "bg-blue-300  rounded-tl-lg rounded-bl-lg rounded-tr-lg"
                    : "bg-green-300  rounded-br-lg rounded-bl-lg rounded-tr-lg"
                }  `}
              >
                <pre className="whitespace-pre-wrap text-sm md:text-base ">
                 {message.content}
                </pre>
                <div
                  className={`flex  items-end ${
                    message.isSender ? "justify-start" : "justify-end"
                  }`}
                >
                  <span className="text-xxs text-gray-600">{message.time}</span>
                
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-1 px-1">
          <Input variant="outlined" className=" h-fit" size="large" />
          <Button shape="round" className=" h-full"onClick={()=>setMessages([...messages,{content:"Hy",isSender:true,time:"10:34 AM"}])}>
            <SendOutlined />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ChatBody;
