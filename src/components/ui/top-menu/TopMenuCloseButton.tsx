'use client'
import { useUiStore } from '@/store'
import { IoMenuOutline } from 'react-icons/io5'

export const TopMenuCloseButton = () => {
    const openSideMenu = useUiStore(state => state.openSideMenu)
  return (

    <button className="p-2 rounded-md transition-all hover:bg-gray-200">
        <IoMenuOutline size={25} onClick={ openSideMenu } />
    </button>
  )
}