"use client";
import { useState } from "react";
import { Button, Input, Spinner, Typography } from "@/components/client";
import { signinUser } from "@/services/api";
import { isValidEmail } from "@/utils/validation";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [formStatus, setFormStatus] = useState({});

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error[name]) {
      setError((prevState) => ({ ...prevState, [name]: null }));
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidation = (e) => {
    const { value, name } = e.target;
    if (!value) {
      setError((prevState) => ({ ...prevState, [name]: "Required" }));
      return
    }

    if (name === "email") {
        if (!isValidEmail(value)) {
          setError((prevState) => ({ ...prevState, email: "Invalid email" }));
          return;
        } else {
          setError((prevState) => ({ ...prevState, email: null }));
        }
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = error.email || error.password;
    const isEmpty = !formData.email || !formData.password;

    if (isEmpty || hasError) return;

    console.log(formData)
    signinUser({
      userData: formData,
      onSubmit: () =>
        setFormStatus((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
        })),
      onSuccess: () => {
        setFormStatus((prevState) => ({
          ...prevState,
          submitted: true,
        }));
        router.push("/dashboard");
      },
      onFailed: ({ data }) => {
        setFormStatus((prevState) => ({
          ...prevState,
          loading: false,
          submitted: false,
          error: data.error || "Internal Server Error",
        }));
      },
    });
  };
  return (
    <form className="mt-12 flex flex-col gap-4">
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 font-medium"
        >
          Your Email
        </Typography>
        <Input
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
          onBlur={handleValidation}
          error={error?.email}
          placeholder="name@mail.com"
          className={
            error?.email
              ? "!border-t-red-200 focus:!border-t-red-900"
              : "!border-t-blue-gray-200 focus:!border-t-gray-900"
          }
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="small" color="red">
          {error.email}
        </Typography>
      </div>

      <div className="mb-6">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 font-medium"
        >
          Password
        </Typography>
        <Input
          type="password"
          name="password"
          value={formData?.password}
          onChange={handleChange}
          onBlur={handleValidateRquired}
          error={error?.password}
          placeholder="********"
          className={
            error?.password
              ? "!border-t-red-200 focus:!border-t-red-900"
              : "!border-t-blue-gray-200 focus:!border-t-gray-900"
          }
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="small" color="red">
          {error.password}
        </Typography>
      </div>
      <Button
        size="lg"
        className="flex items-center justify-center gap-2"
        onClick={handleSubmit}
        disabled={formStatus?.loading}
      >
        Login{formStatus?.loading && <Spinner className="h-4 w-4" />}
      </Button>
      <Typography
        variant="small"
        color={formStatus?.submitted ? "green" : "red"}
      >
        {formStatus?.submitted ? "Login successfully" : formStatus.error}
      </Typography>
    </form>
  );
};

export default LoginForm;
