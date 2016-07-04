import React, { Component } from 'react';
import { AwesomeSelect } from '../src/index';
const fakeData = [
  { name: `hello`, value: 1 },
  { name: `hi`, value: 2 },
  { name: `China`, value: 3 },
  { name: `US`, value: 4 },
  { name: `UK`, value: 5 },
  { name: `Janpan`, value: 6 },
  { name: `Koran`, value: 7 },
  { name: `Canan`, value: 8 },
  { name: `hello`, value: 1 },
  { name: `hi`, value: 2 },
  { name: `China`, value: 3 },
  { name: `US`, value: 4 },
  { name: `UK`, value: 5 },
  { name: `Janpan`, value: 6 },
  { name: `Koran`, value: 7 },
  { name: `Canan`, value: 8 },
  { name: `hello`, value: 1 },
  { name: `hi`, value: 2 },
  { name: `China`, value: 3 },
  { name: `US`, value: 4 },
  { name: `UK`, value: 5 },
  { name: `Janpan`, value: 6 },
  { name: `Koran`, value: 7 },
  { name: `Canan`, value: 8 }
];

const fakeData2 = [
  { name: `111`, value: 1 },
  { name: `222`, value: 2 },
  { name: `333China`, value: 3 },
  { name: `444US`, value: 4 },
  { name: `555UK`, value: 5 },
  { name: `666Janpan`, value: 6 },
  { name: `777Koran`, value: 7 },
  { name: `888Can7an`, value: 8 },
  { name: `999hello`, value: 1 },
  { name: `0000hi`, value: 2 },
  { name: `234China`, value: 3 },
  { name: `2435US`, value: 4 },
  { name: `134UK`, value: 5 },
  { name: `4524Janpan`, value: 6 },
  { name: `134Koran`, value: 7 },
  { name: `2452Canan`, value: 8 },
  { name: `134hello`, value: 1 },
  { name: `452hi`, value: 2 },
  { name: `2452China`, value: 3 },
  { name: `134US`, value: 4 },
  { name: `1341UK`, value: 5 },
  { name: `2435Janpan`, value: 6 },
  { name: `245Koran`, value: 7 },
  { name: `3456Canan`, value: 8 }
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: fakeData
    };
  }

  render() {
    return (
      <div>
        <AwesomeSelect
          data={this.state.data}
          onChange={(value, name) => console.log(`---`, value, name)}
        />
      </div>
    );
  }
}

module.exports = App;
