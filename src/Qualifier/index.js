import React from 'react';
import './styles.css';

class Qualifier extends React.Component {

  render() {
    let qualifier = [];
    let position = this.props.position;
    let startIndex = position === 'left' ? 0 : 1;
    if (this.props.qualifier.length) {
      for (let i = startIndex; i < 8; i += 2) {
        qualifier.push(this.props.qualifier[i]);
      }
    }

    let borderClass = position === 'right' ? ' left' : ' right';

    return (
      <div>
        { qualifier.map((item, i) =>
          <div className='qualifier' key={ i }>
            <span className={'qualifierText' + (i % 2 ? borderClass : '') }>Qualifier { (position === 'left') ? i + 1 : i + 5 }</span>
            <span className={'qualifierResult' + (i % 2 ? '' : borderClass) }>{ item.winner }</span>
          </div>
        ) }
      </div>
    );
  }
}

export default Qualifier;