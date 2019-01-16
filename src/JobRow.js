import React from 'react';
import Interactive from 'react-interactive'

const styles = {
  row: {
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
  },
  left_row_info: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  command: {
    fontFamily: 'monospace',
    fontSize: 24,
    marginBottom: 0,
    marginTop: 8,
  },
  right_row_info: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
  },
  runtime: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 18,
    paddingRight: 18,
    display: 'inline-flex',
    marginLeft: 'auto',
    marginBottom: 0,
    marginTop: 8,
  },
  smaller_text: {
    fontSize: 14,
    marginBottom: 0,
    marginTop: 0,
  },
};

const JobRow = (props) => {
  var runtime_background_color;
  switch (props.job.status) {
    case 'RU':
      runtime_background_color = 'limegreen'
      break;
    case 'SU':
      runtime_background_color = 'deepskyblue'
      break;
    case 'ER':
      runtime_background_color = 'red'
      break;
    case 'CR':
      runtime_background_color = 'grey'
      break;
    default:
      runtime_background_color = 'white'
  }
  // console.log(runtime_background_color)

  return (
    // <View style={styles.container}>
    <Interactive
      as='div'
      hover={{ backgroundColor: 'lightyellow' }}
      style={styles.row}
      onClick={() => {
       console.log(props.job.command);
       props.history.push({pathname: `/details`, search: `?id=${props.job.id}`, job: props.job})
     }}
    >
        <div style={styles.left_row_info}>
          <h3 style={styles.command}>
            {`${props.job.command}`}
          </h3>
          <p style={styles.smaller_text}>
            My Macbook Pro
          </p>
        </div>
        <div style={styles.right_row_info}>
          <p style={{...styles.runtime,
            backgroundColor: runtime_background_color,
          }}>
            {`${props.job.runtime}`}
          </p>
          <p style={styles.smaller_text}>
            {`${new Date(props.job.date_created).toLocaleString()}`}
          </p>
        </div>
    </Interactive>
    // </View>
  )
};

export default JobRow;
