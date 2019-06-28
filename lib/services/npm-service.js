const spawn = require('cross-spawn');

module.exports = {
	installDependencies,
	installPackage
};

function installDependencies(executionPath = process.cwd()) {
	return new Promise((resolve, reject) => {
		const command = 'npm';
		const args = ['install', '--loglevel', 'error'];

		const child = spawn(command, args, {cwd: executionPath, stdio: 'ignore'});
		child.on('close', code => {
			if (code !== 0) {
				reject(new Error(`Unable to install npm dependencies in path ${executionPath}`));
				return;
			}

			resolve('done');
		});
	});
}

function installPackage(packageName, executionPath = process.cwd()) {
	return new Promise((resolve, reject) => {
		const command = 'npm';
		const args = ['--prefix', executionPath, 'install', packageName, '--no-save'];

		const child = spawn(command, args, {stdio: 'ignore'});

		child.on('close', code => {
			if (code !== 0) {
				reject(
					new Error(`´Unable to install package ${packageName} in path ${executionPath}`)
				);
				return;
			}

			resolve('done');
		});
	});
}
