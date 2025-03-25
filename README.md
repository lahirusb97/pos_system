# My POS System

## Overview

**My POS System** is a simple and powerful Point-of-Sale (POS) application designed for managing sales, inventory, and customer interactions. This application allows users to easily perform sales transactions, track inventory, and manage customers. Built with **React**, **Django**, and **SQL**, it is tailored to small and medium-sized businesses looking for an efficient way to handle their point-of-sale needs.

## Features

- **User Authentication**: Secure login system with token-based authentication for users, admins, and super admins.
- **Sales Management**: Record sales transactions and generate receipts.
- **Inventory Management**: Track stock levels, update product information, and manage stock.
- **Customer Management**: Manage customer details and view sales history.
- **Role-based Access**: Different access levels (User, Admin, Super Admin) with restricted access to certain parts of the system.
- **Real-time Data Syncing**: Updated inventory and sales data across all users.
- **Reports**: View sales reports and inventory updates.

## Tech Stack

- **Frontend**: 
  - React
  - Redux Toolkit (RTK) for state management
  - React Router for navigation
  - Zod for form validation
  - MUI For User interfaces

- **Backend**: 
  - Django (Django Rest Framework for API)
  - SQL database for data persistence
  - Token-based authentication
  - Celery (optional) for background tasks like sending receipts via email

## Setup

### Prerequisites

- **Python** (version >= 3.8)
- **SQL** database

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-pos-system.git
   cd my-pos-system/frontend
