# 🤖 VaartaLaap

**VaartaLaap** is a plug-and-play AI chatbot widget that can be embedded into any website with minimal setup. Built using the **MERN Stack** and **Bootstrap**, it enables businesses, portfolios, startups, and service websites to provide intelligent conversational support through an easy-to-integrate widget.

---

## 🚀 Features

* 💬 Embeddable chatbot widget for any website
* 🧠 AI-powered conversational experience
* 🔍 Embedding-based knowledge retrieval (RAG)
* 📚 Website-specific knowledge base support
* 👤 Visitor management and conversation tracking
* 📝 Chat history storage
* ⚡ Fast and responsive UI
* 🎨 Bootstrap-powered modern design
* 🔗 Easy integration with external websites
* 📱 Mobile-friendly and responsive

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Bootstrap 5
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI & Search

* OpenAI Embeddings
* Vector Search / Retrieval-Augmented Generation (RAG)

---

## 📂 Project Structure

```text
VaartaLaap/
│
├── client/
│   ├── src/
│   ├── public/
│   └── components/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
├── widget/
│   └── embeddable-chatbot.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/vaartalaap.git
cd vaartalaap
```

### Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

### Start Development Server

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm start
```

---

## 🧠 How It Works

1. Visitor opens the website.
2. VaartaLaap widget loads automatically.
3. User sends a message.
4. Relevant content is retrieved from the knowledge base using embeddings.
5. AI generates a contextual response.
6. Conversation is stored in MongoDB.
7. Chat continues with memory and context.

```text
Visitor
   ↓
VaartaLaap Widget
   ↓
Backend API
   ↓
Embedding Search
   ↓
Knowledge Retrieval
   ↓
AI Response
   ↓
MongoDB Storage
```

---

## 🔌 Website Integration

Add the widget script to any website:

```html
<script src="https://your-domain.com/widget.js"></script>
<script>
  VaartaLaap.init({
    chatbotId: "YOUR_CHATBOT_ID"
  });
</script>
```

The chatbot will automatically appear as a floating chat widget.

---

## 📊 Database Models

### Visitor

Stores visitor information.

### Conversation

Stores individual chat sessions.

### Message

Stores messages exchanged between visitors and AI.

---

## 🎯 Use Cases

* Business Websites
* SaaS Platforms
* Agency Portfolios
* Documentation Sites
* Educational Platforms
* E-commerce Stores
* Customer Support Portals

---

## 🔮 Future Enhancements

* Multi-language support
* Admin dashboard
* Analytics and reporting
* Lead capture forms
* File uploads
* Voice conversations
* WhatsApp integration
* Custom themes
* Team inbox support

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**VaartaLaap Team**

*"Smart conversations for every website."*
