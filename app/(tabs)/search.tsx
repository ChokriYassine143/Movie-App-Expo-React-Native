import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { images } from "@/constants/images";
import useFetch from "@/services/useFecth";
import { fetchMovies } from "@/services/api";
import MovieCard from "../components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [query, setquery] = useState("")
  
  const {
    data: movies=[],
    loading,
    refetch:loadMovies,
    error
  } = useFetch(() => fetchMovies({ query: query }),false);
  useEffect(() => {

   
    const timeoutID = setTimeout(async () => {
      if (query.trim()) {
        await loadMovies();
      
      } else {
        reset();
      }
    }, 500);
 
  
   

    return () => clearTimeout(timeoutID);
  }, [query]);
  useEffect(() => {
    if (movies?.length! > 0 && movies?.[0]) {
       updateSearchCount(query, movies[0]);
    }
  },[movies]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center ">
              <Image source={icons.logo} className="w-12 h-10"></Image>
            </View>
            <View className="my-5">
              <SearchBar 
              value={query}
              onChangeText={(text:string ) => setquery(text)}
              placeholder="Search movies " 
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error :{error.message}
              </Text>
            )}
            {!loading &&
              !error &&
              query.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search results for {""}
                  <Text className="text-accent">{query} </Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={!loading && !error ? (
          <View className="mt-10 px-5">
            <Text className="text-center text-gray-500">
              {query.trim() ? "No movies found" : "Search for a Movie"}
            </Text>
          </View>
        ) : null}
      />
      <Text>search</Text>
    </View>
  );
};

export default Search;
function async() {
  throw new Error("Function not implemented.");
}

