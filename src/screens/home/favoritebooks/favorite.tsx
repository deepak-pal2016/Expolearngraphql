
import { useNavigation } from "@react-navigation/native";
import React, { FC, useContext, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
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
import { HomeStackProps } from "src/@types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import favoritebookStyles from "@/styles/favoriteStyles";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constant";
type BookItem = {
  id: string;
  title: string;
  author: string;
  rating: string;
  genre: string;
  summary: string;
  category: "all" | "want" | "wish";
  coverColor: string;
};

const bookData: BookItem[] = [
  {
    id: "1",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: "4.5",
    genre: "Thriller, Mystery",
    summary:
      "A gripping psychological thriller about a woman who stops speaking.",
    category: "all",
    coverColor: "#f3a04b",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    rating: "4.8",
    genre: "Self Help",
    summary: "An easy and proven way to build good habits and break bad ones.",
    category: "want",
    coverColor: "#f6e1c2",
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    rating: "4.7",
    genre: "Fiction, Adventure",
    summary:
      "A timeless story about following your dreams and listening to your heart.",
    category: "all",
    coverColor: "#f4b35f",
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: "4.6",
    genre: "History, Non-fiction",
    summary: "A brief history of humankind from the Stone Age to modern times.",
    category: "wish",
    coverColor: "#f6f2e8",
  },
  {
    id: "5",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: "4.7",
    genre: "Finance, Self Help",
    summary:
      "Lessons on wealth, greed, and happiness from a behavioral finance perspective.",
    category: "all",
    coverColor: "#d1c7f3",
  },
  {
    id: "6",
    title: "Becoming",
    author: "Michelle Obama",
    rating: "4.8",
    genre: "Memoir",
    summary: "A powerful, inspiring memoir from the former First Lady.",
    category: "wish",
    coverColor: "#dbeaf8",
  },
];

const tabs = [
  { key: "all", label: "All Books", count: 12 },
  { key: "want", label: "Want to Read", count: 6 },
  { key: "wish", label: "Wishlisted", count: 6 },
];

type ForgotpasswordNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Favoritebooks"
>;

const Favoritebooks:FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "want" | "wish">("all");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ForgotpasswordNavigationType>();
  const { showLoader, hideLoader } = CommonLoader();
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = favoritebookStyles(currentTheme);

  const filteredBooks = useMemo(
    () =>
      activeTab === "all"
        ? bookData
        : bookData.filter((book) => book.category === activeTab),
    [activeTab],
  );

  const renderBook = ({ item }: { item: BookItem }) => (
    <View style={styles.bookCard}>
      <View
        style={[styles.coverPlaceholder, { backgroundColor: item.coverColor }]}
      >
        <TextView style={styles.coverTextView}>Cover</TextView>
      </View>
      <View style={styles.bookInfo}>
        <View style={styles.bookHeader}>
          <TextView style={styles.bookTitle}>{item.title}</TextView>
          <View style={styles.favoriteDot} />
        </View>
        <TextView style={styles.bookAuthor}>{item.author}</TextView>
        <View style={styles.bookMeta}>
          <TextView style={styles.bookRating}>★ {item.rating}</TextView>
          <TextView style={styles.bookGenre}>{item.genre}</TextView>
        </View>
        <TextView style={styles.bookSummary}>{item.summary}</TextView>
      </View>
    </View>
  );

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
      <View style={styles.header}>
        <View>
          <TextView style={styles.title}>Favorites</TextView>
          <TextView style={styles.subtitle}>
            Your favorite books collection
          </TextView>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.circleButton}>
            <TextView style={styles.actionIcon}>🔍</TextView>
          </Pressable>
          <Pressable style={styles.circleButton}>
            <TextView style={styles.actionIcon}>⚙️</TextView>
          </Pressable>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tabItem, active && styles.tabItemActive]}
              onPress={() => setActiveTab(tab.key as "all" | "want" | "wish")}
            >
              <TextView
                style={[styles.tabLabel, active && styles.tabLabelActive]} >
                {tab.label}
              </TextView>
              <TextView
                style={[styles.tabCount, active && styles.tabCountActive]} >
                ({tab.count})
              </TextView>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.footerCard}>
        <View style={styles.footerTextViewBox}>
          <TextView style={styles.footerTitle}>
            Keep track of your favorite books
          </TextView>
          <TextView style={styles.footerSubtitle}>
            and never lose a great read.
          </TextView>
        </View>
        <Pressable style={styles.footerButton}>
          <TextView style={styles.footerButtonTextView}>
            Explore More Books
          </TextView>
        </Pressable>
      </View>
    </View>
  );
};

export default Favoritebooks;
