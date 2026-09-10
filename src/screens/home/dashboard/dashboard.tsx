/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackProps } from "src/@types";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dashboardstyle from "../../../styles/dashboardStyles";
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
import { Colors, Icon, Typography, Images } from "@constant/index";
import { cardShadow } from "@constant/index";
import { ThemeContext } from "../../../context/themeContext";
import { LocalStorage } from "@helpers/localstorage";
import { UsePagination } from "../../../hooks/usepagination";
import { showError, showMessages, showSuccess } from "@components/Flashmessge";
import useAuthStore from "@/zustand/store/authStore";
import {
  GET_BOOKS,
  GET_GENRES,
  GET_LANGUAGES,
  SEARCH_BOOK,
} from "@/services/queries/queriesservice";
import { useLazyQuery, useQuery } from "@apollo/client/react";
import { useGenreStore } from "@/zustand/store/genresStore";
import { useLanguageStore } from "@/zustand/store/languagesStore";
import { Book, useFetchbookstore } from "@/zustand/store/booksStore";
import bookstyles from "../../../styles/booksStyles";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

type DashboardscreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Dashboard"
>;

type GenresQueryData = {
  genres: unknown[];
};

type LanguagesQueryData = {
  languages: unknown[];
};

type BooksQueryData = {
  books: unknown[];
};

type SearchQueryData = {
  searchBooks: Book[];
};

