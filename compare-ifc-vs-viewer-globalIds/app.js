import fs from 'fs/promises';
import path from 'path';
import { fileToCompare } from './files.js';

/**
 * Reads a file and returns its content as a Set of strings (one per line)
 * @param {string} filePath - Path to the file to read
 * @returns {Promise<Set<string>>} Set containing each line of the file
 */
async function readFileToSet(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    return new Set(content.split('\n').map(line => line.trim()).filter(line => line));
}

/**
 * Creates a directory if it doesn't exist
 * @param {string} dirPath - Path to the directory
 */
async function ensureDirectoryExists(dirPath) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

/**
 * Generates a comparison report between IFC and viewer files
 * @param {Set<string>} ifcSet - Set of IFC global IDs
 * @param {Set<string>} viewerSet - Set of viewer global IDs
 * @returns {{ ifcUnique: string[], viewerUnique: string[], report: string[] }}
 */
function generateReport(ifcSet, viewerSet) {
    const ifcUnique = [...ifcSet].filter(id => !viewerSet.has(id));
    const viewerUnique = [...viewerSet].filter(id => !ifcSet.has(id));
    const commonCount = ifcSet.size - ifcUnique.length;

    const report = [
        `Number of globalIds in the ifc file: ${ifcSet.size}`,
        `Number of globalIds in the viewer file: ${viewerSet.size}`,
        `Number of globalIds that are in the ifc file but not in the viewer file: ${ifcUnique.length}`,
        `Number of globalIds that are in the viewer file but not in the ifc file: ${viewerUnique.length}`,
        `Number of globalIds that are in both files: ${commonCount}`
    ];

    return { ifcUnique, viewerUnique, report };
}

/**
 * Main function to process all file comparisons
 */
async function main() {
    try {
        for (const comparison of fileToCompare) {
            // Read files into sets
            const ifcSet = await readFileToSet(comparison.ifcFile);
            const viewerSet = await readFileToSet(comparison.viewerFile);

            // Generate comparison report
            const { ifcUnique, viewerUnique, report } = generateReport(ifcSet, viewerSet);

            // Ensure output directory exists
            const outputDir = path.dirname(comparison.outputFiles.report);
            await ensureDirectoryExists(outputDir);

            // Write results to files
            await fs.writeFile(comparison.outputFiles.ifcUnique, ifcUnique.join('\n'));
            await fs.writeFile(comparison.outputFiles.viewerUnique, viewerUnique.join('\n'));
            await fs.writeFile(comparison.outputFiles.report, report.join('\n'));

            console.log(`Processed comparison for ${path.basename(comparison.ifcFile)}`);
        }
        console.log('All comparisons completed successfully!');
    } catch (error) {
        console.error('Error processing comparisons:', error);
        process.exit(1);
    }
}

// Run the application
main();