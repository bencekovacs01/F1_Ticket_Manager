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
          name: 'HERO',
          period: 'THURSDAY - SUNDAY',
        },
        {
          name: 'Champions Club 3-Days',
          period: 'FRIDAY - SUNDAY',
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
          name: 'HERO',
          period: 'THURSDAY - SUNDAY',
        },
        {
          name: 'Champions Club 3-Days',
          period: 'FRIDAY - SUNDAY',
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
    },
    {
      circuitId: 'catalunya',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit de Barcelona-Catalunya',
      Locality: 'Montmeló',
      Country: 'Spain',
      round: 6,
    },
    {
      circuitId: 'hungaroring',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/7col/image.png',
      CircuitName: 'Hungaroring',
      Locality: 'Budapest',
      Country: 'Hungary',
      round: 13,
    },
    {
      circuitId: 'imola',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autodromo Enzo e Dino Ferrari',
      Locality: 'Imola',
      Country: 'Italy',
      round: 4,
    },
    {
      circuitId: 'interlagos',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autódromo José Carlos Pace',
      Locality: 'São Paulo',
      Country: 'Brazil',
      round: 21,
    },
    {
      circuitId: 'jeddah',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/7col/image.png',
      CircuitName: 'Jeddah Corniche Circuit',
      Locality: 'Jeddah',
      Country: 'Saudi Arabia',
      round: 2,
    },
    {
      circuitId: 'marina_bay',
      url: 'https://www.formula1.com/content/dam/fom-website/manual/races/Singapore/singapore_track.png.transform/7col/image.png',
      CircuitName: 'Marina Bay Street Circuit',
      Locality: 'Marina Bay',
      Country: 'Singapore',
      round: 17,
    },
    {
      circuitId: 'miami',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit.png.transform/7col/image.png',
      CircuitName: 'Miami International Autodrome',
      Locality: 'Miami',
      Country: 'USA',
      round: 5,
    },
    {
      circuitId: 'monaco',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monoco_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit de Monaco',
      Locality: 'Monte-Carlo',
      Country: 'Monaco',
      round: 7,
    },
    {
      circuitId: 'monza',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autodromo Nazionale di Monza',
      Locality: 'Monza',
      Country: 'Italy',
      round: 16,
    },
    {
      circuitId: 'red_bull_ring',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/7col/image.png',
      CircuitName: 'Red Bull Ring',
      Locality: 'Spielberg',
      Country: 'Austria',
      round: 11,
    },
    {
      circuitId: 'ricard',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/France_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit Paul Ricard',
      Locality: 'Le Castellet',
      Country: 'France',
      round: 12,
    },
    {
      circuitId: 'rodriguez',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/7col/image.png',
      CircuitName: 'Autódromo Hermanos Rodríguez',
      Locality: 'Mexico City',
      Country: 'Mexico',
      round: 20,
    },
    {
      circuitId: 'silverstone',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/7col/image.png',
      CircuitName: 'Silverstone Circuit',
      Locality: 'Silverstone',
      Country: 'UK',
      round: 10,
    },
    {
      circuitId: 'spa',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit de Spa-Francorchamps',
      Locality: 'Spa',
      Country: 'Belgium',
      round: 14,
    },
    {
      circuitId: 'suzuka',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/7col/image.png',
      CircuitName: 'Suzuka Circuit',
      Locality: 'Suzuka',
      Country: 'Japan',
      round: 18,
    },
    {
      circuitId: 'villeneuve',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit.png.transform/7col/image.png',
      CircuitName: 'Circuit Gilles Villeneuve',
      Locality: 'Montreal',
      Country: 'Canada',
      round: 9,
    },
    {
      circuitId: 'yas_marina',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/7col/image.png',
      CircuitName: 'Yas Marina Circuit',
      Locality: 'Abu Dhabi',
      Country: 'UAE',
      round: 22,
    },
    {
      circuitId: 'zandvoort',
      url: 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit.png.transform/7col/image.png',
      CircuitName: ' Circuit Park Zandvoort',
      Locality: 'Zandvoort',
      Country: 'Netherlands',
      round: 15,
    },
  ],
};

export default CIRCUIT_DATA;
