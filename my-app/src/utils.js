import { toast } from 'react-toastify';

export const Util = {
  sleep: (millis) => new Promise((resolve) => setTimeout(resolve, millis))
};

export const URL = 'http://localhost:3000';

export const redColor = '#db2828';

export const validateSignUpForm = (name, email, password) => {
  if (name === "" || name.trim().length < 1) {
    toast.error("Name cannot be empty")
  } else if (email === "") {
    toast.error("Email cannot be empty")
  } else if (password === "" || password.trim().length === 0) {
    toast.error("Password cannot be empty")
  } else if (!String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
    toast.error("Enter a valid email address")
  } else {
    return true;
  }
};


export const validateLoginForm = (email, password) => {
  if (!String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
    toast.error("Enter a valid email address");
  } else if (password === ""|| password.trim().length === 0) {
    toast.error("Password cannot be empty");
  } else {
    return true;
  }
};