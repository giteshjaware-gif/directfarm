/* =========================================================
   DirectFarm — script.js
   Vanilla JS. Structured so a Firebase backend can later
   replace the localStorage calls in the DB helpers below.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. TRANSLATIONS
     --------------------------------------------------------- */
  const translations = {
    en: {
      skipLink: "Skip to main content",
      navHome: "Home", navSell: "Sell Harvest", navBuyers: "Find Buyers",
      navPrices: "Market Prices", navHow: "How It Works", navHelp: "Help",
      navLogin: "Farmer Login / Register",
      heroTitle: "Sell Your Harvest Directly",
      heroSub: "Connect with buyers, compare prices and find better selling opportunities — no middlemen.",
      heroSellBtn: "Sell Your Harvest", heroBuyBtn: "Find Buyers",
      voiceSearchLabel: "Search by Voice",
      howTitle: "How It Works",
      how1Title: "List Your Harvest", how1Desc: "Tell us what crop you have ready to sell.",
      how2Title: "Add Crop Details", how2Desc: "Add quantity, price and a photo.",
      how3Title: "Find Buyers", how3Desc: "Buyers near you see your listing.",
      how4Title: "Connect & Sell", how4Desc: "Talk directly and complete the sale.",
      sellTitle: "Sell Your Harvest",
      sellLoginHint: "Please log in as a Farmer to post your harvest.",
      fCrop: "Crop Name", fChoose: "Choose a crop",
      cropTomato: "Tomato", cropOnion: "Onion", cropPotato: "Potato",
      cropWheat: "Wheat", cropRice: "Rice", cropMaize: "Maize",
      fQuantity: "Quantity (kg)", fExpPrice: "Expected Price (₹/kg)",
      fLocation: "Village / Location", fUseLocation: "Use My Location",
      fHarvestDate: "Harvest Date", fQuality: "Crop Quality",
      qGood: "Good", qBetter: "Better", qBest: "Best",
      fPhoto: "Crop Photo", fPostBtn: "Post Harvest",
      fPosted: "Your harvest has been listed!",
      dashWelcome: "Welcome", dashMyListings: "My Listings", dashViews: "Buyer Views",
      dashInterested: "Interested Buyers", dashSales: "Potential Sales",
      dashMyListingsHeading: "My Current Listings",
      marketTitle: "Find Buyers", searchPlaceholder: "Search crops...",
      filterCrop: "Crop", filterAll: "All", filterLocation: "Location",
      filterMaxPrice: "Max Price (₹/kg)", filterMinQty: "Min Quantity (kg)",
      marketEmpty: "No crops found. Try a different search.",
      viewDetails: "View Details", contactFarmer: "Contact Farmer",
      priceTitle: "Compare Before You Sell",
      priceDemo: "Displayed prices are demonstration data and may not represent live mandi prices.",
      priceRef: "Reference Market Price", priceFarmer: "Farmer Expected Price", priceBuyer: "Buyer Listed Price",
      transportTitle: "Find Transport",
      transportProto: "Prototype feature — transport booking is not yet active.",
      transportPickup: "Pickup Location", transportDelivery: "Delivery Location",
      transportQty: "Approximate Quantity (kg)", transportSubmit: "Request Transport (Demo)",
      transportSuccess: "Transport request noted (demo only).",
      helpTitle: "Help",
      help1Q: "How to Sell?", help1A: "Log in as a Farmer, go to \"Sell Harvest\", fill the form and post it. Your listing appears in the marketplace right away.",
      help2Q: "How to Use Voice Search?", help2A: "Press the microphone button and say the crop name and place, like \"Find tomato near Pune\".",
      help3Q: "How to Check Prices?", help3A: "Open \"Market Prices\" to compare the reference price with farmer and buyer prices.",
      help4Q: "How to Contact Buyers?", help4A: "On any listing, press \"Contact Farmer\" or \"Send Request\" to reach out directly.",
      help5Q: "How to Upload Crop?", help5A: "In the Sell Harvest form, press \"Upload Crop Photo\" and choose a clear picture of your crop.",
      help6Q: "Contact Support", help6A: "Call our helpline at 1800-000-000 (demo number) for assistance in your language.",
      footerTag: "A student prototype for direct farmer-to-buyer selling. Built for Smart India Hackathon.",
      loginTitle: "Farmer / Buyer Login",
      loginDemoNote: "This is a demo login for the prototype. No real account is created.",
      roleFarmer: "👨‍🌾 Farmer", roleBuyer: "🛒 Buyer",
      fName: "Full Name", fMobile: "Mobile Number", fVillage: "Village",
      fDistrict: "District", fState: "State", fPrefLang: "Preferred Language",
      fMainCrops: "Main Crops", fMainCropsPh: "e.g. Tomato, Onion",
      regSubmit: "Register & Continue",
      contactTitle: "Contact Farmer", contactCall: "Call", contactWhatsapp: "WhatsApp",
      contactRequest: "Send Request", contactSent: "Request sent to the farmer (demo).",
      listingFarmer: "Farmer", listingQty: "Quantity", listingPrice: "Price", listingLocation: "Location",
      statusActive: "Active", voiceListening: "🎤 Listening...", voiceSearching: "✓ Searching...",
      voiceUnsupported: "Voice search is not supported on this browser. Please type to search.",
      geoUnavailable: "Location not available. Please type it manually.",
      geoFetching: "Finding your location...",
    },
    mr: {
      skipLink: "मुख्य मजकुराकडे जा",
      navHome: "मुख्यपृष्ठ", navSell: "शेतमाल विका", navBuyers: "खरेदीदार शोधा",
      navPrices: "बाजारभाव", navHow: "कसे कार्य करते", navHelp: "मदत",
      navLogin: "शेतकरी लॉगिन / नोंदणी",
      heroTitle: "तुमचा शेतमाल थेट विक्री करा",
      heroSub: "खरेदीदारांशी संपर्क साधा, भाव तुलना करा आणि चांगली विक्रीची संधी मिळवा — कोणताही मध्यस्थ नाही.",
      heroSellBtn: "शेतमाल विका", heroBuyBtn: "खरेदीदार शोधा",
      voiceSearchLabel: "आवाजाने शोधा",
      howTitle: "हे कसे कार्य करते",
      how1Title: "तुमचा शेतमाल नोंदवा", how1Desc: "तुमच्याकडे विक्रीसाठी तयार असलेले पीक सांगा.",
      how2Title: "पिकाचा तपशील जोडा", how2Desc: "प्रमाण, भाव आणि फोटो जोडा.",
      how3Title: "खरेदीदार शोधा", how3Desc: "तुमच्याजवळचे खरेदीदार तुमची नोंद पाहतील.",
      how4Title: "संपर्क करा आणि विका", how4Desc: "थेट बोला आणि विक्री पूर्ण करा.",
      sellTitle: "तुमचा शेतमाल विका",
      sellLoginHint: "शेतमाल नोंदवण्यासाठी कृपया शेतकरी म्हणून लॉगिन करा.",
      fCrop: "पिकाचे नाव", fChoose: "पीक निवडा",
      cropTomato: "टोमॅटो", cropOnion: "कांदा", cropPotato: "बटाटा",
      cropWheat: "गहू", cropRice: "तांदूळ", cropMaize: "मका",
      fQuantity: "प्रमाण (किलो)", fExpPrice: "अपेक्षित भाव (₹/किलो)",
      fLocation: "गाव / ठिकाण", fUseLocation: "माझे स्थान वापरा",
      fHarvestDate: "काढणीची तारीख", fQuality: "पिकाचा दर्जा",
      qGood: "चांगला", qBetter: "अधिक चांगला", qBest: "सर्वोत्तम",
      fPhoto: "पिकाचा फोटो", fPostBtn: "शेतमाल नोंदवा",
      fPosted: "तुमचा शेतमाल यशस्वीरित्या नोंदवला गेला!",
      dashWelcome: "स्वागत आहे", dashMyListings: "माझ्या नोंदी", dashViews: "खरेदीदारांनी पाहिले",
      dashInterested: "इच्छुक खरेदीदार", dashSales: "संभाव्य विक्री",
      dashMyListingsHeading: "माझ्या सध्याच्या नोंदी",
      marketTitle: "खरेदीदार शोधा", searchPlaceholder: "पीक शोधा...",
      filterCrop: "पीक", filterAll: "सर्व", filterLocation: "ठिकाण",
      filterMaxPrice: "जास्तीत जास्त भाव (₹/किलो)", filterMinQty: "किमान प्रमाण (किलो)",
      marketEmpty: "कोणतेही पीक सापडले नाही. वेगळा शब्द वापरून पहा.",
      viewDetails: "तपशील पहा", contactFarmer: "शेतकऱ्याशी संपर्क साधा",
      priceTitle: "विक्रीपूर्वी भाव तुलना करा",
      priceDemo: "दाखवलेले भाव नमुना माहिती आहे आणि प्रत्यक्ष बाजारभाव दर्शवत नाहीत.",
      priceRef: "संदर्भ बाजारभाव", priceFarmer: "शेतकऱ्याचा अपेक्षित भाव", priceBuyer: "खरेदीदाराचा भाव",
      transportTitle: "वाहतूक शोधा",
      transportProto: "हे प्रायोगिक वैशिष्ट्य आहे — वाहतूक बुकिंग अद्याप कार्यरत नाही.",
      transportPickup: "उचल ठिकाण", transportDelivery: "पोहोच ठिकाण",
      transportQty: "अंदाजे प्रमाण (किलो)", transportSubmit: "वाहतुकीची विनंती करा (नमुना)",
      transportSuccess: "वाहतुकीची विनंती नोंदवली (फक्त नमुना).",
      helpTitle: "मदत",
      help1Q: "विक्री कशी करावी?", help1A: "शेतकरी म्हणून लॉगिन करा, \"शेतमाल विका\" वर जा, फॉर्म भरा आणि नोंदवा. तुमची नोंद लगेच बाजारात दिसेल.",
      help2Q: "आवाजाने शोध कसा घ्यावा?", help2A: "मायक्रोफोन बटण दाबा आणि पिकाचे नाव व ठिकाण सांगा, जसे \"पुण्यात टोमॅटो शोधा\".",
      help3Q: "भाव कसे तपासावेत?", help3A: "संदर्भ भाव, शेतकरी भाव आणि खरेदीदार भाव तुलना करण्यासाठी \"बाजारभाव\" उघडा.",
      help4Q: "खरेदीदारांशी संपर्क कसा साधावा?", help4A: "कोणत्याही नोंदीवर \"शेतकऱ्याशी संपर्क साधा\" किंवा \"विनंती पाठवा\" दाबा.",
      help5Q: "पिकाचा फोटो कसा अपलोड करावा?", help5A: "शेतमाल विका फॉर्ममध्ये \"फोटो अपलोड करा\" दाबून स्पष्ट फोटो निवडा.",
      help6Q: "मदत केंद्राशी संपर्क", help6A: "तुमच्या भाषेत मदतीसाठी 1800-000-000 (नमुना क्रमांक) वर कॉल करा.",
      footerTag: "थेट शेतकरी-ते-खरेदीदार विक्रीसाठी विद्यार्थी प्रकल्प. स्मार्ट इंडिया हॅकाथॉनसाठी तयार केला.",
      loginTitle: "शेतकरी / खरेदीदार लॉगिन",
      loginDemoNote: "हे प्रकल्पासाठी नमुना लॉगिन आहे. खरे खाते तयार होत नाही.",
      roleFarmer: "👨‍🌾 शेतकरी", roleBuyer: "🛒 खरेदीदार",
      fName: "पूर्ण नाव", fMobile: "मोबाईल क्रमांक", fVillage: "गाव",
      fDistrict: "जिल्हा", fState: "राज्य", fPrefLang: "पसंतीची भाषा",
      fMainCrops: "मुख्य पिके", fMainCropsPh: "उदा. टोमॅटो, कांदा",
      regSubmit: "नोंदणी करा आणि पुढे जा",
      contactTitle: "शेतकऱ्याशी संपर्क साधा", contactCall: "कॉल करा", contactWhatsapp: "व्हॉट्सअ‍ॅप",
      contactRequest: "विनंती पाठवा", contactSent: "शेतकऱ्याला विनंती पाठवली (नमुना).",
      listingFarmer: "शेतकरी", listingQty: "प्रमाण", listingPrice: "भाव", listingLocation: "ठिकाण",
      statusActive: "सक्रिय", voiceListening: "🎤 ऐकत आहे...", voiceSearching: "✓ शोधत आहे...",
      voiceUnsupported: "या ब्राउझरवर आवाज शोध उपलब्ध नाही. कृपया टाइप करून शोधा.",
      geoUnavailable: "स्थान उपलब्ध नाही. कृपया स्वतः टाइप करा.",
      geoFetching: "तुमचे स्थान शोधत आहोत...",
    },
    hi: {
      skipLink: "मुख्य सामग्री पर जाएँ",
      navHome: "होम", navSell: "फसल बेचें", navBuyers: "खरीदार खोजें",
      navPrices: "बाज़ार भाव", navHow: "यह कैसे काम करता है", navHelp: "सहायता",
      navLogin: "किसान लॉगिन / पंजीकरण",
      heroTitle: "अपनी फसल सीधे बेचें",
      heroSub: "खरीदारों से जुड़ें, भाव तुलना करें और बेहतर बिक्री के अवसर पाएँ — कोई बिचौलिया नहीं।",
      heroSellBtn: "फसल बेचें", heroBuyBtn: "खरीदार खोजें",
      voiceSearchLabel: "आवाज़ से खोजें",
      howTitle: "यह कैसे काम करता है",
      how1Title: "अपनी फसल सूचीबद्ध करें", how1Desc: "बताएं आपके पास कौन सी फसल बिक्री के लिए तैयार है।",
      how2Title: "फसल का विवरण जोड़ें", how2Desc: "मात्रा, भाव और फोटो जोड़ें।",
      how3Title: "खरीदार खोजें", how3Desc: "आपके पास के खरीदार आपकी सूची देखेंगे।",
      how4Title: "जुड़ें और बेचें", how4Desc: "सीधे बात करें और बिक्री पूरी करें।",
      sellTitle: "अपनी फसल बेचें",
      sellLoginHint: "फसल पोस्ट करने के लिए कृपया किसान के रूप में लॉगिन करें।",
      fCrop: "फसल का नाम", fChoose: "फसल चुनें",
      cropTomato: "टमाटर", cropOnion: "प्याज", cropPotato: "आलू",
      cropWheat: "गेहूं", cropRice: "चावल", cropMaize: "मक्का",
      fQuantity: "मात्रा (किलो)", fExpPrice: "अपेक्षित भाव (₹/किलो)",
      fLocation: "गाँव / स्थान", fUseLocation: "मेरा स्थान उपयोग करें",
      fHarvestDate: "कटाई की तारीख", fQuality: "फसल की गुणवत्ता",
      qGood: "अच्छी", qBetter: "बेहतर", qBest: "सर्वश्रेष्ठ",
      fPhoto: "फसल की फोटो", fPostBtn: "फसल पोस्ट करें",
      fPosted: "आपकी फसल सफलतापूर्वक सूचीबद्ध हो गई है!",
      dashWelcome: "स्वागत है", dashMyListings: "मेरी सूचियाँ", dashViews: "खरीदार व्यूज़",
      dashInterested: "इच्छुक खरीदार", dashSales: "संभावित बिक्री",
      dashMyListingsHeading: "मेरी वर्तमान सूचियाँ",
      marketTitle: "खरीदार खोजें", searchPlaceholder: "फसल खोजें...",
      filterCrop: "फसल", filterAll: "सभी", filterLocation: "स्थान",
      filterMaxPrice: "अधिकतम भाव (₹/किलो)", filterMinQty: "न्यूनतम मात्रा (किलो)",
      marketEmpty: "कोई फसल नहीं मिली। कुछ और खोजें।",
      viewDetails: "विवरण देखें", contactFarmer: "किसान से संपर्क करें",
      priceTitle: "बेचने से पहले भाव तुलना करें",
      priceDemo: "दिखाए गए भाव नमूना डेटा हैं और वास्तविक मंडी भाव नहीं दर्शाते।",
      priceRef: "संदर्भ बाज़ार भाव", priceFarmer: "किसान का अपेक्षित भाव", priceBuyer: "खरीदार का भाव",
      transportTitle: "परिवहन खोजें",
      transportProto: "यह एक प्रोटोटाइप सुविधा है — परिवहन बुकिंग अभी सक्रिय नहीं है।",
      transportPickup: "पिकअप स्थान", transportDelivery: "डिलीवरी स्थान",
      transportQty: "अनुमानित मात्रा (किलो)", transportSubmit: "परिवहन अनुरोध करें (नमूना)",
      transportSuccess: "परिवहन अनुरोध दर्ज किया गया (केवल नमूना)।",
      helpTitle: "सहायता",
      help1Q: "कैसे बेचें?", help1A: "किसान के रूप में लॉगिन करें, \"फसल बेचें\" पर जाएँ, फ़ॉर्म भरें और पोस्ट करें। आपकी सूची तुरंत बाज़ार में दिखेगी।",
      help2Q: "आवाज़ से खोज कैसे करें?", help2A: "माइक्रोफ़ोन बटन दबाएँ और फसल का नाम और जगह बोलें, जैसे \"पुणे में टमाटर खोजें\"।",
      help3Q: "भाव कैसे जाँचें?", help3A: "संदर्भ भाव की किसान और खरीदार भाव से तुलना करने के लिए \"बाज़ार भाव\" खोलें।",
      help4Q: "खरीदारों से संपर्क कैसे करें?", help4A: "किसी भी सूची पर \"किसान से संपर्क करें\" या \"अनुरोध भेजें\" दबाएँ।",
      help5Q: "फसल की फोटो कैसे अपलोड करें?", help5A: "फसल बेचें फ़ॉर्म में \"फोटो अपलोड करें\" दबाकर स्पष्ट फोटो चुनें।",
      help6Q: "सहायता से संपर्क करें", help6A: "अपनी भाषा में सहायता के लिए 1800-000-000 (नमूना नंबर) पर कॉल करें।",
      footerTag: "सीधे किसान-से-खरीदार बिक्री के लिए एक छात्र प्रोटोटाइप। Smart India Hackathon के लिए बनाया गया।",
      loginTitle: "किसान / खरीदार लॉगिन",
      loginDemoNote: "यह प्रोटोटाइप के लिए एक नमूना लॉगिन है। कोई वास्तविक खाता नहीं बनता।",
      roleFarmer: "👨‍🌾 किसान", roleBuyer: "🛒 खरीदार",
      fName: "पूरा नाम", fMobile: "मोबाइल नंबर", fVillage: "गाँव",
      fDistrict: "ज़िला", fState: "राज्य", fPrefLang: "पसंदीदा भाषा",
      fMainCrops: "मुख्य फसलें", fMainCropsPh: "जैसे टमाटर, प्याज",
      regSubmit: "पंजीकरण करें और जारी रखें",
      contactTitle: "किसान से संपर्क करें", contactCall: "कॉल करें", contactWhatsapp: "व्हाट्सएप",
      contactRequest: "अनुरोध भेजें", contactSent: "किसान को अनुरोध भेज दिया गया (नमूना)।",
      listingFarmer: "किसान", listingQty: "मात्रा", listingPrice: "भाव", listingLocation: "स्थान",
      statusActive: "सक्रिय", voiceListening: "🎤 सुन रहे हैं...", voiceSearching: "✓ खोज रहे हैं...",
      voiceUnsupported: "इस ब्राउज़र पर आवाज़ खोज उपलब्ध नहीं है। कृपया टाइप करके खोजें।",
      geoUnavailable: "स्थान उपलब्ध नहीं है। कृपया स्वयं टाइप करें।",
      geoFetching: "आपका स्थान खोजा जा रहा है...",
    },
  };

  const speechLangMap = { en: "en-IN", mr: "mr-IN", hi: "hi-IN" };

  // Crop names in all 3 languages, used to match voice/typed search to a canonical crop key.
  const cropAliases = {
    tomato: ["tomato", "टोमॅटो", "टमाटर"],
    onion: ["onion", "कांदा", "प्याज", "प्याज़"],
    potato: ["potato", "बटाटा", "आलू"],
    wheat: ["wheat", "गहू", "गेहूं", "गेहू"],
    rice: ["rice", "तांदूळ", "चावल"],
    maize: ["maize", "corn", "मका", "मक्का"],
  };

  let currentLang = "en";
  let currentRole = "farmer";
  let currentUser = null; // { name, mobile, village, district, state, lang, crops, role }

  /* ---------------------------------------------------------
     2. DEMO DATA (Maharashtra locations, no real personal info)
     --------------------------------------------------------- */
  const demoFarmers = [
    "Ramesh Patil", "Suresh Jadhav", "Ganesh More", "Anita Shinde", "Vijay Pawar",
    "Sunita Deshmukh", "Prakash Gaikwad", "Meera Kale", "Ashok Bhosale", "Kavita Thorat",
  ];
  const demoLocations = ["Pune", "Nashik", "Satara", "Sangli", "Kolhapur", "Solapur", "Baramati", "Ahmednagar"];

  function seedDemoListings() {
    const crops = ["tomato", "onion", "potato", "wheat", "rice", "maize"];
    const basePrices = { tomato: 25, onion: 20, potato: 18, wheat: 28, rice: 35, maize: 22 };
    const listings = [];
    let id = 1;
    demoLocations.forEach((loc, i) => {
      crops.forEach((crop, j) => {
        if ((i + j) % 2 === 0) {
          const base = basePrices[crop];
          listings.push({
            id: "demo-" + id++,
            crop,
            farmer: demoFarmers[(i + j) % demoFarmers.length],
            quantity: 100 + ((i + j) % 6) * 100,
            price: base + ((i + j) % 5) - 2,
            location: loc,
            quality: ["good", "better", "best"][(i + j) % 3],
            status: "active",
            isDemo: true,
            mobile: "98765" + String(10000 + id).slice(-5),
          });
        }
      });
    });
    return listings;
  }

  /* ---------------------------------------------------------
     3. STORAGE HELPERS (swap for Firebase later)
     --------------------------------------------------------- */
  const DB = {
    getListings() {
      try {
        const stored = JSON.parse(localStorage.getItem("df_listings") || "null");
        if (stored && Array.isArray(stored)) return stored;
      } catch (e) { /* ignore parse errors */ }
      const seeded = seedDemoListings();
      this.saveListings(seeded);
      return seeded;
    },
    saveListings(listings) {
      try { localStorage.setItem("df_listings", JSON.stringify(listings)); } catch (e) { /* storage unavailable */ }
    },
    addListing(listing) {
      const listings = this.getListings();
      listings.unshift(listing);
      this.saveListings(listings);
      return listings;
    },
    getUser() {
      try { return JSON.parse(localStorage.getItem("df_user") || "null"); } catch (e) { return null; }
    },
    saveUser(user) {
      try { localStorage.setItem("df_user", JSON.stringify(user)); } catch (e) { /* storage unavailable */ }
    },
  };

  /* ---------------------------------------------------------
     4. i18n APPLY
     --------------------------------------------------------- */
  function t(key) { return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key; }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.dataset.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.title = t("heroTitle") + " — DirectFarm";
    renderMarketplace();
    renderPriceComparison();
    renderMyListings();
  }

  function setLanguage(lang) {
    currentLang = translations[lang] ? lang : "en";
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.langBtn === currentLang);
    });
    applyTranslations();
  }

  /* ---------------------------------------------------------
     5. HEADER NAV / MOBILE MENU
     --------------------------------------------------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");
  hamburgerBtn.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    hamburgerBtn.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }));

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.langBtn));
  });

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.getAttribute("data-scroll"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------------------------------------------------------
     6. LOGIN / REGISTER MODAL
     --------------------------------------------------------- */
  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const loginModalClose = document.getElementById("loginModalClose");

  function openModal(modal) { modal.hidden = false; }
  function closeModal(modal) { modal.hidden = true; }

  loginBtn.addEventListener("click", () => openModal(loginModal));
  loginModalClose.addEventListener("click", () => closeModal(loginModal));
  loginModal.addEventListener("click", (e) => { if (e.target === loginModal) closeModal(loginModal); });

  document.querySelectorAll("[data-role-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      currentRole = tab.dataset.roleTab;
      document.querySelectorAll("[data-role-tab]").forEach((b) => b.classList.toggle("is-active", b === tab));
    });
  });

  document.getElementById("regUseLocationBtn").addEventListener("click", () => useGeolocation((place) => {
    document.getElementById("regVillage").value = place;
  }));

  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      name: document.getElementById("regName").value.trim() || "Farmer",
      mobile: document.getElementById("regMobile").value.trim(),
      village: document.getElementById("regVillage").value.trim(),
      district: document.getElementById("regDistrict").value.trim(),
      state: document.getElementById("regState").value.trim(),
      lang: document.getElementById("regLang").value,
      crops: document.getElementById("regCrops").value.trim(),
      role: currentRole,
    };
    currentUser = user;
    DB.saveUser(user);
    closeModal(loginModal);
    setLanguage(user.lang);
    loginBtn.textContent = "👤 " + user.name;

    if (user.role === "farmer") {
      document.getElementById("sellLoginHint").hidden = true;
      document.getElementById("sellForm").hidden = false;
      document.getElementById("dashboard").hidden = false;
      document.getElementById("dashFarmerName").textContent = user.name;
      renderMyListings();
      document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById("marketplace").scrollIntoView({ behavior: "smooth" });
    }
  });

  /* ---------------------------------------------------------
     7. GEOLOCATION
     --------------------------------------------------------- */
  function useGeolocation(onSuccess) {
    if (!navigator.geolocation) {
      alert(t("geoUnavailable"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const near = demoLocations[Math.floor(Math.random() * demoLocations.length)];
        onSuccess(near + " (" + pos.coords.latitude.toFixed(2) + ", " + pos.coords.longitude.toFixed(2) + ")");
      },
      () => alert(t("geoUnavailable")),
      { timeout: 8000 }
    );
  }

  document.getElementById("useLocationBtn").addEventListener("click", () => useGeolocation((place) => {
    document.getElementById("sellLocation").value = place;
  }));

  /* ---------------------------------------------------------
     8. SELL HARVEST FORM
     --------------------------------------------------------- */
  document.getElementById("sellForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const listing = {
      id: "user-" + Date.now(),
      crop: document.getElementById("cropName").value,
      farmer: (currentUser && currentUser.name) || "You",
      quantity: Number(document.getElementById("quantity").value) || 0,
      price: Number(document.getElementById("expPrice").value) || 0,
      location: document.getElementById("sellLocation").value || ((currentUser && currentUser.village) || ""),
      quality: document.getElementById("cropQuality").value,
      status: "active",
      isDemo: false,
      mobile: (currentUser && currentUser.mobile) || "9876543210",
      harvestDate: document.getElementById("harvestDate").value,
    };
    DB.addListing(listing);
    document.getElementById("sellForm").reset();
    const success = document.getElementById("sellSuccess");
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 4000);
    renderMarketplace();
    renderMyListings();
  });

  /* ---------------------------------------------------------
     9. DASHBOARD
     --------------------------------------------------------- */
  function renderMyListings() {
    const grid = document.getElementById("myListingsList");
    if (!grid) return;
    const mine = DB.getListings().filter((l) => !l.isDemo);
    grid.innerHTML = "";
    mine.forEach((l) => grid.appendChild(buildListingCard(l)));
    document.getElementById("dashListings").textContent = String(mine.length);
    document.getElementById("dashViews").textContent = String(mine.length * 7);
    document.getElementById("dashInterested").textContent = String(mine.length * 2);
    const potential = mine.reduce((sum, l) => sum + l.quantity * l.price, 0);
    document.getElementById("dashSales").textContent = "₹" + potential.toLocaleString("en-IN");
  }

  /* ---------------------------------------------------------
     10. MARKETPLACE
     --------------------------------------------------------- */
  const filterLocationSelect = document.getElementById("filterLocation");
  demoLocations.forEach((loc) => {
    const opt = document.createElement("option");
    opt.value = loc; opt.textContent = loc;
    filterLocationSelect.appendChild(opt);
  });

  function buildListingCard(listing) {
    const card = document.createElement("div");
    card.className = "listing-card";
    const cropEmoji = { tomato: "🍅", onion: "🧅", potato: "🥔", wheat: "🌾", rice: "🌾", maize: "🌽" }[listing.crop] || "🌾";
    card.innerHTML = `
      <span class="listing-crop">${cropEmoji} ${t("crop" + capitalize(listing.crop))}</span>
      <span class="listing-row">${t("listingFarmer")}: ${escapeHtml(listing.farmer)}</span>
      <span class="listing-row">${t("listingQty")}: ${listing.quantity} kg</span>
      <span class="listing-price">${t("listingPrice")}: ₹${listing.price}/kg</span>
      <span class="listing-row">${t("listingLocation")}: ${escapeHtml(listing.location)}</span>
      <span class="listing-status">${t("statusActive")}</span>
      <div class="listing-actions">
        <button class="btn btn-ghost btn-small" data-view-id="${listing.id}">${t("viewDetails")}</button>
        <button class="btn btn-primary btn-small" data-contact-id="${listing.id}">${t("contactFarmer")}</button>
      </div>
    `;
    return card;
  }

  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function renderMarketplace() {
    const grid = document.getElementById("marketplaceGrid");
    const empty = document.getElementById("marketEmpty");
    if (!grid) return;
    const query = (document.getElementById("searchInput").value || "").trim().toLowerCase();
    const cropFilter = document.getElementById("filterCrop").value;
    const locFilter = document.getElementById("filterLocation").value;
    const maxPrice = Number(document.getElementById("filterPrice").value) || Infinity;
    const minQty = Number(document.getElementById("filterQty").value) || 0;

    let listings = DB.getListings();

    if (query) {
      const matchedCrop = matchCropFromText(query);
      listings = listings.filter((l) => {
        const inCropName = t("crop" + capitalize(l.crop)).toLowerCase().includes(query) || l.crop.includes(query);
        const inLocation = l.location.toLowerCase().includes(query);
        const inCropAlias = matchedCrop && l.crop === matchedCrop;
        return inCropName || inLocation || inCropAlias;
      });
    }
    if (cropFilter) listings = listings.filter((l) => l.crop === cropFilter);
    if (locFilter) listings = listings.filter((l) => l.location === locFilter);
    listings = listings.filter((l) => l.price <= maxPrice && l.quantity >= minQty);

    grid.innerHTML = "";
    listings.forEach((l) => grid.appendChild(buildListingCard(l)));
    empty.hidden = listings.length > 0;
  }

  function matchCropFromText(text) {
    const lower = text.toLowerCase();
    for (const key in cropAliases) {
      if (cropAliases[key].some((alias) => lower.includes(alias.toLowerCase()))) return key;
    }
    return null;
  }

  ["searchInput", "filterCrop", "filterLocation", "filterPrice", "filterQty"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderMarketplace);
  });

  document.getElementById("marketplaceGrid").addEventListener("click", (e) => {
    const contactId = e.target.getAttribute("data-contact-id");
    const viewId = e.target.getAttribute("data-view-id");
    const id = contactId || viewId;
    if (!id) return;
    const listing = DB.getListings().find((l) => l.id === id);
    if (listing) openContactModal(listing);
  });
  document.getElementById("myListingsList").addEventListener("click", (e) => {
    const contactId = e.target.getAttribute("data-contact-id");
    const viewId = e.target.getAttribute("data-view-id");
    const id = contactId || viewId;
    if (!id) return;
    const listing = DB.getListings().find((l) => l.id === id);
    if (listing) openContactModal(listing);
  });

  /* ---------------------------------------------------------
     11. CONTACT MODAL
     --------------------------------------------------------- */
  const contactModal = document.getElementById("contactModal");
  document.getElementById("contactModalClose").addEventListener("click", () => closeModal(contactModal));
  contactModal.addEventListener("click", (e) => { if (e.target === contactModal) closeModal(contactModal); });

  function openContactModal(listing) {
    const details = document.getElementById("contactDetails");
    details.innerHTML = `
      <dt>${t("listingFarmer")}</dt><dd>${escapeHtml(listing.farmer)}</dd>
      <dt>${t("fCrop")}</dt><dd>${t("crop" + capitalize(listing.crop))}</dd>
      <dt>${t("listingQty")}</dt><dd>${listing.quantity} kg</dd>
      <dt>${t("listingPrice")}</dt><dd>₹${listing.price}/kg</dd>
      <dt>${t("listingLocation")}</dt><dd>${escapeHtml(listing.location)}</dd>
    `;
    document.getElementById("contactSuccess").hidden = true;
    contactModal.dataset.mobile = listing.mobile || "9876543210";
    openModal(contactModal);
  }

  document.getElementById("contactCallBtn").addEventListener("click", () => {
    window.location.href = "tel:" + contactModal.dataset.mobile;
  });
  document.getElementById("contactWhatsappBtn").addEventListener("click", () => {
    window.open("https://wa.me/91" + contactModal.dataset.mobile, "_blank");
  });
  document.getElementById("contactRequestBtn").addEventListener("click", () => {
    const success = document.getElementById("contactSuccess");
    success.textContent = t("contactSent");
    success.hidden = false;
  });

  /* ---------------------------------------------------------
     12. PRICE COMPARISON
     --------------------------------------------------------- */
  const priceDemo = {
    tomato: { ref: 23, farmer: 25, buyer: 26 },
    onion: { ref: 18, farmer: 20, buyer: 21 },
    potato: { ref: 16, farmer: 18, buyer: 19 },
    wheat: { ref: 26, farmer: 28, buyer: 29 },
    rice: { ref: 33, farmer: 35, buyer: 36 },
    maize: { ref: 20, farmer: 22, buyer: 23 },
  };

  function renderPriceComparison() {
    const grid = document.getElementById("priceGrid");
    if (!grid) return;
    grid.innerHTML = "";
    Object.keys(priceDemo).forEach((crop) => {
      const p = priceDemo[crop];
      const card = document.createElement("div");
      card.className = "price-card";
      const cropEmoji = { tomato: "🍅", onion: "🧅", potato: "🥔", wheat: "🌾", rice: "🌾", maize: "🌽" }[crop];
      card.innerHTML = `
        <h3>${cropEmoji} ${t("crop" + capitalize(crop))}</h3>
        <div class="price-line ref"><span>${t("priceRef")}</span><span>₹${p.ref}/kg</span></div>
        <div class="price-line farmer"><span>${t("priceFarmer")}</span><span>₹${p.farmer}/kg</span></div>
        <div class="price-line buyer"><span>${t("priceBuyer")}</span><span>₹${p.buyer}/kg</span></div>
      `;
      grid.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     13. TRANSPORT (prototype form)
     --------------------------------------------------------- */
  document.getElementById("transportForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert(t("transportSuccess"));
    e.target.reset();
  });

  /* ---------------------------------------------------------
     14. VOICE SEARCH
     --------------------------------------------------------- */
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  const voiceStatus = document.getElementById("voiceStatus");

  function runVoiceSearch(onListenButtons) {
    if (!SpeechRecognitionAPI) {
      voiceStatus.textContent = t("voiceUnsupported");
      return;
    }
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = speechLangMap[currentLang] || "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    onListenButtons.forEach((btn) => btn.classList.add("is-listening"));
    voiceStatus.textContent = t("voiceListening");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      voiceStatus.textContent = t("voiceSearching");
      document.getElementById("searchInput").value = transcript;
      const matchedCrop = matchCropFromText(transcript);
      if (matchedCrop) document.getElementById("filterCrop").value = matchedCrop;
      const matchedLoc = demoLocations.find((loc) => transcript.toLowerCase().includes(loc.toLowerCase()));
      if (matchedLoc) document.getElementById("filterLocation").value = matchedLoc;
      renderMarketplace();
      document.getElementById("marketplace").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { voiceStatus.textContent = ""; }, 2500);
    };
    recognition.onerror = () => {
      voiceStatus.textContent = t("voiceUnsupported");
    };
    recognition.onend = () => {
      onListenButtons.forEach((btn) => btn.classList.remove("is-listening"));
    };
    try { recognition.start(); } catch (err) { voiceStatus.textContent = t("voiceUnsupported"); }
  }

  document.getElementById("marketVoiceBtn").addEventListener("click", () => {
    runVoiceSearch([document.getElementById("marketVoiceBtn")]);
  });
  document.getElementById("heroVoiceBtn").addEventListener("click", () => {
    document.getElementById("marketplace").scrollIntoView({ behavior: "smooth" });
    runVoiceSearch([document.getElementById("heroVoiceBtn"), document.getElementById("marketVoiceBtn")]);
  });

  /* ---------------------------------------------------------
     15. INIT
     --------------------------------------------------------- */
  function init() {
    const savedUser = DB.getUser();
    if (savedUser) {
      currentUser = savedUser;
      currentLang = translations[savedUser.lang] ? savedUser.lang : "en";
      if (savedUser.role === "farmer") {
        document.getElementById("sellLoginHint").hidden = true;
        document.getElementById("sellForm").hidden = false;
        document.getElementById("dashboard").hidden = false;
        document.getElementById("dashFarmerName").textContent = savedUser.name;
      }
      loginBtn.textContent = "👤 " + savedUser.name;
    }
    setLanguage(currentLang);
  }

  init();
})();
