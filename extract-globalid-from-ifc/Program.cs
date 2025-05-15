using Xbim.Ifc;
using Xbim.Ifc4.Interfaces;

// Get the base directory (where the executable is)
string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
// Navigate up to the project root (3 levels up from bin/Debug/net8.0)
string projectRoot = Path.GetFullPath(Path.Combine(baseDirectory, "..", "..", ".."));

string[] ifcFiles = new string[] {
    "DigitalHub_FM-ARC_v2.ifc",
    "DigitalHub_FM-HZG_v2.ifc", 
    "DigitalHub_FM-LFT_v2.ifc",
    "DigitalHub_FM-SAN_v2.ifc",
};

foreach (var ifcFile in ifcFiles)
{
    try
    {
        var ifcFilePath = Path.Combine(projectRoot, "ifc", ifcFile);
        if (!File.Exists(ifcFilePath))
        {
            Console.WriteLine($"File not found: {ifcFilePath}");
            continue;
        }

        using var model = IfcStore.Open(ifcFilePath);
        var elements = model.Instances.OfType<IIfcElement>();
        var globalIds = elements.Select(e => e.GlobalId.ToString()).ToList();

        var outputFileName = $"{Path.GetFileNameWithoutExtension(ifcFile)}-globalIds.txt";
        var outputPath = Path.Combine(projectRoot, "out", outputFileName);

        Directory.CreateDirectory(Path.Combine(projectRoot, "out"));
        await File.WriteAllLinesAsync(outputPath, globalIds);

        Console.WriteLine($"Processed {ifcFile}: Found {globalIds.Count} elements");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error processing {ifcFile}: {ex.Message}");
    }
}

