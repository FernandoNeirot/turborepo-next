/** @type {import('tailwindcss').Config} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  content: [
    path.resolve(__dirname, './app/**/*.{js,ts,jsx,tsx,mdx}'),
    path.resolve(__dirname, './pages/**/*.{js,ts,jsx,tsx,mdx}'),
    path.resolve(__dirname, './components/**/*.{js,ts,jsx,tsx,mdx}'),
    path.resolve(__dirname, '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

