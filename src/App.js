import React, { useState } from 'react'
import axios from 'axios'
import Autosuggest from 'react-autosuggest';
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    suggestions: []
  });
  const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

  const getSuggestions = (value) => {
    return [];
  };
  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  
  // Autosuggest input properties
  const inputProps = {
    placeholder: 'Search for movies...',
    value: state.s,
    onChange: handleInput,
  };

  return (
    <div className="App">
      <header>
<h1 style={{
  background: `-webkit-linear-gradient(#fff, #f0f0f0)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  fontWeight: 'normal'
}}>Internet Movie Database App</h1>
<h2 style={{  textAlign: 'center', fontWeight: 'normal'}}>Powered by OMDB</h2>

      </header>
      <main>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4 style={{ textAlign: "left", fontWeight: "normal", marginLeft: "25px", marginBottom: "-15px" }}>Have a movie in mind?</h4>
          
        </div>
      </main>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
