import React, { Component } from 'react';
import {MiniUserProvider} from "./Storage/MiniUserProvider";
import MiniUserAppBar from "./Components/MiniUserAppBar"
import AdminActionTabs from "./Components/AdminActionTabs";

class App extends Component {
  render() {
    return (
        <MiniUserProvider>
          <div className="App">
            <MiniUserAppBar/>
            <AdminActionTabs/>
          </div>
        </MiniUserProvider>
    );
  }
}

export default App;
