import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa'
import { localStorageKey } from '../../const';
import { v4 as uuidv4 } from "uuid";
import { localStorageUtil } from '../../utils';
import './ContentItem.scss'

export const ContentItem = (props) => {

  const { id } = props;
  const { set, get } = localStorageUtil(localStorageKey.contentItems, [])
  const [ contentItem, setContentItem ] = useState({
    id: uuidv4(),
    title: '',
    date: '',
  })

  useEffect(() => {
    const list = JSON.parse(get());
    const item = list.find((item) => item.id === id);
    setContentItem(item);
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    const list = JSON.parse(get());
    const index = list.findIndex((item) => item.id === id);
    console.log(index);
    list.splice(index, 1);
    set(list);
  } 
 
  return (
    <div className="content-item">
      <p className="content-date">
        <span className="content-date-label">Ngày:</span> {props.date}
      </p>
      <p className="content-title">{props.title}</p>
      <FaTimes className="icon-close" onClick={handleDelete}/>
    </div>
  )
}

