exports.command = {
	name: "desc",
	autoload: true,
	unloadable: false,
	min_rank: 1,
	display: "sets up your description",
	help: "Sets up a description sentence that will be visible on .who",
	usage: ".desc <description>",


	execute: function(socket, command, command_access) {
		var colorize = require('colorize');
		descMaxLength = 18; // this limit is being currently imposed due to .who's presentation layer

		if ((typeof command === 'undefined') || command.length < 1) {
			socket.write(colorize.ansify("#yellow[::] You have to use it this way: .desc <description here>\r\n"));
		} else if (command.length > descMaxLength) {
			socket.write(colorize.ansify("#red[::] Your description can't have more than #bold[" + descMaxLength + "] characters.\r\n"));
		} else {
			socket.db.desc = command;
			command_access.updateUser(socket.username, socket.db);
			socket.write(colorize.ansify("#green[::] Your description is now: " + command + "\r\n"));
		}
	}
}
