import { useState } from 'react'
import { localStorageKey } from '../../const'
import { localStorageUtil } from '../../utils'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'

function AddForm() {
  const [date, setDate] = useState()
  const [title, setTitle] = useState()

  // const [contentItem, setContentItem] = useState({
  //   id: '',
  //   title: '',
  //   date: '',
  // })
  
  const { set, get } = localStorageUtil(localStorageKey.contentItems, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!Validate()) {
      return
    }
    const newContent = {
      date,
      title,
      id: uuidv4(),
    }
    const oldList = JSON.parse(get())
    console.log(oldList)
    set([newContent, ...oldList])
  }

  const Validate = () => {
    const title = document.getElementById('title').value
    console.log(title)
    const date = document.getElementById('date').value
    const formatDate = date.toString().split('-')
    formatDate.reverse()
    const formatDateJoin = formatDate.join('/')
    console.log(formatDateJoin)
    const date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/
    let now_date = new Date()
    let dd = String(now_date.getDate()).padStart(2, '0')
    let mm = String(now_date.getMonth() + 1).padStart(2, '0')
    let yyyy = now_date.getFullYear()

    now_date = dd + '/' + mm + '/' + yyyy
    console.log(now_date)
    const formatNowDate = now_date.toString().split('-')
    formatNowDate.reverse()
    const formatNowDateJoin = formatDate.join('/')
    console.log(formatNowDateJoin)

    if (title === '') {
      alert('Bạn chưa nhập nội dung')
      return false
    }
    if (formatDateJoin === '') {
      alert('Bạn chưa nhập ngày nhắc')
      return false
    }
    if (!date_regex.test(formatDateJoin)) {
      alert('Bạn nhập ngày nhắc không hợp lệ')
      return false
    }
    if (formatDateJoin < formatNowDateJoin) {
      alert('Bạn không được nhập ngày quá khứ')
      return false
    }
    return true
  }

  return (
    <div className="content">
      <form action="" className="AddForm">
        <div className="form-content">
          <label htmlFor="" className="form-label">
            Nội dung
          </label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            placeholder="Nhập nội dung của ngày"
            className="form-input"
            id="title"
          />
        </div>
        <div className="form-content">
          <label htmlFor="" className="form-label">
            Ngày nhắc
          </label>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value)
            }}
            name="title"
            className="form-date"
            id="date"
          />
          <button onClick={handleSubmit} className="btn-save">
            Lưu ngày
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddForm
