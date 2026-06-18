# Goal Description

Expand the Netsurf e-commerce platform by (1) seeding a comprehensive list of authentic Netsurf products with dedicated video links, and (2) building a robust "Hisab Kitab" (Accounting and Order Management) system within the Admin Panel.

## User Review Required

> [!IMPORTANT]
> Adding a complete "Hisab Kitab" (Accounting/Billing) system is a significant architectural addition. Please review the proposed features below to ensure they meet your exact business needs.

## Open Questions

> [!WARNING]
> 1. Do you have a specific YouTube channel link from which I should fetch the result videos for the products, or should I use standard placeholder Netsurf videos for now?
> 2. For the "Hisab Kitab" (Accounting), do you need to track GST/Taxes, or just standard Sales, Expenses, and Profit?
> 3. Do you want customers to be able to place orders directly on the public catalog, which then appear in your Admin "Hisab Kitab", or will you enter sales manually?

## Proposed Changes

### 1. Authentic Product Seeding (Backend)
- Research and compile a list of 30+ authentic Netsurf products across all categories (Naturamore, Biofit, Herbs & More, Clean & More, Rang Dé).
- Map each product to highly realistic images and relevant result videos.
- Create a comprehensive `seedProductsV2.js` script to populate the database.

#### [NEW] `Backend/src/seedProductsV2.js`

### 2. "Hisab Kitab" Models & API (Backend)
Create data models to track sales, expenses, and overall accounting.

#### [NEW] `Backend/src/models/orderModel.js`
- Schema for customer orders: Customer details, Product list, Total Amount, Payment Status (Pending, Completed), Order Status.

#### [NEW] `Backend/src/models/transactionModel.js`
- Schema for accounting: Type (Income/Expense), Amount, Description, Date.

#### [NEW] `Backend/src/routes/accountingRoutes.js`
- API endpoints to fetch total revenue, create orders, log expenses, and get accounting summaries.

### 3. "Hisab Kitab" Admin Interface (Frontend)
Add new pages to the Admin sidebar to manage sales and accounting.

#### [MODIFY] `Frontend/src/components/Layout.jsx`
- Add "Orders" and "Accounting (Hisab Kitab)" to the sidebar navigation.

#### [NEW] `Frontend/src/pages/Orders.jsx`
- A professional data table to view all customer orders, update payment statuses, and manage fulfillment.

#### [NEW] `Frontend/src/pages/Accounting.jsx`
- A financial dashboard showing Total Revenue, Total Expenses, Net Profit, and a ledger of all transactions.

## Verification Plan

### Automated Tests
- N/A

### Manual Verification
- Run the new seed script and verify 30+ products appear on the public catalog `/catalog`.
- Navigate to the Admin Panel, open the new "Accounting" and "Orders" pages.
- Create a dummy order and verify that the "Hisab Kitab" dashboard correctly calculates the revenue and profit.
