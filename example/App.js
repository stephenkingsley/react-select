import React, { Component } from 'react';
import { AwesomeSelect } from '../src/index';

const fakeData = [
  { name: `China`, value: 1, selected: true },
  { name: `Australia`, value: 2 },
  { name: `Austria`, value: 3 },
  { name: `Belgium`, value: 4 },
  { name: `Canada`, value: 5 },
  { name: `Denmark`, value: 6 },
  { name: `Ecuador`, value: 7 },
  { name: `Egypt`, value: 8 },
  { name: `Finland`, value: 9 },
  { name: `France`, value: 10 },
  { name: `Georgia`, value: 11 },
  { name: `Germany`, value: 12 },
  { name: `Greece`, value: 13 },
  { name: `Hungary`, value: 14 },
  { name: `Iceland`, value: 15 },
  { name: `India`, value: 16, selected: true },
  { name: `Iran`, value: 17, selected: true },
  { name: `Italy`, value: 18, selected: true }
];

const fakeDataOfSingle = [
  { name: `China`, value: 1, selected: true },
  { name: `Australia`, value: 2 },
  { name: `Austria`, value: 3 },
  { name: `Belgium`, value: 4 },
  { name: `Canada`, value: 5 },
  { name: `Denmark`, value: 6 },
  { name: `Ecuador`, value: 7 },
  { name: `Egypt`, value: 8 },
  { name: `Finland`, value: 9 },
  { name: `France`, value: 10 },
  { name: `Georgia`, value: 11 },
  { name: `Germany`, value: 12 },
  { name: `Greece`, value: 13 },
  { name: `Hungary`, value: 14 },
  { name: `Iceland`, value: 15 },
  { name: `India`, value: 16 },
  { name: `Iran`, value: 17 },
  { name: `Italy`, value: 18 }
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: fakeData
    };
  }

  render() {
    const { singleChoose } = this.state;
    return (
      <div>
        single select
        <div style={{ margin: `10px 5px` }}>
          <AwesomeSelect
            data={fakeDataOfSingle}
            onChange={(value, name) => console.log(value, name)}
          />
        </div>
        MultiSelect
        <div style={{ margin: `10px 5px` }}>
          <AwesomeSelect
            data={this.state.data}
            mult
            onBlur={() => console.log('--- blur')}
            onChange={(value, name, allChoose) => console.log(`${value} ${name}`, allChoose)}
          />
        </div>
      </div>
    );
  }
}

module.exports = App;
