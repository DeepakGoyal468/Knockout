import React from 'react';
import './styles.css';

class SemiFinal extends React.Component {

  render() {
    let position = this.props.position;
    let semiFinal = this.props.semiFinal;
    let data = []
    if (semiFinal.length) {
      data = position === 'left' ? semiFinal[0] : semiFinal[1];
    }
    return (
      <div>
        <SemiFinalItem type={ 'Winner' } number={ position === 'left' ? 1 : 2 } result={ data.winner } />
        <SemiFinalItem type={ 'Looser' } number={ position === 'left' ? 1 : 2 } result={ data.looser } />
      </div>
    );
  }
}

const SemiFinalItem = (props) => {
  return (
    <div className='semiFinal'>
      <span className='semiFinalText'>{ props.type } of SemiFinal { props.number }</span>
      <span className='semiFinalResult'>{ props.result ? props.result : '---' }</span>
    </div>
  );
}

export default SemiFinal;