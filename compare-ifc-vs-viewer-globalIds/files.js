/**
 * ifcFiles: Contains the GlobalIDs extracted from original IFC files using xbim, with one GlobalID per line
 * viewerFiles: Contains the GlobalIDs after conversion and processing by the viewer, with one GlobalID per line
 * outputFiles: Contains the comparison report. The comparison is case-sensitive
 * outputFiles will contain:
 *  - unique-in-ifc.txt: Contains the GlobalIDs that are present in the IFC file but not in the viewer file
 *  - unique-in-viewer.txt: Contains the GlobalIDs that are present in the viewer file but not in the IFC file
 *  - report.txt: Contains a comprehensive comparison report between the IFC file and viewer file, including:
 *    - Number of GlobalIDs in the IFC file
 *    - Number of GlobalIDs in the viewer file
 *    - Number of GlobalIDs that are in the IFC file but not in the viewer file
 *    - Number of GlobalIDs that are in the viewer file but not in the IFC file (this is considered critical as it should never occur)
 *    - Number of GlobalIDs that are present in both files
 */

export const fileToCompare = [
    {
        ifcFile: "./in/ifc/DigitalHub_FM-ARC_v2-globalIds.txt",
        viewerFile: "./in/viewer/DigitalHub_FM-ARC_v2.txt",
        outputFiles: {
            ifcUnique: "./out/DigitalHub_FM-ARC_v2/unique-in-ifc.txt",
            viewerUnique: "./out/DigitalHub_FM-ARC_v2/unique-in-viewer.txt",
            report: "./out/DigitalHub_FM-ARC_v2/report.txt",
        },
    },
    {
        ifcFile: "./in/ifc/DigitalHub_FM-HZG_v2-globalIds.txt",
        viewerFile: "./in/viewer/DigitalHub_FM-HZG_v2.txt",
        outputFiles: {
            ifcUnique: "./out/DigitalHub_FM-HZG_v2/unique-in-ifc.txt",
            viewerUnique: "./out/DigitalHub_FM-HZG_v2/unique-in-viewer.txt",
            report: "./out/DigitalHub_FM-HZG_v2/report.txt",
        }
    },
    {
        ifcFile: "./in/ifc/DigitalHub_FM-LFT_v2-globalIds.txt",
        viewerFile: "./in/viewer/DigitalHub_FM-LFT_v2.txt",
        outputFiles: {
            ifcUnique: "./out/DigitalHub_FM-LFT_v2/unique-in-ifc.txt",
            viewerUnique: "./out/DigitalHub_FM-LFT_v2/unique-in-viewer.txt",
            report: "./out/DigitalHub_FM-LFT_v2/report.txt",
        }
    },
    {
        ifcFile: "./in/ifc/DigitalHub_FM-SAN_v2-globalIds.txt",
        viewerFile: "./in/viewer/DigitalHub_FM-SAN_v2.txt",
        outputFiles: {
            ifcUnique: "./out/DigitalHub_FM-SAN_v2/unique-in-ifc.txt",
            viewerUnique: "./out/DigitalHub_FM-SAN_v2/unique-in-viewer.txt",  
            report: "./out/DigitalHub_FM-SAN_v2/report.txt",
        }
    },
]