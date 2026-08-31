import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackProps } from "src/@types";
import Colors from "@/constant/colors";
import {
  CommonLoader,
  DarkTheme,
  FloatingTextInput,
  Header,
  LightTheme,
  PopularBooks,
  TextView,
  Recommneded,
  TopResults,
} from "@components/index";
import { ThemeContext } from "../../../context/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon, Typography } from "@/constant";
import bookStyles from "@/styles/booksStyles";

type ReadBookscreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "ReadBook"
>;

interface Chapter {
  id: number;
  title: string;
  pages: number;
  locked: boolean;
}

interface ReadBookProps {
  navigation?: any;
  route?: any;
}

const ReadBook: React.FC<ReadBookProps> = ({ navigation, route }) => {
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = bookStyles(currentTheme);
  const [activeTab, setActiveTab] = useState<"chapters" | "bookmarks">(
    "chapters",
  );

  const book = route?.params?.bookcontent || {
    title: "The Midnight Library",
    author: "Matt Haig",
    pages: 320,
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1590093303i/52578297.jpg",
  };

  const handleChapterPress = (chapter: Chapter) => {
    if (chapter.locked) {
      return;
    }

    navigation?.navigate?.("ChapterReading", {
      book,
      chapter,
    });
  };

  const handleContinueReading = () => {
    navigation?.navigate?.("ChapterReading", {
      book,
      chapter: book?.chapters[0],
      page: 3,
    });
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
      <Header showicons={false} title="Chapters" showheader={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.bookInfo}>
          <Image
            source={{ uri: book.coverimage }}
            style={styles.bookCover}
            resizeMode="cover"
          />

          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {book.title}
            </Text>

            <Text style={styles.author}>{book.author}</Text>

            <Text style={styles.pageCount}>{book.pages} pages</Text>
          </View>
        </View>

        {/* ================= TABS ================= */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[
              styles.tab,
              {
                borderColor:
                  activeTab === "chapters"
                    ? Colors.PRIMARY[100]
                    : Colors.FLOATINGINPUT[200],
              },
            ]}
            onPress={() => setActiveTab("chapters")}
          >
            <TextView
              style={[
                styles.tabText,
                activeTab === "chapters" && styles.activeTabText,
              ]}
            >
              Chapters
            </TextView>
          </Pressable>

          <Pressable
            style={[
              styles.tab,
              {
                borderColor:
                  activeTab === "bookmarks"
                    ? Colors.PRIMARY[100]
                    : Colors.FLOATINGINPUT[200],
              },
            ]}
            onPress={() => setActiveTab("bookmarks")}
          >
            <TextView
              style={[
                styles.tabText,
                activeTab === "bookmarks" && styles.activeTabText,
              ]}
            >
              Bookmarks
            </TextView>
          </Pressable>
        </View>

        <View style={styles.tabLineContainer}>
          <View
            style={[
              styles.activeLine,
              activeTab === "bookmarks" && styles.bookmarkActiveLine,
            ]}
          />
        </View>

        {activeTab === "chapters" ? (
          <View style={styles.chapterList}>
            {book?.chapters?.map((chapter: any, index: any) => (
              <Pressable
                key={index}
                onPress={() => handleChapterPress(chapter)}
                style={({ pressed }) => [
                  styles.chapterCard,
                  chapter._id === 1 && styles.activeChapterCard,
                  pressed && styles.pressedCard,
                ]}
              >
                <View style={styles.chapterContent}>
                  <TextView
                    style={[
                      styles.chapterTitle,
                      chapter._id === 1 && styles.activeChapterTitle,
                    ]}
                  >
                    {index + 1}. {chapter.title}
                  </TextView>

                  <TextView
                    style={[
                      styles.chapterPages,
                      chapter.id === 1 && styles.activeChapterPages,
                    ]}
                  >
                    {chapter.pages} pages
                  </TextView>
                </View>

                {/* Right Icon */}
                <View style={styles.chapterIconContainer}>
                  {chapter.locked ? (
                    <Icon
                      family="Ionicons"
                      name="lock-closed-outline"
                      size={21}
                      color="#5B5B66"
                    />
                  ) : (
                    <View style={styles.playCircle}>
                      <Icon
                        family="Ionicons"
                        name="play"
                        size={13}
                        color={Colors.PRIMARY[100]}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          /* ================= BOOKMARKS ================= */
          <View style={styles.emptyBookmark}>
            <View style={styles.bookmarkIconCircle}>
              <Ionicons name="bookmark-outline" size={30} color="#5A35E8" />
            </View>

            <Text style={styles.bookmarkTitle}>No Bookmarks Yet</Text>

            <Text style={styles.bookmarkDescription}>
              Your bookmarked pages will appear here.
            </Text>
          </View>
        )}

        {/* ================= CONTINUE BUTTON ================= */}
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleContinueReading}
        >
          <Text style={styles.continueText}>Continue Reading</Text>
        </Pressable>

        {/* ================= PROGRESS ================= */}
        <Text style={styles.progressText}>Chapter 1&nbsp; • &nbsp;Page 3</Text>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default ReadBook;
