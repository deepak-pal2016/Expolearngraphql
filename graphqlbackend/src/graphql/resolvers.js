const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../models/books");
const Genre = require("../models/genre");
const Language = require("../models/language");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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
  },
  Mutation: {
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

        const resetToken = crypto.randomBytes(32).toString("hex");

        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

        useremail.resetPasswordToken = resetToken;
        useremail.resetPasswordExpire = resetTokenExpiry;
        await useremail.save();

        const resetlink = `https://unenvied-purge-freight.ngrok-free.dev/reset-password?token=${resetToken}`;
        console.log("RESET LINK:", resetlink);
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS EXISTS:", process.env.EMAIL_PASS);
        console.log("Sending mail to:", email);
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "BookVerse - Reset Your Password",
          html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Reset Your BookVerse Password</h2>

          <p>Hello ${useremail.name || "User"},</p>

          <p>
            We received a request to reset your BookVerse password.
          </p>

          <p>
            Click the button below to reset your password:
          </p>

          <a
            href="${resetlink}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#000;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>

          <p>
            This link will expire in 15 minutes.
          </p>

          <p>
            If you did not request a password reset, you can safely ignore
            this email.
          </p>

          <p>Thanks,<br/>BookVerse Team</p>
        </div>
      `,
        });

        return {
          success: true,
          message: "Password reset link sent successfully.",
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
