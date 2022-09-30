import AddForm from '../add-form/AddForm'
import Header from '../header/Header'
import SideBar from '../side-bar/SideBar'
import './MainContent.scss'

function MainContent() {


  return (
    <div className="main-content">
      <Header />
      <h1 className="content-header">Nhắc nhở ngày quan trọng của bạn</h1>
      <div className="main-body">
        <AddForm />
        <SideBar />
      </div>
    </div>
  )
}

export default MainContent
