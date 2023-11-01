import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';

import AuthContextProvider from './Context/AuthContext';
import WineContextProvider from './Context/WineContext';
import EventContextProvider from './Context/EventContext';
import ServiceContextProvider from './Context/ServiceContext';


import FCLogin from './FunctionalComponenets/Login/FCLogin';
import FCHome from './FunctionalComponenets/Home/FCHome';
import FCProfile from './FunctionalComponenets/Profile/FCProfile';
import FCWatchWines from './FunctionalComponenets/Wine/FCWatchWines';
import FCWatchEvent from './FunctionalComponenets/Event/FCWatchEvent';
import FCUserComments from './FunctionalComponenets/Comments/FCUserComments';
import FCWatchService from './FunctionalComponenets/Service/FCWatchService';
import FileUploadPage from './FunctionalComponenets/FileUpload/FileUploadPage';




import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <WineContextProvider>
          <EventContextProvider>
            <ServiceContextProvider>
                  <Switch>
                    <Route path="/" component={FCLogin} exact />
                    <Route path="/FCHome" component={FCHome} />
                    <Route path="/FCProfile" component={FCProfile} />
                    <Route path="/FCWatchWines" component={FCWatchWines} />
                    <Route path="/FCWatchEvent" component={FCWatchEvent} />
                    <Route path="/FCUserComments" component={FCUserComments} />
                    <Route path="/FCWatchService" component={FCWatchService} />
                    <Route path="/FileUploadPage" component={FileUploadPage} />
                  </Switch>
            </ServiceContextProvider>
          </EventContextProvider>
        </WineContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default withRouter(App);
