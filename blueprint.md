# ColorCompra Application Blueprint

## Overview

ColorCompra is a web application that acts as a personal AI shopping coach for cosmetics. Users upload a photo of themselves, answer a few questions, and the AI analyzes their personal color profile (e.g., warm, cool, neutral tones) to recommend specific cosmetic products like lipsticks and blushes. The goal is to provide users with confident and personalized shopping advice.

## Core Features & Design (As Implemented)

*   **AI-Powered Personal Color Analysis:** Uses OpenAI's GPT-4o-mini model to analyze user photos and questionnaire answers.
*   **Guided Photo Upload:** Provides users with instructions on how to take a suitable photo for accurate analysis.
*   **Simple Questionnaire:** Asks about accessory preference (gold/silver), makeup style, and budget to refine recommendations.
*   **Dynamic Results Page:** Displays the AI's analysis, including a summary, confidence level, and a curated list of recommended products.
*   **Modern UI:** Clean, responsive interface built with React, Vite, and Tailwind CSS.
*   **Component-Based Architecture:**
    *   `Landing.tsx`: Welcome page.
    *   `Guide.tsx`: Photo guide.
    *   `Upload.tsx`: File upload and questionnaire.
    *   `Analyzing.tsx`: Loading/intermediate page.
    *   `Result.tsx`: Displays the analysis and product recommendations.
*   **Styling:** Utilizes Tailwind CSS for utility-first styling, with a custom color palette defined in `tailwind.config.js`.

---

## Current Request: Finalize for Monetization & Deployment

The goal is to complete the application by implementing monetization through Google AdSense and Amazon Associates, and then deploying it for public use.

### Plan & Action Steps

#### Phase 1: Implement Amazon Associates Integration

This phase will connect the AI-recommended products to real products on Amazon using an affiliate tag.

1.  **[Backend] Update AI Prompt:** Modify `functions/api/analyze.ts` to instruct the AI to generate an `amazon_search_query` for each recommended product. This query will be used to build an affiliate link.
2.  **[Frontend] Update Product Card:** Modify the "Ver más" button in the `ProductCard` component (`src/pages/Result.tsx`) to become a link (`<a>`) that directs users to an Amazon search page with the corresponding affiliate tag.
3.  **[User Action] Obtain Amazon Associates ID:** The user will need to sign up for the Amazon Associates program to get their unique affiliate tag (e.g., `yourtag-20`). This tag will be inserted into the generated links.

#### Phase 2: Prepare for Google AdSense

This phase focuses on adding necessary content and structure to meet AdSense program policies.

1.  **[Content] Create Essential Pages:**
    *   Create an "About Us" page (`src/pages/About.tsx`).
    *   Create a "Privacy Policy" page (`src/pages/PrivacyPolicy.tsx`).
    *   Create a "Contact Us" page (`src/pages/Contact.tsx`).
2.  **[Routing] Update Navigation:** Add links to the new pages in the application's footer or a navigation bar to ensure they are accessible.
3.  **[Content] Enhance Content Value:** To improve the chances of AdSense approval, add a blog section with articles related to personal color, makeup tips, and fashion advice. This demonstrates the site's authority and value to users.
4.  **[User Action] Apply for AdSense:** Once the site has sufficient content and traffic, the user can apply for AdSense and add the provided code snippet to `index.html`.

#### Phase 3: Deploy and Announce

This phase will make the application publicly available.

1.  **[Build] Create Production Build:** Run the `npm run build` command to compile and optimize the React application for production. This will create a `dist` folder.
2.  **[Deploy] Deploy to Firebase Hosting:** Use the integrated deployment tools to publish the contents of the `dist` folder to the web.
3.  **[Promotion] Announce the Launch:** Share the live application URL on social media, relevant forums, and with friends and family to start attracting users.
