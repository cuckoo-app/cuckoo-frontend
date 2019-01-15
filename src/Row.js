import React from 'react';

const styles = {
  row: {
    width: 600,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
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
    fontSize: 18,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 18,
    paddingRight: 18,
    display: 'inline-flex',
    marginLeft: 'auto',
    marginBottom: 0,
  },
  smaller_text: {
    fontSize: 14,
    marginTop: 0,
  },
};

const Row = (props) => {
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
  console.log(runtime_background_color)

  return (
    // <View style={styles.container}>
    <div style={{padding: 10}}>
      <button style={styles.row} onPress={() => console.log('Press')}>
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
      </button>
    </div>
    // </View>
  )
};

export default Row;
