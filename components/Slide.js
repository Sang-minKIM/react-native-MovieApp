import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Overview = styled.Text`
  color: ${(props) => (props.isDark ? "#808e9b" : props.theme.textColor)};
  margin-top: 10px;
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

const Slide = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdrop_path) }}
        ></BgImg>
        <BlurView
          blurType={isDark ? "dark" : "light"}
          blurAmount={30}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title>{original_title}</Title>
              {vote_average > 0 ? <Votes>⭐️{vote_average}/10</Votes> : null}
              <Overview>{overview.slice(0, 100)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
