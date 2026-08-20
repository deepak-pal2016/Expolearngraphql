import { cardShadow, Colors } from "@/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    margin: 0,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  loaderView: {
    width: 50,
    height: 50,
    backgroundColor: Colors.SECONDARY[100],
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...cardShadow,
  },
});

export default styles;
