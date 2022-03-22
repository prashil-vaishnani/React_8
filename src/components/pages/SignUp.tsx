import "./SignUp.css";
import image from "../Images/woman_icon.png";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/index";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type validation = {
  profilePic: Blob | null;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  confirmPassword: string;
};
type error_type = {
  profilePic: string;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  confirmPassword: string;
};

// function for validation
const validate = (values: validation) => {
  const errors = {} as error_type;

  if (!values.profilePic) {
    errors.profilePic = "Please Upload Profile Photo!";
  }
  if (!values.name) {
    errors.name = "Required!";
  }
  if (values.name.length < 15) {
    errors.name = "Must be 15 characters or more!";
  }

  if (!values.email) {
    errors.email = "Required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address!";
  }

  if (!values.phoneNo) {
    errors.phoneNo = "Required!";
  } else if (
    !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[56789]\d{9}$/gm.test(
      values.phoneNo
    )
  ) {
    errors.phoneNo = "Invalid Phone No!";
  }

  if (!values.password) {
    errors.password = "Password is Required!";
  } else if (
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "use  at least one upper case one lower case one special symbol";
  } else if (values.password.length < 8) {
    errors.password = "Password length must be atleast 8 characters!";
  } else if (values.password.length > 15) {
    errors.password = "Password length must not exceed 15 characters!";
  } else if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Your Password First!";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password Not Match!";
  }
  return errors;
};

// component function
export const SignUp = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      profilePic: null,
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(
        authActions.login({
          profilePic: URL.createObjectURL(
            (values.profilePic as unknown) as Blob
          ),

          name: values.name,
          email: values.email,
          phoneNo: values.phoneNo,
          password: values.password,
        })
      );

      formik.resetForm();
    },
  });
  return (
    <section className="signupSection">
      <h2 className="header">Welcome to the SignUp Page</h2>
      <div className="container mainWrapper">
        <div className="formWrapper">
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            component="form"
            className="signUpForm"
            onSubmit={formik.handleSubmit}
          >
            <h1>SignUp</h1>
            <div className="chooseImgWrapper">
              <input
                type="file"
                name="profilePic"
                accept=".jpg, .png"
                className="customImgInput"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue(
                    "profilePic",
                    event.currentTarget.files![0]
                  );
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.profilePic && formik.errors.profilePic ? (
                <div className="errorsWrapper">{formik.errors.profilePic}</div>
              ) : null}
            </div>
            <div className="labelInputWrapper">
              <TextField
                id="name"
                size="small"
                label="name"
                type="text"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.name && formik.errors.name
                    ? "formInput errorFormInput"
                    : "formInput"
                }
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="errorsWrapper">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="labelInputWrapper">
              <TextField
                id="email"
                label="Email"
                type="email"
                size="small"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.email && formik.errors.email
                    ? "formInput errorFormInput"
                    : "formInput"
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="errorsWrapper">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="labelInputWrapper">
              <TextField
                id="phoneNo"
                label="Phone no"
                type="text"
                size="small"
                variant="outlined"
                value={formik.values.phoneNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.phoneNo && formik.errors.phoneNo
                    ? "formInput errorFormInput"
                    : "formInput"
                }
              />
              {formik.touched.phoneNo && formik.errors.phoneNo ? (
                <div className="errorsWrapper">{formik.errors.phoneNo}</div>
              ) : null}
            </div>
            <div className="labelInputWrapper">
              <TextField
                id="password"
                label="password"
                type="password"
                size="small"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.password && formik.errors.password
                    ? "formInput errorFormInput"
                    : "formInput"
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="errorsWrapper">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="labelInputWrapper">
              <TextField
                id="confirmPassword"
                label="confirm password"
                type="password"
                size="small"
                variant="outlined"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "formInput errorFormInput"
                    : "formInput"
                }
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="errorsWrapper">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="btnWrapper">
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    formik.resetForm();
                  }}
                >
                  reset
                </Button>
              </Stack>
            </div>
          </Box>
        </div>
        <div className="imageWrapper">
          <img src={image} alt="woman_icon" />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
