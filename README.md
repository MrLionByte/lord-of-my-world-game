# Lord Of My World Game

![Logo Placeholder](https://via.placeholder.com/800x400?text=Lord+Of+My+World+Game) <!-- Replace with actual logo or screenshot -->

A thrilling choose-your-own-adventure game where **you** are the architect of epic tales! Powered by AI, dive into dynamic, branching stories tailored to your chosen theme. Make choices that shape destinies, uncover hidden paths, and chase victorious endings—or face dramatic twists. Built for endless replayability and immersive fun.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) [![Groq](https://img.shields.io/badge/Groq-FF6B35?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)

## 🚀 Features

- **AI-Powered Story Generation**: Harness Groq's lightning-fast LLM to create personalized, branching narratives based on user-selected themes (e.g., fantasy, sci-fi, horror).
- **Interactive Choice Paths**: Navigate 3-4 levels deep with 2-3 options per node, leading to multiple endings—including at least one triumphant win!
- **Dynamic Progression**: Stories evolve on-the-fly; save your adventure and resume anytime.
- **Theme Customization**: Input genres, characters, or twists to make every playthrough unique.
- **Responsive UI**: Sleek React frontend for seamless mobile/desktop play, with smooth animations and intuitive controls.
- **Robust Backend**: FastAPI handles API requests, session management, and AI integrations with error-proof validation.

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | FastAPI (Python) | RESTful API for story generation, user sessions, and Groq integration. |
| **Frontend** | React (JavaScript) | Interactive UI for rendering story nodes, choices, and progress. |
| **AI Engine** | Groq LLM | Real-time story creation with structured JSON outputs for branching narratives. |
| **Database** | SQLite (default) / PostgreSQL (prod) | Session storage for saved games. |
| **Other** | Pydantic (validation), Axios (HTTP), CSS (styling) | Data handling, API calls, and responsive design. |

## 📦 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API Key (sign up at [groq.com](https://groq.com) and set as env var: `GROQ_API_KEY`)

### Backend Setup
1. Clone the repo:
   ```
   git clone https://github.com/yourusername/lord-of-my-world-game.git
   cd lord-of-my-world-game/backend
   ```
2. Create a virtual environment and install dependencies:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set environment variables:
   ```
   export GROQ_API_KEY=your_groq_key_here
   ```
4. Run the server:
   ```
   uvicorn main:app --reload --port 8000
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
   The app will open at `http://localhost:5173`.

### Full Stack Run
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173` 

## 🎮 Usage

1. **Launch the Game**: Open `http://localhost:3000` in your browser.
2. **Choose a Theme**: Enter a prompt like "A cyberpunk heist in a neon city" to kickstart your story.
3. **Make Choices**: Read the scenario, select an option, and watch the AI weave the next chapter.
4. **Save & Resume**: Click "Save Progress" to store your session ID—load it later via the menu.
5. **Explore Endings**: Aim for wins, but embrace the losses for replay value!

### API Endpoints (Swagger Docs at `/docs`)
- `POST /generate-story`: Kick off a new adventure with theme input. Returns JSON story tree.
- `POST /next-node/{session_id}`: Fetch the next node based on choice. (For dynamic mode)
- `GET /load-session/{session_id}`: Resume a saved game.
- `POST /save-session/{session_id}`: Persist current progress.

Example Request (Story Generation):
```json
{
  "theme": "Epic fantasy quest for a lost artifact"
}
```

## 🧪 Testing

- **Backend**: Run `pytest` in `/backend` for unit/integration tests.
- **Frontend**: Run `npm test` in `/frontend` for React component tests.
- **E2E**: Use Cypress (setup in `/cypress`) for full flow simulations.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for blazing-fast AI inference.
- Inspired by classic CYOA books—may your choices always lead to glory!

---

⭐ Star this repo if you enjoy ruling your world! Questions? [Open an issue](https://github.com/yourusername/lord-of-my-world-game/issues).