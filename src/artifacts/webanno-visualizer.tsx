import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import Papa from 'papaparse';

// Define colors for different annotation types
const colorMap = {
  // Named Entity Types
  'LOC_NAME': '#8dd3c7',
  'DATE': '#5e4fa2', // Changed from light yellow to blue-purple
  'DOC': '#bebada',
  'PRF': '#fb8072',
  'PER_NAME': '#80b1d3',
  'SHIP_TYPE': '#fdb462',
  'SHIP': '#b3de69',
  'LOC_ADJ': '#fccde5',
  'ETH_REL': '#d9d9d9',
  'STATUS': '#bc80bd',
  'PER_ATTR': '#ccebc5',
  'ORG': '#d7191c', // Changed from light yellow to red
  'CMTY_QUANT': '#a6cee3',
  
  // Semantic Predicate Types
  'EndingContractualAgreement': '#1f78b4',
  'Request': '#33a02c',
  'Giving': '#e31a1c',
  'SocialStatusChange': '#ff7f00',
  'Arriving': '#6a3d9a',
  'SocialInteraction': '#b15928',
  'Transportation': '#a6761d',
  'HavingInternalState-': '#e6ab02',
  'ForceToAct': '#66a61e',
  'Destroying': '#e7298a',
  'Leaving': '#7570b3',
  
  // Relation Types
  'isOfType': '#d95f02',
  'evokes': '#1b9e77',
};

// Function to get a color for a type, handling variations with indices
const getColorForType = (type) => {
  // Remove indices like [22] or [26] for color mapping
  const baseType = type.replace(/\[\d+\]$/, '');
  return colorMap[baseType] || '#cccccc';
};

