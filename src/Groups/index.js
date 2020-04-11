import React from 'react';
import './styles.css';

class Groups extends React.Component {

  render() {
    let groups = this.props.groups;
    let position = this.props.position;
    if (position === 'right') {
      for (let i = 0; i < groups.length; i += 2) {
        [groups[i], groups[i + 1]] = [groups[i + 1], groups[i]];
      }
    }
    return (
      <div>
        { groups.map((item, i) =>
          <div className={ 'group' + (i % 2 ? ' even' : ' odd') } key={ i }>
            { position === 'left' && <span className="groupName">{ item.name }</span> }
            <div className="teams">
              { item.teams.map((item, i) =>
                <span className='teamName' key={ i }>{ item }</span>
              ) }
            </div>
            { position === 'right' && <span className="groupName">{ item.name }</span> }
          </div>
        ) }
      </div>
    );
  }
}

export default Groups;