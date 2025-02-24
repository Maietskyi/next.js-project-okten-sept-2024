# DummyJSON Users & Recipes App

This project is a web application that accumulates information about users and recipes from [DummyJSON](https://dummyjson.com/docs).

## Features

### Navigation Menu
- Contains links to different pages and displays the logged-in user's avatar.
- If the user is not authenticated, the menu only includes a link to the authentication page.

### Search
- A single text input field (with an optional search button) that allows searching for users or recipes depending on the current page.
- Users and recipes can be found either by a string value (as per the DummyJSON API documentation) or by ID.

### Pagination
- All lists of data (users, recipes) are paginated.

## Pages

### Home Page
- By default, assumes the user is not logged in.
- Displays a message prompting the user to authenticate.
- The navigation menu only includes the authentication link.

### Authentication Page
- Contains a form with input fields required for authentication via DummyJSON.
- Use any user credentials available in DummyJSON for authentication.
- After successful authentication:
    - The navigation menu updates to include links to the "Users" and "Recipes" pages.
    - The logged-in user's avatar (from the API response) is displayed in the menu.

### Users Page
- Includes:
    - A navigation menu
    - A search field
    - A list of users with at least three fields displayed from the API response
- Clicking on a user navigates to their detailed profile page.
- The user profile page includes:
    - 7-10 details about the user
    - A list of their recipes
    - Clicking on a recipe navigates to its detailed page.

### Recipes Page
- Includes:
    - A navigation menu
    - A search field
    - A list of recipes displaying only their title and tags
- Clicking on a recipe navigates to a detailed recipe page, which includes:
    - Full details of the recipe
    - A link to the author's profile
- Clicking on a tag filters/searches for all recipes containing the same tag.

## Design
- The design is free-form and can be customized as desired.
- All lists of data are paginated for better user experience.

## Technologies Used
- Next.js 15
- Server Actions for API requests
- Authentication using Cookies for token storage
- API data fetched from [DummyJSON](https://dummyjson.com)
- No Redux (state management handled with Next.js best practices)

### Installation & Setup

1. Clone the repository:
```sh
git clone https://github.com/your-repo.git
cd your-repo
```
2. Install dependencies:
```sh
   npm install
```
3. Start the development server:
```sh
   npm run dev
```
4. Open your browser and go to 
`http://localhost:3000`.

## License
This project is created for educational purposes and does not include a commercial license.

## Author
- Mykhailo Maietskyi | 098 213 45 81
- damaietskyi@gmail.com | https://github.com/Maietskyi