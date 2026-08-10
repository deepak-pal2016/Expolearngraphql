import React, { FC, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackProps } from "src/@types";
import bookstyles from "../../../styles/booksStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@constant/dimentions";
import {
  CommonLoader,
  DarkTheme,
  FloatingTextInput,
  Header,
  LightTheme,
  PopularBooks,
  TextView,
  Recommneded,
} from "@components/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Icon } from "@/constant/index";
import { ThemeContext } from "@/context/themeContext";

type MybooksNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Mybooks"
>;

const PRIMARY = "#6C3DF5";
const ORANGE = "#F07401";
const TEXT = "#111827";
const SUBTEXT = "#6B7280";
const BORDER = "#E5E7EB";

interface Book {
  id: string;
  title: string;
  author: string;
  rating: string;
  progress: number;
  image: string;
}

const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: "4.5",
    progress: 60,
    image: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    rating: "4.6",
    progress: 80,
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: "3",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: "4.5",
    progress: 20,
    image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
   {
    id: "4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: "4.5",
    progress: 20,
    image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
   {
    id: "5",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: "4.5",
    progress: 20,
    image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
];

const MyBooks: FC = () => {
  const [selectedTab, setSelectedTab] = useState("Currently Reading");
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = bookstyles(currentTheme);

  const tabs = ["Currently Reading", "Completed", "Want to Read"];

  const renderBook = (book: Book) => {
    return (
      <TouchableOpacity
        key={book.id}
        activeOpacity={0.9}
        style={styles.bookCard}
      >
        {/* Book Image */}
        <Image
          source={{ uri: book.image }}
          style={styles.bookImage}
          resizeMode="cover"
        />

        {/* Book Details */}
        <View style={styles.bookDetails}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <TextView style={styles.bookTitle} numberOfLines={2}>
                {book.title}
              </TextView>
              <TextView style={styles.author}>{book.author}</TextView>
            </View>

            <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
              <Icon family='FontAwesome' name="ellipsis-v" size={18} color={TEXT} />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingRow}>
            <Icon family='FontAwesome' name="star" size={15} color={Colors.PRIMARY[100]} />
            <TextView style={styles.rating}>{book.rating}</TextView>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${book.progress}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.progressText}>{book.progress}%</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.continueButton}>
            <Text style={styles.continueText}>Continue Reading</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor:
            theme === "dark" ? currentTheme?.background : Colors.PRIMARY[700],
        },
      ]}
    >
      {/* Header */}
     <Header showheader={false}  screenname="My Books" />

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => {
          const active = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, active && styles.activeTab]}
            >
              <TextView style={[styles.tabText, active && styles.activeTabText]}>
                {tab}
              </TextView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Books */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksContainer}>
        {selectedTab === "Currently Reading" && books.map(renderBook)}
        {selectedTab === "Completed" && (
          <View style={styles.emptyContainer}>
            <Icon family="FontAwesome" name="book" size={45} color="#D1D5DB" />
            <TextView style={styles.emptyTitle}>No completed books</TextView>

            <TextView style={styles.emptyText}>
              Your completed books will appear here.
            </TextView>
          </View>
        )}

        {selectedTab === "Want to Read" && (
          <View style={styles.emptyContainer}>
            <FontAwesome name="heart-o" size={45} color="#D1D5DB" />

            <TextView style={styles.emptyTitle}>No books yet</TextView>

            <TextView style={styles.emptyText}>
              Add books that you want to read.
            </TextView>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity activeOpacity={0.8} style={styles.floatingButton}>
        <FontAwesome name="plus" size={22} color={Colors.SECONDARY[100]} />
      </TouchableOpacity>

    </View>
  );
};

export default MyBooks;
