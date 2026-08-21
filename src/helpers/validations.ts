/* eslint-disable @typescript-eslint/no-unused-vars */
import { max } from "moment";
import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim() // starting / ending spaces hata dega
    .matches(emailRegex, "Please enter a valid email")
    .required("Please enter email."),
  password: Yup.string().trim().required("Please enter password."),
});

const SignupvalidSchema = Yup.object().shape({
  name: Yup.string().trim().required("Please enter full name."),
  email: Yup.string()
    .trim()
    .matches(emailRegex, "Please enter a valid email")
    .required("Please enter email."),
  mobile: Yup.string()
    .trim()
    .min(10, "Please enter a valid mobile number")
    .max(15, "Please enter a valid mobile number")
    .required("Please enter mobile number."),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter password."),
});

const TaskSchema = Yup.object().shape({
  userid: Yup.string().trim().required("Please select user."),
  taskname: Yup.string().trim().required("Please enter task name."),
  description: Yup.string().trim().required("Please enter task description."),
  category: Yup.string().trim().required("Please select task category."),
  duedate: Yup.string().trim().required("Please select due date."),
  priority: Yup.string().trim().required("Please select task priority."),
});

const TaskstatusSchema = Yup.object().shape({
  remarks: Yup.string().trim().required("Please enter remarks."),
  taskdate: Yup.string().trim().required("Please select date."),
  taskstatus: Yup.string().trim().required("Please select task status."),
});

const AddbookvaliationSchema = Yup.object().shape({
  coverimg: Yup.object().nullable().required("Book cover image is required"),
  title: Yup.string().trim().required("Book title is required"),
  author: Yup.string().trim().required("Author name is required"),
  descripton: Yup.string().trim().required("Description is required"),
  genre: Yup.string().required("Genre is required"),
  language: Yup.string().required("Language is required"),
  isbn: Yup.string().trim().required("ISBN is required"),
  publisher_name: Yup.string().trim().required("Publisher is required"),
  numberofpages: Yup.string().trim().required("Number of pages is required"),
  publishedDate: Yup.date().nullable().required("Published date is required"),
  ratings: Yup.number()
    .min(1, "Please select rating")
    .max(5, "Rating cannot be more than 5")
    .required("Rating is required"),
  tags: Yup.string().trim().required("Tags/Keywords are required"),
});

export {
  SignInValidationSchema,
  SignupvalidSchema,
  TaskSchema,
  TaskstatusSchema,
  AddbookvaliationSchema
};
