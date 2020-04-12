import React from 'react';
import Groups from '../Groups';
import teams from '../data.json';
import './styles.css';
import GroupStage from '../GroupStage';
import Qualifier from '../Qualifier';
import QuarterFinal from '../QuarterFinal';
import SemiFinal from '../SemiFinal';
import Final from '../Final';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      groups: [],
      groupStage: [],
      groupStageStatus: 0,
      qualifier: [],
      qualifierStatus: [0,0,0,0,0,0,0],
      quarterFinal: [],
      quarterFinalStatus: [0,0,0,0],
      semiFinal: [],
      semiFinalStatus: [0,0],
      final: [],
      finalStatus: [0,0]
    }
  }

  componentDidMount() {
    let groups = this.generateGroups();
    this.setState({ groups: groups }, () => {
      this.getGroupStageResults();
    });
  }

  startTournament = () => {
    
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
    this.state.groups.forEach((item) => {
      let result = this.getResults(item.teams);
      data.push({ ...{ "name": item.name }, ...result });
    });
    this.setState({ groupStage: data }, () => {
      this.getQualifierResults();
    });
  }

  getQualifierResults = () => {
    let qualifierDetails = [];
    let groupStage = this.state.groupStage;
    for (let i = 0; i < groupStage.length; i++) {
      let team = [];
      if (i % 2) {
        team.push(groupStage[i].winner, groupStage[i - 1].runnerup);
      }
      else {
        team.push(groupStage[i].winner, groupStage[i + 1].runnerup);
      }
      let result = this.getResults(team);
      qualifierDetails.push({
        team1: team[0], team2: team[1], status: 0, winner: result.winner
      });
    }
    this.setState({ qualifier: qualifierDetails }, () => {
      this.getQuarterFinalResults(this.state.qualifier);
    });
  }

  getQuarterFinalResults = (data) => {
    let quarterFinalDetails = [];
    let track = new Array(data.length).fill(0);
    for (let i = 0; i < data.length - 2; i++) {
      let team = [];
      if (track[i] === 0) {
        team.push(data[i].winner, data[i + 2].winner);
        track[i] = 1;
        track[i + 2] = 1;
        let result = this.getResults(team);
        quarterFinalDetails.push({
          team1: team[0], team2: team[1], status: 0, winner: result.winner
        });
      }
    }
    this.setState({ quarterFinal: quarterFinalDetails }, () => {
      this.getSemiFinalResults(this.state.quarterFinal);
    });
  }

  getSemiFinalResults = (data) => {
    let semiFinalDetails = [];
    let track = new Array(data.length).fill(0);
    for (let i = 0; i < data.length - 2; i++) {
      let team = [];
      if (track[i] === 0) {
        team.push(data[i].winner, data[i + 2].winner);
        track[i] = 1;
        track[i + 2] = 1;
        let result = this.getResults(team);
        semiFinalDetails.push({
          team1: team[0], team2: team[1], status: 0, winner: result.winner, looser: result.runnerup
        });
      }
    }
    this.setState({ semiFinal: semiFinalDetails }, () => {
      this.getFinalResults(this.state.semiFinal);
    });
  }

  getFinalResults = (data) => {
    let finalMatchDetails = [];
    for (let i = 0; i < data.length; i++) {
      let team = [];
      if (i % 2)
        team.push(data[i].looser, data[i - 1].looser);
      else
        team.push(data[i].winner, data[i + 1].winner);
      let result = this.getResults(team);
      finalMatchDetails.push({
        team1: team[0], team2: team[1], status: 0, winner: result.winner, looser: result.runnerup
      });
    }
    this.setState({ final: finalMatchDetails });
  }

  render() {
    let state = this.state;
    return (
      <div className="game">
        <div className='teams-wrapper'>
          <Groups groups={state.groups} position={'left'} />
        </div>
        <div className='teams-wrapper'>
          <GroupStage groupStage={state.groupStage} position={'left'} />
        </div>
        <div className='teams-wrapper'>
          <Qualifier qualifier={state.qualifier} position={'left'} />
        </div>
        <div className='teams-wrapper'>
          <QuarterFinal quarterFinal={state.quarterFinal} position={'left'} />
        </div>
        <div className='teams-wrapper'>
          <SemiFinal semiFinal={state.semiFinal} position={'left'} />
        </div>
        <div className='teams-wrapper'>
          <Final final={state.final} />
        </div>
        <div className='teams-wrapper'>
          <SemiFinal semiFinal={state.semiFinal} position={'right'} />
        </div>
        <div className='teams-wrapper'>
          <QuarterFinal quarterFinal={state.quarterFinal} position={'right'} />
        </div>
        <div className='teams-wrapper'>
          <Qualifier qualifier={state.qualifier} position={'right'} />
        </div>
        <div className='teams-wrapper'>
          <GroupStage groupStage={state.groupStage} position={'right'} />
        </div>
        <div className='teams-wrapper'>
          <Groups groups={state.groups} position={'right'} />
        </div>
      </div>
    );
  }
}

export default Game;