import React from 'react';
import './styles.css';

class Final extends React.Component {

  render() {
    let final = this.props.final;
    return (
    <>
      {
        final.length &&
          <div>
            <FinalItem type={ 'Champion' } result={ final[0].winner } />
            <FinalItem type={ 'Runner Up' } result={ final[0].looser } />
            <FinalItem type={ '3rd Place' } result={ final[1].winner } />
            <FinalItem type={ '4th Place' } result={ final[1].looser } />
          </div>
        
        }
        </>
    );
  }
}

const FinalItem = (props) => {
  return (
    <div className='final'>
      <span className='finalResult'>{ props.result }</span>
      <span className='finalText'>{ props.type }</span>
    </div>
  );
}

export default Final;