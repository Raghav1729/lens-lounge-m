// Import the `exec` function from the `child_process` module, which allows us to execute shell commands
({ exec } = require('child_process'));

// Import the `fs` module for interacting with the file system
let fs;
fs = require('fs');

// Import the `glob` module, which allows us to match files using patterns
let glob;
glob = require('glob');

// Check if a migration name has been provided as a command-line argument
if (process.argv.length < 3) {
  // Provide feedback to the user if the migration name is missing
  console.log("You're almost there! Just one more thing... 🚀");
  console.error('Please provide a migration name.');
  process.exit(1); // Exit the process with a non-zero code indicating an error
}

// Extract the migration name from the command-line arguments
const migrationName = process.argv[2];

// Define the path to the TypeORM data source file
const sourceFile = './src/db/data-source.ts';

// Check if the source file exists
if (!fs.existsSync(sourceFile)) {
  console.error(`Source file ${sourceFile} does not exist.`);
  process.exit(1); // Exit the process if the source file doesn't exist
}

// Define the TypeORM migration generation command
const command = `typeorm-ts-node-esm migration:generate ./src/db/migrations/${migrationName} -d ${sourceFile}`;

// Execute the migration generation command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process if there's an error during execution
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    process.exit(1); // Exit the process if there are errors in stderr
  }
  console.log(stdout); // Print the command's output

  // After generating the migration, search for all migration files in the specified directory
  const migrationWildcard = './src/db/migrations/*.ts';
  glob(migrationWildcard, (globError, files) => {
    if (globError) {
      console.error(
        `Error while globbing migration files: ${globError.message}`,
      );
      process.exit(1); // Exit the process if there's an error during file globbing
    }
    if (files.length === 0) {
      console.log('No new migration files found to add to Git staging area.');
      return; // If no files are found, exit early
    }

    // Get the last created migration file (assumes files are sorted by creation time)
    const lastCreatedMigration = files[files.length - 1];

    // Define the Git add command to stage the last created migration file
    const gitAddCommand = `git add ${lastCreatedMigration}`;

    // Execute the Git add command
    exec(gitAddCommand, (addError) => {
      if (addError) {
        console.error(
          `Error adding migration files to Git: ${addError.message}`,
        );
        process.exit(1); // Exit the process if there's an error during Git add
      }
      console.log(
        `Added the last created migration file to Git staging area:\n${lastCreatedMigration}`,
      );
    });

    // Define the ESLint command to fix any linting issues in the migration files
    const eslintFixCommand = `npx eslint --fix ${files.join(' ')}`;

    // Execute the ESLint command
    exec(eslintFixCommand, (eslintError) => {
      if (eslintError) {
        console.error(`Error running ESLint: ${eslintError.message}`);
        process.exit(1); // Exit the process if there's an error during ESLint execution
      }
      console.log('ESLint fixes applied to migration files.');
    });
  });
});
