//this js file is to hold this complex data structure, didn't want to clog the one with the scripts
var allData = [
  {
    //0
    name: "B6 Parking Lot",
    bldg: {
      north: 34.2445171,
      south: 34.24270782,
      east: -118.53177309,
      west: -118.5338974
    },
    beenUsed: false
  },
  {
    //1
    name: "B5 Parking Lot",
    bldg: {
      north: 34.2425127,
      south: 34.24095172,
      east: -118.53185892,
      west: -118.53359699
    },
    beenUsed: false
  },
  {//2
    name: "B4 Parking Lot",
    bldg: {
      north: 34.24077433,
      south: 34.23912462,
      east: -118.53179455,
      west: -118.53368282
    },
    beenUsed: false
  },
  {//3
    name: "B3 Parking Lot",
    bldg: {
      north: 34.23898271,
      south: 34.23733297,
      east: -118.53179455,
      west: -118.53379011
    },
    beenUsed: false
  },
  {//4
    name: "B2 & B1 Parking Lot",
    bldg: {
      north: 34.2371201,
      south: 34.23562955,
      east: -118.53177309,
      west: -118.53366137
    },
    beenUsed: false
  },
  {
    name: "D6 & E6 Parking Lot",
    bldg: {
      north: 34.24442841,
      south: 34.24276104,
      east: -118.52733135,
      west: -118.52963805
    },
    beenUsed: false
  },
  {
    name: "Juniper Hall",
    bldg: {
      north: 34.24247723,
      south: 34.24096946,
      east: -118.52990627,
      west: -118.5316658
    },
    beenUsed: false
  },
  {
    name: "Jacaranda Hall",
    bldg: {
      north: 34.24253044,
      south: 34.24104041,
      east: -118.52756739,
      west: -118.52975607
    },
    beenUsed: false
  },
  {
    name: "Bayramian Hall",
    bldg: {
      north: 34.24077433,
      south: 34.23983418,
      east: -118.53005648,
      west: -118.53155851
    },
    beenUsed: false
  },
  {
    name: "Oviatt Library",
    bldg: {
      north: 34.24045504,
      south: 34.23928428,
      east: -118.5285759,
      west: -118.53028178
    },
    beenUsed: false
  },
  {
    name: "Magnolia Hall, Chicano House, Eucalyptus Hall, and Live Oak Hall",
    bldg: {
      north: 34.24077433,
      south: 34.23995835,
      east: -118.52754593,
      west: -118.52846861
    },
    beenUsed: false
  },
  {
    name: "Jerome Richfield, Sierra Center, Sierra Tower, Sierra Hall",
    bldg: {
      north: 34.23903593,
      south: 34.23790063,
      east: -118.52979898,
      west: -118.53145123
    },
    beenUsed: false
  },
  {
    name: "Manzanita Hall",
    bldg: {
      north: 34.23790063,
      south: 34.23667289,
      east: -118.52917671,
      west: -118.53087187
    },
    beenUsed: false
  },
  {
    name: "Nordhoff & Cypress Hall",
    bldg: {
      north: 34.23667661,
      south: 34.23580737,
      east: -118.52906942,
      west: -118.53112936
    },
    beenUsed: false
  },
  {
    name: "Valley Performing Arts Center",
    bldg: {
      north: 34.23665887,
      south: 34.23570279,
      east: -118.52743864,
      west: -118.52889776
    },
    beenUsed: false
  },
  {
    name: "Book Store",
    bldg: {
      north: 34.23775871,
      south: 34.23681853,
      east: -118.52752447,
      west: -118.52885485
    },
    beenUsed: false
  },
  {
    name: "Orange Grove Bistro",
    bldg: {
      north: 34.23678305,
      south: 34.23605572,
      east: -118.52570057,
      west: -118.52651596
    },
    beenUsed: false
  },
  {
    name: "Monterey Hall",
    bldg: {
      north: 34.23699592,
      south: 34.23610894,
      east: -118.5234046,
      west: -118.52471352
    },
    beenUsed: false
  },
  {
    name: "G3 Parking Lot",
    bldg: {
      north: 34.2389295,
      south: 34.23729749,
      east: -118.52338314,
      west: -118.52576494
    },
    beenUsed: false
  },

  {
    name: "Chapparal Hall (& Student Health Center)", // what I was assigned
    bldg: {
      north: 34.23901819,
      south: 34.23777645,
      east: -118.52576494,
      west: -118.52739573
    },
    beenUsed: false
  },

  {
    name: "Student Resource Center",
    bldg: {
      north: 34.24077433,
      south: 34.23914236,
      east: -118.52336168,
      west: -118.52531433
    },
    beenUsed: false
  },

  {
    name: "University Student Union",
    bldg: {
      north: 34.24065016,
      south: 34.23931975,
      east: -118.52527142,
      west: -118.52700949
    },
    beenUsed: false
  },

  {
    name: "Redwood Hall",
    bldg: {
      north: 34.24254818,
      south: 34.24107589,
      east: -118.52544308,
      west: -118.52722406
    },
    beenUsed: false
  },

  {
    name: "F5 Parking Lot",
    bldg: {
      north: 34.24256592,
      south: 34.24100494,
      east: -118.52460623,
      west: -118.52524996
    },
    beenUsed: false
  },

  {
    name: "G4 Parking Lot",
    bldg: {
      north: 34.24109363,
      south: 34.24040182,
      east: -118.52346897,
      west: -118.52456331
    },
    beenUsed: false
  },

  {
    name: "Track",
    bldg: {
      north: 34.24790496,
      south: 34.24590064,
      east: -118.52561474,
      west: -118.52707386
    },
    beenUsed: false
  },

  {
    name: "Northridge Academy High School",
    bldg: {
      north: 34.24563458,
      south: 34.24469448,
      east: -118.52366209,
      west: -118.52475643
    },
    beenUsed: false
  },

  {
    name: "F8 Parking Lot",
    bldg: {
      north: 34.2470181,
      south: 34.24641503,
      east: -118.5245204,
      west: -118.52555037
    },
    beenUsed: false
  },

  {
    name: "F9 Parking Lot",
    bldg: {
      north: 34.24960771,
      south: 34.24882729,
      east: -118.52524996,
      west: -118.52602243
    },
    beenUsed: false
  },
  {
    name: "G9 Parking Lot",
    bldg: {
      north: 34.24918203,
      south: 34.24861445,
      east: -118.52351189,
      west: -118.52437019
    },
    beenUsed: false
  }
];
