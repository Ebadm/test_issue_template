export interface VersionDetails {
    /** 
     * The main bullet points for the release (previously "notes"). 
     * Show these prominently in the changelog.
     */
    summary: string[]; 
  
    /** 
     * Additional details or bugfixes for the release (previously "summary"). 
     * Shown beneath the summary, with a subtler style.
     */
    details?: string[]; 
    
    type: 'major' | 'minor';
  }
  
  interface VersionHistoryMap {
    [majorMinor: string]: {
      [patch: string]: VersionDetails;
    };
  }
  
  /**
   * We store version data in nested objects:
   * {
   *   '1.0': {
   *     '1': {...},
   *     '2': {...}
   *   },
   *   '1.1': {
   *     '0': {...}
   *   }
   * }
   * That way "1.0.2" is majorMinor="1.0" and patch="2".
   */
  
  export const versionHistory: VersionHistoryMap = {
      '1.1': {
          '0': {
              type: 'major',
              summary: [
                  'Areas and Projects now persist across sessions',
                  'Tool: New filtering tool to identify hotspots in beacons.',
                  'Tool: Isochrone travel time distance tool for walking, biking and driving',
                  'Export options for Sales, Footfall and Profiling data in Beacons and Projects'
              ],
              details: [
                  'Area management tools - delete, edit, merge and import',
                  'New retail centres overlay for Morocco',
                  'Percentile filtering in toolbar for data analysis',
                  'Country-specific beacon selection',
                  'Show warning to reload data when load date is changed'
              ]
          }
      },
      '1.0': {
          '0': {
              type: 'major',
              summary: [
                  'Stable release marking transition from alpha phase',
                  'Core platform for analyzing movement patterns, demographics, and retail insights'
              ],
              details: [
                  'Expanded brand icons coverage to 90%',
                  'Visitor and resident demographics analysis',
                  'New polygon-based catchment analysis',
                  'Global data coverage view',
                  'Faster population data loading'
              ]
          },
          '1-1.0.2': {
              type: 'minor',
              summary: [],
              details: [
                  'Country-specific overlays for GB and shopping centres for all countries',
                  'Minor bug fixes and performance improvements'
              ]
          }
      }
  };
  
  /**
   * Returns a string representing the latest version, e.g. "1.1.0"
   */
  export function getLatestVersion(): string {
    // Gather the majorMinor keys (e.g. [ '1.0', '1.1', ... ]) and sort by numeric
    const sortedMajorMinor = Object.keys(versionHistory).sort((a, b) => {
      const [aMajor, aMinor] = a.split('.').map(Number);
      const [bMajor, bMinor] = b.split('.').map(Number);
      if (aMajor !== bMajor) {
        return aMajor - bMajor;
      }
      return aMinor - bMinor;
    });
  
    // Get the last major-minor
    const latestMajorMinor = sortedMajorMinor[sortedMajorMinor.length - 1];
    // get the patch keys, sort, pick the largest
    const patchKeys = Object.keys(versionHistory[latestMajorMinor]).map(Number).sort((a, b) => a - b);
    const latestPatch = patchKeys[patchKeys.length - 1];
  
    return `${latestMajorMinor}.${latestPatch}`;
  }