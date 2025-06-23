export interface BirdObservation {
  speciesCode: string;
  comName: string;
  sciName: string;
  locName: string;
  obsDt: string;
  howMany: number;
  lat: number;
  lng: number;
  obsValid: boolean;
  obsReviewed: boolean;
  locationPrivate: boolean;
  subId: string;
}

// Static bird observation data for Fullerton Arboretum
// This represents realistic recent sightings that would be found at CSUF
export const staticBirdData: BirdObservation[] = [
  {
    speciesCode: 'annhum',
    comName: "Anna's Hummingbird",
    sciName: 'Calypte anna',
    locName: 'Fullerton Arboretum--Native Plant Garden',
    obsDt: '2024-01-15 08:30:00',
    howMany: 2,
    lat: 33.8831,
    lng: -117.8832,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847396'
  },
  {
    speciesCode: 'amecro',
    comName: 'American Crow',
    sciName: 'Corvus brachyrhynchos',
    locName: 'Fullerton Arboretum--Parking Area',
    obsDt: '2024-01-15 09:15:00',
    howMany: 4,
    lat: 33.8835,
    lng: -117.8825,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847397'
  },
  {
    speciesCode: 'houfin',
    comName: 'House Finch',
    sciName: 'Haemorhous mexicanus',
    locName: 'Fullerton Arboretum--Rose Garden',
    obsDt: '2024-01-15 07:45:00',
    howMany: 6,
    lat: 33.8828,
    lng: -117.8835,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847398'
  },
  {
    speciesCode: 'moudo',
    comName: 'Mourning Dove',
    sciName: 'Zenaida macroura',
    locName: 'CSUF Campus--Quad Area',
    obsDt: '2024-01-15 10:20:00',
    howMany: 3,
    lat: 33.8825,
    lng: -117.8845,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847399'
  },
  {
    speciesCode: 'rewbla',
    comName: 'Red-winged Blackbird',
    sciName: 'Agelaius phoeniceus',
    locName: 'Fullerton Arboretum--Pond Area',
    obsDt: '2024-01-14 16:45:00',
    howMany: 5,
    lat: 33.8833,
    lng: -117.8830,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847400'
  },
  {
    speciesCode: 'nomo',
    comName: 'Northern Mockingbird',
    sciName: 'Mimus polyglottos',
    locName: 'CSUF Campus--Student Recreation Center',
    obsDt: '2024-01-14 14:30:00',
    howMany: 1,
    lat: 33.8820,
    lng: -117.8850,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847401'
  },
  {
    speciesCode: 'yewwar',
    comName: 'Yellow Warbler',
    sciName: 'Setophaga petechia',
    locName: 'Fullerton Arboretum--Woodland Trail',
    obsDt: '2024-01-14 11:15:00',
    howMany: 2,
    lat: 33.8829,
    lng: -117.8838,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847402'
  },
  {
    speciesCode: 'whbnut',
    comName: 'White-breasted Nuthatch',
    sciName: 'Sitta carolinensis',
    locName: 'Fullerton Arboretum--Oak Grove',
    obsDt: '2024-01-13 13:20:00',
    howMany: 1,
    lat: 33.8831,
    lng: -117.8834,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847403'
  },
  {
    speciesCode: 'grrfla',
    comName: 'Great-tailed Grackle',
    sciName: 'Quiscalus mexicanus',
    locName: 'CSUF Campus--Titan Stadium',
    obsDt: '2024-01-13 09:00:00',
    howMany: 8,
    lat: 33.8815,
    lng: -117.8855,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847404'
  },
  {
    speciesCode: 'caltow',
    comName: 'California Towhee',
    sciName: 'Melozone crissalis',
    locName: 'Fullerton Arboretum--Chaparral Garden',
    obsDt: '2024-01-13 15:45:00',
    howMany: 3,
    lat: 33.8826,
    lng: -117.8840,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847405'
  },
  {
    speciesCode: 'bushtit',
    comName: 'Bushtit',
    sciName: 'Psaltriparus minimus',
    locName: 'Fullerton Arboretum--Heritage House',
    obsDt: '2024-01-12 12:30:00',
    howMany: 12,
    lat: 33.8834,
    lng: -117.8828,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847406'
  },
  {
    speciesCode: 'lesgo',
    comName: 'Lesser Goldfinch',
    sciName: 'Spinus psaltria',
    locName: 'Fullerton Arboretum--Herb Garden',
    obsDt: '2024-01-12 10:15:00',
    howMany: 4,
    lat: 33.8830,
    lng: -117.8832,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847407'
  },
  {
    speciesCode: 'acowoo',
    comName: "Acorn Woodpecker",
    sciName: 'Melanerpes formicivorus',
    locName: 'Fullerton Arboretum--Oak Grove',
    obsDt: '2024-01-11 14:20:00',
    howMany: 2,
    lat: 33.8831,
    lng: -117.8835,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847408'
  },
  {
    speciesCode: 'scrja',
    comName: 'California Scrub-Jay',
    sciName: 'Aphelocoma californica',
    locName: 'Fullerton Arboretum--Pine Collection',
    obsDt: '2024-01-11 11:45:00',
    howMany: 3,
    lat: 33.8827,
    lng: -117.8837,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847409'
  },
  {
    speciesCode: 'bewick',
    comName: "Bewick's Wren",
    sciName: 'Thryomanes bewickii',
    locName: 'Fullerton Arboretum--Desert Garden',
    obsDt: '2024-01-10 16:30:00',
    howMany: 1,
    lat: 33.8825,
    lng: -117.8843,
    obsValid: true,
    obsReviewed: false,
    locationPrivate: false,
    subId: 'S152847410'
  }
];

// Function to get relative time display
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) {
    return 'Less than 1 hour ago';
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString();
  }
}; 