import { useEffect, useState } from 'react'
import { localStorageKey } from '../../const'
import { localStorageUtil } from '../../utils'
import { ContentItem } from '../content-item/ContentItem'

const ContentList = (props) => {
  const { id } = props;
  const { get } = localStorageUtil(localStorageKey.contentItems, [])
  const [contentList, setContentList] = useState([])

  useEffect(() => {
    const list = JSON.parse(get())
    console.log(list)
    setContentList(list)
  }, [id])
  
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
