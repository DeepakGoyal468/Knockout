import React from 'react';
import Groups from '../Groups';
import teams from '../data.json';
import './styles.css';
import GroupStage from '../GroupStage';
import Qualifier from '../Qualifier';
import QuarterFinal from '../QuarterFinal';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      groups: [],
      groupStage: [],
      qualifier: []
    }
  }

  componentDidMount() {
    let groups = this.generateGroups();
    this.setState({ groups: groups }, () => {
      this.getGroupStageResults();
    });
  }

  shuffle = (data) => {
    let list = JSON.parse(JSON.stringify(data));
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  generateGroups = () => {
    let teamList = this.shuffle(teams);
    let groups = [];
    let char = 65;
    for (let i = 0; i < teamList.length; i += 4) {
      let groupName = String.fromCharCode(char);
      groups.push({
        name: groupName,
        teams: [
          teamList[i].teamName,
          teamList[i + 1].teamName,
          teamList[i + 2].teamName,
          teamList[i + 3].teamName
        ]
      });
      char++;
    }
    return groups;
  }

  getResults = (data) => {
    let shuffledData = this.shuffle(data);
    let result = {
      "winner": shuffledData[0],
      "runnerup": shuffledData[1]
    }
    return result;
  }

  getGroupStageResults = () => {
    let data = [];
    this.state.groups.forEach((item, i) => {
      let result = this.getResults(item.teams);
      if (i % 2) {
        data.push({ ...{ "name": item.name }, ...result });
      } else {
        data.push({ ...{ "name": item.name }, ...result });
      }
    });
    this.setState({ groupStage: data }, () => {
      this.getQualifierResults();
    });
  }

  getQualifierResults = () => {
    let qualifier_details = [];
    let groupStage = this.state.groupStage;
    for (let i = 0; i < groupStage.length; i++) {
      let data = [];
      if (i % 2 === 0) {
        data.push(groupStage[i].winner, groupStage[i + 1].runnerup);
        let result = this.getResults(data);
        qualifier_details.push({
          team1: groupStage[i].winner,
          team2: groupStage[i + 1].runnerup,
          status: 0,
          winner: result.winner
        });
      }
      else {
        data.push(groupStage[i].winner, groupStage[i - 1].runnerup);
        let result = this.getResults(data);
        qualifier_details.push({
          team1: groupStage[i].winner,
          team2: groupStage[i - 1].runnerup,
          status: 0,
          winner: result.winner
        });
      }
    }
    this.setState({ qualifier: qualifier_details });
  }

  render() {
    return (
      <div className="game">
        <div className='teams-wrapper'>
          <Groups groups={this.state.groups} position={'left'} />
        </div>
        <div className='teams-wrapper'>
          <GroupStage groupStage={this.state.groupStage} position={'left'} />
        </div>
        <div className='teams-wrapper'>
          <Qualifier />
        </div>
        <div className='teams-wrapper'>
          <QuarterFinal />
        </div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'>
          <QuarterFinal />
        </div>
        <div className='teams-wrapper'>
          <Qualifier />
        </div>
        <div className='teams-wrapper'>
          <GroupStage groupStage={this.state.groupStage} position={'right'} />
        </div>
        <div className='teams-wrapper'>
          <Groups groups={this.state.groups} position={'right'} />
        </div>
      </div>
    );
  }
}

export default Game;