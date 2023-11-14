"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
} from "@/components/client";
import classNames from "classnames";

const LOGIN = "login";
const SIGNUP = "signup";

const LoginPage = () => {
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

  return (
    <main className="min-h-screen px-2 lg:pt-20 pt-16">
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
    </main>
  );
}

export default LoginPage