const Dashboard: FC = () => {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { showLoader, hideLoader } = CommonLoader();
  const navigation = useNavigation<DashboardscreenNavigationType>();
  const { theme, themetoggle } = useContext(ThemeContext);
  const [selectcatid, setSelectCatId] = useState<number>(0);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = dashboardstyle(currentTheme);
  const bookstyle = bookstyles(currentTheme);
  const user = useAuthStore((state) => state.user);
  const {
    data: genreData,
    loading: genderloading,
    error: genreerror,
  } = useQuery<GenresQueryData>(GET_GENRES);
  const {
    data: ldata,
    loading: lloading,
    error: lerror,
  } = useQuery<LanguagesQueryData>(GET_LANGUAGES);
  const setGenres = useGenreStore((state) => state.setGenres);
  const setLanguages = useLanguageStore((state) => state.setLanguages);
  const {
    data: bdata,
    loading: bloading,
    error: berror,
  } = useQuery<BooksQueryData>(GET_BOOKS);
  const setBooks = useFetchbookstore((state) => state.setBooks);
  const [searchtext, setSearchText] = useState<String>("");
  const [searchBooks, { data: searchData, loading: searchLoading }] =
    useLazyQuery<SearchQueryData>(SEARCH_BOOK);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchtext.trim().length > 1) {
        searchBooks({ variables: { query: searchtext.trim() } });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchtext]);

  useEffect(() => {
    try {
      showLoader();
      if (bdata?.books) {
        setBooks(bdata.books as Parameters<typeof setBooks>[0]);
      }
      if (genreData?.genres) {
        setGenres(genreData.genres as Parameters<typeof setGenres>[0]);
      }
      if (ldata?.languages) {
        setLanguages(ldata.languages as Parameters<typeof setLanguages>[0]);
      }
      if (genreData?.genres && ldata?.languages) {
        hideLoader();
      }
    } catch (error) {
    } finally {
      hideLoader();
    }
  }, [bdata, genreData, ldata, setBooks, setGenres, setLanguages]);

  const books = (bdata?.books ?? []) as Parameters<typeof setBooks>[0];
  const isPopularbooks = books.filter((item) => item?.isPopular === true);
  const isrecomnedbooks = books.filter((item) => item?.isPopular !== true);
  const searchdatas: any = searchData?.searchBooks || [];

  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech error:", event.error);
    console.log("Speech message:", event.message);
  });

  useSpeechRecognitionEvent("result", (event) => {
    const text = event.results[0]?.transcript;

    if (text) {
      console.log("Voice text:", text);
      setSearchText(text);
    }
  });

  const handleStart = async () => {
    const result: any =
      await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      showMessages(`Permission not granted ${result}`);
      return;
    }
    showMessages("Please speak start..");
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
    });
  };

  const renderBook = ({ item }: { item: Book }) => {
    return (
      <TouchableOpacity activeOpacity={0.92} style={bookstyle.bookCard}>
        <Image
          source={{
            uri: item.coverimage,
          }}
          style={bookstyle.bookImage}
          resizeMode="cover"
        />

        <View style={bookstyle.bookDetails}>
          <View style={bookstyle.titleRow}>
            <View style={bookstyle.titleContainer}>
              <TextView style={bookstyle.bookTitle} numberOfLines={2}>
                {item.title}
              </TextView>
              <TextView style={bookstyle.author} numberOfLines={1}>
                by {item.author}
              </TextView>
            </View>

            <View style={bookstyle.ratingBox}>
              <Icon
                family="FontAwesome"
                name="star"
                size={13}
                color={Colors.PRIMARY[100]}
              />

              <TextView style={bookstyle.rating}>{item.rating}</TextView>
            </View>
          </View>
          <TextView style={bookstyle.description} numberOfLines={2}>
            {item?.description?.length > 90
              ? `${item.description.slice(0, 90)}....`
              : item?.description}
          </TextView>
          <View style={bookstyle.progressRow}>
            <View style={bookstyle.progressBackground}>
              <View
                style={[
                  bookstyle.progressFill,
                  {
                    width: `${item.progress ?? 0}%`,
                  },
                ]}
              />
            </View>

            <TextView style={bookstyle.progressText}>
              {item.progress ?? 0}%
            </TextView>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Bookdetails", { itemdetails: item })
            }
            activeOpacity={0.85}
            style={bookstyle.continueButton}
          >
            <TextView style={bookstyle.continueText}>Continue Reading</TextView>
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
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(5),
          flexGrow: 1,
        }}
      > */}
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            justifyContent: "space-between",
            // paddingLeft: hp(2),
            flexDirection: "row",
            padding: hp(3),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TextView style={styles.greeings}>
              Hello, {`${user?.name}`}
            </TextView>
            <Image source={Images.ic_hi} style={styles.hiimg} />
          </View>
          <View style={{}}>
            <Icon name="bell" family="EvilIcons" size={30} color="black" />
          </View>
        </View>
        <View style={{ padding: hp(3), bottom: hp(5.5) }}>
          <TextView
            style={{
              color: Colors.SECONDARY[500],
              ...Typography.BodyRegular12,
              lineHeight: hp(1.8),
            }}
          >
            Let's continue your {"\n"}reading journey
          </TextView>
        </View>
        <View style={{ alignSelf: "center", bottom: hp(8) }}>
          <FloatingTextInput
          //@ts-ignore
            value={searchtext}
            lefticon={Images.ic_search}
            style={{ width: wp(88), backgroundColor: Colors.PRIMARY[400] }}
            placeholder="Search books, authors and genre.."
            onChangeText={(text) => {
              setSearchText(text);
              if (text.trim().length === 0) {
                setSearchText("");
              }
            }}
            righticon={Images.ic_mic}
            onPress={handleStart}
          />
        </View>

        {searchtext.trim().length > 0 && searchdatas.length > 0 ? (
          <View style={{ flex: 0 }}>
            <FlatList
              data={searchdatas}
              renderItem={renderBook}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                bookstyle.booksContainer,
                {
                  paddingBottom: 120,
                },
              ]}
              ListEmptyComponent={
                <View style={bookstyle.emptyContainer}>
                  <Icon
                    family="FontAwesome"
                    name="book"
                    size={45}
                    color="#D1D5DB"
                  />

                  <TextView style={bookstyle.emptyTitle}>
                    No books available
                  </TextView>

                  <TextView style={bookstyle.emptyText}>
                    Your books will appear here.
                  </TextView>
                </View>
              }
            />
          </View>
        ) : (
          <View>
            <View style={{ flexDirection: "column", bottom: hp(5) }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: hp(3),
                }}
              >
                <TextView
                  style={{
                    color: Colors.SECONDARY[200],
                    ...Typography.BodyBold15,
                  }}
                >
                  Categories
                </TextView>
                <TextView
                  style={{
                    color: Colors.PRIMARY[100],
                    ...Typography.BodyBold13,
                  }}
                >
                  View All
                </TextView>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  top: hp(2),
                }}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: wp(5),
                    alignItems: "center",
                  }}
                >
                  {genreData?.genres?.map((item: any, index: number) => (
                    <Pressable
                      key={index}
                      onPress={() => setSelectCatId(index)}
                      style={{
                        paddingHorizontal: wp(4),
                        paddingVertical: hp(0.8),
                        borderRadius: hp(2),
                        backgroundColor:
                          index === selectcatid
                            ? Colors.PRIMARY[100]
                            : Colors.PRIMARY[400],
                        marginRight: wp(2),
                        // ...cardShadow,
                      }}
                    >
                      <TextView
                        style={{
                          ...Typography.Caption12,
                          letterSpacing: 0.4,
                          color:
                            index === selectcatid
                              ? Colors.SECONDARY[100]
                              : Colors.SECONDARY[200],
                        }}
                      >
                        {item.name}
                      </TextView>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>
            <PopularBooks
              books={isPopularbooks}
              onViewAll={() => navigation.navigate("mybooks")}
            />
            <Recommneded books={isrecomnedbooks} />
          </View>
        )}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Dashboard;
