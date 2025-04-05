import React, { useState } from 'react';

const VOCLetterGenerator = () => {
  // States for form inputs
  const [year, setYear] = useState(1650);
  const [location, setLocation] = useState('Batavia');
  const [topic, setTopic] = useState('trade');
  const [name, setName] = useState('Cornelis Jansz');
  const [recipient, setRecipient] = useState('The Honorable Heeren XVII');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [letterVisible, setLetterVisible] = useState(false);

  // Location options (Dutch trading posts in South/Southeast Asia)
  const locations = [
    'Batavia', 'Colombo', 'Malacca', 'Coromandel', 'Surat', 
    'Bengal', 'Bantam', 'Ambon', 'Ceylon', 'Malabar'
  ];

  // Topic options
  const topics = [
    'trade', 'military', 'local politics', 'company finances', 'spice harvest',
    'shipping news', 'personnel matters', 'disease outbreak', 'competition from other Europeans'
  ];

  // Dutch names common for the period
  const dutchNames = [
    'Cornelis Jansz', 'Pieter de Vries', 'Willem van der Meer', 'Hendrik Pietersz',
    'Johan van Riebeeck', 'Jan Coen', 'Gerrit de Haan', 'Abraham van Diemen'
  ];

  // Recipients
  const recipients = [
    'The Honorable Heeren XVII', 'The Chamber of Amsterdam', 
    'Governor-General', 'The Chamber of Zeeland', 'The Council of the Indies'
  ];

  // Trade goods by region
  const tradeGoods = {
    'Batavia': ['pepper', 'nutmeg', 'cloves', 'cinnamon', 'rice'],
    'Colombo': ['cinnamon', 'gems', 'elephants', 'pearls', 'areca nuts'],
    'Malacca': ['tin', 'gold', 'pepper', 'exotic woods', 'bird nests'],
    'Coromandel': ['cotton textiles', 'indigo', 'saltpeter', 'rice', 'diamonds'],
    'Surat': ['cotton textiles', 'indigo', 'opium', 'saltpeter', 'diamonds'],
    'Bengal': ['silk', 'sugar', 'opium', 'saltpeter', 'rice'],
    'Bantam': ['pepper', 'rice', 'tropical fruits', 'gold', 'camphor'],
    'Ambon': ['cloves', 'nutmeg', 'mace', 'sago', 'coconut oil'],
    'Ceylon': ['cinnamon', 'elephants', 'gems', 'pearls', 'areca nuts'],
    'Malabar': ['pepper', 'cardamom', 'ginger', 'textiles', 'timber']
  };

  // Local rulers by region
  const localRulers = {
    'Batavia': 'Sultan of Banten',
    'Colombo': 'King of Kandy',
    'Malacca': 'Sultan of Johor',
    'Coromandel': 'Nayak of Thanjavur',
    'Surat': 'Mughal Governor',
    'Bengal': 'Nawab of Bengal',
    'Bantam': 'Sultan of Bantam',
    'Ambon': 'local rajas',
    'Ceylon': 'King of Kandy',
    'Malabar': 'Zamorin of Calicut'
  };

  // European competitors by period
  const getCompetitors = (year) => {
    if (year < 1620) return ['Portuguese', 'English'];
    if (year < 1700) return ['Portuguese', 'English', 'French'];
    return ['Portuguese', 'English', 'French', 'Danish'];
  };

  // Historical events by period
  const getHistoricalContext = (year, location) => {
    if (location === 'Batavia' && year < 1630) 
      return 'the recent establishment of our headquarters';
    if (location === 'Ceylon' && year > 1650 && year < 1670) 
      return 'our ongoing campaign against the Portuguese';
    if (location === 'Malacca' && year > 1640 && year < 1660) 
      return 'our successful capture of the port from the Portuguese';
    if (year > 1680 && year < 1710) 
      return 'the growing competition from the English East India Company';
    if (year > 1710)
      return 'the Company\'s increasing financial difficulties';
    return 'the challenges of maintaining our trade monopoly';
  };

  // Disease outbreaks by period and region
  const getDiseaseContext = (year, location) => {
    if ((location === 'Batavia' || location === 'Ambon') && year > 1660 && year < 1690)
      return 'malaria and dysentery';
    if (location === 'Bengal' && year > 1680)
      return 'cholera';
    if (year > 1700)
      return 'smallpox';
    return 'tropical fevers';
  };

  // Generate the formal opening of the letter
  const generateOpening = (recipient, location, year) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[Math.floor(Math.random() * months.length)];
    const day = Math.floor(Math.random() * 28) + 1;
    
    return `In ${location}, this ${day}th day of ${month}, Anno Domini ${year}.\n\nTo ${recipient},\n\nWith humble respect and dutiful obedience, I, your loyal servant, convey greetings from the trading post at ${location}.`;
  };

  // Generate trade report content
  const generateTradeContent = (location, year) => {
    const goods = tradeGoods[location];
    const selectedGoods = goods.slice(0, 3);
    const prices = ['favorable', 'inflated', 'reasonable', 'excessive', 'advantageous'];
    const selectedPrice = prices[Math.floor(Math.random() * prices.length)];
    const quantities = ['abundant', 'scarce', 'sufficient', 'disappointing', 'excellent'];
    const selectedQuantity = quantities[Math.floor(Math.random() * quantities.length)];
    
    return `I am pleased to report that this season's acquisition of ${selectedGoods.join(', ')} and other commodities has proceeded at ${selectedPrice} prices. The quality of goods is ${selectedQuantity}, though we face the usual challenges in securing the most desirable merchandise before our competitors. The Company warehouse currently holds sufficient stock to fill the holds of the next two homeward-bound vessels.`;
  };

  // Generate military content
  const generateMilitaryContent = (location, year) => {
    const competitors = getCompetitors(year);
    const selectedCompetitor = competitors[Math.floor(Math.random() * competitors.length)];
    
    return `Our military position in ${location} remains secure, though we have received intelligence of ${selectedCompetitor} vessels surveying the coast. The fortifications require some repair following the recent monsoon season. I have assigned twenty soldiers to this task, supplemented by local laborers. The garrison is adequately supplied with powder and shot, though several muskets are in poor condition and should be replaced on the next supply vessel.`;
  };

  // Generate local politics content
  const generatePoliticsContent = (location, year) => {
    const ruler = localRulers[location];
    
    return `Relations with the ${ruler} remain ${Math.random() > 0.5 ? 'cordial' : 'strained'}. I have presented the customary gifts as instructed, which were received with apparent satisfaction. The local administration continues to demand additional tariffs beyond our agreed contractual obligations, which I have firmly resisted while maintaining diplomatic courtesy. Several local merchants have approached us with information about the movements and intentions of other European traders, which I have documented separately in the enclosed confidential report.`;
  };

  // Generate company finances content
  const generateFinancesContent = (location, year) => {
    return `The financial accounts of this trading post remain in order, though expenses have ${Math.random() > 0.5 ? 'increased' : 'remained stable'} this quarter. The maintenance of our warehouses and living quarters requires constant attention in this climate. I have implemented the cost-saving measures as directed by the Honorable Heeren XVII, reducing the consumption of wine and European provisions among junior personnel. The payment of local workers in company tokens rather than silver Spanish reals has been met with some resistance but is now generally accepted.`;
  };

  // Generate spice harvest content
  const generateSpiceContent = (location, year) => {
    const goods = tradeGoods[location];
    const spices = goods.filter(g => ['pepper', 'nutmeg', 'cloves', 'cinnamon', 'cardamom', 'ginger', 'mace'].includes(g));
    
    if (spices.length === 0) {
      return `Although this post is not primarily concerned with spice cultivation, we maintain a watching brief on regional harvests that might affect Company trade. Recent reports from our factors in the Spice Islands indicate favorable conditions for this year's harvests.`;
    }
    
    return `This year's harvest of ${spices.join(' and ')} appears to be ${Math.random() > 0.5 ? 'abundant' : 'somewhat diminished'} compared to previous seasons. The quality remains excellent, and we have secured the agreed quantities at the established prices. Local growers continue to attempt sales to other buyers despite our monopoly agreements, necessitating occasional demonstrations of Company authority.`;
  };

  // Generate shipping news content
  const generateShippingContent = (location, year) => {
    const ships = ['Batavia', 'Amsterdam', 'Utrecht', 'Hollandia', 'Zeeland', 'Dordrecht', 'Rotterdam', 'Delft'];
    const ship1 = ships[Math.floor(Math.random() * ships.length)];
    let ship2;
    do {
      ship2 = ships[Math.floor(Math.random() * ships.length)];
    } while (ship2 === ship1);
    
    return `The company ship ${ship1} arrived safely last month, though delayed by adverse winds near the Cape. Captain Hendricksz reports no significant losses to scurvy or other diseases during the voyage, which is a blessing. We anticipate the arrival of the ${ship2} within the next fortnight, according to reports from our lookout station. Two Company vessels have been dispatched to the Patria with full cargoes, which should reach Amsterdam by ${Math.random() > 0.5 ? 'early summer' : 'late autumn'}, God willing.`;
  };

  // Generate personnel matters content
  const generatePersonnelContent = (location, year) => {
    const disease = getDiseaseContext(year, location);
    
    return `I regret to report that several Company servants have succumbed to ${disease} this season. The Company surgeon does what he can with limited supplies, but requests additional medicaments on the next vessel. The conduct of the garrison soldiers has been generally satisfactory, with only minor incidents of drunkenness requiring disciplinary action. The bookkeeper, however, shows signs of declining health and may require replacement before the completion of his contract. I have temporarily assigned his assistant to assist with maintaining the accounts.`;
  };

  // Generate disease outbreak content
  const generateDiseaseContent = (location, year) => {
    const disease = getDiseaseContext(year, location);
    
    return `We face a concerning outbreak of ${disease} among both Company personnel and the local population. The Company surgeon has established a small hospital in one of our warehouses, where the afflicted receive what care is possible. I have ordered the burning of sulfur and herbs as recommended to purify the air, and restricted contact with certain native quarters where the sickness appears most prevalent. Thus far, we have lost three Company servants to this malady, and several others remain in a precarious condition. I pray this outbreak subsides with the change of season.`;
  };

  // Generate European competition content
  const generateCompetitionContent = (location, year) => {
    const competitors = getCompetitors(year);
    const competitor1 = competitors[Math.floor(Math.random() * competitors.length)];
    let competitor2;
    do {
      competitor2 = competitors[Math.floor(Math.random() * competitors.length)];
    } while (competitor2 === competitor1);
    
    return `The presence of ${competitor1} and ${competitor2} traders in the region continues to present challenges to our commercial operations. They increasingly offer higher prices to local suppliers in direct contravention of our established monopoly agreements. I have lodged formal protests with their factors and reminded local authorities of their exclusive obligations to the Company. We have intercepted several small vessels attempting to trade with these competitors and confiscated their cargoes as directed by Company policy. It would be advantageous to receive additional armed vessels to patrol the coastal approaches and enforce our trading privileges more effectively.`;
  };

  // Generate letter closing
  const generateClosing = (name) => {
    return `\nI remain, with all due respect and loyalty, your humble and obedient servant,\n\n${name}\nJunior Merchant\nIn service of the Honorable Company`;
  };

  // Main function to generate the letter
  const generateLetter = () => {
    let letterContent = generateOpening(recipient, location, year);
    
    // Add historical context
    letterContent += `\n\nIn light of ${getHistoricalContext(year, location)}, I present the following report on our affairs at this trading post:`;
    
    // Add main content based on selected topic
    switch(topic) {
      case 'trade':
        letterContent += `\n\n${generateTradeContent(location, year)}`;
        break;
      case 'military':
        letterContent += `\n\n${generateMilitaryContent(location, year)}`;
        break;
      case 'local politics':
        letterContent += `\n\n${generatePoliticsContent(location, year)}`;
        break;
      case 'company finances':
        letterContent += `\n\n${generateFinancesContent(location, year)}`;
        break;
      case 'spice harvest':
        letterContent += `\n\n${generateSpiceContent(location, year)}`;
        break;
      case 'shipping news':
        letterContent += `\n\n${generateShippingContent(location, year)}`;
        break;
      case 'personnel matters':
        letterContent += `\n\n${generatePersonnelContent(location, year)}`;
        break;
      case 'disease outbreak':
        letterContent += `\n\n${generateDiseaseContent(location, year)}`;
        break;
      case 'competition from other Europeans':
        letterContent += `\n\n${generateCompetitionContent(location, year)}`;
        break;
      default:
        letterContent += `\n\n${generateTradeContent(location, year)}`;
    }
    
    // Add a secondary topic randomly
    const secondaryTopics = topics.filter(t => t !== topic);
    const secondaryTopic = secondaryTopics[Math.floor(Math.random() * secondaryTopics.length)];
    
    letterContent += '\n\nFurthermore, I must bring to your attention: ';
    
    switch(secondaryTopic) {
      case 'trade':
        letterContent += generateTradeContent(location, year);
        break;
      case 'military':
        letterContent += generateMilitaryContent(location, year);
        break;
      case 'local politics':
        letterContent += generatePoliticsContent(location, year);
        break;
      case 'company finances':
        letterContent += generateFinancesContent(location, year);
        break;
      case 'spice harvest':
        letterContent += generateSpiceContent(location, year);
        break;
      case 'shipping news':
        letterContent += generateShippingContent(location, year);
        break;
      case 'personnel matters':
        letterContent += generatePersonnelContent(location, year);
        break;
      case 'disease outbreak':
        letterContent += generateDiseaseContent(location, year);
        break;
      case 'competition from other Europeans':
        letterContent += generateCompetitionContent(location, year);
        break;
      default:
        letterContent += generateShippingContent(location, year);
    }
    
    // Add closing
    letterContent += generateClosing(name);
    
    setGeneratedLetter(letterContent);
    setLetterVisible(true);
  };

  return (
    <div className="flex flex-col p-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">VOC Letter Generator</h1>
        <p className="text-gray-600">Create authentic Dutch East India Company correspondence (1600-1750)</p>
      </div>

      <div className="bg-amber-50 p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year (1600-1750):</label>
            <input
              type="number"
              min="1600"
              max="1750"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Trading Post Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Primary Topic:</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {topics.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Clerk's Name:</label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {dutchNames.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Addressed To:</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {recipients.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={generateLetter}
          className="mt-4 w-full bg-amber-800 text-white py-2 px-4 rounded hover:bg-amber-700"
        >
          Generate Letter
        </button>
      </div>
      
      {letterVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated VOC Letter</h2>
            <div className="text-sm text-gray-500">From {location}, {year}</div>
          </div>
          <div className="bg-amber-50 p-4 rounded border border-amber-200 font-serif whitespace-pre-line">
            {generatedLetter}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-medium mb-1">Historical Notes:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>The VOC (Verenigde Oostindische Compagnie) operated from 1602 to 1799 and was the world's first multinational corporation.</li>
          <li>Company clerks and merchants wrote detailed reports to the Heeren XVII (17 directors) in Amsterdam.</li>
          <li>Letters typically took 6-12 months to reach Amsterdam from Asian trading posts.</li>
          <li>The VOC maintained a complex network of trading posts throughout South and Southeast Asia.</li>
          <li>Communications followed strict hierarchical protocols and formal language.</li>
        </ul>
      </div>
    </div>
  );
};

export default VOCLetterGenerator;