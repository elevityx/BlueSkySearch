# BlueSkySearch

BlueSkySearch is a Chrome extension that currently allows users to search for profiles and keywords in people's descriptions on Bluesky. Enhance your Bluesky experience by efficiently discovering profiles and relevant content directly from your browser.

## Features

- **Current Features**:
  - **Search for Username**: Quickly find Bluesky profiles by their usernames.
  - **Search for Full Name**: Locate users based on their full names.
  - **Search by Topics**: Discover profiles related to specific topics of interest.
  - **Keyword Search in Descriptions**: Search for specific keywords within users' profile descriptions.

- **Feature Wishlist**:
  - **Advanced Search**: Implement advanced search capabilities with filters and sorting.
  - **OAuth with Bluesky**:
    - Integrate OAuth authentication for secure access to Bluesky services.
    - **Follow Users**: Allow users to follow Bluesky users directly from the Chrome extension.
  - **Search from x.com/profile URL**: Allow users to perform searches directly from `x.com/profile` URLs.

## Installation

### From the Chrome Web Store

*Instructions will be updated once the extension is published on the Chrome Web Store.*

### Manual Installation

1. Download the repository or clone it using Git:
    
        git clone https://github.com/elevityx/BlueSkySearch.git

2. Open Google Chrome and navigate to:
   
        chrome://extensions/

3. Enable Developer Mode by toggling the switch in the top right corner.

4. Click on "Load unpacked" and select the directory where the extension's files are located.

5. The extension should now appear in your list of installed extensions.

## Usage

Using **BlueSkySearch** is simple and intuitive. Follow these steps to effectively search for Bluesky profiles and keywords:

1. **Open the Extension:**
   Click on the **BlueSkySearch** icon in your Chrome toolbar to open the modal popup window.

2. **Conduct an Initial Search:**
   Use the search bar within the modal popup to enter a username, full name, topic, or keyword related to a profile description.
   Press Enter or click the "Search" button to initiate the search.
   **BlueSkySearch** will display matching profiles based on your query.

3. **Continue Searching:**
   You can reopen the modal popup at any time to perform additional searches for more users.
   Simply click the **BlueSkySearch** icon again and enter a new search term.

4. **View All Results:**
   Navigate to the **View All Results** page to see a comprehensive list of your search results.
   On the **View All Results** page, you have two options:
   
   - **Continue Searching Bluesky**: Perform further searches for more users by entering additional usernames or keywords.
   - **Search Locally Saved Results**: Search through your locally saved results using specific keywords to quickly find relevant profiles.

**Tips:**
- Use Specific Keywords: Narrow down your search results with specific and relevant keywords.
- Save Your Searches: Regularly save favorite searches to access them quickly in the future.
- Manage Saved Results: Organize your saved search results easily from the **View All Results** page.

## Contributing

We welcome contributions to **BlueSkySearch**! Whether you're fixing bugs, adding new features, improving documentation, or anything else, your help is greatly appreciated.

### How to Contribute

1. **Fork the Repository**: Create your own copy of the project on GitHub by clicking the "Fork" button.

2. **Clone Your Fork**: Clone the forked repository to your local machine:
   
        git clone https://github.com/yourusername/BlueSkySearch.git

   Replace `yourusername` with your actual GitHub username.

3. **Create a New Branch**: Navigate to the project directory and create a new branch for your feature or bugfix:
   
        git checkout -b feature/your-feature-name

   Replace `your-feature-name` with a descriptive name for your branch.

4. **Make Your Changes**: Implement your feature or fix the bug in the new branch.

5. **Commit Your Changes**: Write a clear and descriptive commit message:
   
        git commit -m "Add [description of your changes]"

6. **Push to Your Fork**:
   
        git push origin feature/your-feature-name

7. **Open a Pull Request**: Go to the original **BlueSkySearch** repository and open a pull request. Provide a clear description of your changes.

### Coding Standards

- **Language & Frameworks**: The project uses JavaScript for the Chrome extension.
- **Code Formatting**: Use a consistent coding style. Consider using Prettier for automatic formatting.
- **Linting**: Use a linter (like ESLint) to identify errors and maintain code quality. A linter analyzes your code for common errors and style issues.
- **Commit Messages**: Write clear commit messages describing what you've changed.

### Testing Your Changes

- **Manual Testing**: Load the unpacked extension in Chrome and verify that your changes work as intended.
- **Automated Testing** (if available): Run any tests included in the project:
  
        npm test

### Documentation

- Update the README or other documentation if your changes affect how users interact with the extension.
- Add comments in your code to clarify complex logic.

### Reporting Issues

If you encounter bugs or have suggestions:
- Open an Issue on the GitHub repository.
- Provide steps to reproduce, expected behavior, and screenshots if helpful.

### Code of Conduct

Please adhere to the project's Code of Conduct (if provided) to maintain a welcoming environment.

## License
MIT License
Copyright (c) 2024 Straten Schemel on behalf of ElevityX
This project is licensed under the [MIT License](LICENSE).

## Contact

You can reach out on Bluesky at:
[https://straten.bsky.social](https://straten.bsky.social)