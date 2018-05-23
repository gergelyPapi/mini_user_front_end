import React, { Component } from 'react';
import {MiniUserProvider} from "./Storage/MiniUserProvider";
import MiniUserAppBar from "./Components/MiniUserAppBar"

class App extends Component {
  render() {
    return (
        <MiniUserProvider>
          <div className="App">
            <MiniUserAppBar/>
          </div>
        </MiniUserProvider>
    );
  }
}

export default App;
