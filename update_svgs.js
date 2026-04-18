const fs = require('fs');

const content = fs.readFileSync('app/integrations.tsx', 'utf8');

const newApps = `const APPS = [
  {
    col: 1, row: 0,
    name: "Slack",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
        <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
        <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
        <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
      </svg>
    )
  },
  {
    col: 3, row: 0,
    name: "Linear",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#141416"/>
        <path d="M6 13.5L13.5 6M8 17L17 8M12.5 19L19 12.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    col: 5, row: 0,
    name: "OpenAI",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.28 10.51a8.4 8.4 0 0 0-1.87-4.14 8.41 8.41 0 0 0-4.04-2.77 8.41 8.41 0 0 0-8.52 1.4A8.4 8.4 0 0 0 4.14 1.88a8.41 8.41 0 0 0-3.64 3.73 8.4 8.4 0 0 0-.25 9.17 8.4 8.4 0 0 0 1.87 4.14 8.4 8.4 0 0 0 4.04 2.77 8.4 8.4 0 0 0 8.52-1.4 8.4 8.4 0 0 0 3.7-3.11 8.41 8.41 0 0 0 3.64-3.73 8.4 8.4 0 0 0 .26-9.17ZM12 21.05a7 7 0 0 1-5.18-2.22l8.83-5.1v-5.2l2.6 1.5a7 7 0 0 1-6.25 11.02ZM3.98 14.5a7 7 0 0 1 2.58-4.48V4.86L3.92 6.4v7.4c0 .24.03.47.06.7ZM5.76 3.66a7 7 0 0 1 5.18-2.22l-4.4 2.54v5.2l-2.6-1.5a7 7 0 0 1 1.82-4.02ZM20.02 9.5a7 7 0 0 1-2.58 4.48v5.16l2.64-1.54v-7.4a6.6 6.6 0 0 1-.06-.7Zm-2.3-4.88a7 7 0 0 1-4.66 12.2l4.4-2.54v-5.2L20.06 7.6a7 7 0 0 1-2.34-2.98ZM12 2.95a7 7 0 0 1 4.66 2.22v10.18l-8.83 5.1A7 7 0 0 1 12 2.95Z" fill="#1C1C1E"/>
      </svg>
    )
  },
  {
    col: 0, row: 1,
    name: "Notion",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.459 4.208c.749-.247 1.25-.333 2.164-.333h10.424c.75 0 1.332.083 2.165.333l.25-1.996H4.043l.416 1.996Zm-1.83 2.08H5.13l.749 11.482 7.072-10.9-1.914-.582.416-2H21.2A197.647 197.647 0 0 1 20.37 8l-1.082.333-1.082 12.98h-2.164l-7.738-11.4h-.083l-.75 11.4 1.916.333-.334 1.914H3.046v-1.83l1.83-.417-.749-13.313-1.664-.416.166-1.331Z" fill="#111111"/>
      </svg>
    )
  },
  {
    col: 2, row: 1,
    name: "Asana",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#F4F5F7"/>
        <circle cx="12" cy="7.5" r="3" fill="#F06A6A"/>
        <circle cx="7" cy="15.5" r="3" fill="#F06A6A"/>
        <circle cx="17" cy="15.5" r="3" fill="#F06A6A"/>
      </svg>
    )
  },
  {
    col: 4, row: 1,
    name: "Cursor",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#1C1C1E"/>
        <path d="M15.5 15L17 21L13 13.5L9 21L10.5 15L6 10H20L15.5 15Z" fill="#F4F4F5" stroke="#F4F4F5" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    col: 6, row: 1,
    name: "Cohere",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#F5E6DA"/>
        <path d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" stroke="#3D2925" strokeWidth="2.5"/>
      </svg>
    )
  },
  {
    col: 1, row: 2,
    name: "Atlassian",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#2563EB"/>
        <path d="M11 18L13 15L16 19L11 18ZM6 18L12 8L10 19L6 18ZM18 18L12 8L14 19L18 18Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    col: 3, row: 2,
    name: "LangChain",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#14532D"/>
        <path d="M7 11.5a3.5 3.5 0 0 1 3.5-3.5h3v2h-3a1.5 1.5 0 0 0 0 3h7v2h-7a3.5 3.5 0 0 1-3.5-3.5Z" fill="white"/>
        <path d="M17 12.5a3.5 3.5 0 0 1-3.5 3.5h-3v-2h3a1.5 1.5 0 0 0 0-3h-7v-2h7a3.5 3.5 0 0 1 3.5 3.5Z" fill="white"/>
      </svg>
    )
  },
  {
    col: 5, row: 2,
    name: "Google Workspace",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  }
];`

const modified = content.replace(/const APPS = \[[\s\S]*?\];/, newApps);
fs.writeFileSync('app/integrations.tsx', modified);
console.log('Success');
