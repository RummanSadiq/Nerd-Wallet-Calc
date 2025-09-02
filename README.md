# Federal Income Tax Calculator 2025

A comprehensive React-based federal income tax calculator that estimates tax refunds or amounts owed for the 2024 and 2025 tax years. Built to match the functionality and user experience of the NerdWallet tax calculator.

## Features

- **Real-time calculations** - Updates results as you type
- **Support for 2024 & 2025 tax years** - Uses official IRS tax brackets and standard deductions
- **Multiple filing statuses** - Single, Married filing jointly, Married filing separately, Head of household
- **Advanced options** - 401(k), IRA contributions, other deductions, tax credits, and blind status
- **Responsive design** - Works on desktop and mobile devices
- **Form validation** - Built-in validation using Zod schema
- **Professional styling** - Clean, modern UI following best practices

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and better development experience
- **React Hook Form** - Efficient form handling with validation
- **Zod** - Schema validation library
- **SCSS** - Advanced CSS with variables and mixins
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nerd-wallet-tax-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── components/          # React components
│   ├── TaxCalculator.tsx    # Main calculator component
│   ├── TaxForm.tsx          # Input form component
│   ├── TaxResults.tsx       # Results display component
│   └── CTASection.tsx       # Call-to-action component
├── data/               # Static data and configurations
│   └── taxData.ts          # Tax brackets and standard deductions
├── schemas/            # Validation schemas
│   └── taxFormSchema.ts     # Zod validation schema
├── styles/             # SCSS stylesheets
│   ├── vars.scss            # CSS variables
│   ├── app.scss             # Main app styles
│   └── components.scss      # Component styles
├── types/              # TypeScript type definitions
│   └── tax.ts               # Tax-related types
├── utils/              # Utility functions
│   └── taxCalculations.ts   # Tax calculation logic
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## Tax Calculation Features

### Supported Inputs
- **Basic Information**: Tax year, filing status, annual gross income, age
- **Deductions**: Standard vs. itemized deductions (with age 65+ and blind add-ons)
- **Advanced Options**: 401(k) contributions, IRA contributions, other deductions, tax credits
- **Special Considerations**: Legal blindness status

### Calculation Logic
1. **Adjusted Gross Income** = Annual gross income - 401(k) - IRA - Other deductions
2. **Standard Deduction** = Base amount + age 65+ bonus + blind bonus
3. **Taxable Income** = Adjusted gross income - deduction taken
4. **Regular Tax** = Progressive bracket calculation
5. **Final Result** = Tax after credits - taxes withheld

### Tax Data Sources
- **2025 Tax Brackets**: Latest IRS rates for all filing statuses
- **2024 Tax Brackets**: Previous year rates for comparison
- **Standard Deductions**: Base amounts plus age/blind add-ons for both years
- **Additional Deductions**: Age 65+ and legally blind standard deduction bonuses

## Styling and Design

The calculator uses a comprehensive SCSS architecture with:
- **CSS Variables** - Consistent theming and easy customization
- **Responsive Grid** - Two-column layout that adapts to mobile
- **Modern UI Elements** - Clean forms, clear typography, and intuitive interactions
- **Accessibility Features** - Proper labels, focus states, and semantic HTML

## Integration with Payload CMS

This calculator is designed to be easily integrated into Payload CMS as a component. The modular architecture allows for:
- **Standalone Usage** - Can be used independently
- **CMS Integration** - Easy to embed in Payload CMS pages
- **Customization** - Styling and behavior can be adjusted for CMS themes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Quality
- **TypeScript** - Full type safety
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting (via ESLint)

### Best Practices
- **Component Composition** - Reusable, focused components
- **State Management** - React hooks for local state
- **Form Handling** - Efficient form validation and submission
- **Performance** - Optimized re-renders and calculations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **NerdWallet** - For the calculator design inspiration and tax data
- **IRS** - For official tax brackets and standard deduction amounts
- **React Community** - For the excellent tools and libraries used in this project
