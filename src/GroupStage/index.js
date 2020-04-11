import React from 'react';
import './styles.css';

class GroupStage extends React.Component {

  render() {
    let groupStage = this.props.groupStage;
    if (this.props.position === 'right') {
      for (let i = 0; i < groupStage.length; i += 2){
        [groupStage[i], groupStage[i+1]] = [groupStage[i+1], groupStage[i]];
      }
    }
   
    return (
      <div>
          { groupStage.map((item, i) =>
            <div className='stageResult' key={ i }>
              <span className={ "stageName" + (i % 2 ? ' right' : '') }>Group { item.name + (i % 2 ? ' runners up' : ' winner') }</span>
              <span className={ "result" + (i % 2 ? '' : ' right') }>{ (i % 2 ? item.runnerup : item.winner) }</span>
            </div>
          ) }
      </div>
    );
  }
}

export default GroupStage;