import React from 'react';
import './styles.css';

class SemiFinal extends React.Component {

  render() {
    let semiFinal = this.props.semiFinal;
    let position = this.props.position;
    let borderClass = position === 'right' ? ' left' : ' right';

  return (
    <div>
     { semiFinal.map((item, i) =>
      <div className='semiFinal' key={ i }>
         <span className={ 'semiFinalText' + (i % 2 ? borderClass : '') }>{ (i % 2) ? 'Winner ' : 'Looser ' } of SemiFinal { i }</span>
      <span className={'semiFinalResult' + (i % 2 ? '' : borderClass) }>{ item.winner }</span>
      </div>
    ) }
    </div>
  );
  }
}

export default SemiFinal;