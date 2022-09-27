import { FaTimes } from 'react-icons/fa'
import './ContentItem.scss'

export const ContentItem = (props) => {

  return (
    <div className="content-item">
      <p className="content-date">
        <span className="content-date-label">Ngày:</span> {props.date}
      </p>
      <p className="content-title">{props.title}</p>
      <FaTimes className="icon-close"/>
    </div>
  )
}

