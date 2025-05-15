using Xbim.Ifc;
using Xbim.Ifc4.Interfaces;

public class IFCSpaceObjectsExtractorStrategy
{

    public IList<string> ExtractGlobalIds(string filePath)
    {
        using var model = IfcStore.Open(filePath);
        var elements = model.Instances.OfType<IIfcElement>();
        return elements.Select(e => e.GlobalId.ToString()).ToList();
    }
}