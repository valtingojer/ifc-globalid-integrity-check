# IFC GlobalID Extractor

A .NET tool designed to extract Global IDs from IFC (Industry Foundation Classes) files. This utility processes IFC files and generates text files containing the Global IDs of all elements within the IFC models.

## Features

- Extracts Global IDs from IFC files
- Processes multiple IFC files in batch
- Generates separate output files for each processed IFC file
- Provides console feedback about processing status

## Prerequisites

- .NET 8.0 SDK or Runtime

## Dependencies

The project uses the following NuGet packages:

- Xbim.Essentials (v5.1.341)
- Xbim.Geometry (v5.1.341)

## Project Structure

```
├── ifc/                    # Directory for input IFC files
├── out/                    # Directory for output files
├── Program.cs              # Main program logic
├── IFCSpaceObjectsExtractorStrategy.cs  # IFC extraction strategy
└── ifcGlobalIdExtractor.csproj          # Project file
```

## Usage

1. Place your IFC files in the `ifc` directory at the project root
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
dotnet build
dotnet run
```
4. The program will process all IFC files in the array/directory and generate corresponding output files with GlobalIDs in the `out` directory


3. The program will process each IFC file and create corresponding output files in the `out` directory

### Input Files

Place your IFC files in the `ifc` directory. The program comes pre-configured with example files:
- DigitalHub_FM-ARC_v2.ifc
- DigitalHub_FM-HZG_v2.ifc
- DigitalHub_FM-LFT_v2.ifc
- DigitalHub_FM-SAN_v2.ifc

To process different files, modify the `ifcFiles` array in `Program.cs` as shown in the Usage section above.

### Output

For each processed IFC file, the program generates a corresponding text file in the `out` directory with the naming pattern:
`{original_filename}-globalIds.txt`

Each output file contains a list of Global IDs, one per line, representing all elements found in the corresponding IFC file.

## Error Handling

The program includes basic error handling:
- Skips processing if an input file is not found
- Logs errors to the console if they occur during processing
- Continues processing remaining files even if one fails

## Development

To modify the code or contribute to the project:

1. Clone the repository
2. Open the solution in Visual Studio or your preferred IDE
3. Install the required NuGet packages
4. Make your changes
5. Build and test the project