exports.command = {
	name: "file",
	autoload: true,
	unloadable: false,
	min_rank: 0,
	display: "Show a list of files, or a the content of one",
	help: "There can be a number of files available for you to read. This is the command used to either list or read them.",
	usage: ".file, .file <filename>",

	execute: function(socket, command, command_access) {

		var colorize = require('colorize');
		command = command.trim();
		const fs = require('fs');
		const directory = './files/';

		// if command called without parameters
		if (command.trim() === "") {
			socket.write("+-- List of available files: --------+\r\n");
			fs.readdirSync(directory).forEach(file => {
				socket.write(" " + file + "\r\n");
			});
			socket.write("+------------------------------------+\r\n");
		} else {
			// if command called with parameters
			try {
				socket.write("\r\n" + fs.readFileSync(directory + command) + "\r\n");
			} catch(e) {
				socket.write("That file isn't available.\r\n");
			}
		}
	}
}
