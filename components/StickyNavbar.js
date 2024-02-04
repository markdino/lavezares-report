"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { authUser, signoutUser } from "@/services/api";
import { ProfileUploader } from "./client";

const StickyNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const LOGIN = "Log In";
  const SIGNIN = "Sign Up";
  const LOGOUT = "Log Out";
  const {
    isLogin,
    loginUser,
    logoutUser,
    image,
    isLoading,
    setIsLoading,
    setIsVerified,
  } = useUserStore();

  const handleLogout = () => {
    signoutUser({
      onSuccess: logoutUser,
      onFailed: logoutUser,
    });
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    authUser({
      onSubmit: () => setIsLoading(true),
      onSuccess: (data) => {
        setIsLoading(false);
        setIsVerified(true);
        loginUser(data);
      },
      onFailed: () => {
        setIsLoading(false);
        setIsVerified(true);
      },
    });
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#safety-info" className="flex items-center">
          Safety Info
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#empower-safety" className="flex items-center">
          Empower Safety
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#contact" className="flex items-center">
          Contact
        </a>
      </Typography>
      {isLogin && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link href="/dashboard">Dashboard</Link>
        </Typography>
      )}
    </ul>
  );

  return (
    <Navbar className="fixed top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          Lavezares Reports
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {isLoading ? (
              <Spinner />
            ) : isLogin ? (
              <>
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={handleLogout}
                >
                  <span>{LOGOUT}</span>
                </Button>
                <section>
                  <ProfileUploader
                    width={10}
                    height={10}
                    defaultSrc={image?.url}
                    readOnly
                  />
                </section>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>{LOGIN}</span>
                  </Button>
                </Link>
                <Link href="/login?form=signup">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>{SIGNIN}</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav} className="z-50">
        {navList}
        <div className="flex items-center gap-x-1">
          {isLogin ? (
            <>
              <Button variant="text" size="sm" onClick={handleLogout}>
                <span>{LOGOUT}</span>
              </Button>
            </>
          ) : (
            <>
              <Button fullWidth variant="text" size="sm">
                <span>{LOGIN}</span>
              </Button>
              <Button fullWidth variant="gradient" size="sm">
                <span>{SIGNIN}</span>
              </Button>
            </>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default StickyNavbar;
