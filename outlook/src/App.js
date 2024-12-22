import React, { useContext } from 'react';
import './App.css';
import Emailbody from './components/Emailbody/Emailbody';
import Emailbox from './components/Emailbox/Emailbox';
import Filter from './components/filter/filter';
import { EmailContext } from './context/Emailcontext';
function App() {
  const { selectedEmail, setSelectedEmail, markAsRead } = useContext(EmailContext);
  console.log(selectedEmail, "email")
  return (
    <div className="App">
      <Filter />
      <div className='main-body'>
        <Emailbox />
        {selectedEmail ? <Emailbody email={selectedEmail} /> : null}

      </div>
    </div>
  );
}

export default App;
