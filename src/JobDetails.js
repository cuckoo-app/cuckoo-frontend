import React from 'react';
import queryString from 'query-string';
import demoData from './data';

const JobInfo = (props) => (
  <React.Fragment>
    <div>
      <h3>
        {`${props.job.command}`}
      </h3>
      <h3>
        {`${props.job.runtime}`}
      </h3>
      <p>
        {`My Macbook Pro`}
      </p>
      <p>
        {`${new Date(props.job.date_created).toLocaleString()}`}
      </p>
    </div>
  </React.Fragment>
)

export default class JobList extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props)
  }

  render() {
    var job = this.props.location.job
    var id = queryString.parse(this.props.location.search)['id'];
    console.log(job)
    if (typeof job !== 'undefined') {
      return (
          <JobInfo job={job} />
      );
    }
    else if (typeof id !== 'undefined') {
      for (var i in demoData) {
        if (demoData[i].id == id) {
          job = demoData[i];
          break;
        }
      }
      console.log(job)
      return (
        <JobInfo job={job} />
      );
    }
    else {
      return (
        <p>Nothing to see here.</p>
      );
    }
  }
}
