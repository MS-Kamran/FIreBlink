export const theme = {
  colors: {
    primary: '#8B4513',
    secondary: '#F97316',
    accent: '#FFA41B',
    neutral: {
      50: '#FAFAF9',
      100: '#F5F5F4',
      800: '#292524',
    }
  },
  
  // Common component styles
  components: {
    pageContainer: 'min-h-screen bg-neutral-50',
    sectionContainer: 'py-20 container mx-auto px-4 sm:px-6 lg:px-8',
    heading: 'text-4xl md:text-5xl font-light text-primary mb-6',
    subheading: 'text-xl text-neutral-600 mb-12',
    button: {
      primary: 'px-6 py-3 bg-primary text-white rounded-lg hover:bg-amber-800 transition-all duration-300',
      secondary: 'px-6 py-3 bg-secondary text-white rounded-lg hover:bg-orange-400 transition-all duration-300',
      outline: 'px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300'
    },
    card: 'bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300'
  }
}; 