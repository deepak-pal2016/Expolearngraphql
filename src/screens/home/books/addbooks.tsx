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

type AddBookdNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  "Addbooks"
>;

const Addbooks: FC = () => {
  const [trending, setTrending] = useState(false);
  const [popular, setPopular] = useState(false);
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
      console.log(response.assets[0], "response.assets[0]");
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
      setShowAttachmentModal(false);
      setSelectedFile(response.assets[0]);
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
  const insets = useSafeAreaInsets();
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
          <TouchableOpacity onPress={()=> openCamera()} style={styles.coverUpload}>
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

          {/* ================= FORM ================= */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_email}
                style={{ width: wp(80), elevation: 0 }}
                label={"Ttile"}
                placeholder="Enter book title"
                //  value={values.email}
                //  error={errors.email}
                //  touched={touched.email}
                // onChangeText={(text: any) =>
                // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                // }
              />
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_user}
                style={{ width: wp(80), elevation: 0 }}
                label={"Author"}
                placeholder="Enter author name"
                //  value={values.email}
                //  error={errors.email}
                //  touched={touched.email}
                // onChangeText={(text: any) =>
                // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                // }
              />
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_description}
                style={{ width: wp(80), elevation: 0 }}
                label={"Description"}
                placeholder="Enter book description"
                //  value={values.email}
                //  error={errors.email}
                //  touched={touched.email}
                // onChangeText={(text: any) =>
                // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                // }
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
                    value={setSelectedGenre}
                    dropDownLable="Genre"
                    setValue={setSelectedGenre}
                    leftIcon={Images.ic_description}
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
                    placeholder="choose otpions"
                    dropDownLable="Language"
                    items={langOptions}
                    value={setSelectedGenre}
                    leftIcon={Images.ic_description}
                    setValue={setSelectedGenre}
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
                    //  value={values.email}
                    //  error={errors.email}
                    //  touched={touched.email}
                    // onChangeText={(text: any) =>
                    // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                    // }
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
                    //  value={values.email}
                    //  error={errors.email}
                    //  touched={touched.email}
                    // onChangeText={(text: any) =>
                    // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                    // }
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
                    label={"Published Date"}
                    placeholder="Enter isbn"
                    //  value={values.email}
                    //  error={errors.email}
                    //  touched={touched.email}
                    // onChangeText={(text: any) =>
                    // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                    // }
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
                    //  value={values.email}
                    //  error={errors.email}
                    //  touched={touched.email}
                    // onChangeText={(text: any) =>
                    // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                    // }
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
                      onPress={() => setRating(item)}
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
            </View>

            <View style={styles.inputWrapper}>
              <FloatingTextInput
                lefticon={Images.ic_email}
                style={{ width: wp(80), elevation: 0 }}
                label={"Tags/Keywords"}
                placeholder="Enter tags separated by commas"
                //  value={values.email}
                //  error={errors.email}
                //  touched={touched.email}
                // onChangeText={(text: any) =>
                // setFieldValue("email", text.replace(/\s/g, "").toLowerCase())
                // }
              />
            </View>

            {/* ================= SWITCHES ================= */}
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
                  value={trending}
                  onValueChange={setTrending}
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
                  value={popular}
                  onValueChange={setPopular}
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
              onPress={() => console.log("===")}
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
