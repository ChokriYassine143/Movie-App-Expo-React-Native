import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { icons } from '@/constants/icons'
interface Props{
  placeholder?: string;
  value?:string;
  onChangeText?:(text:string) => void;
  onPress?: () => void;
  
}
const SearchBar = ({ placeholder, onPress,value,onChangeText}:Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
     <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab9bff"/>
     <TextInput 
     onPress={onPress}
     placeholder={placeholder}
     value={value}
     onChangeText={onChangeText}
     className="flex-1 ml-2 text-white"
     placeholderTextColor="#A8B5DB"
     />

    </View>
  )
}

export default SearchBar