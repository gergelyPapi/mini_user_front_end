import React, { Component } from 'react';
import {MiniUserProvider} from "./Storage/MiniUserProvider";
import MiniUserAppBar from "./Components/MiniUserAppBar"
import AdminActionTabs from "./Components/AdminActionTabs";
import InfoSnackbars from "./Components/InfoSnackbars";

class App extends Component {
  render() {
    return (
        <MiniUserProvider>
          <div className="App">
            <MiniUserAppBar/>
            <AdminActionTabs/>
            <InfoSnackbars/>
          </div>
        </MiniUserProvider>
    );
  }
}

export default App;
