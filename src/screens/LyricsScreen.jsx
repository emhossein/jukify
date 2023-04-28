import { useEffect } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Typography from "../components/Typography";
import { fetchLyrics } from "../store/lyricsSlice";
import useScreenDimensions from "../hooks/useDimension";
import { selectAudioPlayer } from "../store/audioPlayerSlice";
import MoreIcon from "../components/icons/MoreIcon";
import BackIcon from "../components/icons/BackIcon";

const LyricsScreen = ({ route, navigation }) => {
  const { artist, title } = route.params;

  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();
  const { lyrics, status } = useSelector((state) => state.lyrics);
  const { musicImage } = useSelector(selectAudioPlayer);

  useEffect(() => {
    dispatch(fetchLyrics({ artist, title }));
  }, [musicImage]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={{ uri: musicImage }} style={styles.background}>
      <View style={styles.overlay} />

      {status === "loading" ? (
        <View className="items-center">
          <Typography styles="text-white text-lg">Loading...</Typography>
        </View>
      ) : (
        <>
          <View
            className="flex-row self-center items-center justify-between flex-[0.5]"
            style={{ width: width * 0.8 }}
          >
            <TouchableOpacity
              onPress={handleBackButton}
              className="w-6 h-6 rounded-full bg-accent items-center justify-center"
            >
              <BackIcon />
            </TouchableOpacity>
            <Typography bold styles="text-white text-xl">
              {title.replace(/\([^()]*\)/g, "")}
            </Typography>
            <TouchableOpacity>
              <MoreIcon />
              <MoreIcon />
              <MoreIcon />
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: width * 0.8, height: height * 0.7 }}
            >
              <Typography styles="text-[#ffffff] text-base leading-8">
                {lyrics.lyrics}
              </Typography>
            </ScrollView>
          </View>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust opacity as needed
  },
});

export default LyricsScreen;
