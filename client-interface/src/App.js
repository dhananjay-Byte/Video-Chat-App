import './App.css';

import StreamVideo from './components/video';
import Notification from './components/notification';
import Details from './components/details';

function App() {

  return (
    <div className="App">
      <h1>Video Chat Web App</h1> <br/>
      <StreamVideo/>
      <Details>
        <Notification/>
      </Details>
    </div>
  );
}

export default App;