const WebAnnoVisualizer = () => {
  // State definitions
  const [textSections, setTextSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNamedEntities, setShowNamedEntities] = useState(true);
  const [showSemanticPredicates, setShowSemanticPredicates] = useState(true);
  const [showRelationTypes, setShowRelationTypes] = useState(true);
  const [currentFile, setCurrentFile] = useState('');
  const [availableFiles, setAvailableFiles] = useState(['CURATION_USER17553126473764989800.tsv']);
  const fileInputRef = useRef(null);

  // Function to process WebAnno TSV data
  const processTsvData = (tsvData) => {
    try {
      // Process the data
      const sections = tsvData.split('\n\n#Text=');
      
      if (sections.length <= 1) {
        setError('Invalid WebAnno TSV format. Could not find text sections.');
        setLoading(false);
        return [];
      }
      
      return sections.slice(1).map(section => {
        const lines = section.split('\n');
        const text = lines[0];
        const annotations = lines.slice(1)
          .filter(line => line.trim() !== '' && !line.startsWith('#'))
          .map(line => {
            const parts = line.split('\t');
            if (parts.length < 10) {
              // Handle incomplete lines by padding with empty values
              while (parts.length < 10) {
                parts.push('_');
              }
            }
            return {
              id: parts[0],
              span: parts[1],
              token: parts[2],
              namedEntityInfo: parts[3],
              namedEntityType: parts[4],
              semArgInfo: parts[5],
              semArgType: parts[6],
              semPredInfo: parts[7],
              semPredType: parts[8],
              relationType: parts[9]
            };
          });
        
        return {
          text,
          annotations
        };
      });
    } catch (err) {
      console.error('Error processing TSV data:', err);
      setError('Failed to process the WebAnno TSV data');
      setLoading(false);
      return [];
    }
  };
  
  // Function to load a TSV file
  const loadTsvFile = async (filename) => {
    setLoading(true);
    setError(null);
    try {
      const tsvData = await window.fs.readFile(filename, { encoding: 'utf8' });
      const processedSections = processTsvData(tsvData);
      setTextSections(processedSections);
      setCurrentFile(filename);
      setLoading(false);
    } catch (err) {
      console.error('Error loading TSV file:', err);
      setError(`Failed to load the file: ${filename}`);
      setLoading(false);
    }
  };
  
  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const tsvData = e.target.result;
      const processedSections = processTsvData(tsvData);
      setTextSections(processedSections);
      setCurrentFile(file.name);
      setLoading(false);
    };
    
    reader.onerror = () => {
      setError('Failed to read the uploaded file');
      setLoading(false);
    };
    
    setLoading(true);
    reader.readAsText(file);
  };
  
  // No auto-loading of files on component mount
  useEffect(() => {
    // Just initialize available files, but don't load any
  }, []);

  // Helper function to determine if a color is dark (for text contrast)
  const isColorDark = (hexColor) => {
    // Default to light if color is not in expected format
    if (!hexColor || hexColor === 'transparent' || !hexColor.startsWith('#')) return false;
    
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return true if color is dark
    return luminance < 0.5;
  };
  
  // Function to highlight tokens with their annotations
  const renderAnnotatedText = (section, sectionIndex) => {
    const tokens = section.annotations.map(anno => ({
      token: anno.token,
      span: anno.span,
      namedEntityType: anno.namedEntityType !== '_' ? anno.namedEntityType : null,
      semPredType: anno.semPredType !== '_' ? anno.semPredType : null,
      relationType: anno.relationType !== '_' ? anno.relationType : null
    }));
    
    return (
      <div key={`section-${sectionIndex}`} className="mb-4 p-3 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">Text Section {sectionIndex + 1}</h3>
        <p className="mb-4 text-gray-700">{section.text}</p>
        
        <div className="flex flex-wrap gap-1">
          {tokens.map((token, idx) => {
            const hasNamedEntity = token.namedEntityType;
            const hasSemPred = token.semPredType;
            const hasRelation = token.relationType;
            
            // Choose background color based on annotation priority and filter settings
            let bgColor = 'transparent';
            let textColor = 'black';
            
            if (hasNamedEntity && showNamedEntities) {
              bgColor = getColorForType(token.namedEntityType);
              textColor = isColorDark(bgColor) ? 'white' : 'black';
            } else if (hasSemPred && showSemanticPredicates) {
              bgColor = getColorForType(token.semPredType);
              textColor = isColorDark(bgColor) ? 'white' : 'black';
            } else if (hasRelation && showRelationTypes) {
              bgColor = getColorForType(token.relationType);
              textColor = isColorDark(bgColor) ? 'white' : 'black';
            }
            
            return (
              <div 
                key={`token-${sectionIndex}-${idx}`}
                className="inline-flex flex-col items-center mb-1 mr-0.5"
              >
                <span 
                  className="px-1 py-0.5 rounded"
                  style={{ 
                    backgroundColor: bgColor,
                    color: textColor
                  }}
                >
                  {token.token}
                </span>
                {hasNamedEntity && showNamedEntities && (
                  <span className="text-xs" style={{ color: getColorForType(token.namedEntityType), fontSize: '0.65rem' }}>
                    {token.namedEntityType}
                  </span>
                )}
                {hasSemPred && showSemanticPredicates && (!hasNamedEntity || !showNamedEntities) && (
                  <span className="text-xs" style={{ color: getColorForType(token.semPredType), fontSize: '0.65rem' }}>
                    {token.semPredType}
                  </span>
                )}
                {hasRelation && showRelationTypes && (!hasNamedEntity || !showNamedEntities) && (!hasSemPred || !showSemanticPredicates) && (
                  <span className="text-xs" style={{ color: getColorForType(token.relationType), fontSize: '0.65rem' }}>
                    {token.relationType}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Legend component
  const Legend = () => {
    const legendItems = Object.entries(colorMap).map(([type, color]) => ({
      type,
      color
    }));
    
    // Separate by annotation category
    const namedEntityTypes = legendItems.filter(item => 
      ['LOC_NAME', 'DATE', 'DOC', 'PRF', 'PER_NAME', 'SHIP_TYPE', 'SHIP', 
       'LOC_ADJ', 'ETH_REL', 'STATUS', 'PER_ATTR', 'ORG', 'CMTY_QUANT'].includes(item.type)
    );
    
    const semPredTypes = legendItems.filter(item => 
      ['EndingContractualAgreement', 'Request', 'Giving', 'SocialStatusChange', 
       'Arriving', 'SocialInteraction', 'Transportation', 'HavingInternalState-', 
       'ForceToAct', 'Destroying', 'Leaving'].includes(item.type)
    );
    
    const relationTypes = legendItems.filter(item => 
      ['isOfType', 'evokes'].includes(item.type)
    );
    
    return (
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">Legend</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-2">Named Entity Types</h4>
            <div className="flex flex-wrap gap-1">
              {namedEntityTypes.map(item => (
                <div key={item.type} className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-1" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Semantic Predicate Types</h4>
            <div className="flex flex-wrap gap-1">
              {semPredTypes.map(item => (
                <div key={item.type} className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-1" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Relation Types</h4>
            <div className="flex flex-wrap gap-1">
              {relationTypes.map(item => (
                <div key={item.type} className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-1" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter controls component
  const FilterControls = () => {
    return (
      <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
        <h3 className="text-lg font-semibold mb-2">Filter Annotations</h3>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showNamedEntities}
              onChange={() => setShowNamedEntities(!showNamedEntities)}
              className="mr-2 h-4 w-4"
            />
            <span>Named Entity Types</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showSemanticPredicates}
              onChange={() => setShowSemanticPredicates(!showSemanticPredicates)}
              className="mr-2 h-4 w-4"
            />
            <span>Semantic Predicate Types</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showRelationTypes}
              onChange={() => setShowRelationTypes(!showRelationTypes)}
              className="mr-2 h-4 w-4"
            />
            <span>Relation Types</span>
          </label>
        </div>
      </div>
    );
  };

  // File selector component
  const FileSelector = () => {
    return (
      <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
        <h3 className="text-lg font-semibold mb-2">Select WebAnno TSV File</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Files:</label>
            <div className="flex items-center">
              <select 
                value={currentFile}
                onChange={(e) => loadTsvFile(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>Select a file</option>
                {availableFiles.map(file => (
                  <option key={file} value={file}>{file}</option>
                ))}
              </select>
              {currentFile && (
                <button 
                  onClick={() => {
                    setCurrentFile('');
                    setTextSections([]);
                  }}
                  className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload New File:</label>
            <div className="flex items-center">
              <input
                type="file"
                accept=".tsv"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Browse...
              </button>
              <span className="ml-2 text-sm text-gray-600 truncate max-w-xs">
                {currentFile || "No file selected"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">WebAnno TSV Visualization</h2>
      <FileSelector />
      <FilterControls />
      <Legend />
      {loading ? (
        <div className="p-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2">Loading annotations...</p>
        </div>
      ) : error ? (
        <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      ) : !currentFile ? (
        <div className="p-4 text-center bg-gray-50 border border-gray-200 rounded">
          <p className="text-gray-600 font-medium">No File Selected</p>
          <p className="text-gray-500 mt-1">Please select a file from the dropdown or upload a new WebAnno TSV file.</p>
        </div>
      ) : textSections.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No annotation data found in the selected file
        </div>
      ) : (
        textSections.map((section, idx) => renderAnnotatedText(section, idx))
      )}
    </div>
  );
};

export default WebAnnoVisualizer;
