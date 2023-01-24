const CIRCUIT_DATA = {
  circuits: [
    {
      circuitId: 'albert_park',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/7col/image.png',
      CircuitName: 'Albert Park Grand Prix Circuit',
      Locality: 'Melbourne',
      Country: 'Australia',
      round: 3,
      packages: [
        {
          name: 'HERO_1',
          period: 'THURSDAY - SUNDAY',
          price: 1,
        },
        {
          name: 'Champions Club 3-Days - 1',
          period: 'FRIDAY - SUNDAY',
          price: 11,
        },
      ],
    },
    {
      circuitId: 'americas',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/USA_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit of the Americas',
      Locality: 'Austin',
      Country: 'USA',
      round: 19,
      packages: [
        {
          name: 'HERO_2',
          period: 'THURSDAY - SUNDAY',
          price: 2,
        },
        {
          name: 'Champions Club 3-Days - 2',
          period: 'FRIDAY - SUNDAY',
          price: 12,
        },
      ],
    },
    {
      circuitId: 'bahrain',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/9col/image.png',
      CircuitName: 'Bahrain International Circuit',
      Locality: 'Sakhir',
      Country: 'Bahrain',
      round: 1,
      packages: [
        {
          name: 'HERO_3',
          period: 'THURSDAY - SUNDAY',
          price: 3,
        },
        {
          name: 'Champions Club 3-Days - 3',
          period: 'FRIDAY - SUNDAY',
          price: 13,
        },
      ],
    },
    {
      circuitId: 'baku',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Baku_Circuit.png.transform/7col/image.png',
      CircuitName: 'Baku City Circuit',
      Locality: 'Baku',
      Country: 'Azerbaijan',
      round: 8,
      packages: [
        {
          name: 'HERO_4',
          period: 'THURSDAY - SUNDAY',
          price: 4,
        },
        {
          name: 'Champions Club 3-Days - 4',
          period: 'FRIDAY - SUNDAY',
          price: 14,
        },
      ],
    },
    {
      circuitId: 'catalunya',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit de Barcelona-Catalunya',
      Locality: 'Montmeló',
      Country: 'Spain',
      round: 6,
      packages: [
        {
          name: 'HERO_5',
          period: 'THURSDAY - SUNDAY',
          price: 5,
        },
        {
          name: 'Champions Club 3-Days - 5',
          period: 'FRIDAY - SUNDAY',
          price: 15,
        },
      ],
    },
    {
      circuitId: 'hungaroring',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/7col/image.png',
      CircuitName: 'Hungaroring',
      Locality: 'Budapest',
      Country: 'Hungary',
      round: 13,
      packages: [
        {
          name: 'HERO_6',
          period: 'THURSDAY - SUNDAY',
          price: 6,
        },
        {
          name: 'Champions Club 3-Days - 6',
          period: 'FRIDAY - SUNDAY',
          price: 16,
        },
      ],
    },
    {
      circuitId: 'imola',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autodromo Enzo e Dino Ferrari',
      Locality: 'Imola',
      Country: 'Italy',
      round: 4,
      packages: [
        {
          name: 'HERO_7',
          period: 'THURSDAY - SUNDAY',
          price: 7,
        },
        {
          name: 'Champions Club 3-Days - 7',
          period: 'FRIDAY - SUNDAY',
          price: 17,
        },
      ],
    },
    {
      circuitId: 'interlagos',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autódromo José Carlos Pace',
      Locality: 'São Paulo',
      Country: 'Brazil',
      round: 21,
      packages: [
        {
          name: 'HERO_8',
          period: 'THURSDAY - SUNDAY',
          price: 8,
        },
        {
          name: 'Champions Club 3-Days - 8',
          period: 'FRIDAY - SUNDAY',
          price: 18,
        },
      ],
    },
    {
      circuitId: 'jeddah',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/7col/image.png',
      CircuitName: 'Jeddah Corniche Circuit',
      Locality: 'Jeddah',
      Country: 'Saudi Arabia',
      round: 2,
      packages: [
        {
          name: 'HERO_9',
          period: 'THURSDAY - SUNDAY',
          price: 9,
        },
        {
          name: 'Champions Club 3-Days - 9',
          period: 'FRIDAY - SUNDAY',
          price: 19,
        },
      ],
    },
    {
      circuitId: 'marina_bay',
      url: 'https://www.formula1.com/content/dam/fom-website/manual/races/Singapore/singapore_track.png.transform/7col/image.png',
      CircuitName: 'Marina Bay Street Circuit',
      Locality: 'Marina Bay',
      Country: 'Singapore',
      round: 17,
      packages: [
        {
          name: 'HERO_10',
          period: 'THURSDAY - SUNDAY',
          price: 10,
        },
        {
          name: 'Champions Club 3-Days - 10',
          period: 'FRIDAY - SUNDAY',
          price: 20,
        },
      ],
    },
    {
      circuitId: 'miami',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit.png.transform/7col/image.png',
      CircuitName: 'Miami International Autodrome',
      Locality: 'Miami',
      Country: 'USA',
      round: 5,
      packages: [
        {
          name: 'HERO_11',
          period: 'THURSDAY - SUNDAY',
          price: 11,
        },
        {
          name: 'Champions Club 3-Days - 11',
          period: 'FRIDAY - SUNDAY',
          price: 21,
        },
      ],
    },
    {
      circuitId: 'monaco',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monoco_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit de Monaco',
      Locality: 'Monte-Carlo',
      Country: 'Monaco',
      round: 7,
      packages: [
        {
          name: 'HERO_12',
          period: 'THURSDAY - SUNDAY',
          price: 12,
        },
        {
          name: 'Champions Club 3-Days - 12',
          period: 'FRIDAY - SUNDAY',
          price: 22,
        },
      ],
    },
    {
      circuitId: 'monza',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autodromo Nazionale di Monza',
      Locality: 'Monza',
      Country: 'Italy',
      round: 16,
      packages: [
        {
          name: 'HERO_13',
          period: 'THURSDAY - SUNDAY',
          price: 13,
        },
        {
          name: 'Champions Club 3-Days - 13',
          period: 'FRIDAY - SUNDAY',
          price: 23,
        },
      ],
    },
    {
      circuitId: 'red_bull_ring',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/7col/image.png',
      CircuitName: 'Red Bull Ring',
      Locality: 'Spielberg',
      Country: 'Austria',
      round: 11,
      packages: [
        {
          name: 'HERO_14',
          period: 'THURSDAY - SUNDAY',
          price: 14,
        },
        {
          name: 'Champions Club 3-Days - 14',
          period: 'FRIDAY - SUNDAY',
          price: 24,
        },
      ],
    },
    {
      circuitId: 'ricard',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/France_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit Paul Ricard',
      Locality: 'Le Castellet',
      Country: 'France',
      round: 12,
      packages: [
        {
          name: 'HERO_15',
          period: 'THURSDAY - SUNDAY',
          price: 15,
        },
        {
          name: 'Champions Club 3-Days - 15',
          period: 'FRIDAY - SUNDAY',
          price: 25,
        },
      ],
    },
    {
      circuitId: 'rodriguez',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autódromo Hermanos Rodríguez',
      Locality: 'Mexico City',
      Country: 'Mexico',
      round: 20,
      packages: [
        {
          name: 'HERO_16',
          period: 'THURSDAY - SUNDAY',
          price: 16,
        },
        {
          name: 'Champions Club 3-Days - 16',
          period: 'FRIDAY - SUNDAY',
          price: 26,
        },
      ],
    },
    {
      circuitId: 'silverstone',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/7col/image.png',
      CircuitName: 'Silverstone Circuit',
      Locality: 'Silverstone',
      Country: 'UK',
      round: 10,
      packages: [
        {
          name: 'HERO_17',
          period: 'THURSDAY - SUNDAY',
          price: 17,
        },
        {
          name: 'Champions Club 3-Days - 17',
          period: 'FRIDAY - SUNDAY',
          price: 27,
        },
      ],
    },
    {
      circuitId: 'spa',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit de Spa-Francorchamps',
      Locality: 'Spa',
      Country: 'Belgium',
      round: 14,
      packages: [
        {
          name: 'HERO_18',
          period: 'THURSDAY - SUNDAY',
          price: 18,
        },
        {
          name: 'Champions Club 3-Days - 18',
          period: 'FRIDAY - SUNDAY',
          price: 28,
        },
      ],
    },
    {
      circuitId: 'suzuka',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/7col/image.png',
      CircuitName: 'Suzuka Circuit',
      Locality: 'Suzuka',
      Country: 'Japan',
      round: 18,
      packages: [
        {
          name: 'HERO_19',
          period: 'THURSDAY - SUNDAY',
          price: 19,
        },
        {
          name: 'Champions Club 3-Days - 19',
          period: 'FRIDAY - SUNDAY',
          price: 29,
        },
      ],
    },
    {
      circuitId: 'villeneuve',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit Gilles Villeneuve',
      Locality: 'Montreal',
      Country: 'Canada',
      round: 9,
      packages: [
        {
          name: 'HERO_20',
          period: 'THURSDAY - SUNDAY',
          price: 20,
        },
        {
          name: 'Champions Club 3-Days - 20',
          period: 'FRIDAY - SUNDAY',
          price: 30,
        },
      ],
    },
    {
      circuitId: 'yas_marina',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/7col/image.png',
      CircuitName: 'Yas Marina Circuit',
      Locality: 'Abu Dhabi',
      Country: 'UAE',
      round: 22,
      packages: [
        {
          name: 'HERO_21',
          period: 'THURSDAY - SUNDAY',
          price: 21,
        },
        {
          name: 'Champions Club 3-Days - 21',
          period: 'FRIDAY - SUNDAY',
          price: 31,
        },
      ],
    },
    {
      circuitId: 'zandvoort',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit.png.transform/7col/image.png',
      CircuitName: ' Circuit Park Zandvoort',
      Locality: 'Zandvoort',
      Country: 'Netherlands',
      round: 15,
      packages: [
        {
          name: 'HERO_22',
          period: 'THURSDAY - SUNDAY',
          price: 22,
        },
        {
          name: 'Champions Club 3-Days - 22',
          period: 'FRIDAY - SUNDAY',
          price: 32,
        },
      ],
    },
  ],
};

export default CIRCUIT_DATA;
