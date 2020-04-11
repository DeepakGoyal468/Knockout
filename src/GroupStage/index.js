import React from 'react';
import './styles.css';

class GroupStage extends React.Component {

  render() {
    let groupStage = this.props.groupStage;
    let position = this.props.position;
    if (position === 'right') {
      for (let i = 0; i < groupStage.length; i += 2) {
        [groupStage[i], groupStage[i + 1]] = [groupStage[i + 1], groupStage[i]];
      }
    }

    let borderClass = position === 'right' ? ' left' : ' right';

    return (
      <div>
        { groupStage.map((item, i) =>
          <div className='stageResult' key={ i }>
            <span className={ "stageName" + (i % 2 ? borderClass : '') }>Group { item.name + (i % 2 ? ' runner up' : ' winner') }</span>
            <span className={ "result" + (i % 2 ? '' : borderClass) }>{ (i % 2 ? item.runnerup : item.winner) }</span>
          </div>
        ) }
      </div>
    );
  }
}

export default GroupStage;