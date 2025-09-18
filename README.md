# GitHub Repository Explorer

A Next.js + TypeScript application that allows users to search for GitHub repositories, view them as responsive cards, and dive into detailed repo information.  
The app includes **sorting, filtering, search within results, pagination, charts for repo stats, dark/light mode, and responsive UI enhancements**.

---

## 🚀 Features
- 🔍 Search for repositories by username  
- ⭐ Sort & Filter repos by stars, forks, language, and last updated  
- 📊 Repo stats dashboard (stars, forks, languages) using charts  
- 📱 Responsive card layout with badges for stars/forks/language  
- 📄 View repository details including contributors and metadata  
- 📑 Pagination with next/prev buttons (extendable to infinite scroll)  

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (>= 18.x)
- npm or yarn
- A GitHub API base URL (default: `https://api.github.com/`)

### Installation
```bash
# clone the repo
git clone https://github.com/your-username/github-repo-explorer.git
cd github-repo-explorer

# install dependencies
npm install 

```
### Running the App
```bash
# development
npm run dev

# production build
npm run build
npm start
```
```bash
# run tests
npm run test
```
### 📖 Documentation & Approach

- Next.js + TypeScript: Provides a scalable, strongly-typed, and SEO-friendly foundation.

- Redux Toolkit (RTK Query): Handles API state management with caching, pagination, and hooks.

- Reusable Hooks: Implemented usePagination and reusable API hooks for maintainability.

- Charts: recharts used for lightweight visualization of repo stats.

- Theming: Tailwind CSS with next-themes ensures adaptive dark/light mode with system preference detection.

### Trade-offs:

- Decided to use RTK Query instead of plain fetch for caching and auto-refetching.

- Chose charts for better user engagement, but this adds an extra dependency.

- Pagination implemented with buttons (simpler UX) but can be upgraded to infinite scroll for better scalability.

## 🌍 Scaling for 100,000 Daily Users

### 🔐 Authentication

**Design**  
- Use OAuth2 (GitHub, Google) for seamless login and reduced friction.  
- JWT tokens (short-lived access + long-lived refresh tokens) for secure sessions.  
- Store tokens in HTTP-only cookies to prevent XSS attacks.  

**Scalability**  
- Leverage CDN + load balancers for global performance.  
- Use distributed session storage (e.g., Redis) to handle multiple servers.
- Introduce Protocal Buffers in order to read and Write faster

**User Experience**  
- Support passwordless login (email magic link or OAuth).  
- Implement MFA for sensitive operations.  

---

### 🔍 Search Functionality

**Backend**  
- Use Elasticsearch or Algolia for indexing repositories with autocomplete, faceted filtering, and typo tolerance.  
- Implement caching layers (Redis) to speed up repeated queries.  

**Frontend**  
- Client-side filtering and sorting for already-fetched data.  
- Debounced search inputs to avoid excessive API calls.  
- Infinite scroll pagination for smooth browsing.  

**Optimization**  
- Precompute and cache trending/popular repos.  
- Use GraphQL (via GitHub API v4) for more efficient queries.  

---

### 📊 Monitoring & Maintenance

**Monitoring Tools**  
- Prometheus + Grafana for infrastructure metrics (CPU, memory, latency).  
- Sentry or LogRocket for error tracking and frontend performance.  
- Datadog / New Relic for APM and real-time tracing.  

**Health Checks**  
- Implement readiness/liveness probes in containers.  
- Auto-scaling with Kubernetes (HPA) based on CPU/memory usage.  

**Maintenance Strategy**  
- CI/CD pipelines (GitHub Actions) for automated testing and deployments.  
- Blue-green deployments to minimize downtime.  
- Regular dependency and security audits.  

---

### 📌 Future Improvements
- Infinite scroll for repo browsing  
- Favorites system with localStorage persistence  
- Offline support via PWA  
- Gamification (leaderboards, badges)  
- Enhanced charts for repo growth over time  


