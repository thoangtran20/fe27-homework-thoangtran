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
    const newContent = {
      date,
      title,
      id: uuidv4(),
    }
    const oldList = JSON.parse(get())
    set([newContent, ...oldList])
    if(!Validate()) {
      e.preventDefault();
    };
  }

  const Validate = () => {
    const title = document.getElementById('title').value;
    console.log(title)
    const date = document.getElementById('date').value;
    console.log(date);
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1)

    let valid = true;
    if(title === '') {
      alert('Bạn chưa nhập nội dung');
      valid = false;
    }
    if(date === '') {
      alert('Bạn chưa nhập ngày nhắc');
      valid= false;
    }
    if(date === yesterday) {
      alert("Bạn không được nhập ngày quá khứ");
      valid = false;
    }
    return valid;
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
