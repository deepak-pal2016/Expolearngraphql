import React, { FC, useContext, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackProps } from "src/@types";

import bookstyles from "../../../styles/booksStyles";

import { DarkTheme, Header, LightTheme, TextView } from "@components/index";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Icon } from "@/constant/index";
import { ThemeContext } from "@/context/themeContext";
import { useNavigation } from "@react-navigation/native";

import { useFetchbookstore } from "@/zustand/store/booksStore";

type MybooksNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Mybooks"
>;

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  coverimage: string;
  progress?: number;
}

const MyBooks: FC = () => {
  const [selectedTab, setSelectedTab] = useState("Currently Reading");
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = bookstyles(currentTheme);
  const navigation = useNavigation<MybooksNavigationType>();
  const insets = useSafeAreaInsets();
  const tabs = ["Currently Reading", "Completed", "Want to Read"];
  const books = useFetchbookstore((state) => state.books);

  const renderBook = ({ item }: { item: Book }) => {
    return (
      <TouchableOpacity activeOpacity={0.92} style={styles.bookCard}>
        <Image
          source={{
            uri: item.coverimage,
          }}
          style={styles.bookImage}
          resizeMode="cover"
        />

        <View style={styles.bookDetails}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <TextView style={styles.bookTitle} numberOfLines={2}>
                {item.title}
              </TextView>
              <TextView style={styles.author} numberOfLines={1}>
                by {item.author}
              </TextView>
            </View>

            <View style={styles.ratingBox}>
              <Icon
                family="FontAwesome"
                name="star"
                size={13}
                color={Colors.PRIMARY[100]}
              />

              <TextView style={styles.rating}>{item.rating}</TextView>
            </View>
          </View>
          <TextView style={styles.description} numberOfLines={2}>
            {item.description}
          </TextView>
          <View style={styles.progressRow}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.progress ?? 0}%`,
                  },
                ]}
              />
            </View>

            <TextView style={styles.progressText}>
              {item.progress ?? 0}%
            </TextView>
          </View>

          {/* ================= CONTINUE BUTTON ================= */}

          <TouchableOpacity activeOpacity={0.85} style={styles.continueButton}>
            <TextView style={styles.continueText}>Continue Reading</TextView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
      {/* ================= HEADER ================= */}

      <Header showheader={false} showicons={false} screenname="My Books" />

      {/* ================= TABS ================= */}

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
              <TextView
                style={[styles.tabText, active && styles.activeTabText]}
              >
                {tab}
              </TextView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ================= CURRENTLY READING ================= */}

      {selectedTab === "Currently Reading" && (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.booksContainer,
            {
              paddingBottom: 120,
            },
          ]}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon
                family="FontAwesome"
                name="book"
                size={45}
                color="#D1D5DB"
              />

              <TextView style={styles.emptyTitle}>No books available</TextView>

              <TextView style={styles.emptyText}>
                Your books will appear here.
              </TextView>
            </View>
          }
        />
      )}

      {/* ================= COMPLETED ================= */}

      {selectedTab === "Completed" && (
        <View style={styles.emptyContainer}>
          <Icon family="FontAwesome" name="book" size={45} color="#D1D5DB" />

          <TextView style={styles.emptyTitle}>No completed books</TextView>

          <TextView style={styles.emptyText}>
            Your completed books will appear here.
          </TextView>
        </View>
      )}

      {/* ================= WANT TO READ ================= */}

      {selectedTab === "Want to Read" && (
        <View style={styles.emptyContainer}>
          <FontAwesome name="heart-o" size={45} color="#D1D5DB" />

          <TextView style={styles.emptyTitle}>No books yet</TextView>

          <TextView style={styles.emptyText}>
            Add books that you want to read.
          </TextView>
        </View>
      )}

      {/* ================= ADD BOOK ================= */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Addbooks")}
        activeOpacity={0.8}
        style={styles.floatingButton}
      >
        <FontAwesome name="plus" size={22} color={Colors.SECONDARY[100]} />
      </TouchableOpacity>
    </View>
  );
};

export default MyBooks;
