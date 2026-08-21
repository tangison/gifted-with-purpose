import next from 'eslint-config-next/core-web-vitals';

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**'] },
  ...(Array.isArray(next) ? next : [next]),
];

export default config;
