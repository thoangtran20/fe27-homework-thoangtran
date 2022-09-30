import { useEffect, useState } from 'react'
import { localStorageKey } from '../../const'
import { localStorageUtil } from '../../utils'
import ContentList from '../content-list/ContenList'
import './SideBar.scss'

function SideBar() {
  const { get, set } = localStorageUtil(localStorageKey.contentItems, [])
  const [contentList, setContentList] = useState([])
  const localStorageData = get()

  useEffect(() => {
    const list = JSON.parse(get())
    console.log(list)
    setContentList(list)
  }, [])

  useEffect(() => {
    setContentList(JSON.parse(localStorageData))
  }, [localStorageData])

  const handleDelete = (contentId) => {
    const list = JSON.parse(get())
    console.log(list)
    const index = list.findIndex((item) => item.id === contentId)
    console.log(index)
    list.splice(index, 1)
    set(list)
  }

  return (
    <div className='side-bar'>
      <>
        <ContentList 
          onDelete={handleDelete}
        />
      </>  
    </div>
  )
}

export default SideBar