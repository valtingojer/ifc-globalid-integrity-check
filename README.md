# IFC GlobalID Comparison Tools

This repository contains tools for extracting and comparing GlobalIDs between IFC files and their corresponding viewer representations. The workflow helps identify discrepancies in model data transformation and ensures data integrity throughout the BIM process.

## Overview

The IFC GlobalID comparison process consists of three main steps:

1. **Extract GlobalIDs from IFC files** - Using the .NET-based extractor tool
2. **Extract GlobalIDs from viewer** - Using browser console code in a rendered viewer
3. **Compare the extracted GlobalIDs** - Using the Node.js comparison tool

## Project Structure

```
├── extract-globalid-from-ifc/   # .NET tool to extract GlobalIDs from IFC files
│   ├── ifc/                    # Directory for input IFC files
│   ├── out/                    # Output directory for extracted GlobalIDs
│   └── ...
├── compare-ifc-vs-viewer-globalIds/  # Node.js tool to compare GlobalIDs
│   ├── in/                     # Input directory for comparison
│   │   ├── ifc/                # GlobalIDs from IFC files
│   │   └── viewer/             # GlobalIDs from viewer
│   ├── out/                    # Output directory for comparison results
│   └── ...
```

## Step 1: Extract GlobalIDs from IFC Files

The first step uses the .NET tool to extract GlobalIDs from IFC files.

### Prerequisites

- .NET 8.0 SDK or Runtime
- IFC files to process

### Usage

1. Place your IFC files in the `extract-globalid-from-ifc/ifc` directory
2. Open `Program.cs` and modify the `ifcFiles` array to specify which IFC files you want to process:

```csharp
string[] ifcFiles = new string[] {
    "YourFirstFile.ifc",
    "YourSecondFile.ifc",
    // Add more files as needed
};
```

3. Build and run the project:

```bash
cd extract-globalid-from-ifc
dotnet build
dotnet run
```

4. The program will process each IFC file and create corresponding output files in the `extract-globalid-from-ifc/out` directory with the naming pattern: `{original_filename}-globalIds.txt`

## Step 2: Extract GlobalIDs from Viewer

The second step extracts GlobalIDs from the viewer using browser console code.

### JavaScript Version (for Browser Console)

```javascript
function downloadFile(data, filename) { 
  console.log(`Starting downloadFile for ${filename}`) 

  const header = Object.keys(data[0] || {}).join('\t') 
  const rows = data.map((row) => Object.values(row).join('\t')).join('\n') 
  const csvString = header ? `${rows}` : rows 

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' }) 
  const link = document.createElement('a') 
  const url = URL.createObjectURL(blob) 
  link.setAttribute('href', url) 
  link.setAttribute('download', filename) 
  link.style.visibility = 'hidden' 
  document.body.appendChild(link) 
  link.click() 
  document.body.removeChild(link) 

  console.log(`Finished downloadFile for ${filename}`) 
} 

function exportAllGlobalIds(fragmentsManager) { 
  console.log('Starting exportAllGlobalIds') 

  const meshes = fragmentsManager.meshes 
  console.log('Found', meshes.length, 'meshes') 

  const globalIds = Array.from( 
    new Set( 
      meshes 
        .map((mesh) => { 
          console.log('looking for globalIds...') 
          const meshByUuidData = MeshUtils.getMeshDataByMeshObject(mesh) 
          return meshByUuidData.globalId 
        }) 
        .filter((globalId) => !!globalId), 
    ), 
  ) 

  console.log('extracted', globalIds.length, 'unique globalIds') 

  downloadFile( 
    globalIds.map((id) => ({ globalId: id })), 
    `exported_all_${globalIds.length}_global_ids_in_${meshes.length}_time_${Date.now()}.txt`, 
  ) 

  console.log('Finished exportAllGlobalIds') 
}

// Usage: Call this function with your fragmentsManager instance
```

### TypeScript Version (for Project Integration)

