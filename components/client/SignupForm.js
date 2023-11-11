import { useRef, useState } from "react";
import {
  Button,
  Input,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@/components/client";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import classNames from "classnames";
import { isValidEmail } from "@/utils/validation";
import { checkRegisteredEmail, createUser } from "@/services/api";
import { extractFields } from "@/utils/helper";
import { useRouter } from "next/navigation";
const CRED = "cred";
const INFO = "info";

const SignupForm = () => {
  const [tab, setTab] = useState(CRED);
  const [init, setInit] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [checkAvailability, setCheckAvailability] = useState({});
  const [formStatus, setFormStatus] = useState({});

  const credTabRef = useRef(null);
  const infoTabRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidateEmail = (e) => {
    if (formData?.email) {
      if (!isValidEmail(formData?.email)) {
        setError((prevState) => ({ ...prevState, email: "Invalid email" }));
        return;
      } else {
        setError((prevState) => ({ ...prevState, email: null }));
      }
    } else {
      setError((prevState) => ({ ...prevState, email: "Required" }));
      return;
    }

    checkRegisteredEmail({
      email: formData.email,
      onSubmit: () =>
        setCheckAvailability((prevState) => ({ ...prevState, loading: true })),
      onSuccess: () => {
        setCheckAvailability((prevState) => ({ ...prevState, loading: false }));
        setError((prevState) => ({
          ...prevState,
          email: "Email already taken",
        }));
      },
      onFailed: ({ status }) => {
        if (status === 404) {
          setCheckAvailability((prevState) => ({
            ...prevState,
            loading: false,
            available: true,
          }));
        } else {
          setCheckAvailability((prevState) => ({
            ...prevState,
            loading: false,
            available: false,
          }));
          setError((prevState) => ({
            ...prevState,
            email: "Server error: Failed to check",
          }));
        }
      },
    });
  };

  const handleValidateRquired = (e) => {
    const { value, name } = e.target;
    if (!value) {
      setError((prevState) => ({ ...prevState, [name]: "Required" }));
    } else {
      setError((prevState) => ({ ...prevState, [name]: null }));
    }
  };

  const handleValidateMatch = (e) => {
    const { value, name } = e.target;
    if (value !== formData.password) {
      setError((prevState) => ({ ...prevState, [name]: "Password mismatch" }));
    } else {
      setError((prevState) => ({ ...prevState, [name]: null }));
    }
  };

  const handleChangeTab = (tab) => {
    if (init) {
      setInit(false);
    }
    setTab(tab);
  };

  const handleValidateCred = () => {
    const hasError = error.email || error.password || error.confirmPassword;
    const isEmpty =
      !formData.email || !formData.password || !formData.confirmPassword;

    if (isEmpty || hasError) return;
    infoTabRef.current.click();
  };

  const handleValidateInfo = () => {
    const hasError = error.firstName || error.lastName;
    const isEmpty = !formData.firstName || !formData.lastName;

    if (isEmpty || hasError) return;
    console.log(formData);

    const userData = extractFields(
      formData,
      "email password image position firstName middleName lastName"
    );

    createUser({
      userData,
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
          error: data.error,
        }));
      },
    });
  };
  return (
    <form className="mt-12 flex flex-col gap-4">
      <section>
        <Tabs value={tab}>
          <TabsHeader className="hidden">
            <Tab
              value={CRED}
              ref={credTabRef}
              onClick={() => handleChangeTab(CRED)}
            >
              User Credentials
            </Tab>
            <Tab
              value={INFO}
              ref={infoTabRef}
              onClick={() => handleChangeTab(INFO)}
            >
              User Info
            </Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: {
                x: tab === CRED ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: tab === CRED ? 400 : -400,
              },
            }}
          >
            <TabPanel value={CRED}>
              <section className="flex flex-col gap-4">
                <div>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    User Credential
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Your Email *
                  </Typography>
                  <Input
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    onBlur={handleValidateEmail}
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
                  {checkAvailability.loading ? (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-2"
                    >
                      <Spinner className="h-4 w-4" /> checking availability...
                    </Typography>
                  ) : error?.email ? (
                    <Typography variant="small" color="red">
                      {error.email}
                    </Typography>
                  ) : (
                    checkAvailability.available && (
                      <Typography
                        variant="small"
                        color="green"
                        className="flex items-center gap-2"
                      >
                        <CheckCircleOutlinedIcon className="h-4 w-4" /> Email is
                        available
                      </Typography>
                    )
                  )}
                </div>

                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Password *
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
                  {error?.password && (
                    <Typography variant="small" color="red">
                      {error.password}
                    </Typography>
                  )}
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Confirm Password *
                  </Typography>
                  <Input
                    type="confirmPassword"
                    name="confirmPassword"
                    value={formData?.confirmPassword}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidateMatch(e);
                    }}
                    error={error?.confirmPassword}
                    placeholder="********"
                    className={
                      error?.confirmPassword
                        ? "!border-t-red-200 focus:!border-t-red-900"
                        : "!border-t-blue-gray-200 focus:!border-t-gray-900"
                    }
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    disabled={!formData?.password}
                  />
                  {error?.confirmPassword && (
                    <Typography variant="small" color="red">
                      {error.confirmPassword}
                    </Typography>
                  )}
                </div>
              </section>
            </TabPanel>
            <TabPanel value={INFO} className={classNames({ hidden: init })}>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                User Info
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Full Name
              </Typography>
              <section className="flex flex-col gap-2">
                <Input
                  placeholder="Position"
                  name="position"
                  value={formData?.position}
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  placeholder="First Name *"
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleChange}
                  onBlur={handleValidateRquired}
                  error={error?.firstName}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {error?.firstName && (
                  <Typography variant="small" color="red">
                    {error.firstName}
                  </Typography>
                )}
                <Input
                  placeholder="Middle Name"
                  name="middleName"
                  value={formData?.middleName}
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  placeholder="Last Name *"
                  name="lastName"
                  value={formData?.lastName}
                  onChange={handleChange}
                  onBlur={handleValidateRquired}
                  error={error?.lastName}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {error?.lastName && (
                  <Typography variant="small" color="red">
                    {error.lastName}
                  </Typography>
                )}
              </section>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </section>
      <Button
        size="lg"
        className="flex items-center justify-center gap-2"
        disabled={formStatus?.loading}
        onClick={tab === CRED ? handleValidateCred : handleValidateInfo}
      >
        {tab === CRED ? "Validate" : "Sign Up"}
        {formStatus?.loading && <Spinner className="h-4 w-4" />}
      </Button>
      <Typography
        variant="small"
        color={formStatus?.submitted ? "green" : "red"}
      >
        {formStatus?.submitted
          ? "User registered successfully"
          : formStatus.error}
      </Typography>
    </form>
  );
};

export default SignupForm;
