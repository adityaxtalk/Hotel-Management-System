
# Hotel Management Application

## Overview
This hotel management application allows users to register as either an admin or a regular user. Admins can manage rooms and view all bookings, while regular users can view, book, and manage their own bookings. The application integrates Stripe for secure payment processing.

## Key Features
- **Admin Capabilities:**
  - **Add Rooms:** Admins can add new rooms with various details such as room type, price, amenities, etc.
  - **View All Rooms:** Admins can view and manage the list of all rooms available in the hotel.
  - **View All Bookings:** Admins have access to the list of all bookings made by users, including the ability to filter and search based on criteria such as dates and room types.

- **User Capabilities:**
  - **View Available Rooms:** Users can browse the available rooms and filter them based on criteria such as check-in/check-out dates, room type, and price range.
  - **Book Rooms:** Users can book rooms for their stay and proceed with secure payments using Stripe.
  - **Manage Bookings:** Users can view their current and past bookings and cancel upcoming bookings if necessary.
  - **Stripe Payment Integration:** Secure payment processing for room bookings.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **MongoDB** (either a local instance or a cloud instance like MongoDB Atlas)
- **React.js** (v17 or later)
- **Stripe Account** (for obtaining the public and secret keys)

## Project Structure
The project is divided into two main directories:
- **Backend:** Contains the server-side code, including API routes, database models, and payment processing logic.
- **Frontend:** Contains the client-side code, built with React, for the user interface.

## Installation

### Backend Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/hotel-management-app.git
   cd hotel-management-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` File:**
   In the root of the backend directory, create a `.env` file and add the following environment variables:
   ```plaintext
   PORT=5000
   MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xfvrzkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   STRIPE_KEY=STRIPE_SECRET_KEY
   ```

4. **Start the Backend Server:**
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:5000`.

### Frontend Setup
1. **Navigate to the Frontend Directory:**
   ```bash
   cd client
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` File:**
   In the root of the frontend directory, create a `.env` file and add the following environment variables:
   ```plaintext
   REACT_APP_SERVER_URL=http://localhost:5000
   REACT_APP_STRIPE_KEY=PUBLISHABLE_KEY
   ```

4. **Start the Frontend Server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Usage

### Admin Dashboard
- **Add Rooms:** Navigate to the "Rooms" section and click "Add Room" to enter details like room type, price, and amenities.
- **View All Rooms:** View and manage all rooms, including editing or deleting room details.
- **View All Bookings:** See a comprehensive list of all bookings, filter by date, room type, or user.

### User Dashboard
- **Search Rooms:** Use filters to search for rooms based on availability, type, and price.
- **Book a Room:** Select a room and proceed to payment using the integrated Stripe payment gateway.
- **Manage Bookings:** View your booking history and cancel upcoming bookings if necessary.

## Environment Variables

### Backend
| Variable Name | Description                           |
| ------------- | ------------------------------------- |
| `PORT`        | The port number the server will run on. |
| `MONGO_URL`   | Connection string for MongoDB.        |
| `STRIPE_KEY`  | Secret key for Stripe payment processing. |

### Frontend
| Variable Name          | Description                               |
| ---------------------- | ----------------------------------------- |
| `REACT_APP_SERVER_URL` | URL of the backend server.                |
| `REACT_APP_STRIPE_KEY` | Public key for Stripe payment processing. |

## Deployment
For deploying the application in a production environment, consider using services like:
- **Backend:** Heroku, AWS, or DigitalOcean.
- **Frontend:** Netlify, Vercel, or GitHub Pages.
- **Database:** MongoDB Atlas or any managed MongoDB service.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## Contact
For any inquiries or support, please reach out to [adityamaxjee@gmail.com](mailto:adityamaxjee@gmail.com).
