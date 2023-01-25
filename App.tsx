import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const API_KEY: string =
  "aDInKFOqJJhwsd8PuMqXvY6LiB4gjbbTtcpQid4EpSr3eUt266LJLBMY";
const API_URL: string =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

const IMAGE_SIZE: number = 80;
const SPACING: number = 10;

const getImages = async (): Promise<[]> => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const { photos } = await response.json();
  return photos;
};

export default function App() {
  const [images, setImages] = React.useState<any[]>([]);
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    const fetchImages = async () => {
      const responseImages = await getImages();
      setImages(responseImages);
    };
    fetchImages();
  }, []);

  if (!images) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image
              source={{ uri: item.src.portrait }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        )}
      />
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: IMAGE_SIZE / 2 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.src.portrait }}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius: 12,
              marginRight: SPACING,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
