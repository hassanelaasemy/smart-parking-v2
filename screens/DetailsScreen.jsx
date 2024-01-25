import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Swiper from "react-native-swiper";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import ButtonSm from "../components/ButtonSm";
import { COLORS, FONTS, IMAGES } from "../constants/theme";
import parkingimg from "../assets/imagesI/parking3.jpg";
import profile from "../assets/imagesI/user.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Icon } from "react-native-elements";
const DetailsScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const itemImages = [
    parkingimg,
    parkingimg,
    parkingimg,
    parkingimg,
    parkingimg,
  ];
  const { id, parkdata } = route.params;
  const { image, title, address, price } = parkdata;
  const [park, setPark] = useState({});
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getParkByid()
  }, [])
//   ---GET PARKING BY ID:
  const getParkByid = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .get(`http://192.168.11.105:8080/v2/parking/byid/${id}/about`, {
            headers: {
              Authorization: `Bearer ${accees ? accees : ""}`,
            },
          })
          .then((response) => {
            setPark(response.data);
            console.log(response.data.description);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch();
  };

//   GET PARKING SERVICE :
getServicesParkByid = () => {
    axios
      .get(`http://192.168.11.105:8080/v2/parking/byid/${id}/services`)
      .then((resopnse) => {
        setOptions(resopnse.data.options)
        setPark(resopnse.data);
        setLoading(false);
      })
      .catch((err) => {
      });
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <ScrollView
        showsVerticalScrollIndicator={false}>
          <View>
            {itemImages.length > 0 && (
              <Swiper
                dotColor={"rgba(255,255,255,.15)"}
                activeDotColor={"rgba(255,255,255,1)"}
                style={{
                  height: 300,
                }}
              >
                {itemImages.map((data, index) => {
                  return (
                    <View key={index}>
                      <Image
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        source={data}
                      />
                    </View>
                  );
                })}
              </Swiper>
            )}
            <View style={styles.headerArea}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.headBtn}
              >
                <FeatherIcon
                  style={{ right: 1 }}
                  color={COLORS.second}
                  size={26}
                  name="chevron-left"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headBtn}>
                <FeatherIcon color={COLORS.white} size={22} name="heart" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={GlobalStyleSheet.container}>
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.h6, color: colors.title }}>
                  {parkdata.title}
                </Text>
                <Text
                  style={{
                    ...FONTS.font,
                    color: colors.textLight,
                    marginBottom: 8,
                  }}
                >
                  1.6 Highline plus 16 Alloy
                </Text>
              </View>
              <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
              {park.rating}
              </Text>
              <Icon name="star" size={20} color={COLORS.yellow} />
            </View>
            <View
              style={{
                elevation: 3, // Add elevation to create a shadow effect
                backgroundColor: COLORS.white,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.cardBg,
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: colors.borderColor,
                    paddingBottom: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 8,
                        tintColor: colors.textLight,
                      }}
                      source={require("../assets/icons/fuel.png")}
                    />
                    <Text
                      style={{
                        ...FONTS.fontSm,
                        ...FONTS.fontBold,
                        color: colors.title,
                      }}
                    >
                      Diesel
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 8,
                        tintColor: colors.textLight,
                      }}
                      source={require("../assets/icons/speedometer.png")}
                    />
                    <Text
                      style={{
                        ...FONTS.fontSm,
                        ...FONTS.fontBold,
                        color: colors.title,
                      }}
                    >
                      75000.0km
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 18,
                        width: 18,
                        marginRight: 8,
                        tintColor: colors.textLight,
                      }}
                      source={require("../assets/icons/gearbox.png")}
                    />
                    <Text
                      style={{
                        ...FONTS.fofontSmnt,
                        ...FONTS.fontBold,
                        color: colors.title,
                      }}
                    >
                      Manual
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 15,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                      Owner
                    </Text>
                    <Text
                      style={{
                        ...FONTS.font,
                        ...FONTS.fontBold,
                        color: colors.title,
                      }}
                    >
                      1st
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                      {parkdata.address}
                    </Text>
                    {/* <Text
                      style={{
                        ...FONTS.font,
                        ...FONTS.fontBold,
                        color: colors.title,
                      }}
                    >
                      kota
                    </Text> */}
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                      Posting date
                    </Text>
                    <Text
                      style={{
                        ...FONTS.font,
                        ...FONTS.fontBold,
                        color: colors.title,
                      }}
                    >
                      05-May-2022
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text
              style={{
                ...FONTS.h6,
                color: colors.title,
                marginTop: 20,
                marginBottom: 8,
              }}
            >
              Description
            </Text>
            <View
              style={{
                elevation: 3, // Add elevation to create a shadow effect
                backgroundColor: COLORS.white,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 15,
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: colors.cardBg,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    borderRadius: 10,
                  },
                  Platform.OS === "android" && {
                    marginBottom: 20,
                  },
                ]}
              >
                <View
                  style={[styles.desList, { borderColor: colors.borderColor }]}
                >
                  <Text style={[styles.listLabel, { color: colors.text }]}>
                    ABS :
                  </Text>
                  <Text style={{ ...FONTS.font, color: colors.title }}>
                    Yes
                  </Text>
                </View>
                <View
                  style={[styles.desList, { borderColor: colors.borderColor }]}
                >
                  <Text style={[styles.listLabel, { color: colors.text }]}>
                    Adjustable Steering :
                  </Text>
                  <Text style={{ ...FONTS.font, color: colors.title }}>
                    Yes
                  </Text>
                </View>
                <View
                  style={[styles.desList, { borderColor: colors.borderColor }]}
                >
                  <Text style={[styles.listLabel, { color: colors.text }]}>
                    Alloy Wheels :
                  </Text>
                  <Text style={{ ...FONTS.font, color: colors.title }}>
                    Yes
                  </Text>
                </View>
                <View
                  style={[styles.desList, { borderColor: colors.borderColor }]}
                >
                  <Text style={[styles.listLabel, { color: colors.text }]}>
                    Anti Theft Device :
                  </Text>
                  <Text style={{ ...FONTS.font, color: colors.title }}>
                    Yes
                  </Text>
                </View>
                <View
                  style={[styles.desList, { borderColor: colors.borderColor }]}
                >
                  <Text style={[styles.listLabel, { color: colors.text }]}>
                    Aux Compatibility :
                  </Text>
                  <Text style={{ ...FONTS.font, color: colors.title }}>
                    Yes
                  </Text>
                </View>
                <View
                  style={[styles.desList, { borderColor: colors.borderColor }]}
                >
                  <Text style={[styles.listLabel, { color: colors.text }]}>
                    Blutooth :
                  </Text>
                  <Text style={{ ...FONTS.font, color: colors.title }}>
                    Yes
                  </Text>
                </View>
                <View
                  style={[styles.desList, { borderColor: colors.borderColor }]}
                >
                  <Text style={[styles.listLabel, { color: colors.text }]}>
                    Cruise Control :
                  </Text>
                  <Text style={{ ...FONTS.font, color: colors.title }}>
                    Yes
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                elevation: 3, // Add elevation to create a shadow effect
                backgroundColor: COLORS.white,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                  backgroundColor: colors.cardBg,
                }}
              >
                <Image
                  source={profile}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 70,
                    marginRight: 15,
                  }}
                />
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                  <Text style={{ ...FONTS.font, color: colors.textLight }}>
                    Posted by
                  </Text>
                  <Text
                    style={{ ...FONTS.h6, color: colors.title, lineHeight: 22 }}
                  >
                    Car Bazar
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      color: colors.textLight,
                      marginBottom: 10,
                    }}
                  >
                    Posted On : 05/04/2022
                  </Text>

                  <ButtonSm title="See profile" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary5,
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderRadius: 10,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            <FeatherIcon
              style={{ marginRight: 6 }}
              size={20}
              color={COLORS.second}
              name="message-circle"
            />
            <Text style={{ ...FONTS.h6, color: COLORS.white, lineHeight: 24 }}>
              Chat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary5,
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderRadius: 10,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <FeatherIcon
              style={{ marginRight: 8 }}
              size={20}
              color={COLORS.second}
              name="phone-call"
            />
            <Text style={{ ...FONTS.h6, color: COLORS.white, lineHeight: 24 }}>
              Call
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  headerArea: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
  },
  headBtn: {
    height: 48,
    width: 48,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  desList: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  listLabel: {
    ...FONTS.font,
    width: 180,
  },
});
