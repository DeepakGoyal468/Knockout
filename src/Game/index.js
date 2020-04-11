import React from 'react';
import Groups from '../Groups';
import teams from '../data.json';
import './styles.css';
import GroupStage from '../GroupStage';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      groups: []
    }
  }

  componentDidMount() {
    let groups = this.generateGroups();
    this.setState({ groups: groups });
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

  render() {
    return (
      <div className="game">
        <div className='teams-wrapper'>
          <Groups groups={ this.state.groups } position={ 'left' } />
        </div>
        <div className='teams-wrapper'>
        <GroupStage groups={ this.state.groups } getResults={this.getResults} position={ 'left' } />
        </div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'></div>
        <div className='teams-wrapper'>
        <GroupStage groups={ this.state.groups } getResults={this.getResults} position={ 'right' } />
        </div>
        <div className='teams-wrapper'>
        <Groups groups={ this.state.groups } position={ 'right' } />
        </div>
      </div>
    );
  }
}

export default Game;