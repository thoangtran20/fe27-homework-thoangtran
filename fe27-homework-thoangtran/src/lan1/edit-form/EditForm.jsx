import { useEffect, useState } from 'react'
import { localStorageKey } from '../../const'
import { useNavigate, useParams } from 'react-router'
import { localStorageUtil } from '../../utils'
import './style.scss'

function EditForm() {
  const [contentItem, setContentItem] = useState({
    id: '',
    title: '',
    date: '',
  })
  
  const { id } = useParams();

  const navigate = useNavigate();

  const { set, get } = localStorageUtil(localStorageKey.contentItems, [])

  useEffect(() => {
    const list = JSON.parse(get());
    const item = list.find((item) => item.id === id)
    console.log(item);
    setContentItem(item)
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contentItem);
    const list = JSON.parse(get())
    const newList = list.map((item) => {
      if(item.id === contentItem.id) return contentItem;
      return item;
    })
    set([...newList]);
    navigate(-1);
  }

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
    <div className="content">
      <form action="" className="EditForm">
        <div className="form-content">
          <label htmlFor="" className="form-label">
            Nội dung
          </label>
          <input
            type="text"
            onChange={(e) => {
              setContentItem({
                ...contentItem,
                title: e.target.value,
              })
            }}
            placeholder="Nhập nội dung của ngày"
            className="form-input"
          />
        </div>
        <div className="form-content">
          <label htmlFor="" className="form-label">
            Ngày nhắc
          </label>
          <input
            type="date"
            onChange={(e) => {
              setContentItem({
                ...contentItem,
                date: e.target.value,
              })
            }}
            name="title"
            className="form-date"
          />
          <button onClick={handleSubmit} className="btn-save">
            Lưu ngày
          </button>
          <button onClick={handleDelete} className="btn-delete">
            Xóa
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditForm
