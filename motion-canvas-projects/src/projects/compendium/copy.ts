export default {
  aside: [
    {
      id: 1,
      topic: "UK Education System",
      subtopics: ["Start Age", "National Curriculum", "Reception & KS1"],
      description: "How early childhood curriculum is\n structured in the UK.",
    },
    {
      id: 2,
      topic: "Teaching",
      subtopics: [
        "Phonemes",
        "Graphemes",
        "Mnemonics",
        "Approach",
        "Phase 1",
        "Phase 2",
        "Phase 3",
        "Phase 4",
        "Phase 5",
        "Phase 6",
      ],
      description: "A guide on teaching phonics\nto early learners.",
    },
    {
      id: 3,
      topic: "SSP Innovation",
      subtopics: ["The Epiphany", "The Book", "Trainertext"],
      description: "A scientific approach to teaching\nphonics.",
    },
    {
      id: 4,
      topic: "Products",
      subtopics: [
        "Easyread",
        "Physical Learning Materials (All Aboard)",
        "Online Learning Materials (All Aboard)",
        "Gamified Mobile App (All Aboard)",
        "Facilitator Dashboard (All Aboard)",
      ],
      description: "Solutions pictophonics offer.",
    },
  ],
  main: [{ asideID: 1 }, { asideID: 2 }, { asideID: 3 }, { asideID: 4 }],
};

// prettier-ignore
const copy= {
    "slide.intro": {
      "text.h1": "Company Overview",
      "text.h4": "What we do and why we do what we do.",
      "script.text": `
        Hello, this is a short presentation aimed at introducing David Morgan Education to new joiners. 
        Think of this as a why, when and how compendium of things we do
        `,
    },
    "slide.content": {
      "section.1": {
        "text.topic": "UK Education System",
        "text.subtopic.1": "Start Age", // 4-5years(reception) 5-6years(year1)
        "text.subtopic.2": "National Curriculum", // KS1 KS2 KS3 KS4
        "text.subtopic.3": "Reception & KS1", // KS1 and KS2 [phonics training and screening] [Product Fit ??venn diagram animation??]
        "text.subtopic.4": "Approach", // systematic synthetic phonics [sound representation] [sound blending]
        "text.description": "",
        "script.text": "", // only covering section germain to us
      },
      "section.2": {
        "text.topic": "Teaching",
        "text.subtopic.1": "Phonemes",
        "text.subtopic.2": "Graphemes",
        "text.subtopic.3": "Mnemonics",
        "text.subtopic.4": "Phase 1", // [Phase 1 - aural/listening]
        "text.subtopic.5": "Phase 2", // [Phase 2 - phonemes(19 out of 44)]
        "text.subtopic.6": "Phase 3", // [Phase 3 - phonemes(remaining 25 out of 44) - intro writing]
        "text.subtopic.7": "Phase 4", // [Phase 4 - consolidation and refining - reading/spelling/writing]
        "text.subtopic.8": "Phase 5", // [Phase 5 - alternative spellings - new graphemes]
        "text.subtopic.9": "Phase 6", // [Phase 6 - reading fluency - silent decoding]
        "text.description": "",
        "script.text": "", // only covering section germain to us
      },
      "section.3": {
        "text.topic": "SSP Innovation",
        "text.subtopic.1": "The Epiphany", // David struggling with his child and getting an epiphany in the bath tub
        "text.subtopic.2": "The Book", // Research work to understand the neurology behind reading difficulties
        "text.subtopic.3": "Trainertext", // Pictophonics as a grapheme mnemonic + words
        "text.description": "",
        "script.text": "",
      },
      "section.4": {
        "text.topic": "Products",
        "text.subtopic.1": "Easyread", // Intervention KS1 programme
        "text.subtopic.2": "All Aboard Phonics",
        "text.subtopic.2.subtopic.1": "Physical Learning Materials", // classroom paper based lesson plans, decodable book library
        "text.subtopic.2.subtopic.2": "Online Learning Materials", // classroom smart board lessons
        "text.subtopic.2.subtopic.3": "Gamified Mobile App", // home extra learning tool
        "text.subtopic.2.subtopic.4": "Facilitator Dashboard", // performance over
        "text.description": "",
        "script.text": "",
      },
    },
    "slide.system": {},
    "slide.teaching": {},
    "slide.innovation": {},
    "slide.products": {},
  };
