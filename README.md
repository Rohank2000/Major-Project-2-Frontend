# 👔 Anvaya CRM (Major Project 2 Frontend)

A modern Lead Management CRM frontend — built with React + Vite. Manage the complete lead lifecycle: assign sales agents, track status progression, add comments, and visualize performance with reports.

## ✨ Features

- **Dashboard Overview** — Lead status counts (New, Contacted, Qualified, Proposal Sent, Closed), recent 3 leads, and quick filters
- **Lead Management** — Detailed lead view (agent, status, priority, time-to-close, tags, source) + edit lead details
- **Comments & Activity** — Comment history per lead with author + timestamp, add new comments
- **Lead Listing** — Filter by status & sales agent, sort by priority & time-to-close
- **Status View** — Browse leads by status category `/leadStatusView/:statusCategory` with additional agent/priority filters
- **Agent View** — View all leads assigned to a specific sales agent
- **Sales Agent Management** — List all agents, add new sales agent via modal
- **Reports & Analytics** — Pie chart (Closed vs Pipeline), Bar chart (Leads closed by agent), Pie chart (Status distribution) via Chart.js
- **Global Modals** — Add New Lead & Add New Agent from header (available on all routes)
- **Toast Notifications** — Success/error feedback for all mutations
- **Responsive Design** — Custom CSS with mobile-first responsive layouts

## 🛠️ Tech Stack

React 19 · Vite 8 · React Router 7 · Axios 1 · Chart.js 4 · react-chartjs-2 5 · react-select 5 · React Compiler (babel-plugin-react-compiler) · ESLint 10 · Context API · Custom CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

#### Clone the Repository

```bash
git clone https://github.com/Rohank2000/Major-Project-2-FrontEnd.git
cd Major-Project-2-FrontEnd
```

#### Install Dependencies

```bash
npm install
```

#### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=https://major-project-2-backend.vercel.app
```

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Backend API base URL |

#### Run Development Server

```bash
npm run dev
```

App runs at `http://localhost:5173` (host enabled — accessible on network).

#### Build for Production

```bash
npm run build
npm run preview
```

#### Lint

```bash
npm run lint
```

## 🧭 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `DashBoard` | Dashboard with status counts, quick filters, recent leads |
| `/leadList` | `LeadList` | Lead overview with filters (status, agent) & sort (priority, timeToClose) |
| `/lead-management/:leadId` | `LeadManagement` | Lead details, edit form, comments section |
| `/salesAgentManagement` | `SalesAgentManagement` | List all sales agents, add new agent |
| `/leadsBySalesAgent/:salesAgentId` | `LeadsOfSalesAgent` | Leads assigned to a specific agent, filter by status/priority |
| `/leadStatusView/:statusCategory` | `LeadStatusView` | Leads filtered by status (New/Contacted/Qualified/Proposal Sent/Closed) |
| `/report-screen` | `ReportScreen` | Reports — pipeline, closed-by-agent, status distribution |

## 🔌 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/leads` | Fetch all leads (used on Dashboard, Lead Management, Reports) |
| `GET` | `/leads?status=&salesAgent=` | Filtered leads (Lead List) |
| `GET` | `/leads?status=&priority=` | Filtered leads (Leads By Sales Agent) |
| `GET` | `/leads?salesAgent=&priority=` | Filtered leads (Lead Status View) |
| `POST` | `/leads` | Create new lead (Header modal) |
| `PUT` | `/leads/:leadId` | Update lead (Edit Lead Details) |
| `GET` | `/agents` | Fetch all sales agents |
| `POST` | `/agents` | Create new sales agent |
| `GET` | `/tags` | Fetch all tags (for react-select) |
| `GET` | `/leads/:id/comments` | Fetch comments for a lead |
| `POST` | `/leads/:id/comments` | Add comment to a lead |
| `GET` | `/report/pipeline` | Total leads in pipeline + byStatus distribution |
| `GET` | `/report/closed-by-agent` | Leads closed grouped by sales agent |
| `GET` | `/report/last-week` | Leads closed in last week |

Base URL is configured via `VITE_BASE_URL`.

## 📁 Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css / App.css
├── context/
│   ├── AgentModalContext.jsx
│   └── LeadModalContext.jsx
├── header-footer/
│   ├── header.jsx          # Global header + Add Lead / Add Agent modals
│   └── footer.jsx
├── hooks/
│   ├── useAxiosGET.jsx     # Generic GET hook (loading/error/data)
│   ├── useAddNewLead.jsx   # Lead form logic + agents/tags fetch
│   ├── useAddNewSalesAgent.jsx
│   ├── useToast.jsx
│   ├── sortLeads.jsx
│   └── sortLeads2.jsx
├── components/
│   ├── leadClosedPieChart.jsx              # Closed vs Pipeline
│   ├── leadClosedBySalesAgentbarChart.jsx  # Bar chart by agent
│   └── groupedLeadStatusPieChart.jsx       # Status distribution
├── pages/
│   ├── homepage-dashboard.jsx
│   ├── leadList.jsx
│   ├── lead-management.jsx
│   ├── leadStatusView.jsx
│   ├── leadsBySalesAgent.jsx
│   ├── salesAgentManagement.jsx
│   └── report-Screen.jsx
└── CSS/
    ├── dashboard-homepage.css
    ├── lead-management.css
    ├── leadList.css
    ├── leadStatusView.css
    ├── leadsBySalesAgent.css
    ├── salesAgentManagement.css
    ├── report-Screen.css
    ├── header.css
    ├── footer.css
    ├── useToast.css
    └── chart styles...
```

## 🔄 Lead Lifecycle

```
New → Contacted → Qualified → Proposal Sent → Closed
```

- `source`: Website, Referral, Cold Call, Advertisement, Email, Other
- `priority`: High, Medium, Low
- `timeToClose`: Number of days (1-120)

## 📸 Key Screens

- **Dashboard** — Sidebar navigation, status summary, quick status filters
- **Lead Management** — Lead info card + edit modal + comment thread
- **Reports** — Visual analytics for pipeline health and agent performance

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (`vite --host`) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

- Frontend: Vercel / Netlify (Vite build output `dist/`)
- Backend: `https://major-project-2-backend.vercel.app` (example)

Set `VITE_BASE_URL` in your hosting provider's environment variables before deploying.

---

Built for Anvaya CRM — Lead lifecycle management with sales agent assignment and reporting.
