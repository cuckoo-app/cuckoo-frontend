import React, { Component } from 'react';

import Row from './Row';
import demoData from './data';


export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.demoData = demoData

    // const formattedData = this.formatData(this.demoData);
    this.state = {
      data: demoData,
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
          <Row job={job}/>
        </div>
      )
    );
    return (
        <React.Fragment>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: 'cyan',
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 1,
            borderStyle: 'solid',
            padding: 20,
          }}>
            {content}
          </div>
        </React.Fragment>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  pickers: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  dropdown_button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  popover: {
    flex: 1,
    padding: 10,
  },
  list: {
    flex: 1,
    margin: 10,
  },
  header: {
    flex: 1,
    padding: 12,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  thick_separator: {
    flex: 1,
    height: 3*StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
};
