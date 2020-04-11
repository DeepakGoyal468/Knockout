import React from 'react';
import './styles.css';

class GroupStage extends React.Component {

  render() {
    let groups = this.props.groups;
    if (this.props.position === 'right') {
      for (let i = 0; i < groups.length; i += 2){
        [groups[i], groups[i+1]] = [groups[i+1], groups[i]];
      }
    }
    let data = [];
      groups.forEach((item, i) => {
        let result = this.props.getResults(item.teams);
        if (i % 2) {
          data.push({ ...{ "name": item.name }, ...result });
        } else {
          data.push({ ...{ "name": item.name }, ...result });
        }
      });
    return (
      <div>
        <div>
          { data.map((item, i) =>
            <div className='stageResult' key={ i }>
              <span className={ "stageName" + (i % 2 ? ' right' : '') }>Group { item.name + (i % 2 ? ' runners up' : ' winner') }</span>
              <span className={ "result" + (i % 2 ? '' : ' right') }>{ (i % 2 ? item.runnerup : item.winner) }</span>
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default GroupStage;