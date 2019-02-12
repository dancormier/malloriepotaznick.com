const ratios = {
  'minor second': 16 / 15,
  'major second': 9 / 8,
  'minor third': 6 / 5,
  'major third': 4 / 3,
  'augmented fourth': Math.sqrt(2),
  'perfect fifth': 3 / 2,
  'minor sixth': 8 / 5,
  golden: 1.61803398875,
  phi: 1.61803398875,
  'major sixth': 5 / 3,
  'minor seventh': 16 / 9,
  'major seventh': 15 / 8,
  octave: 2,
  'major tenth': 5 / 2,
  'major eleventh': 8 / 3,
  'major twelfth': 3,
  'double octave': 4,
};

const modularscale = (value, ratio = 'golden') => {
  let r;
  let newVal = value;
  if (value == null) {
    newVal = 0;
  }
  if (Number.isNaN(ratio)) {
    r = ratio;
  } else if (ratios[ratio] != null) {
    r = ratios[ratio];
  } else {
    r = ratios.golden;
  }
  return r ** newVal;
};

const getFromScale = x => modularscale(x - 1, 'minor third');

const colors = {
  accent: '#ea3934',
  primary: '#444444',
  white: '#ffffff',
  whiteToTransparent: 'linear-gradient(#ffffff, transparent)',
  // gray: '#999999', Add some gray in here
  black: '#000000',
};

const fonts = {
  sans: 'sarabun, "Helvetica Neue",Arial,sans-serif',
  serif: 'Lora, Georgia, serif',
};

const breakPoints = {
  xs: '@media(min-width:350px)',
  sm: '@media(min-width:700px)',
  md: '@media(min-width:900px)',
  lg: '@media(min-width:1200px)',
  xl: '@media(min-width:1400px)',
  xxl: '@media(min-width:1700px)',
};

const custom = {
  release: 'calc(-50vw + 50%)',
  r: 'calc(-50vw + 50%)',
  max: '80rem',
  measure: '34rem',
};

export default {
  color: color => colors[color] || color,
  font: prop => fonts[prop],
  prop: prop => custom[prop],
  mq: prop => breakPoints[prop],
  size: size => `${getFromScale(size)}rem`,
  relative: size => `${getFromScale(size)}em`,
};