```typescript
function downloadFile(data: any[], filename: string): void { 
  console.log(`Starting downloadFile for ${filename}`) 

  const header = Object.keys(data[0] || {}).join('\t') 
  const rows = data.map((row) => Object.values(row).join('\t')).join('\n') 
  const csvString = header ? `${rows}` : rows 

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' }) 
  const link = document.createElement('a') 
  const url = URL.createObjectURL(blob) 
  link.setAttribute('href', url) 
  link.setAttribute('download', filename) 
  link.style.visibility = 'hidden' 
  document.body.appendChild(link) 
  link.click() 
  document.body.removeChild(link) 

  console.log(`Finished downloadFile for ${filename}`) 
} 

exportAllGlobalIds(fragmentsManager: any): void { 
  console.log('Starting exportAllGlobalIds') 

  const meshes = fragmentsManager.meshes as any[] 
  console.log('Found', meshes.length, 'meshes') 

  const globalIds: string[] = Array.from( 
    new Set( 
      meshes 
        .map((mesh: any) => { 
          console.log('looking for globalIds...') 
          const meshByUuidData = MeshUtils.getMeshDataByMeshObject(mesh) 
          return meshByUuidData.globalId 
        }) 
        .filter((globalId): globalId is string => !!globalId), 
    ), 
  ) 

  console.log('extracted', globalIds.length, 'unique globalIds') 

  downloadFile( 
    globalIds.map((id) => ({ globalId: id })), 
    `exported_all_${globalIds.length}_global_ids_in_${meshes.length}_time_${Date.now()}.txt`, 
  ) 

  console.log('Finished exportAllGlobalIds') 
}

// Usage: Call this method with your fragmentsManager instance
```

### Usage Instructions

1. Open your IFC viewer in a web browser
2. Open the browser's developer console (F12 or right-click > Inspect > Console)
3. Copy and paste the JavaScript version of the code into the console
4. Call the `exportAllGlobalIds` function with your viewer's fragmentsManager instance
5. A text file containing the GlobalIDs will be downloaded automatically
6. Rename the downloaded file according to your model name for clarity

## Step 3: Compare the Extracted GlobalIDs

The final step compares the GlobalIDs extracted from both sources using the Node.js comparison tool.

### Prerequisites

- Node.js installed
- Extracted GlobalID files from both IFC and viewer

### Setup

1. Copy the GlobalID files extracted from IFC files to `compare-ifc-vs-viewer-globalIds/in/ifc/`
2. Copy the GlobalID files extracted from the viewer to `compare-ifc-vs-viewer-globalIds/in/viewer/`
3. Update the `files.js` configuration to include your files:

```javascript
export const fileToCompare = [
    {
        ifcFile: "./in/ifc/YourModel-globalIds.txt",
        viewerFile: "./in/viewer/YourModel.txt",
        outputFiles: {
            ifcUnique: "./out/YourModel/unique-in-ifc.txt",
            viewerUnique: "./out/YourModel/unique-in-viewer.txt",
            report: "./out/YourModel/report.txt",
        },
    },
    // Add more file pairs as needed
];
```

### Running the Comparison

1. Navigate to the comparison tool directory:

```bash
cd compare-ifc-vs-viewer-globalIds
```

2. Install dependencies (first time only):

```bash
npm install
```

3. Run the comparison:

```bash
npm start
```

4. View the results in the `compare-ifc-vs-viewer-globalIds/out/` directory

## Understanding the Results

For each comparison, the tool generates three files:

1. **unique-in-ifc.txt**: Lists GlobalIDs present only in the IFC file
2. **unique-in-viewer.txt**: Lists GlobalIDs present only in the viewer file
3. **report.txt**: Contains a comprehensive comparison report

Example report:

```
Number of globalIds in the ifc file: 957
Number of globalIds in the viewer file: 475
Number of globalIds that are in the ifc file but not in the viewer file: 546
Number of globalIds that are in the viewer file but not in the ifc file: 64
Number of globalIds that are in both files: 411
```

Key Thoughts:

- **GlobalIDs unique to IFC file**: These elements were probably not rendered or lost during the transformation process, indicating potential data loss in the viewer representation.

- **GlobalIDs unique to viewer file**: This is the most critical inconsistency metric as it represents GlobalIDs that changed during transformation, meaning we've lost relationship data between the original IFC and its viewer representation.

- **GlobalIDs in both files**: This is the positive metric showing elements that were successfully preserved through the transformation process, maintaining data integrity.
