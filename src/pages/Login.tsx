import { Button } from "antd";
import { useState, useEffect } from "react";
import { getUser } from "../api/userAPI";
import { GithubOutlined } from "@ant-design/icons";
import GoogleIcon from "../icons/GoogleIcon";
import { useMsal } from "@azure/msal-react";
import MicrosoftIcon from "../icons/MicrosoftIcon";
import { loginRequest } from "../util/authConfig";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { setAccessToken, setRefreshToken } from "../util/localStorageService";
import { useNavigate } from "react-router-dom";


function Login(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()


  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    profileImage: "",
    gateWay: "",
  });
  
  interface IGoogleUser {
    access_token?: string;
  }
  const [googleUser, setGoogleUser] = useState<IGoogleUser | undefined>(
    undefined
    );
    
  const GITHUB_AUTH_CLIENT_ID = import.meta.env.VITE_GITHUB_AUTH_CLIENT_ID as string;

  // Microsoft Azure Auth Setup
  const { instance } = useMsal();

  const handleMicrosoftLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/redirect",
      })
      .then((res) => {
        if (res.account && res.account.name) {
          setUser({
            name: res.account.name,
            email: res.account.username,
            gateWay: "Microsoft_Azure",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleMicrosoftLogoutPopup = () => {
    instance
      .logoutPopup({
        mainWindowRedirectUri: "/", // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((error) => console.log(error));
  };

  // Github Auth Setup
  function loginWithGithub(): void {
    try {
      setIsLoading(true);
      window.location.assign(
        "https://github.com/login/oauth/authorize?client_id=" +
          GITHUB_AUTH_CLIENT_ID
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  //Google Auth Setup
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
  };

  useEffect(() => {
    if (googleUser && googleUser!.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${
            googleUser!.access_token
          }`,
          {
            headers: {
              Authorization: `Bearer ${googleUser!.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data) {
            const { name, email, picture } = res.data;
            setUser({
              name: name,
              email: email,
              gateWay: "Google_Auth",
              profileImage: picture,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [googleUser]);

  useEffect(() => {
    (async function getUserData(): Promise<void> {
  
      
      let userData = await getUser(user);
      if (userData?.data) {
        console.log(userData,"cookieie");
       setAccessToken(userData.data.accessToken)
        setRefreshToken(userData.data.refreshToken)
        
    


        navigate('/chats')
    
      }
      
    })();
  }, [user]);

  return (
    <>
    <div className="h-screen min-w-full md:p-16 ">
      <div className=" h-full flex ">
        <div className=" h-full flex-1 rounded-tl-2xl rounded-bl-2xl flex flex-col space-y-4 items-center justify-center pl-10 pr-10 md:pl-16 md:pr-16 ">
          <Button
            loading={isLoading}
            icon={<GithubOutlined />}
            className="w-full !bg-black !text-white hover:!bg-black hover:!text-white hover:!border-white"
            size="large"
            onClick={() => loginWithGithub()}
            >
            Login With GitHub
          </Button>
          <Button
            loading={isLoading}
            icon={<GoogleIcon />}
            className="w-full !bg-white !text-black hover:!bg-white hover:!text-black hover:!border-white"
            size="large"
            onClick={() => login()}
            >
            Login With Google
          </Button>
          <Button
            loading={isLoading}
            icon={<GoogleIcon />}
            className="w-full !bg-white !text-black hover:!bg-white hover:!text-black hover:!border-white"
            size="large"
            onClick={() => logOut()}
            >
            LogOut With Google
          </Button>
          <Button
            loading={isLoading}
            icon={<MicrosoftIcon />}
            className="w-full !bg-white !text-black hover:!bg-white hover:!text-black hover:!border-white"
            size="large"
            onClick={handleMicrosoftLoginPopup}
            >
            Login With Microsoft
          </Button>
          <Button
            loading={isLoading}
            icon={<MicrosoftIcon />}
            className="w-full !bg-white !text-black hover:!bg-white hover:!text-black hover:!border-white"
            size="large"
            onClick={handleMicrosoftLogoutPopup}
            >
            LogOut With Microsoft
          </Button>
        </div>
        <div className="hidden lg:block h-full flex-1 rounded-br-2xl rounded-tr-2xl  justify-center">
          <img src="" className="h-full" alt="illustrations" />
        </div>
      </div>
      </div>      
            </>
  );
}

export default Login;
