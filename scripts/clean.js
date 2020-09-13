/**
 * Cleanup script:
 * 
 * Clears out all the build files from typescript ect., also optionally
 * deleting node_modules with the -n (or -node) flag.
 * 
 * A: Novaras
 */

const fs = require('fs');
const del = require('del');
const minimist = require('minimist');

const CLI_PARAMS = Object.freeze(minimist(process.argv.slice(2), {
	alias: {
		n: `node`
	}
}));

const tellResult = (del_response) => {
	if (del_response.length) {
		console.log(del_response.map(file => `🗑️\t${file}`).join(`\n`));
		console.log(`✔️ done!`);
	} else {
		console.log(`🤷 Nothing to clean!`);
	}
}

const remBuildFiles = async () => {
	console.group(`[1]: Remove generated js and sourcemap files...`);
	try {
		tellResult(await del([`./**/*.js`, `./**/*.js.map`, `./**/*.d.ts`, `!scripts`, `!node_modules`, `!./**/*.config.js`]));
	} catch (err) {
		console.error(`❌ Error while deleting .js and .js.map buildfiles!`);
		console.error(err);
	}
	console.groupEnd();
};

const remNodeModules = async () => {
	console.group(`[2]: Remove node_modules...`)
	try {
		console.log(`🗑️\tnode_modules`)
		tellResult(await del(`node_modules`));
	} catch (err) {
		console.error(`❌ Unable to delete node_modules!`);
		console.error(err);
	}
	console.groupEnd();
};

(async () => {
	console.log(`Cleanup script:`);
	await remBuildFiles();
	if (CLI_PARAMS.n) {
		await remNodeModules();
	}
	console.log(`Finished.`)
})();
