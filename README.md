# Ballpark Builder Tool

A professional pricing calculator for generating ballpark estimates for events and custom retail builds. Built with Next.js 16, React 19, and Tailwind CSS.

## Features

- **Event Pricing Calculator**: Generate estimates for corporate events, weddings, conferences, festivals, and private parties
- **Retail Build Calculator**: Calculate costs for kiosks, pop-up stores, boutiques, display units, and full store builds
- **Detailed Cost Breakdown**: See itemized pricing with base costs, per-unit charges, and additional fees
- **Ballpark Range**: Provides a realistic price range (±15%) for better client expectations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Installation

### Using the shadcn CLI (Recommended)

\`\`\`bash
npx shadcn@latest init ballpark-builder
cd ballpark-builder
npm run dev
\`\`\`

### Manual Installation

1. Download the project ZIP file
2. Extract and navigate to the directory
3. Install dependencies:
\`\`\`bash
npm install
\`\`\`
4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Pricing Database Structure

### Event Pricing

The event pricing database includes the following categories:

| Event Type | Base Price | Per Person Cost | Setup Fee |
|------------|-----------|----------------|-----------|
| Corporate Event | $5,000 | $75 | $1,500 |
| Wedding | $8,000 | $120 | $2,000 |
| Conference | $15,000 | $50 | $3,000 |
| Festival | $25,000 | $30 | $5,000 |
| Private Party | $3,000 | $90 | $800 |

**Calculation Formula:**
\`\`\`
Total = (Base Price × Days) + (Per Person Cost × Attendees) + Setup Fee
\`\`\`

### Retail Build Pricing

The retail build pricing database includes:

| Build Type | Base Price | Per Sq Ft Cost | Customization Fee |
|-----------|-----------|----------------|-------------------|
| Retail Kiosk | $12,000 | $150 | $2,500 |
| Pop-up Store | $8,000 | $100 | $1,500 |
| Boutique Build-out | $35,000 | $200 | $5,000 |
| Display Unit | $5,000 | $120 | $1,000 |
| Full Store Build | $75,000 | $250 | $10,000 |

**Customization Multipliers:**
- Basic: 0.5× customization fee
- Standard: 1.0× customization fee
- Premium: 1.8× customization fee

**Calculation Formula:**
\`\`\`
Total = Base Price + (Per Sq Ft Cost × Square Footage) + (Customization Fee × Multiplier)
\`\`\`

## Customizing Pricing Data

To update pricing, edit the pricing objects in `components/ballpark-calculator.tsx`:

\`\`\`typescript
// Update event pricing
const eventPricing = {
  corporate: {
    name: "Corporate Event",
    basePrice: 5000,      // Change base price
    perPersonCost: 75,    // Change per-person cost
    setupFee: 1500,       // Change setup fee
  },
  // Add new event types...
}

// Update retail pricing
const retailPricing = {
  kiosk: {
    name: "Retail Kiosk",
    basePrice: 12000,         // Change base price
    perSqFtCost: 150,         // Change per sq ft cost
    customizationFee: 2500,   // Change customization fee
  },
  // Add new retail types...
}
\`\`\`

## Project Structure

\`\`\`
ballpark-builder/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── ballpark-calculator.tsx  # Main calculator component
│   └── ui/                 # shadcn/ui components
├── README.md               # This file
└── package.json
\`\`\`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Usage

1. Select either **Event** or **Retail Build** tab
2. Choose the project type from the dropdown
3. Enter the required details:
   - **Events**: Number of attendees and duration
   - **Retail**: Square footage and customization level
4. Click **Calculate Estimate** to see the ballpark pricing
5. Review the cost breakdown and price range

## Features in Detail

### Ballpark Range
The tool provides a realistic price range of ±15% around the calculated estimate to account for variations in:
- Specific project requirements
- Geographic location
- Current market conditions
- Material and labor costs

### Cost Breakdown
Every estimate includes an itemized breakdown showing:
- Base price for the project type
- Variable costs (per person or per square foot)
- Additional fees (setup, customization)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
