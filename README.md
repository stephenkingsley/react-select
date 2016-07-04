# AWESOMESELECT

This is a select component, provide `hot search`, show `the number of items`. It is simple to use.

## use

    npm i --save react-awesome-select

And in you component

```javascript

import { AwesomeSelect } from 'react-awesome-select';

class Select extends React.Component {
  contructor() {
    super();
    this.state = {
      data: [{
        name: 'Stephen.Kingsley',
        value: 1
      },
      {
        name: 'Tom.Kingsley',
        value: 2
      }]
    };
  }

  render() {
    return (
      <AwesomeSelect
        data={this.state.data}
        onChange={(value, name) => console.log(`---`, value, name)}
      />
    );
  }
}

```

## Props

|props              |type                 |
|:------------------|--------------------:|
|data               |Array(isRequired)    |
|onChange           |function(isRequired) |

### data

```javascript

const data = [{
  name: 'Stephen.Kingsley',
  value: 1
}];

```

### onChange(value, name)

has two parameters, the `value` is the item's value that your choose, and the `name` also is what your choose.
