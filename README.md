This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Specifications

### Acceptance Criteria

1. React based Application which has different routes (including fallback for it not found)
2. Stateful components (ones with useState)
3. a Pure component (displays something, but its not smart, no state needed)
4. example of useEffect (easy thing is to use this to fetch data)
5. can you discover or create a custom hook. there are librarys of them, you dont need to make one yourself (no bonus points haha)
6. Something in Global State Management
7. Reducer. OR at least explain why you dont want to use a reducer.
8. animation? :D

### Requirements

- Add routes for:
  - All notes
  - Labels
  - Archive
- Stateful components:
  - Note
  - Add note form
  - Add label form
  - many more
- Pure components:
  - MUI icons
- Use effect:
  - Init RxDB
- Custom hooks:
  - useNote
  - useColourMode
  - useNavOpen
  - useNavigation
  - useLabels
  - MUI hooks
  - RxDB hooks package
- Global state management:
  - useContext (TODO change this, in provider hell)
  - RxDB
- Reducer:
  - Used in custom hooks
- Animation:
  - Handled by MUI
