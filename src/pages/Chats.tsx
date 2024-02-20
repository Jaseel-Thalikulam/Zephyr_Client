import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../interceptor/Interceptor";
import {
  Badge,
  Button,
  Dropdown,
  FloatButton,
  Image,
  Input,
  Space,
  Upload,
} from "antd";
import { PresetStatusColorType } from "antd/es/_util/colors";
import gsap from "gsap";
import { IconButton, Switch, duration } from "@mui/material";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
("../interceptor/Interceptor");

function Chats(): JSX.Element {
  const statusOnline: IUserStatus = {
    Status: "success",
    Text: "Online",
  };

  interface IUserStatus {
    Status: PresetStatusColorType;
    Text: React.ReactNode;
  }
  const [currentUser, setCurrentUserStatus] =
    useState<IUserStatus>(statusOnline);
  const [showUserDetail, setShowUserDetail] = useState(false);

  useEffect(() => {
    (async function fetchChats() {
      const res = await axiosInstance.get("Chats");
      console.log(res);
    })();

    const timeLine = gsap.timeline({ defaults: { duration: 1 } });
    timeLine.from(".chat-list", { y: "-100%", ease: "back.inOut" });

    timeLine
      .from(".chat-body", { y: "100%", ease: "back.inOut" }, 0)
      .from(".content", { opacity: 0 });
  }, []);

  return (
    <div className="h-screen lg:p-10">
      <div className="grid lg:grid-cols-12 h-full rounded-xl overflow-hidden">
        <div className="chat-list bg-red-100 lg:col-span-3 grid grid-rows-12 relative overflow-scroll">
      
          <div className=" row-span-1  grid grid-rows-3  h-max  ">
            <div className="grid grid-cols-10 row-span-2 p-5  h-max ">
              <div className="content col-span-3 flex flex-col justify-center items-center xl:w-24">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  draggable={false}
                  className=" rounded-full "
                  preview={false}
                />
              </div>
              <div className="content col-span-7 flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold text-black ">John Cheek</h1>
                <h6 className="text-xs text-black">johncheek321</h6>
              </div>
            </div>
            <div className=" row-span-1 h-max px-5">
              <Input size="large" placeholder="Search here" />
            </div>
          </div>

          <div className=" row-span-11 h-full ">
            <div className="right-0 bottom-0 lg:hidden">

            <FloatButton.Group
              onClick={() => setShowUserDetail(!showUserDetail)}
              className="absolute  "
              open={showUserDetail}
              trigger="click"
              style={{ right: 24 }}
              icon={<CustomerServiceOutlined />}
              >
              <FloatButton />
              <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group>
              </div>
          </div>
        </div>

        <div className="chat-body  col-span-8 grid grid-rows-12 h-full bg-blue-300  lg:block">
          <div className=" row-span-1  h-max grid grid-cols-12 pt-1 shadow">
            <div className="content h-max col-span-1  flex justify-center items-center  ">
              <div className="w-8 lg:w-10 xl:w-14">
                <Image
                  src="https://images.unsplash.com/photo-1592334873219-42ca023e48ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w3NjA4Mjc3NHx8ZW58MHx8fHx8"
                  alt=""
                  draggable={false}
                  className="rounded-full"
                  preview={false}
                />
              </div>
            </div>
            <div
              className="content h-max  col-span-11 flex flex-col  "
              onClick={() => setShowUserDetail(!showUserDetail)}
            >
              <h1 className="lg:text-lg xl:text-xl font-bold text-black ">
                Alex Mercer
              </h1>
              <Badge status={currentUser.Status} text={currentUser.Text} />
            </div>
          </div>

          <div className=" row-span-11"></div>
        </div>

        <div className="configurations col-span-1 bg-amber-300 hidden lg:block lg:block"></div>
      </div>
    </div>
  );
}

export default Chats;
