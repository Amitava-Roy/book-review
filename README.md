# BookReviewz 📚

A modern book review platform built with React where users can discover books, read reviews, and share their thoughts about their favorite reads.

## Features

### 🏠 **Homepage**

- Browse featured books with attractive card layouts
- Responsive grid design for mobile and desktop
- Search and discovery of book collection

### 📖 **Book Management**

- **Add New Books** (Authenticated users only)
  - Title, genre, description, and thumbnail URL
  - Modal popup interface with form validation
  - Real-time book list updates
- **Book Details Page**
  - Comprehensive book information display
  - Responsive design with thumbnail support
  - Publication date and genre information

### 💬 **Review System**

- **View Reviews** - Read what others think about books
- **Write Reviews** (Authenticated users only)
  - Rich textarea for detailed feedback
  - Real-time review submission
  - User attribution with avatars
- **Review Management**
  - Chronological review display
  - User information and timestamps
  - Review count tracking

### 🔐 **Authentication**

- User login/logout functionality
- Protected routes and features
- Role-based access control

### 📱 **Responsive Design**

- Mobile-first approach
- Tailwind CSS styling
- Modern UI components with hover effects
- Loading states and error handling

## Tech Stack

### Frontend

- **React 18** - Modern React with Hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

### Backend Integration

- **Axios** - HTTP client for API requests
- **RESTful API** - Clean API architecture

## API Endpoints

### Books

- `GET /books` - Fetch all books
- `GET /books/:id` - Get specific book details
- `POST /books` - Create new book (authenticated)

### Reviews

- `GET /reviews` - Fetch all reviews
- `POST /reviews` - Submit new review (authenticated)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server running on `http://localhost:3000`

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bookreviewz
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API Base URL**
   Update your `axiosConfig.js` file:

   ```javascript
   import axios from "axios";

   const apiClient = axios.create({
     baseURL: "http://localhost:3000",
     headers: {
       "Content-Type": "application/json",
     },
   });

   export default apiClient;
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── HomePage.js          # Main landing page component
│   ├── BookDetails.js       # Individual book details page
│   └── ...                  # Other components
├── config/
│   └── axiosConfig.js       # API client configuration
├── api/
│   └── books.js             # Book-related API calls
├── App.js                   # Main app component with routing
└── index.js                 # Application entry point
```

## Usage

### For Visitors

1. **Browse Books** - View the collection of featured books
2. **Read Reviews** - Click "View Details" to see book information and reviews
3. **Sign Up** - Create an account to unlock additional features

### For Authenticated Users

1. **Add Books** - Use the "Add Book" button on the homepage
2. **Write Reviews** - Navigate to any book's detail page and submit reviews
3. **Manage Content** - Full CRUD operations for books and reviews

## Data Models

### Book Object

```javascript
{
  "_id": "6832b45ea584b8b39181732c",
  "title": "The Mysterious Island",
  "shortDescription": "An exciting adventure novel about survival and exploration.",
  "author": "68329c0992cb83017c85399c",
  "genre": "Fiction",
  "publishedDate": "2025-05-25T06:10:38.605Z",
  "thumbnailUrl": "https://example.com/image.jpg" // optional
}
```

### Review Object

```javascript
{
  "_id": "6832c87fce4904ecd9f692dd",
  "comment": "This book was insightful and well-written.",
  "book": "6832b45ea584b8b39181732c",
  "user": {
    "_id": "68329c0992cb83017c85399c",
    "username": "amitava",
    "email": "amitavaroy@gmail.com",
    "role": "admin"
  },
  "createdAt": "2025-05-25T07:36:31.821Z",
  "updatedAt": "2025-05-25T07:36:31.821Z"
}
```

## Routes

- `/` - Homepage with book collection
- `/book/:id` - Individual book details and reviews
- `/signup` - User registration page
- `/login` - User authentication page

## Features in Detail

### Add Book Modal

- Form validation for required fields
- Genre dropdown with predefined options
- Optional thumbnail URL support
- Loading states during submission

### Review System

- Filtered reviews by book ID
- User avatar generation from username
- Timestamp formatting
- Real-time updates without page refresh

### Responsive Design

- Mobile-optimized navigation
- Flexible grid layouts
- Touch-friendly buttons and forms
- Consistent spacing and typography

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

### Code Style

- Use functional components with React Hooks
- Follow consistent naming conventions
- Implement proper error handling
- Add loading states for async operations

### UI/UX Standards

- Maintain responsive design principles
- Use consistent color scheme and typography
- Implement proper loading and error states
- Ensure accessibility best practices

## Support

For support, email support@bookreviewz.com or create an issue in this repository.

## Acknowledgments

- Built with ❤️ using React and Tailwind CSS
- Icons provided by Lucide React
- Responsive design inspired by modern web standards

---

**Happy Reading! 📚✨**
