"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  LoginForm,
  SignupForm,
  Spinner,
  Typography,
} from "@/components/client";
import classNames from "classnames";
import { useUserStore } from "@/store/userStore";
import BackgroundImage from "@/components/BackgroundImage";

const LOGIN = "login";
const SIGNUP = "signup";

const LoginPage = () => {
  const { isLogin, isLoading: isCheckingUser, isVerified } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = searchParams.get("form");
  const initForm = form === SIGNUP ? SIGNUP : LOGIN;

  const [type, setType] = useState(initForm);
  const [init, setInit] = useState(true);

  const handleChangeTab = (tab) => {
    if (init) {
      setInit(false);
    }
    setType(tab);
  };

  useEffect(() => {
    if (isVerified && isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin, isVerified]);

  return (
    <main className="h-screen px-2 lg:pt-20 pt-16 relative">
      <BackgroundImage />
      {isCheckingUser ? (
        <section className="h-full w-full flex flex-col justify-center items-center">
          <Spinner className="w-10 h-10" />
          <Typography>Checking logged user...</Typography>
        </section>
      ) : (
        !isLogin && (
          <Card className="w-full max-w-[24rem] mx-auto">
            <CardBody>
              <Tabs value={type} className="overflow-visible">
                <TabsHeader className="relative z-0 ">
                  <Tab value={LOGIN} onClick={() => handleChangeTab(LOGIN)}>
                    Log In
                  </Tab>
                  <Tab value={SIGNUP} onClick={() => handleChangeTab(SIGNUP)}>
                    Sign Up
                  </Tab>
                </TabsHeader>
                <TabsBody
                  className="!overflow-x-hidden"
                  animate={{
                    initial: {
                      x: type === LOGIN ? 400 : -400,
                    },
                    mount: {
                      x: 0,
                    },
                    unmount: {
                      x: type === LOGIN ? 400 : -400,
                    },
                  }}
                >
                  <TabPanel value={LOGIN} className="p-0">
                    <section
                      className={classNames({
                        hidden: init && type !== LOGIN,
                      })}
                    >
                      <LoginForm />
                    </section>
                  </TabPanel>
                  <TabPanel value={SIGNUP} className="p-0">
                    <section
                      className={classNames({
                        hidden: init && type !== SIGNUP,
                      })}
                    >
                      <SignupForm />
                    </section>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </CardBody>
          </Card>
        )
      )}
    </main>
  );
};

export default LoginPage;
