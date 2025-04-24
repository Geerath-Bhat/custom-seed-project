import fs from 'fs';
import path from 'path';

// Function to ensure directory exists
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

// Read the JSON file
function processProjectCode() {
  try {
    // Read the project-code.json file (fixed typo from 'peoject' to 'project')
    const jsonData = fs.readFileSync('./project-code.json', 'utf8');
    const files = JSON.parse(jsonData);

    console.log(`Processing ${files.length} files...`);

    // Process each file entry
    files.forEach(file => {
      try {
        const filePath = path.join(process.cwd(), file.fileName);

        // Ensure the directory exists
        ensureDirectoryExists(filePath);

        // Write the content to the file
        fs.writeFileSync(filePath, file.content);
        console.log(`Successfully wrote: ${file.fileName}`);
      } catch (err) {
        console.error(`Error writing file ${file.fileName}:`, err);
      }
    });

    console.log('All files processed successfully!');
  } catch (err) {
    console.error('Error processing project code:', err);
  }
}

// Execute the function
processProjectCode();