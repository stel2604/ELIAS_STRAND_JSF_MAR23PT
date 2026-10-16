# Noroff Online Shop

**Course:** FM2AJJF75 – JavaScript Frameworks  
**Student:** Elias Strand  
**Project:** Course Assignment – Online Shop

## Project Description

This project is an online shop built with Next.js, React and TypeScript as part of my JavaScript Frameworks course at Noroff.

The website uses the Noroff Online Shop API to display products. Users can search for products, view product details, add products to a shopping cart and complete a simulated checkout.

## Live Website

[View the online shop on Netlify](https://elias-strand-jsf-mar23pt.netlify.app/)

## GitHub Repository

[View the source code](https://github.com/stel2604/ELIAS_STRAND_JSF_MAR23PT)

## Technologies Used

- Next.js 16
- React 19
- TypeScript
- CSS and CSS Modules
- React Context API
- Noroff Online Shop API
- Git and GitHub
- Netlify

## Features

- Product listing using the Noroff API
- Product search with clickable suggestions
- Product sorting by price
- Individual product detail pages
- Product ratings, reviews and discount prices
- Shopping cart with shared state using React Context
- Add, decrease and remove product quantities
- Automatic cart total and discount calculations
- Toast notifications when products are added or removed
- Checkout page with customer information fields
- Order confirmation page
- Contact form
- Responsive layout for desktop and mobile
- Loading and error handling for product data

## Installation

To run the project locally, follow these steps.

### 1. Clone the repository

```bash
git clone https://github.com/stel2604/ELIAS_STRAND_JSF_MAR23PT.git
```

### 2. Open the project folder

```bash
cd ELIAS_STRAND_JSF_MAR23PT
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Testing

The project has been tested locally and on Netlify.

The following commands were used:

```bash
npm run lint
npm run build
```

The production build completed successfully. ESLint reported zero errors and four warnings.

Manual testing included product navigation, search, cart quantity controls, discount calculations, checkout and order confirmation.

## API

Product information is fetched from the Noroff Online Shop API:

https://v2.api.noroff.dev/online-shop

## Deployment

The project is deployed on Netlify and connected to the GitHub repository.

New commits pushed to the main branch trigger automatic deployments.

## AI Assistance

AI tools were used as learning and development support, including explanations, debugging and code suggestions.

The AI assistance is documented separately in `AI_LOG.md`.

## Author

Elias Strand  
Noroff – Frontend Development