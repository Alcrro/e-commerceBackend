const fs = require("fs");
const path = require("path");

function createStructureFromFile(filePath) {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const currentPath = [];

  lines.forEach((line) => {
    const strippedLine = line.trim();
    if (!strippedLine) return; // Skip empty lines

    const indentLevel = line.length - line.trimStart().length;
    const name = strippedLine;

    // Adjust current path based on indentation
    currentPath.splice(indentLevel / 2);
    currentPath.push(name);

    const fullPath = path.join(...currentPath);

    if (name.endsWith("/")) {
      // It's a folder
      fs.mkdirSync(fullPath, { recursive: true });
    } else {
      // It's a file
      const folderPath = path.dirname(fullPath);
      fs.mkdirSync(folderPath, { recursive: true }); // Ensure folder exists
      fs.writeFileSync(fullPath, ""); // Create an empty file
    }
  });
}

// Example usage
const filePath = "D:/vs code/utils/node_js_structure_folders.txt"; // Replace with the path to your plaintext file
createStructureFromFile(filePath);
