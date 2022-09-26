import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { localStorageKey, ROUTE } from '../../const'
import { localStorageUtil } from '../../utils'
import './ContentItem.scss'

export const ContentItem = (props) => {
  const navigate = useNavigate();

  const goToEditForm = () => {
    navigate(`${ROUTE.editForm}/${props.id}`, {
      replace: true,
      state: props.title,
    });
  }

  const { set, get } = localStorageUtil(localStorageKey.contentItems, [])

  const { id } = useParams()

  const [contentItem, setContentItem] = useState({
    id: '',
    title: '',
    date: '',
  })


  useEffect(() => {
    const list = JSON.parse(get())
    const item = list.find((item) => item.id === id)
    console.log(item)
    setContentItem(item)
  }, [id])

  const handleDelete = (e) => {
    e.preventDefault()
    const list = JSON.parse(get())
    console.log(list)
    const index = list.findIndex((item) => item.id === contentItem.id)
    console.log(index)
    list.splice(index, 1)
    set(list)
  }

  return (
    <div className="content-item" onClick={goToEditForm}>
      <p className="content-date">
        <span className="content-date-label">Ngày:</span> {props.date}
      </p>
      <p className="content-title">{props.title}</p>
      <FaTimes className="icon-close" onClick={handleDelete} />
    </div>
  )
}
