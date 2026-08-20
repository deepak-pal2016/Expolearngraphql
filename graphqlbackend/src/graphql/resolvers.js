const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../models/books");
const Genre = require("../models/genre");
const Language = require("../models/language");

const resolvers = {
  Query: {
    genres: async () => {
      return await Genre.find({ isActive: true });
    },
    languages: async () => {
      return await Language.find({ isActive: true });
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
      },
    ) => {
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
          numberOfPages,
          rating,
          tags,
          trending,
          popular,
          coverImage,
        });
        return newBook;
      } catch (error) {
        console.log("GraphQL Add Book Error:", error);
        throw new Error("Failed to add book");
      }
    },
  },
};

module.exports = resolvers;
