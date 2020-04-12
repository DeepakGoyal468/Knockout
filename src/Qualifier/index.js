import React from 'react';
import './styles.css';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';

class Qualifier extends React.Component {

  renderQualifier = (qualifier, qualifierStatus, index) => {
    let data = [];
    let borderClass = this.props.position === 'right' ? ' left' : ' right';
    for (let i = 0; i < 4; i++) {
      data.push(
        <div className='qualifier' key={ i }>
          <span className={ 'qualifierText' + (i % 2 ? borderClass : '') }>Qualifier { index[i] }</span>
          { qualifierStatus[i] === 2 &&
            <span className={ 'qualifierResult' + (i % 2 ? '' : borderClass) }>{ qualifier[i].winner }</span>
          }
          { qualifierStatus[i] === 1 &&
            <span className={ 'qualifierResult' + (i % 2 ? '' : borderClass) }><Dots color='#03823a' /></span>
          }
          { qualifierStatus[i] === 0 &&
            <span className={ 'qualifierResult' + (i % 2 ? '' : borderClass) }>{ '---' }</span>
          }
        </div>
      )
    }
    return data;
  }

  render() {
    let qualifier = [];
    let position = this.props.position;
    let qualifierStatus = [];
    let index = [];
    let startIndex = position === 'left' ? 0 : 1;
      for (let i = startIndex; i < 8; i+=2) {
        qualifier.push(this.props.qualifier[i]);
        qualifierStatus.push(this.props.qualifierStatus[i]);
        index.push(i+1);
      }
      return (
        <div>
          { this.renderQualifier(qualifier, qualifierStatus, index) }
        </div>
      )
  }
}

export default Qualifier;