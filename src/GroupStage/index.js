import React from 'react';
import './styles.css';

class GroupStage extends React.Component {

  render() {
    let groups = this.props.groups;
    let data = [];
    let store = localStorage.getItem("stageResult");
    if (store.length) {
      data = JSON.parse(store);
    } else {
      groups.forEach((item, i) => {
        let result = this.props.getResults(item.teams);
        if (i % 2) {
          data.push({ ...{ "name": item.name }, ...result });
        } else {
          data.push({ ...{ "name": item.name }, ...result });
        }
      });
      localStorage.setItem("stageResult", JSON.stringify(data));
    }
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