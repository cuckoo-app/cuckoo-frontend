import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobList from './JobList'
import JobDetails from './JobDetails'
import Autosuggest from 'react-autosuggest'
import demoData from './data';
import './App.css'

const MyJobList = (props) => {
  return (
    <JobList
      data={demoData}
      {...props}
    />
  )
}


const App = () => (
  <Router>
    <div style={{display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 8,
        paddingBottom: 0,
      }}/>

      <Route exact path="/" component={MyJobList} />
      <Route path="/details" component={JobDetails} />
      <Route path="/account" component={Account} />
    </div>
  </Router>
);

const Account = ({ match }) => (
    <div>
      <h3>Settings:</h3>
      <p>Here are settings!</p>
    </div>
);

const styles = {
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    textAlign: 'center',
  },
  search: {
    paddingLeft: 20,
    paddingRight: 20,
    width: 620,
  }
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  }
  else {
    var matchingJobs = demoData.filter(job =>
      job.command.toLowerCase().includes(inputValue)
    );
    var seen = {};
    return matchingJobs.filter(function(job) {
        var command = job.command;
        return seen.hasOwnProperty(command) ? false : (seen[command] = true);
    })
  }
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.command;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div style={{textAlign: 'left'}}>
    {suggestion.command}
  </div>
);

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {

    if (method === 'enter') {
      console.log(newValue);
      this.history.push(`/?key=${newValue}`)
      this.setState({
        value: newValue
      });
    }
    else {
      this.setState({
        value: newValue
      });
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionSelected = ( event, { suggestion }) => {
    this.setState({
      value: suggestion.command
    });
    console.log(suggestion.command);
    this.history.push(`/?key=${suggestion.command}`)
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onKeyDown = (event) => {
    // Enter
    if (event.keyCode === 13) {
      console.log(this.state.value);
      this.history.push(`/?key=${this.state.value}`)
    }
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

const Header = (props) => (
  <div style={props.style}>
      <Link style={{...styles.header,
        textDecoration: 'none',
        color: 'crimson',
        fontSize: '32px',
      }} to="/"><h3>Cuckoo</h3></Link>
      <div style={styles.search}>
        <Route render={({ history }) => (
          <SearchBar history={history}/>
        )} />
      </div>
      <Link style={{...styles.header,
        color: 'crimson',
      }} to="/account"><h3>Account</h3></Link>
  </div>
);

export default App;
