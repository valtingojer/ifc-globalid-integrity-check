# IFC vs Viewer GlobalIDs Comparison Tool

This tool compares GlobalIDs between IFC files and their corresponding viewer representations to identify discrepancies in model data transformation.

## Overview

The IFC vs Viewer GlobalIDs Comparison Tool analyzes the preservation and transformation of GlobalIDs when IFC models are processed for viewer applications. It helps identify:
- GlobalIDs present in the original IFC file
- GlobalIDs present in the viewer representation
- Discrepancies between the two sets of identifiers

## Project Structure

```
├── in/
│   ├── ifc/          # Contains GlobalIDs from original IFC files
│   └── viewer/       # Contains GlobalIDs from viewer processing
├── out/              # Output directory for comparison results
│   └── [model_name]/
│       ├── unique-in-ifc.txt     # GlobalIDs only in IFC file
│       ├── unique-in-viewer.txt   # GlobalIDs only in viewer
│       └── report.txt             # Comprehensive comparison report
```

## Input Files

- **IFC Files**: Text files containing GlobalIDs from original IFC files (one GlobalID per line)
- **Viewer Files**: Text files containing GlobalIDs after viewer processing (one GlobalID per line)

## Output Files

For each comparison, the tool generates three files in the output directory:

1. **unique-in-ifc.txt**: Lists GlobalIDs present only in the IFC file
2. **unique-in-viewer.txt**: Lists GlobalIDs present only in the viewer file
3. **report.txt**: Contains a comprehensive comparison report including:
   - Total number of GlobalIDs in the IFC file
   - Total number of GlobalIDs in the viewer file
   - Number of GlobalIDs unique to the IFC file
   - Number of GlobalIDs unique to the viewer file
   - Number of GlobalIDs present in both files

## Usage

The tool processes files based on a configuration structure:

```javascript
{
    ifcFile: "./in/ifc/[model_name]-globalIds.txt",
    viewerFile: "./in/viewer/[model_name].txt",
    outputFiles: {
        ifcUnique: "./out/[model_name]/unique-in-ifc.txt",
        viewerUnique: "./out/[model_name]/unique-in-viewer.txt",
        report: "./out/[model_name]/report.txt"
    }
}
```

## Sample Results

Here's an example of a comparison report:

```
Number of globalIds in the ifc file: 957
Number of globalIds in the viewer file: 475
Number of globalIds that are in the ifc file but not in the viewer file: 546
Number of globalIds that are in the viewer file but not in the ifc file: 64
Number of globalIds that are in both files: 411
```

This report shows:
- The original IFC file contained 957 GlobalIDs
- The viewer representation contains 475 GlobalIDs
- 546 GlobalIDs were either not rendered or lost during transformation
- 64 new GlobalIDs were probably modified during transformation, *this is considered the most important number, as it should never occur*
- 411 GlobalIDs were preserved through the transformation process

