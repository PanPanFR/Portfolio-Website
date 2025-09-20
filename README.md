# PanPan Portfolio Website

This is my personal portfolio website created using Vite and React. You can view it at <a href="https://panpanfr.my.id/" target="_blank">https://panpanfr.my.id/</a>

## Features

- 🌙 Dark/Light Mode - Switch between light and dark themes for comfortable viewing.
- 🌍 Multi Language Support - Supports content in multiple languages, such as English and Indonesian.
- 💻📱 Responsive Design - Adapts seamlessly to any screen size, from desktops to mobile phones.
- ⚡ Fast Performance with Vite - Built with Vite for incredibly fast loading times and a smooth experience.
- 🎨 Beautiful UI with Tailwind CSS - Modern and clean user interface styled with the Tailwind CSS framework.
- 📊 GitHub Stats Integration - Dynamically displays my GitHub contributions and statistics on the website.
- 🧱 Neobrutalist UI - Features a unique and bold design style with high contrast and sharp edges.
- 🗂️ Google Spreadsheet Data - Uses a Google Spreadsheet as a simple, easy-to-manage database for content.

## Technologies Used

- **Vite** - Next generation frontend tooling
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **Google Sheets API** - For content management
- **GitHub Actions** - For CI/CD pipeline

## Setup for Your Own Portfolio

If you want to create your own portfolio based on this template, follow these steps:

1. Fork this repository. <img src="https://raw.githubusercontent.com/PanPanFR/PanPanFR.github.io/refs/heads/main/docs/ForkRepository.png">

2. Rename the repository to `your-username.github.io`. This will make your site live at your root URL (`https://your-username.github.io`). I strongly recommend this for your main portfolio because the URL is short and easy to remember. Alternatively, you can give the repository a different name (e.g., `my-portfolio`), but it will be accessed at `https://your-username.github.io/my-portfolio`. This is a fine option if you plan to use a custom domain later. <img src="https://raw.githubusercontent.com/PanPanFR/PanPanFR.github.io/refs/heads/main/docs/RenameRepository.png">

3. Make a spreadsheet and add the data. You can check the format in <a href="https://docs.google.com/spreadsheets/d/1wiHW3SE8y8a6JosDY2538XPFa5Ydysw1yUb-qNMMbN4" target="_blank">here</a> and copy to your own. <img src="https://raw.githubusercontent.com/PanPanFR/PanPanFR.github.io/refs/heads/main/docs/CopySpreadsheet.png">

4. Update the `.env` file with your own information:
   - `VITE_FULL_NAME` - Your full name
   - `VITE_NICKNAME` - Your nickname/short name
   - `VITE_TITLE` - Your professional title
   - `VITE_SPREADSHEET_ID` - Your Google Spreadsheet ID
   - `VITE_GITHUB_LINK` - Your GitHub profile URL
   - `VITE_LINKEDIN_LINK` - Your LinkedIn profile URL

5. You can change the static files in public folder such as favicon, banner_profile, profile_picture, loading_animation, etc.

6. Enable the github actions workflow since github by default disable it on forked repository. <img src="https://raw.githubusercontent.com/PanPanFR/PanPanFR.github.io/refs/heads/main/docs/EnableWorkflow.png">

7. Now just commit your changes, and the github action will handle the CI/CD pipeline.

8. Remember to change the source of github pages to `github actions`. <img src="https://raw.githubusercontent.com/PanPanFR/PanPanFR.github.io/refs/heads/main/docs/ChangeSourcePages.png">

9. Optional: you can change the domain from `your-username`.github.io to your custom domain. But remember you should own the domain. <img src="https://raw.githubusercontent.com/PanPanFR/PanPanFR.github.io/refs/heads/main/docs/ChangeDomain.png">

## Notes

- Ensure to format the data in spreadsheet into `plain text` format. Since it will make bug when fetch the data from the spreadsheet (because the google visualization api only support `plain text`). <img src="https://raw.githubusercontent.com/PanPanFR/PanPanFR.github.io/refs/heads/main/docs/EnsurePlainText.png">
- The website frame in info project only work if `X-Frame-Options` is not set to `SAMEORIGIN` or `DENY`. Also the header need to have `SameSite=None; Secure` in order to work properly.
- For using contribution you need to change `VITE_GITHUB_LINK` in `.env`.
- If you want to show your private repository, you need to setup api for it. Please follow this guide <a href="https://github.com/PanPanFR/github-readme-stats?tab=readme-ov-file#deploy-on-your-own" target="_blank">here</a> and change the `VITE_GITHUB_API_LINK` with your host api in `.env`.
- You can change how many languages you want to show in the contribution section. You can change the `VITE_CONTRIBUTIONS_LANGS_COUNT` in `.env`.
- If you want to include all commits in the contribution section instead from this year, you can change the `VITE_CONTRIBUTIONS_INCLUDE_ALL_COMMITS` in `.env`.

## Development

To run this project locally:

1. Clone the repository
2. Install dependencies: `npm install` or `bun install`
3. Copy `.env.example` to `.env` and update the values
4. Run development server: `npm run dev` or `bun run dev`

## Deployment

This website is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch.

## License

This project is released under the [MIT License](https://github.com/PanPanFR/PanPanFR.github.io/blob/main/LICENSE).
