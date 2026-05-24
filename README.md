Welcome to the repository for my 3D portfolio website!

This project showcases my skills in web development, particularly in creating interactive and visually engaging experiences using modern technologies.

### Modular architecture (Phase 1)

The codebase is being refactored into small, teachable modules for an **AI-guided tour assistant** (local answers by default, optional Grok API).

- **[Architecture overview](docs/ARCHITECTURE.md)** — how modules connect
- **[Module-by-module guide](docs/MODULES.md)** — what each file does and why

Quick start with the assistant:

1. Copy `.env.example` → `.env`
2. `npm start` — click the **?** button (bottom-right) to open the guide
3. Optional: set `REACT_APP_GROK_API_KEY` for custom questions

#### Features:

1. **3D Visualizations:**
   - Utilizes Three.js to create stunning 3D models and animations.
   - Provides an immersive user experience with engaging visual effects.

2. **Responsive Design:**
   - Built with a mobile-first approach to ensure optimal performance across all devices.
   - Adaptive layout adjusts seamlessly to different screen sizes and orientations.

3. **Dynamic Content:**
   - Features real-time updates and interactivity to keep the content fresh and engaging.
   - JavaScript and React used to manage and render dynamic content efficiently.

4. **Contact Form:**
   - Integrated with EmailJS to facilitate easy communication.
   - Users can send messages directly from the website, with real-time form validation and submission feedback.

#### Technology Stack:

- **React:** For building the user interface and managing state.
- **Three.js:** For creating and rendering 3D graphics.
- **Styled Components:** For applying CSS styling to React components.
- **EmailJS:** For handling email communication through the contact form.
- **Netlify:** For deployment and hosting of the live website.

#### Installation and Setup:

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MUDITJAINN/3D-portfolio-website.git
   cd 3D-portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   cp .env.example .env
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   The website will be available at `http://localhost:3000`.

#### Docker

```bash
docker compose up --build
```

Open `http://localhost:8080`.

#### Deployment:

The project is continuously deployed on Netlify. Any changes pushed to the main branch will automatically trigger a rebuild and redeployment of the website.

#### Contributions:

Contributions are welcome! If you have any suggestions or improvements, please feel free to create an issue or submit a pull request.

#### License:

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Feel free to explore the code, raise issues, or suggest improvements. Thank you for visiting my 3D portfolio website repository!
