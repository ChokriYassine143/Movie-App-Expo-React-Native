import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { icons } from '@/constants/icons';
import { getSavedMovies } from '@/services/appwrite';
import { images } from '@/constants/images';
import useFetch from '@/services/useFecth';
import { useRouter } from 'expo-router';
import MovieCard from '../components/MovieCard';
import TrendingCard from '../components/TrendingCard';

const Saved = () => {

  const {
    data: savedMovies,
    loading: savedMoviesLoading,
    error: savedMoviesError,
  } = useFetch(getSavedMovies);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

    
        {savedMoviesLoading && (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        )}

        {/* Show Error Message */}
        {savedMoviesError && (
          <Text className="text-red-500 mt-3 self-center">
            Error: {savedMoviesError?.message}
          </Text>
        )}

        {/* Show Movies if Available */}
        {!savedMoviesLoading && !savedMoviesError && (
          <View className="mt-5">
            <Text className="text-lg text-white font-bold mt-5 mb-3">Saved Movies</Text>
            <FlatList
              data={savedMovies}
              renderItem={({ item }) => <TrendingCard movie={item}     />}
              numColumns={2}
        
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
                
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}

        {!savedMoviesLoading && !savedMoviesError && savedMovies?.length === 0 && (
          <Text className="text-center text-white mt-10">No saved movies found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
