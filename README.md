# My POS System

## Overview

**My POS System** is a versatile Point-of-Sale (POS) application designed for managing sales, inventory, customer interactions, and repair services. This application allows users to efficiently perform sales transactions, track inventory, manage customer payment histories, handle invoices, and manage repair services for products. Built with **React**, **Django**, and **SQL**, the system is ideal for businesses like computer shops, phone shops, and garages that offer both sales and repair services.

## Features

- **User Authentication**: Secure login system with token-based authentication for users, admins, and super admins.
- **Sales Management**: Record sales transactions and generate receipts.
- **Inventory Management**: Track stock levels, update product information, and manage stock.
- **Customer Management**: Manage customer details and view sales and payment histories.
- **Invoice Management**: Create, view, and manage invoices, including payment statuses and outstanding balances.
- **Payment History**: Track payments made by customers, including repayments and pending balances for each transaction.
- **Repair Service Management**: Track repair requests, including services provided, service status, and associated payments. Includes AI-powered suggestions for pricing and repair estimates.
- **Role-based Access**: Different access levels (User, Admin, Super Admin) with restricted access to certain parts of the system.
- **Real-time Data Syncing**: Updated inventory, payment histories, and repair status across all users.
- **Reports**: View detailed sales reports, payment histories, repair statuses, and inventory updates.

## Target Audience

This system is particularly suited for businesses offering sales and repair services, including:

- **Computer Shops**
- **Phone Shops**
- **Garages** (Car repair, service management)
- **Electronics Repair Services**
- **Other Retail and Service-Based Businesses**

## Tech Stack

- **Frontend**: 
  - React
  - Redux Toolkit (RTK) for state management
  - React Router for navigation
  - Zod for form validation

- **Backend**: 
  - Django (Django Rest Framework for API)
  - SQL database for data persistence
  - Token-based authentication
  - Celery (optional) for background tasks like sending receipts via email

## Setup

### Prerequisites

- **Python** (version >= 3.8)
- **SQL** database



