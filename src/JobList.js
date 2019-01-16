import React from 'react';
import queryString from 'query-string';
import { Route } from "react-router-dom";

import JobRow from './JobRow';


export default class JobList extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props)

    let filteredData = this.filterData(this.props.data)
    console.log(filteredData)

    // const formattedData = this.formatData(this.demoData);
    this.state = {
      data: filteredData
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ data: this.filterData(this.props.data)})
    }
  }

  filterData(data) {
    const filter = queryString.parse(this.props.location.search)['key'];
    console.log(filter)
    if (typeof filter !== 'undefined') {
      const lcfilter = filter.toLowerCase()
      return data.filter((job) => {
        const lc = job.command.toLowerCase();
        return lc.includes(lcfilter);
      })
    }
    else {
      return data;
    }
  }

  formatData(data) {
    const status_names = {
      'RU': 'Currently Running',
      'SU': 'Completed Successfully',
      'ER': 'Exited with Error',
      'CR': 'Lost Communication with Server',
    }
    const statuses = ['RU', 'SU', 'ER', 'CR'];

    // Need somewhere to store our data
    const formattedData = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < statuses.length; sectionId++) {
      // Get the character we're currently looking for
      const currentStatus = statuses[sectionId];

      // Get users whose first name starts with the current letter
      const jobs = data.filter((job) => job.status === currentStatus);

      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (jobs.length > 0) {

        // Store any data we would want to display in the section header. In our case we want to show
        // the current character
        formattedData.push({
          title: status_names[currentStatus],
          data: jobs,
        });
      }
    }
    console.log(formattedData)
    return formattedData;
  }

  // content() {
  //   this.state.data.map((job) => (
  //       <div key={job.id}>
  //         // <Row job={job}/>
  //         <p>Test</p>
  //       </div>
  //     )
  //   )
  // };

  render() {
    const content = this.state.data.map((job) => (
        <div key={job.id}>
          <Route render={({ history }) => (
            <JobRow job={job} history={history}/>
          )} />
        </div>
      )
    );
    if (content.length > 0) {
      return (
          <React.Fragment>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent:'center',
              alignItems:'center',
              backgroundColor: 'crimson',
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 1,
              borderStyle: 'solid',
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {content}
            </div>
          </React.Fragment>
      );
    }
    else {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor: 'crimson',
          borderColor: 'black',
          borderRadius: 10,
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <p style={{
            width: '600px',
            paddingLeft: 20,
            paddingRight: 20,
            margin: 4,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'grey',
            borderStyle: 'solid',
            justifyContent: 'space-between',
            lineHeight: '40px'
          }}>
            No results found!
          </p>
        </div>
      )
    }
  }
}
