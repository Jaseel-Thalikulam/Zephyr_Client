// import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { Badge, Image, Input } from "antd";
import { useEffect } from "react";
import gsap from "gsap";

interface IChatListProps{
  setShowChatList: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedUser: React.Dispatch<React.SetStateAction<ISelectedUser|null>>
  selectedUser:ISelectedUser|null
}

export interface ISelectedUser{
  id: number,
  name: string,
  latestMessage: string,
  unreadCount:number
}
  
function ChatList({setShowChatList,setSelectedUser,selectedUser}:IChatListProps) {

  function truncateString(str: string, limit: number) {
    if (str.length > limit) {
      return str.substring(0, limit) + "...";
    } else {
      return str;
    }
  }
  useEffect(() => {
    const timeLine = gsap.timeline({ defaults: { duration: 1 } });
    timeLine.from(".chat-list", { y: "-100%", ease: "back.inOut" });
  },[])
  const users :ISelectedUser[]= [
    {
      id: 1,
      name: "Alice",
      latestMessage: "Hello, how are you?",
      unreadCount: 2,
    },
    {
      id: 2,
      name: "Bob",
      latestMessage: "Are we meeting today?",
      unreadCount: 5,
    },
    {
      id: 3,
      name: "Charlie",
      latestMessage: "Project update: Completed.",
      unreadCount: 0,
    },
    {
      id: 4,
      name: "David",
      latestMessage: "Can you send the files?",
      unreadCount: 1,
    },
    {
      id: 5,
      name: "Eva",
      latestMessage: "Meeting rescheduled to next week.",
      unreadCount: 3,
    },
    {
      id: 6,
      name: "Frank",
      latestMessage: "Received your email, thanks!",
      unreadCount: 4,
    },
    { id: 7, name: "Grace", latestMessage: "Happy Birthday!", unreadCount: 1 },
    {
      id: 8,
      name: "Hannah",
      latestMessage: "Call me when you're free.",
      unreadCount: 2,
    },
    { id: 9, name: "Ian", latestMessage: "Lunch at noon?", unreadCount: 3 },
    {
      id: 10,
      name: "Julia",
      latestMessage: "See you at the conference.",
      unreadCount: 0,
    },
    {
      id: 11,
      name: "Kevin",
      latestMessage: "Report submitted.",
      unreadCount: 5,
    },
    {
      id: 12,
      name: "Liam",
      latestMessage: "Let's brainstorm tomorrow.",
      unreadCount: 2,
    },
    {
      id: 13,
      name: "Mia",
      latestMessage: "Need your feedback on this.",
      unreadCount: 4,
    },
    {
      id: 14,
      name: "Noah",
      latestMessage: "We need to finalize the budget.",
      unreadCount: 1,
    },
    {
      id: 15,
      name: "Olivia",
      latestMessage: "Can we discuss this today?",
      unreadCount: 3,
    },
    {
      id: 16,
      name: "Paul",
      latestMessage: "How about a coffee on Friday?",
      unreadCount: 2,
    },
    {
      id: 17,
      name: "Quinn",
      latestMessage: "Reminder: Appointment at 3 PM.",
      unreadCount: 0,
    },
    {
      id: 18,
      name: "Rachel",
      latestMessage: "Happy New Year!",
      unreadCount: 5,
    },
    {
      id: 19,
      name: "Sara",
      latestMessage: "Proposal looks great!",
      unreadCount: 2,
    },
    {
      id: 20,
      name: "Tom",
      latestMessage: "Can you review this document?",
      unreadCount: 3,
    },
  ];
  return (
    <>
      <div className="chat-list md:col-span-4  lg:col-span-3  relative row-span-10 grid grid-rows-8 sm:col-span-12">
        <div className="row-span-2">
          <div className="grid grid-cols-10  p-5">
            <div className="content col-span-3 flex flex-col justify-center items-center xl:w-24">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                draggable={false}
                className=" rounded-full "
              />
            </div>
            <div className="content col-span-7 flex flex-col justify-center items-center">
              <h1 className="text-xl font-bold text-black ">John Cheek</h1>
              <h6 className="text-xs text-black">johncheek321</h6>
            </div>
          </div>
          <div className=" row-span-1 h-max px-5 ">
            <Input size="large" placeholder="Search here" variant="borderless" />
          </div>
          
            {/* <div className=" row-span-11 h-full lg:hidden">
              <div className="right-0 bottom-0 ">
                <FloatButton.Group
                  // onClick={() => setShowUserDetail(!showUserDetail)}
                  className="absolute  "
                  // open={showUserDetail}
                  trigger="click"
                  style={{ right: 24 }}
                  icon={<CustomerServiceOutlined />}
                >
                  <FloatButton />
                  <FloatButton icon={<CommentOutlined />} />
                </FloatButton.Group>
              </div>
            </div> */}
        </div>

        <div className="overflow-y-scroll h- row-span-6">
          <div className="  flex flex-col p-2 gap-2 ">
            {users.map((user) => (
              <div
                key={user.id}
                className={`h-20  w-full rounded p-2 flex ${
                  user.id === selectedUser?.id
                    ? "bg-gray-100"
                    : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => { setSelectedUser(user); setShowChatList(false)}}
              >
                <div className="w-1/6 flex  justify-center items-center ">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    draggable={false}
                    className="rounded-full"
                    preview={false}
                  />
                </div>

                <div className="pl-5 w-4/6">
                  <h1 className="font-medium text-gray-700">{user.name}</h1>
                  <h1 className="font-thin text-gray-700 ">
                    {truncateString(user.latestMessage, 20)}
                  </h1>
                </div>

                <div className="w-1/6 flex ">
                  <Badge
                    offset={[0, 23]}
                    count={user.unreadCount}
                    style={{ backgroundColor: "#52c41a" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatList;
