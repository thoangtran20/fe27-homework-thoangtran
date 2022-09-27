import { useEffect, useState } from 'react'
import { localStorageKey } from '../../const'
import { localStorageUtil } from '../../utils'
import { ContentItem } from '../content-item/ContentItem'

const ContentList = (props) => {
  const { get } = localStorageUtil(localStorageKey.contentItems, [])
  const [contentList, setContentList] = useState([])
  const localStorageData = get()

  useEffect(() => {
    const list = JSON.parse(get())
    // window.addEventListener('storage', function (e) {
    //   console.log(list)
    //   setContentList(list)
    // })

    console.log(list)
    setContentList(list)
  }, [])

  useEffect(() => {
    setContentList(JSON.parse(localStorageData))
  }, [localStorageData])

  return (
    <div className="content-list">
      {contentList.map((item, index) => {
        return (
          <ContentItem
            key={index}
            date={item.date}
            title={item.title}
            id={item.id}
          />
        )
      })}
    </div>
  )
}

export default ContentList
