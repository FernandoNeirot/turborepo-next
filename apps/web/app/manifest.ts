import { MetadataRoute } from 'next';
import { projectName } from './shared/lib/contants';


export default function manifest(): MetadataRoute.Manifest {
  return {
    name: projectName,
    short_name: 'Mercado',
    description: 'Encuentra las mejores ofertas y oportunidades en nuestro bazar en línea.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  };
}

