import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'


interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: ()=>void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true}: SettingsItemProps)=>(
  <TouchableOpacity
  onPress={onPress}
  className='flex flex-row items-center justify-between py-3'
  >
    <View className='flex flex-row gap-3 items-center'>
      <Image
      source={icon}
      className='size-6'
      />
      <Text
      className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
      >{title}</Text>
    </View>
    {showArrow && (
      <Image
      source={icons.rightArrow}
      className='size-5'
      />
    )}
  </TouchableOpacity>
)


const Profile = () => {
  const {user, refetch} = useGlobalContext()

  const handleLogout = async()=>{
    const result = await logout()

    if(result){
      Alert.alert('Success', 'You have been logged out successfully')
      refetch()
    } else {
      Alert.alert('Error', 'An error occurred. Please try again')
    }
  }
  
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row justify-between items-center mt-5'>
          <Text className='text-2xl font-rubik-bold' >Profile</Text>

          <Image
          source={icons.bell}
          className='size-6'
          />
        </View>

        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image
            source={{uri: user?.avatar}}
            className='size-44 relative rounded-full'
            />
            <TouchableOpacity className=' relative bottom-11 left-16'>
              <Image
              source={icons.edit}
              className='size-9'
              />
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold bottom-6'>{user?.name}</Text>
          </View>
        </View>

        <View className='flex flex-col mt-5'>
          <SettingsItem
            icon={icons.calendar}
            title='Edit Profile'
          />

          <SettingsItem
            icon={icons.wallet}
            title='Payment'
          />
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
            {
              settings.slice(2).map((item, index)=>(
                <SettingsItem
                key = {index}
                {...item}
                />
              )
            )}
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          <SettingsItem
          icon={icons.logout}
          title='Logout'
          textStyle='text-danger'
          showArrow={false}
          onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile