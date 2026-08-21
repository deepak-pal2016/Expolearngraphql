import React, { FC, useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomeStackProps } from "@/@types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  CustomDropdown,
  Button,
  DatePickerComponent,
} from "@components/index";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors, Icon, Images, Typography } from "@/constant/index";
import { ThemeContext } from "@/context/themeContext";
import { useGenreStore } from "@/store/genresStore";
import * as ImagePicker from "expo-image-picker";
import { useLanguageStore } from "@/store/languagesStore";
import { showError } from "@/components/Flashmessge";
import { useFormik } from "formik";
import { AddbookvaliationSchema } from "@/helpers/validations";
import { useBookStore } from "@/store/booksStore";

type AddBookdNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Addbooks"
>;

const Addbooks: FC = () => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const { showLoader, hideLoader } = CommonLoader();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const { theme, themetoggle } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const styles = bookstyles(currentTheme);
  const genres = useGenreStore((state) => state.genres);
  const languages = useLanguageStore((state) => state.languages);
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [publishedDate, setPublishedDate] = useState(new Date());
  const { addBook, loading } = useBookStore();

  const genreOptions = genres.map((genre) => ({
    label: String(genre?.name ?? ""),
    value: String(genre?.value ?? ""),
  }));

  const langOptions = languages?.map((lang) => ({
    label: String(lang?.name ?? ""),
    value: String(lang?.value ?? ""),
  }));

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickGallery = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (response.canceled || !response.assets?.length) return;
      setSelectedFile(response.assets[0]);
      setFieldValue("coverImage", response.assets[0]);
      setCoverImage(response.assets[0].uri);
    } catch (error: any) {
      setShowAttachmentModal(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while adding the task";
      showError(errorMessage);
    } finally {
      hideLoader();
    }
  };

  const openCamera = async () => {
    try {
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) {
        console.log("Camera permission denied");
        return;
      }

      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (response.canceled || !response.assets?.length) {
        return;
      }

      const image = response.assets[0];

      setShowAttachmentModal(false);

      setSelectedFile(image);

      // Formik value
      setFieldValue("coverimg", image);

      // Image UI ke liye
      setCoverImage(image.uri);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while adding the task";

      showError(errorMessage);
    } finally {
      hideLoader();
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      validationSchema: AddbookvaliationSchema,
      initialValues: {
        initialValues: {
          coverImage: null,
          title: "",
          author: "",
          description: "",
          genre: "",
          language: "",
          isbn: "",
          publisher: "",
          numberOfPages: "",
          rating: "",
          publishedDate: null,
          tags: "",
          trending: false,
          popular: false,
        },
      },
      onSubmit: async (datas: any) => {
         console.log("FORM SUBMIT DATA:", datas);
        try {
          showLoader();
          const response = await addBook({
            title: datas.title,
            author: datas.author,
            description: datas.description,
            genre: datas.genre,
            language: datas.language || null,
            isbn: datas.isbn || null,
            publisher: datas.publisher || null,
            publishedDate: datas.publishedDate
              ? new Date(datas.publishedDate).toISOString()
              : null,
            numberOfPages: datas.numberOfPages
              ? Number(datas.numberOfPages)
              : null,
            rating: Number(datas.rating),
            tags: datas.tags
              ? datas.tags
                  .split(",")
                  .map((tag: string) => tag.trim())
                  .filter(Boolean)
              : [],
            trending: datas.trending,
            popular: datas.popular,
            coverImage: datas.coverImage,
          });
          console.log(response, "response");
        } catch (error: any) {
          console.log("ADD BOOK ERROR:", error);
          showError(error?.message || "Book add failed");
        } finally {
          hideLoader();
        }
      },
    });

  const renderInput = (
    label: string,
    placeholder: string,
    icon: keyof typeof Ionicons.glyphMap,
    rightIcon?: keyof typeof Ionicons.glyphMap,
  ) => {
    return (
      <View style={styles.inputGroup}>
        <TextView style={styles.label}>{label}</TextView>

        <View style={styles.inputContainer}>
          <Icon
            family="Ionicons"
            name={icon}
            size={21}
            style={styles.inputIcon}
          />

          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#8992A5"
            style={styles.input}
          />

          {rightIcon && (
            <Icon
              family="Ionicons"
              name={rightIcon}
              size={22}
              style={styles.rightIcon}
            />
          )}
        </View>
      </View>
    );
  };

  function setSelectedGenre(value: any): void {
    throw new Error("Function not implemented.");
  }

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
      <Header showheader={true} title="Add New Book" />
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableOpacity onPress={openCamera} style={styles.coverUpload}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.coverImage} />
            ) : (
              <>
                <View style={styles.imagePlaceholder}>
                  <Icon
                    family="Ionicons"
                    name="image-outline"
                    size={55}
                    color="#344057"
                  />

                  <View style={styles.cameraButton}>
                    <Icon
                      family="Ionicons"
                      name="camera"
                      size={24}
                      color={Colors.SECONDARY[100]}
                    />
                  </View>
                </View>

                <TextView style={styles.uploadTitle}>
                  Upload Book Cover
                </TextView>

                <TextView style={styles.uploadSubTitle}>
                  JPG, PNG up to 5MB
                </TextView>
              </>
            )}
          </TouchableOpacity>

          {touched.coverImage && errors.coverImage && (
            <TextView
              style={{
                color: Colors.ERROR[100],
                bottom: 10,
                alignSelf: "center",
              }}
            >
              {errors.coverImage}
            </TextView>
          )}

          {/* ================= FORM ================= */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_email}
                style={{ width: wp(80), elevation: 0 }}
                label={"Title"}
                placeholder="Enter book title"
                value={values.title}
                error={errors.title}
                touched={touched.title}
                onChangeText={(text: any) => setFieldValue("title", text)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_user}
                style={{ width: wp(80), elevation: 0 }}
                label={"Author"}
                placeholder="Enter author name"
                value={values.author}
                error={errors.author}
                touched={touched.author}
                onChangeText={(text: any) => setFieldValue("author", text)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_description}
                style={{ width: wp(80), elevation: 0 }}
                label={"Description"}
                placeholder="Enter book description"
                value={values.description}
                error={errors.description}
                touched={touched.description}
                onChangeText={(text: any) => setFieldValue("description", text)}
              />
            </View>
            <View
              style={{
                width: wp(90),
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignSelf: "center",
                padding: hp(1),
              }}
            >
              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <View style={{ alignSelf: "flex-start", bottom: hp(4) }}>
                  <CustomDropdown
                    style={{ width: wp(38) }}
                    placeholder="Choose options"
                    items={genreOptions}
                    value={values.genre}
                    dropDownLable="Genre"
                    setValue={(value: any) => setFieldValue("genre", value)}
                    leftIcon={Images.ic_description}
                    error={
                      typeof errors.genre === "string"
                        ? errors.genre
                        : undefined
                    }
                    touched={touched.genre}
                  />
                </View>
              </View>

              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <View style={{ alignSelf: "flex-start", bottom: hp(4) }}>
                  <CustomDropdown
                    style={{ width: wp(38) }}
                    placeholder="Choose options"
                    dropDownLable="Language"
                    items={langOptions}
                    value={values.language}
                    setValue={(value: any) => setFieldValue("language", value)}
                    leftIcon={Images.ic_description}
                    error={
                      typeof errors.language === "string"
                        ? errors.language
                        : undefined
                    }
                    touched={touched.language}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp(90),
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignSelf: "center",
                padding: hp(0),
              }}
            >
              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <View style={{ alignSelf: "flex-start", bottom: hp(4) }}>
                  <FloatingTextInput
                    lefticon={Images.ic_email}
                    style={{ width: wp(38), elevation: 0 }}
                    label={"ISBN"}
                    placeholder="Enter isbn"
                    value={values.isbn}
                    error={errors.isbn}
                    touched={touched.isbn}
                    onChangeText={(text: any) => setFieldValue("isbn", text)}
                  />
                </View>
              </View>

              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <View style={{ alignSelf: "flex-start", bottom: hp(4) }}>
                  <FloatingTextInput
                    lefticon={Images.ic_email}
                    style={{ width: wp(38), elevation: 0 }}
                    label={"Publisher"}
                    placeholder="Enter publisher"
                    value={values.publisher}
                    error={errors.publisher}
                    touched={touched.publisher}
                    onChangeText={(text: any) =>
                      setFieldValue("publisher", text)
                    }
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp(90),
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignSelf: "center",
                padding: hp(0),
              }}
            >
              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <View style={{ alignSelf: "flex-start", bottom: hp(4) }}>
                  <DatePickerComponent
                    label="Published Date"
                    value={publishedDate}
                    onChange={(date: Date) => {
                      setPublishedDate(date);
                      setFieldValue("publishedDate", date, true);
                    }}
                    width={wp(38)}
                    error={
                      typeof errors.publishedDate === "string"
                        ? errors.publishedDate
                        : undefined
                    }
                  />
                </View>
              </View>

              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <View style={{ alignSelf: "flex-start", bottom: hp(4) }}>
                  <FloatingTextInput
                    lefticon={Images.ic_email}
                    style={{ width: wp(38), elevation: 0 }}
                    label={"Number of pages"}
                    placeholder="Enter pages no."
                    keyboardType="numeric"
                    value={values.numberOfPages}
                    error={errors.numberOfPages}
                    touched={touched.numberOfPages}
                    onChangeText={(text: any) =>
                      setFieldValue("numberOfPages", text)
                    }
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <TextView style={styles.label}>Rating (0 - 5)</TextView>

              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setRating(item);
                        setFieldValue("rating", String(item));
                      }}
                    >
                      <Icon
                        family="Ionicons"
                        name={item <= rating ? "star" : "star-outline"}
                        size={26}
                        color={item <= rating ? "#F07401" : "#B9C0CC"}
                        style={styles.star}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <TextView style={styles.ratingText}>
                  {rating.toFixed(1)}
                </TextView>
              </View>

              {touched.rating && errors.rating && (
                <TextView
                  style={{
                    color: Colors.ERROR[100],
                    marginTop: 3,
                    ...Typography.BodyRegular12,
                  }}
                >
                  {errors.rating}
                </TextView>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_email}
                style={{ width: wp(80), elevation: 0 }}
                label={"Tags/Keywords"}
                placeholder="Enter tags separated by commas"
                value={values.tags}
                error={errors.tags}
                touched={touched.tags}
                onChangeText={(text: any) =>
                  setFieldValue("tags", text.replace(/\s/g, "").toLowerCase())
                }
              />
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchBox}>
                <View style={styles.switchLeft}>
                  <Icon
                    family="Ionicons"
                    name="flame-outline"
                    size={16}
                    color="#F07401"
                  />

                  <TextView style={styles.switchText}>Trending</TextView>
                </View>

                <Switch
                  value={values.trending}
                  //@ts-ignore
                  onValueChange={(value) => setFieldValue("trending", value)}
                  trackColor={{
                    false: "#D9DDE5",
                    true: Colors.PRIMARY[100],
                  }}
                  thumbColor={Colors.SECONDARY[100]}
                />
              </View>

              <View style={styles.switchBox}>
                <View style={styles.switchLeft}>
                  <Icon
                    family="Ionicons"
                    name="star-outline"
                    size={16}
                    color="#F07401"
                  />

                  <TextView style={styles.switchText}>Popular</TextView>
                </View>

                <Switch
                  value={values.popular}
                  //@ts-ignore
                  onValueChange={(value) => setFieldValue("popular", value)}
                  trackColor={{
                    false: "#D9DDE5",
                    true: Colors.PRIMARY[100],
                  }}
                  thumbColor={Colors.SECONDARY[100]}
                />
              </View>
            </View>

            <Button
              style={{ marginTop: hp(1), width: wp(89), alignSelf: "center" }}
              onPress={handleSubmit}
              titleStyle={{
                color: Colors.SECONDARY[100],
                ...Typography.BodyBold14,
              }}
              title={"Submit"}
              gradientColors={[
                Colors.PRIMARY[100],
                Colors.PRIMARY[100],
                // Colors.PRIMARY[300],
              ]}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Addbooks;
