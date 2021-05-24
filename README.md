![NPM](https://img.shields.io/npm/l/react-classic-editor)
![npm](https://img.shields.io/npm/v/react-classic-editor)

![react classic editor](https://i.imgur.com/m0NS3J5.png)

React-Classic-Editor adds a rudimentary text editor to your project.

## Installation

```
$ npm install --save react-classic-editor
$ yarn add react-classic-editor
```

## Example

```jsx
  import React from 'react';

  import { Editor } from 'react-classic-editor';
  
  function App(){
    var options = {
      placeholder="Type something"
    }

    return (
      <Editor {...options} />
    );
  }
```
This code will add a text editor to your web page.

## Options

| Name | default |
|--|--|
| border | true |
| showCount | false |
| spellCheck | true |
| toolbar | true |
| autoFocus | true |


## License

Licensed under MIT
