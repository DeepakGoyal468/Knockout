import React from 'react';
import './styles.css';

class QuarterFinal extends React.Component {

  render() {
    let quarterFinal = [];
    let position = this.props.position;
    let startIndex = position === 'left' ? 0 : 1;
    if (this.props.quarterFinal.length) {
      for (let i = startIndex; i < 4; i += 2) {
        quarterFinal.push(this.props.quarterFinal[i]);
      }
    }


    let borderClass = position === 'right' ? ' left' : ' right';

    return (
      <div>
        {quarterFinal.map((item, i) =>
          <div className='quarterFinal' key={i}>
            <span className={'quarterFinalText' + (i % 2 ? borderClass : '')}>Quarter Final {(position === 'left') ? i + 1 : i + 2}</span>
            <span className={'quarterFinalResult' + (i % 2 ? '' : borderClass)}>{item.winner}</span>
          </div>
        )}
      </div>
    );
  }
}

export default QuarterFinal;