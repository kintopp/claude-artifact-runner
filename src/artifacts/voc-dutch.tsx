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
      return 'de recente etablissering van ons hoofdquartier';
    if (location === 'Ceylon' && year > 1650 && year < 1670) 
      return 'onze voortdurende campagne tegen de Portugeezen';
    if (location === 'Malacca' && year > 1640 && year < 1660) 
      return 'onze succesvolle verovering van de haven op de Portugeezen';
    if (year > 1680 && year < 1710) 
      return 'de groeyende competitie van de Engelsche Oost-Indische Compagnie';
    if (year > 1710)
      return 'de toenemende financieele moeylijckheden der Compagnie';
    return 'de uitdagingen van het handhaven van ons handelsmonopolie';
  };

  // Disease outbreaks by period and region
  const getDiseaseContext = (year, location) => {
    if ((location === 'Batavia' || location === 'Ambon') && year > 1660 && year < 1690)
      return 'malaria ende dysenterie';
    if (location === 'Bengal' && year > 1680)
      return 'cholera';
    if (year > 1700)
      return 'de pokken';
    return 'tropische koortsen';
  };

  // Generate the formal opening of the letter
  const generateOpening = (recipient, location, year) => {
    const months = ['Januarij', 'Februarij', 'Maart', 'April', 'Meij', 'Junij', 
                    'Julij', 'Augustus', 'September', 'October', 'November', 'December'];
    const month = months[Math.floor(Math.random() * months.length)];
    const day = Math.floor(Math.random() * 28) + 1;
    
    return `In ${location}, dezen ${day}sten dagh van ${month}, Anno Domini ${year}.\n\nAan ${recipient},\n\nMet ootmoedigh respect ende plichtsgetrouwe gehoorzaamheyt, ick, Uw loyale dienaar, brenge U groeten van de handelspost te ${location}.`;
  };

  // Generate trade report content
  const generateTradeContent = (location, year) => {
    const goods = tradeGoods[location];
    const selectedGoods = goods.slice(0, 3);
    const prices = ['gunstige', 'opgedreven', 'redelijcke', 'excessieve', 'voordelige'];
    const selectedPrice = prices[Math.floor(Math.random() * prices.length)];
    const quantities = ['overvloedigh', 'schaers', 'voldoende', 'teleurstellend', 'excellent'];
    const selectedQuantity = quantities[Math.floor(Math.random() * quantities.length)];
    
    return `Ick ben verheught te rapporteren dat de acquisitie van ${selectedGoods.join(', ')} ende andere coopmanschappen dit saisoen tegen ${selectedPrice} prijzen is voortgegaan. De qualiteyt der goederen is ${selectedQuantity}, hoewel wij de gebruyckelycke moeylijckheden ondervinden om de meest gewenschte coopmanschappen voor onze concurrenten te verkrygen. Het Compagnie-packhuys bevat thans voldoende voorraet om de ruimen van de volgende twee thuysvarende schepen te vullen.`;
  };

  // Generate military content
  const generateMilitaryContent = (location, year) => {
    const competitors = getCompetitors(year);
    const selectedCompetitor = competitors[Math.floor(Math.random() * competitors.length)];
    
    return `Onze militaire positie in ${location} blijft verzekert, hoewel wij intelligentie hebben ontvangen van ${selectedCompetitor} schepen die de kust verkennen. De fortificatiën behoeven eenige reparatie na het recente moessonsaisoen. Ick hebbe twintigh soldaten aan deze taeck toegewezen, aangevuld met inlandsche arbeyders. Het garnizoen is adequaat voorzien van buskruyt ende kogels, hoewel verscheydene musketten in slechte conditie verkeren ende met het volgende bevoorradingsschip vervangen dienen te worden.`;
  };

  // Generate local politics content
  const generatePoliticsContent = (location, year) => {
    const ruler = localRulers[location];
    
    return `De relaties met de ${ruler} blijven ${Math.random() > 0.5 ? 'cordiaell' : 'gespannen'}. Ick hebbe de gebruyckelycke geschencken zoals geïnstrueerd aangeboden, dewelcke met klaarblijckelycke tevredenheyt werden ontvangen. Het plaetselycke bestuur blijft aandringen op additionele tollen buiten onze overeengekomen contractueele verplichtingen, hetwelck ick vastberaeden heb wederstaen terwijl ick diplomatieke beleeftheyt handhaefde. Verscheydene locale cooplieden hebben ons benadert met informatie over de bewegingen ende intenties van andere Europeesche handelaren, hetwelck ick separaet heb gedocumenteert in het bijgevoegde confidentiële rapport.`;
  };

  // Generate company finances content
  const generateFinancesContent = (location, year) => {
    return `De financieele reeckeningen van deze handelspost blijven in orde, hoewel de onkosten dit quartael ${Math.random() > 0.5 ? 'zijn toegenomen' : 'stabiel zijn gebleven'}. Het onderhoud van onze packhuysen ende woonvertrecken vereyscht constante aandacht in dit climaet. Ick hebbe de kostenbesparende maetregelen geïmplementeert zoals gedirecteert door de Edele Heeren XVII, met reductie van de consumptie van wijn ende Europeesche provisies onder junior personeel. De betaling van plaetselycke werckers in Compagnie-penningen in plaets van zilveren Spaensche realen is met eenige resistentie ontmoet maer wordt nu generaellyck geaccepteert.`;
  };

  // Generate spice harvest content
  const generateSpiceContent = (location, year) => {
    const goods = tradeGoods[location];
    const spices = goods.filter(g => ['pepper', 'nutmeg', 'cloves', 'cinnamon', 'cardamom', 'ginger', 'mace'].includes(g));
    
    if (spices.length === 0) {
      return `Alhoewel deze post niet primair betrocken is bij specerijencultivatie, houden wij een waeckend oog op regionale oogsten die de Compagnieshandel zouden kunnen affecteren. Recente rapporten van onze factoors in de Specerij-Eylanden indiceren gunstige condities voor de oogsten van dit jaer.`;
    }
    
    return `De oogst van ${spices.join(' ende ')} dit jaer blijckt ${Math.random() > 0.5 ? 'overvloedigh' : 'eenighszins vermindert'} in vergelijcking met voorgaende saisoenen. De qualiteyt blijft excellent, ende wij hebben de overeengekomen quantiteyten tegen de vastgestelde prijzen verzekert. Plaetselycke verbouwers blijven pogen verkopen te doen aan andere koopers ondanks onze monopolie-overeenkomsten, hetgeen occasionele demonstraties van Compagnies-authoriteyt noodzakelijck maeckt.`;
  };

  // Generate shipping news content
  const generateShippingContent = (location, year) => {
    const ships = ['Batavia', 'Amsterdam', 'Utrecht', 'Hollandia', 'Zeeland', 'Dordrecht', 'Rotterdam', 'Delft'];
    const ship1 = ships[Math.floor(Math.random() * ships.length)];
    let ship2;
    do {
      ship2 = ships[Math.floor(Math.random() * ships.length)];
    } while (ship2 === ship1);
    
    return `Het Compagnieschip ${ship1} is verleden maend veiligh gearriveert, hoewel vertraegt door adverse winden nabij de Caep. Capiteyn Hendricksz rapporteert geen significante verliezen door scheurbuyk of andere ziekten gedurende de voyagie, hetwelck een zegen is. Wij anticiperen de arrivagie van de ${ship2} binnen de komende veertien dagen, volgens rapporten van onze uitkijckpost. Twee Compagnieschepen zijn naar het Patria gedepecheert met volle ladingen, dewelcke Amsterdam zouden moeten bereyken tegen ${Math.random() > 0.5 ? 'de vroege zomer' : 'de late herfst'}, zoo God het wil.`;
  };

  // Generate personnel matters content
  const generatePersonnelContent = (location, year) => {
    const disease = getDiseaseContext(year, location);
    
    return `Ick betreur te moeten rapporteren dat verscheydene Compagniesdienaren dit saisoen zijn bezweken aan ${disease}. De Compagnieschirurgijn doet wat hij kan met gelimiteerde voorraeden, maer verzoeckt additionele medicamenten met het volgende schip. Het gedrag der garnizoensoldaten is generaellyck bevredigend geweest, met slechts mineure incidenten van dronckenschap die disciplinaire actie vereischten. De boeckhouder vertoont echter tekenen van afnemende gezontheyt ende zal wellicht vervangen moeten worden voor de completering van zijn contract. Ick hebbe tijdelijck zijn assistent aangestelt om te assisteren bij het bijhouden der reeckeningen.`;
  };

  // Generate disease outbreak content
  const generateDiseaseContent = (location, year) => {
    const disease = getDiseaseContext(year, location);
    
    return `Wij worden geconfronteert met een zorgwekkende uitbraeck van ${disease} onder zowel Compagniespersoneel als de locale populatie. De Compagnieschirurgijn heeft een kleyn hospitael geëtablisseert in een van onze packhuysen, waar de geaffligeerden zulcke zorg ontvangen als mogelijck is. Ick hebbe het branden van zwavel ende kruyden geordonneerd zoals aanbevolen om de lucht te zuyveren, ende contact met zekere inlandsche quartieren waar de ziekte het meest prevalent schijnt beperkt. Tot dusverre hebben wij drie Compagniesdienaren aan deze kwael verloren, ende verscheydene anderen verkeren in precaire conditie. Ick bidde dat deze uitbraeck zal afnemen met de wisseling van het saisoen.`;
  };

  // Generate European competition content
  const generateCompetitionContent = (location, year) => {
    const competitors = getCompetitors(year);
    const competitor1 = competitors[Math.floor(Math.random() * competitors.length)];
    let competitor2;
    do {
      competitor2 = competitors[Math.floor(Math.random() * competitors.length)];
    } while (competitor2 === competitor1);
    
    return `De presentie van ${competitor1} ende ${competitor2} handelaren in de regio continueert uitdagingen te presenteren voor onze commercieele operaties. Zij bieden in toenemende mate hoogere prijzen aan locale leveranciers in directe contraventie van onze geëtablisseerde monopolie-overeenkomsten. Ick hebbe formeele protesten ingediend bij hunne factoors ende locale authoriteyten herinnert aan hunne exclusieve obligaties jegens de Compagnie. Wij hebben verscheydene kleyne vaertuyghjes geïntercepteert die poogden met deze concurrenten te handelen ende hunne ladingen geconfisqueert zoals gedirecteert door Compagniesbeleid. Het zoude advantageus zijn additionele gewapende schepen te ontvangen om de kustbenaderingen te patrouilleeren ende onze handelsprivilegies effectiever af te dwingen.`;
  };

  // Generate letter closing
  const generateClosing = (name) => {
    return `\nIck blijve, met alle verschuldigde respect ende loyaliteyt, Uw ootmoedige ende gehoorzame dienaar,\n\n${name}\nJunior Koopman\nIn dienst der Edele Compagnie`;
  };

  // Main function to generate the letter
  const generateLetter = () => {
    let letterContent = generateOpening(recipient, location, year);
    
    // Add historical context
    letterContent += `\n\nIn het licht van ${getHistoricalContext(year, location)}, presenteer ick het volgende rapport aangaende onze affaires op deze handelspost:`;
    
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
    
    letterContent += '\n\nVoorts moet ick onder Uwe aandacht brengen: ';
    
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

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
            <label className="block text-sm font-medium mb-1">Author's Name:</label>
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
          <div className="bg-white p-4 rounded border border-amber-200 font-serif whitespace-pre-line">
            {generatedLetter}
          </div>
        </div>
      )}
    </div>
  );
};

export default VOCLetterGenerator;