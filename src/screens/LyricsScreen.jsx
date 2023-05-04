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
import LyricsHeader from "../components/Lyrics/LyricsHeader";

const LyricsScreen = ({ route, navigation }) => {
  const { artist, title } = route.params;

  const { width, height } = useScreenDimensions();

  const dispatch = useDispatch();
  const { lyrics, status, error } = useSelector((state) => state.lyrics);
  const { musicImage } = useSelector(selectAudioPlayer);

  useEffect(() => {
    dispatch(fetchLyrics({ artist, title }));
  }, [title, artist, musicImage]);

  if (error) {
    console.log(error);
  }

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
      ) : status === "succeeded" ? (
        <>
          <LyricsHeader title={title} />
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
      ) : (
        <View className="items-center justify-start flex-1">
          <LyricsHeader title={title} status={status} />
          <Typography bold styles="w-[85%] text-[#ffffff] text-xl leading-8">
            Sorry I couldn't find that song's lyrics
          </Typography>
        </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

export default LyricsScreen;
