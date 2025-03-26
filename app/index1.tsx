import { Button, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Link } from 'expo-router'
import Header from '@/app/Header'
import { useFonts ,Alexandria_400Regular } from '@expo-google-fonts/dev'

export class index extends Component {
  render() {
    return (
      <View className='flex-col items-center bg-[#313638] min-h-full'>
        <Header />
        <Image source={require('../assets/images/homeImage.png')} className='w-80 h-80 mt-10'></Image>
        <View className='flex flex-col justify-between mt-10 min-w-full px-20'>
        <Link href='/log' asChild>
            <TouchableOpacity className='p-4 bg-[#379392] rounded-3xl shadow-lg shadow-black'>
                <Text className='color-[#E8E9EB] text-xl text-center' style={{fontFamily:Alexandria_400Regular}}>Log Workout</Text>
            </TouchableOpacity>
        </Link>
            <TouchableOpacity className='p-4 bg-[#379392] rounded-3xl shadow-lg shadow-black mt-5'>
                <Text className='color-[#E8E9EB] text-xl text-center'>Set Water Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity className='p-4 bg-[#379392] rounded-3xl shadow-lg shadow-black mt-5'>
                <Text className='color-[#E8E9EB] text-xl text-center'>WorkMax AI</Text>
            </TouchableOpacity>
            <TouchableOpacity className='p-4 bg-[#a53c3cd1] rounded-3xl shadow-lg shadow-black mt-5'>
                <Text className='color-[#E8E9EB] text-xl text-center'>View Past Workouts</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default index

