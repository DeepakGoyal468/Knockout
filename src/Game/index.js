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
      qualifierStatus: [0, 0, 0, 0, 0, 0, 0, 0],
      quarterFinal: [],
      quarterFinalStatus: [0, 0, 0, 2],
      semiFinal: [],
      semiFinalStatus: [0, 2],
      final: [],
      finalStatus: [0, 2]
    }
  }

  componentDidMount() {
    let groups = this.generateGroups();
    this.setState({ groups: groups }, () => {
      this.startTournament();
    });
  }

  startTournament = () => {
    let isGroupStageDone = this.state.groupStageStatus === 2;
    let isQualifierDone = this.state.qualifierStatus.lastIndexOf(2) === 7;
    let isQuarterFinalDone = this.state.quarterFinalStatus.lastIndexOf(2) === 3;
    let isSemiFinalDone = this.state.semiFinalStatus.lastIndexOf(2) === 1;
    let isFinalDone = this.state.finalStatus.lastIndexOf(2) === 1;
    if (!isGroupStageDone) {
      this.getGroupStageResults();
    }
    else if (!isQualifierDone) {
      this.getQualifierResults();
    }
    else if (!isQuarterFinalDone) {
      this.getQuarterFinalResults();
    }
    else if (!isSemiFinalDone) {
      this.getSemiFinalResults();
    }
    else if (!isFinalDone) {
      this.getFinalResults();
    }
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
    this.setState({ groupStage: data, groupStageStatus: 2 }, () => {
      this.startTournament();
    });
  }

  getQualifierResults = () => {
    debugger;
    let qualifierDetails = [];
    let groupStage = this.state.groupStage;
    let qualifierStatus = this.state.qualifierStatus;
    for (let i = 0; i < groupStage.length; i++) {
      setTimeout(() => {
        let team = [];
        console.log(qualifierStatus);
        qualifierStatus[i] = 1;
        this.setState({ qualifierStatus: qualifierStatus })
        if (i % 2) {
          team.push(groupStage[i].winner, groupStage[i - 1].runnerup);
        }
        else {
          team.push(groupStage[i].winner, groupStage[i + 1].runnerup);
        }
        let result = this.getResults(team);
        qualifierDetails.push({
          winner: result.winner, looser: result.runnerup
        });
        qualifierStatus[i] = 2;
        this.setState({ qualifierStatus: qualifierStatus, qualifier: qualifierDetails })
      }, 1000 * i);
    }
    this.startTournament()
  }

  getQuarterFinalResults = () => {
    let quarterFinalDetails = [];
    let qualifier = this.state.qualifier;
    let quarterFinalStatus = this.state.quarterFinalStatus;
    let track = new Array(qualifier.length).fill(0);
    for (let i = 0; i < qualifier.length - 2; i++) {
      let team = [];
      quarterFinalStatus[i] = 1;
      if (track[i] === 0) {
        team.push(qualifier[i].winner, qualifier[i + 2].winner);
        track[i] = 1;
        track[i + 2] = 1;
        let result = this.getResults(team);
        quarterFinalDetails.push({
          winner: result.winner, looser: result.runnerup
        });
        quarterFinalStatus[i] = 2;
      }
    }
    this.setState({ quarterFinal: quarterFinalDetails }, () => {
      this.startTournament();;
    });
  }

  getSemiFinalResults = () => {
    let semiFinalDetails = [];
    let quarterFinal = this.state.quarterFinal;
    let semiFinalStatus = this.state.semiFinalStatus;
    let track = new Array(quarterFinal.length).fill(0);
    for (let i = 0; i < quarterFinal.length - 2; i++) {
      let team = [];
      semiFinalStatus[i] = 1;
      if (track[i] === 0) {
        team.push(quarterFinal[i].winner, quarterFinal[i + 2].winner);
        track[i] = 1;
        track[i + 2] = 1;
        let result = this.getResults(team);
        semiFinalDetails.push({
          winner: result.winner, looser: result.runnerup
        });
        semiFinalStatus[i] = 2;
      }

    }
    this.setState({ semiFinal: semiFinalDetails }, () => {
      this.startTournament();
    });
  }

  getFinalResults = (data) => {
    let finalMatchDetails = [];
    let semiFinal = this.state.semiFinal;
    for (let i = 0; i < semiFinal.length; i++) {
      let team = [];
      if (i % 2)
        team.push(semiFinal[i].looser, semiFinal[i - 1].looser);
      else
        team.push(semiFinal[i].winner, semiFinal[i + 1].winner);
      let result = this.getResults(team);
      finalMatchDetails.push({
        winner: result.winner, looser: result.runnerup
      });
    }
    this.setState({ final: finalMatchDetails }, () => {
      this.startTournament();
    });
  }

  render() {
    let state = this.state;
    return (
      <div className="game">
        <div className='teams-wrapper'>
          <Groups groups={ state.groups } position={ 'left' } />
        </div>
        <div className='teams-wrapper'>
          <GroupStage groupStage={ state.groupStage } position={ 'left' } />
        </div>
        <div className='teams-wrapper'>
          <Qualifier qualifier={ state.qualifier } position={ 'left' } />
        </div>
        <div className='teams-wrapper'>
          <QuarterFinal quarterFinal={ state.quarterFinal } position={ 'left' } />
        </div>
        <div className='teams-wrapper'>
          <SemiFinal semiFinal={ state.semiFinal } position={ 'left' } />
        </div>
        <div className='teams-wrapper'>
          <Final final={ state.final } />
        </div>
        <div className='teams-wrapper'>
          <SemiFinal semiFinal={ state.semiFinal } position={ 'right' } />
        </div>
        <div className='teams-wrapper'>
          <QuarterFinal quarterFinal={ state.quarterFinal } position={ 'right' } />
        </div>
        <div className='teams-wrapper'>
          <Qualifier qualifier={ state.qualifier } position={ 'right' } />
        </div>
        <div className='teams-wrapper'>
          <GroupStage groupStage={ state.groupStage } position={ 'right' } />
        </div>
        <div className='teams-wrapper'>
          <Groups groups={ state.groups } position={ 'right' } />
        </div>
      </div>
    );
  }
}

export default Game;