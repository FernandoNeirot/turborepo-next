/**
 * Suprime warnings de source maps de Turbopack
 * Este es un issue conocido de Turbopack que no afecta la funcionalidad
 * 
 * Suprime warnings tanto en servidor (SSR) como en cliente (browser)
 */

if (typeof window === 'undefined') {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args: unknown[]) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('Invalid source map') ||
      message.includes('sourceMapURL could not be parsed') ||
      message.includes('Only conformant source maps')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
  
  console.warn = (...args: unknown[]) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('Invalid source map') ||
      message.includes('sourceMapURL could not be parsed') ||
      message.includes('Only conformant source maps')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

if (typeof window !== 'undefined') {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args: unknown[]) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('Invalid source map') ||
      message.includes('sourceMapURL could not be parsed') ||
      message.includes('Only conformant source maps')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
  
  console.warn = (...args: unknown[]) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('Invalid source map') ||
      message.includes('sourceMapURL could not be parsed') ||
      message.includes('Only conformant source maps')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}
