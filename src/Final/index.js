import React from 'react';
import './styles.css';
import fifa from '../fifa.jpeg';

class Final extends React.Component {

  render() {
    let final = this.props.final;
    return (
          <div>
            <FinalItem type={ 'Champion' } result={ final[0] ? final[0].winner : '---' } />
            <FinalItem type={ 'Runner Up' } result={ final[0] ? final[0].looser : '---'} />
            <img src={fifa} alt='hi' height={100} width={60}></img>
            <FinalItem type={ '3rd Place' } result={ final[1] ? final[1].winner : '---' } />
            <FinalItem type={ '4th Place' } result={ final[1] ? final[1].looser : '---' } />
          </div>
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