import { Route, Routes } from 'react-router';
import './App.css';
import { ROUTE } from './const';
import AddForm from './lan1/add-form/AddForm';
import ContentList from './lan1/content-list/ContenList';
// import EditForm from './lan1/edit-form/EditForm';
import MainContent from './lan1/main-content/MainContent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path={ROUTE.all}
          element={<MainContent content={<ContentList data={[]} />} />}
        />
        <Route 
          path={ROUTE.addNew}
          element={<MainContent content={<AddForm />} />}
        />
        {/* <Route 
          path={`${ROUTE.editForm}/:id`}
          element={<MainContent content={<EditForm />} />}
        /> */}
      </Routes>
      <MainContent />
    </div>
  );
}

export default App;
