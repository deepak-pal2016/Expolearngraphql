const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../models/books");
const Genre = require("../models/genre");
const Language = require("../models/language");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const askBookAI = require("../services/service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY:", success);
  }
});

const resolvers = {
  Query: {
    genres: async () => {
      return await Genre.find({ isActive: true });
    },
    languages: async () => {
      return await Language.find({ isActive: true });
    },
    books: async () => {
      return await Book.find();
    },
    searchBooks: async (_, { query }) => {
      if (!query || !query.trim()) {
        return [];
      }

      const searchText = query.trim();
      const bookddd = await Book.find({
        $or: [
          { title: { $regex: searchText, $options: "i" } },
          { author: { $regex: searchText, $options: "i" } },
          { genre: { $regex: searchText, $options: "i" } },
          { language: { $regex: searchText, $options: "i" } },
          { publisher: { $regex: searchText, $options: "i" } },
          { isbn: { $regex: searchText, $options: "i" } },
        ],
      });

      return bookddd;
    },
  },
  Mutation: {
    askBook: async (_, { question }) => {
      const answer = await askBookAI(question);

      return answer;
    },

    changepassword: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return {
            success: false,
            message: "User not found",
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return {
          success: true,
          message: "Password changed successfully",
        };
      } catch (error) {
        console.log("Change Password Error:", error);

        return {
          success: false,
          message: "Something went wrong",
        };
      }
    },

    verifyotp: async (_, { email, otp }) => {
      try {
        const user = await User.findOne({ email });

        // console.log("========== OTP DEBUG ==========");
        // console.log("Email:", email);
        // console.log("Received OTP:", otp);
        // console.log("Received OTP type:", typeof otp);
        // console.log("DB OTP:", user?.resetPasswordOtp);
        // console.log("DB OTP type:", typeof user?.resetPasswordOtp);
        // console.log(
        //   "OTP Match:",
        //   String(user?.resetPasswordOtp) === String(otp),
        // );
        console.log("DB OTP Expire:", user?.resetPasswordOtpExpire);
        console.log("Current Time:", new Date());
        console.log(
          "Expired:",
          user?.resetPasswordOtpExpire
            ? user.resetPasswordOtpExpire < new Date()
            : "NO EXPIRY",
        );
        console.log("==============================");

        if (!user) {
          return {
            success: false,
            message: "User not found",
          };
        }

        if (String(user.resetPasswordOtp) !== String(otp)) {
          return {
            success: false,
            message: "Invalid otp",
          };
        }

        if (
          !user.resetPasswordOtpExpire ||
          user.resetPasswordOtpExpire < new Date()
        ) {
          return {
            success: false,
            message: "OTP has expired",
          };
        }

        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpire = null;

        await user.save();

        return {
          success: true,
          message: "OTP verified successfully",
        };
      } catch (error) {
        console.log("Verify OTP Error:", error);

        return {
          success: false,
          message: "Something went wrong",
        };
      }
    },

    loginUser: async (_, { email, password, fcmtoken }) => {
      try {
        if (!email || !password) {
          return {
            success: false,
            message: "Email and password required.",
            token: null,
            user: null,
          };
        }

        const user = await User.findOne({ email });

        if (!user) {
          return {
            success: false,
            message: "User not found.",
            token: null,
            user: null,
          };
        }

        const cleanPassword = password.trim();
        const isMatch = await bcrypt.compare(cleanPassword, user.password);

        if (!isMatch) {
          return {
            success: false,
            message: "Invalid email or password.",
            token: null,
            user: null,
          };
        }

        if (fcmtoken) {
          user.fcmtoken = fcmtoken;
        }

        const token = jwt.sign(
          {
            userId: user._id.toString(),
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
        );

        user.token = token;

        await user.save();

        return {
          success: true,
          message: "Login successfully.",
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            age: user.age,
            email: user.email,
            mobile: user.mobile,
            profileImage: user.profileImage,
            fcmtoken: user.fcmtoken,
            createdAt: user.createdAt ? user.createdAt.toISOString() : null,
          },
        };
      } catch (error) {
        console.log("GraphQL Login Error:", error);

        return {
          success: false,
          message: "Internal Server Error",
          token: null,
          user: null,
        };
      }
    },
    addGenre: async (_, { name, value }) => {
      const genre = await Genre.create({
        name,
        value,
      });
      return genre;
    },

    addLanguage: async (_, { name, value }) => {
      const language = await Language.create({
        name,
        value,
      });

      return language;
    },
    addUser: async (_, { name, email, mobile, password, fcmtoken }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            message: "User already exists.",
            token: null,
            user: null,
          };
        }

        const existingMobile = await User.findOne({ mobile });

        if (existingMobile) {
          return {
            success: false,
            message: "User mobile already exists.",
            token: null,
            user: null,
          };
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          mobile,
          password: hashpassword,
          fcmtoken,
        });

        const token = jwt.sign(
          {
            userId: user._id.toString(),
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        user.token = token;
        await user.save();

        return {
          success: true,
          message: "User registered successfully.",
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            age: user.age,
            email: user.email,
            mobile: user.mobile,
            profileImage: user.profileImage,
            fcmtoken: user.fcmtoken,
            createdAt: user.createdAt ? user.createdAt.toISOString() : null,
          },
        };
      } catch (error) {
        console.log("GraphQL Signup Error:", error);

        return {
          success: false,
          message: "Internal Server Error",
          token: null,
          user: null,
        };
      }
    },
    addBooks: async (
      _,
      {
        title,
        author,
        description,
        genre,
        language,
        isbn,
        publisher,
        publishedDate,
        numberOfPages,
        rating,
        tags,
        trending,
        popular,
        coverImage,
        chapters,
      },
    ) => {
      const totalPages = chapters?.reduce(
        (total, chapter) => total + Number(chapter.pages || 0),
        0,
      );
      try {
        const newBook = await Book.create({
          title,
          author,
          description,
          genre,
          language,
          isbn,
          publisher,
          publishedDate,
          pages: totalPages,
          numberOfPages,
          rating,
          tags,
          trending,
          popular,
          coverImage,
          chapters,
        });

        return newBook;
      } catch (error) {
        console.log("GraphQL Add Book Error:", error);
        throw new Error("Failed to add book");
      }
    },

    forgotpassword: async (_, { email }) => {
      try {
        const useremail = await User.findOne({ email });

        if (!useremail) {
          return {
            success: false,
            message: "Email does not exist.",
          };
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpexpiry = new Date(Date.now() + 10 * 60 * 1000);

        useremail.resetPasswordOtp = otp;
        useremail.resetPasswordOtpExpire = otpexpiry;
        await useremail.save();

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "BookVerse - Password Reset OTP",

          html: `
          <div style="
            margin: 0;
            padding: 40px 20px;
            background-color: #f5f5f5;
            font-family: Arial, Helvetica, sans-serif;
          ">

            <div style="
              max-width: 500px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            ">

              <!-- Orange Header -->
              <div style="
                background-color: #f17601;
                padding: 28px 20px;
                text-align: center;
              ">
                <h1 style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 26px;
                  font-weight: bold;
                ">
                  BookVerse
                </h1>

                <p style="
                  margin: 8px 0 0;
                  color: #ffffff;
                  font-size: 14px;
                ">
                  Password Reset
                </p>
              </div>

              <!-- Card Content -->
              <div style="
                padding: 30px;
              ">

                <h2 style="
                  margin: 0 0 15px;
                  color: #222222;
                  font-size: 22px;
                ">
                  Reset Your Password
                </h2>

                <p style="
                  color: #555555;
                  font-size: 15px;
                  line-height: 1.6;
                  margin: 0 0 10px;
                ">
                  Hello <strong>${useremail.name || "User"}</strong>,
                </p>

                <p style="
                  color: #555555;
                  font-size: 15px;
                  line-height: 1.6;
                  margin: 0 0 20px;
                ">
                  We received a request to reset your BookVerse password.
                  Use the OTP below to continue.
                </p>

                <!-- OTP Box -->
                <div style="
                  background-color: #fff4e8;
                  border: 1px solid #ffd4ad;
                  border-radius: 12px;
                  padding: 22px 15px;
                  text-align: center;
                  margin: 25px 0;
                ">

                  <p style="
                    margin: 0 0 10px;
                    color: #777777;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  ">
                    Your OTP
                  </p>

                  <div style="
                    font-size: 34px;
                    font-weight: bold;
                    letter-spacing: 10px;
                    color: #f17601;
                    padding-left: 10px;
                  ">
                    ${otp}
                  </div>

                </div>

                <p style="
                  text-align: center;
                  color: #666666;
                  font-size: 14px;
                  margin: 0 0 25px;
                ">
                  This OTP will expire in
                  <strong style="color:#f17601;">10 minutes</strong>.
                </p>

                <!-- Security Message -->
                <div style="
                  background-color: #fafafa;
                  border-radius: 8px;
                  padding: 15px;
                  margin-bottom: 25px;
                ">
                  <p style="
                    margin: 0;
                    color: #777777;
                    font-size: 13px;
                    line-height: 1.5;
                  ">
                    🔒 If you did not request a password reset, you can safely
                    ignore this email. Your account remains secure.
                  </p>
                </div>

                <p style="
                  color: #555555;
                  font-size: 14px;
                  line-height: 1.5;
                  margin: 0;
                ">
                  Thanks,<br/>
                  <strong style="color:#f17601;">BookVerse Team</strong>
                </p>

              </div>

              <!-- Footer -->
              <div style="
                background-color: #fafafa;
                border-top: 1px solid #eeeeee;
                padding: 15px;
                text-align: center;
              ">
                <p style="
                  margin: 0;
                  color: #999999;
                  font-size: 12px;
                ">
                  © ${new Date().getFullYear()} BookVerse. All rights reserved.
                </p>
              </div>

            </div>

          </div>
        `,
        });

        return {
          success: true,
          message: "OTP sent on your email successfully.",
        };
      } catch (error) {
        console.log("Forgot Password Error:", error);

        return {
          success: false,
          message: error.message || "Something went wrong",
        };
      }
    },
  },
};

module.exports = resolvers;
