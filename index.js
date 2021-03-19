const { Plugin } = require('powercord/entities');

module.exports = class Mock extends Plugin {
	startPlugin() {
		powercord.api.commands.registerCommand({
			command: 'mock',
			description: 'Mock someone',
			usage: '{c} [text]',
			executor: function (args) {
				if (args.length <= 0) {
					return;
				}

				let result = '';

				for (const c of args.join(' ')) {
					if (c === 'i' || c === 'l') {
						result += c;
					} else {
						let upperCount = 0;
						let slice = result.slice(-3);

						for (const c of slice) {
							if (c === c.toLowerCase() && c === c.toUpperCase()) {
								upperCount += 0.5;
							} else if (c === c.toUpperCase()) {
								upperCount++;
							}
						}

						if (slice.length <= 0) {
							if (Math.random() < 0.5) {
								result += c.toLowerCase();
							} else {
								result += c.toUpperCase();
							}
						} else if (upperCount / slice.length < Math.random()) {
							result += c.toUpperCase();
						} else {
							result += c.toLowerCase();
						}
					}
				}

				return { send: true, result: result };
			}
		});
	}

	pluginWillUnload() {
		powercord.api.commands.unregisterCommand('mock');
	}
};
