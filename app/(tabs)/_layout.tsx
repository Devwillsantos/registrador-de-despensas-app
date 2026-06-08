import { useAuth } from '@/contexts/authContext'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import CustomTabs from '../../components/CustomTabs'

const ADMIN_EMAIL = 'admin@admin.com'

const _layout = () => {
  const { user } = useAuth()
  const isAdmin = user?.email === ADMIN_EMAIL

  return (
    <Tabs
      tabBar={(props) => <CustomTabs {...props} isAdmin={isAdmin} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name='index' />
      <Tabs.Screen name='statistics' />
      <Tabs.Screen name='wallet' />
      <Tabs.Screen name='profile' />
      <Tabs.Screen name='admin' />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})