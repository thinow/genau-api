const ARTICLE = [
  { category: 'article', label: 'Tier', translation: 'animal', answers: { right: 'das', wrong: ['der', 'die'] } },
  { category: 'article', label: 'Tisch', translation: 'table', answers: { right: 'der', wrong: ['die', 'das'] } },
  { category: 'article', label: 'Stuhl', translation: 'chair', answers: { right: 'der', wrong: ['die', 'das'] } },
  { category: 'article', label: 'Fenster', translation: 'window', answers: { right: 'das', wrong: ['der', 'die'] } },
  { category: 'article', label: 'Stimme', translation: 'voice', answers: { right: 'die', wrong: ['der', 'das'] } }
];

const PLURAL = [
  { category: 'plural', label: 'Tier', translation: 'animal', answers: { right: 'die Tiere', wrong: ['die Tier', 'die Tieren', 'die Tiern'] } },
  { category: 'plural', label: 'Tisch', translation: 'table', answers: { right: 'die Tische', wrong: ['die Tisch', 'die Tischen', 'die Tischn'] } },
  { category: 'plural', label: 'Stuhl', translation: 'chair', answers: { right: 'die Stühle', wrong: ['die Stühlen', 'die Stuhle', 'die Stuhlen'] } },
  { category: 'plural', label: 'Fenster', translation: 'window', answers: { right: 'die Fenster', wrong: ['die Fenstern', 'die Fensteren', 'die Fenstere'] } },
  { category: 'plural', label: 'Stimme', translation: 'voice', answers: { right: 'die Stimmen', wrong: ['die Stimme', 'die Stimmung', 'die Stimmüng'] } }
];

const PERFECT = [
  { category: 'perfect', label: 'machen', translation: 'to do, to make', answers: { right: 'er hat gemacht', wrong: ['er ist gemacht', 'er hat gemachen', 'er ist gemachen'] } },
  { category: 'perfect', label: 'tun', translation: 'to do', answers: { right: 'er hat getan', wrong: ['er hat getun', 'er hat tan', 'er hat tun'] } },
  { category: 'perfect', label: 'vergessen', translation: 'to forget', answers: { right: 'er hat vergessen', wrong: ['er hat vergesst', 'er hat vergegessen', 'er hat vergegesst'] } }
];

const SIMPLE_PAST = [
  { category: 'simple-past', label: 'machen', translation: 'to do, to make', answers: { right: 'er machte', wrong: ['er macht', 'er mochte', 'er möchte'] } },
  { category: 'simple-past', label: 'tun', translation: 'to do', answers: { right: 'er tut', wrong: ['er tan', 'er tute', 'er tante'] } },
  { category: 'simple-past', label: 'vergessen', translation: 'to forget', answers: { right: 'er vergaß', wrong: ['er vergiß', 'er vergesst', 'er vergesset'] } }
];

const ALL = [...ARTICLE, ...PLURAL, ...PERFECT, ...SIMPLE_PAST];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const pickFrom = (array) => {
  const index = getRandomIntInclusive(0, array.length - 1);
  return array[index];
};

export default {
  all: ALL,
  article: ARTICLE,
  plural: PLURAL,
  perfect: PERFECT,
  'simple-past': SIMPLE_PAST
};