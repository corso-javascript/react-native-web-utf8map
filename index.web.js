import App from './app/views/index'

import React, {
  AppRegistry,
} from 'react-native'

AppRegistry.registerComponent('UTF8Map', () => App);

var app = document.createElement('div');

/* Toolbar color */
var meta = document.createElement('meta');
meta.name = "theme-color";
meta.content = "#1E6ADC";
document.getElementsByTagName('head')[0].appendChild(meta);

document.title="UTF8Map"
document.body.appendChild(app);

AppRegistry.runApplication('UTF8Map', {
  rootTag: app
})
