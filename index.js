/* jshint esversion: 6 */

const { Plugin } = require('powercord/entities');

module.exports = class Mock extends Plugin {
  startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'mock',
      description: 'Mock someone',
      usage: '{c} [text]',
      executor: (args) => this.mock(args.join(' '))
    });
  }

  mock (text) {
    if (!text) {
      return;
    }

    text = text.toLowerCase();
    let result_text = '';

    for (const c of text) {
      if (c === 'i') {
        result_text += c;
      } else if (c === 'l') {
        result_text += c.toUpperCase();
      } else if (Math.random() >= this.count_upper(result_text.slice(-3))) {
        result_text += c.toUpperCase();
      } else {
        result_text += c;
      }
    }
    return {
      send: true,
      result: result_text
    };
  }

  count_upper (text) {
    let count = 0;
    for (const c of text) {
      if (c === c.toUpperCase()) {
        count++;
      }
    }
    return count / text.length;
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('mock');
  }
};
