import { useState } from 'react'
import { localStorageKey } from '../../const'
import { localStorageUtil } from '../../utils'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'

function AddForm() {
  const [date, setDate] = useState()
  const [title, setTitle] = useState()
  const [dateDanger, setDateDanger] = useState()
  const [titleDanger, setTitleDanger] = useState()

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
    // const title = document.getElementById('title').value
    // console.log(title)
    // const date = document.getElementById('date').value
    // console.log(date)
    console.log(title);
    console.log(date)
    let date_input = new Date(date);
    
    const time = date_input.getTime();
    console.log(time);

    let dd = String(date_input.getDate()).padStart(2, '0')
    let mm = String(date_input.getMonth() + 1).padStart(2, '0')
    let yyyy = date_input.getFullYear() 

    date_input = dd + '/' + mm + '/' + yyyy;
    console.log(date_input);

    // const formatDate = date_input.toString().split('-')
    // console.log(formatDate)
    // formatDate.reverse()
    // const formatDateJoin = formatDate.join('/')
    // console.log(formatDateJoin)

    const date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/
    
    let now_date = new Date()
    const time_now = now_date.getTime();
    console.log(time_now)

    let dd_now = String(now_date.getDate()).padStart(2, '0')
    console.log(dd_now);
    let mm_now = String(now_date.getMonth() + 1).padStart(2, '0')
    let yyyy_now = now_date.getFullYear()

    now_date = dd_now + '/' + mm_now + '/' + yyyy_now
    console.log(now_date)

    // const formatNowDate = now_date.toString().split('-')
    // console.log(formatNowDate)
    // formatNowDate.reverse()
    // const formatNowDateJoin = formatNowDate.join('/')
    // console.log(formatNowDateJoin)

    if (!title) {
      setTitleDanger('Bạn chưa nhập nội dung')
      return false
    }
    if (!date) {
      setDateDanger('Bạn chưa nhập ngày nhắc')
      return false
    }
    if (!date_regex.test(date_input)) {
      alert('Bạn nhập ngày nhắc không hợp lệ')
      return false
    }
    if (time < time_now) {
      alert('Bạn không được nhập ngày quá khứ')
      return false
    }
    // if ((dd_now <= dd && dd <= dd_now) && (mm_now <= mm && mm <= mm_now) && (yyyy <= yyyy_now)) {
    //   alert('Bạn không được nhập ngày quá khứ')
    //   return false
    // }
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
        <div className='form-danger'>
          <span>{!title ? titleDanger: ""}</span>
          <span>{!date ? dateDanger: ""}</span>
        </div>
      </form>
    </div>
  )
}

export default AddForm
