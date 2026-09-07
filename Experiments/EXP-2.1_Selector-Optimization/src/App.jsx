import "./App.css";
import FilterButtons from "./components/FilterButtons";
import PostsList from "./components/PostsList";
import RenderCounter from "./components/RenderCounter";

function App() {
  return (
    <div className="container">
      <h1>🚀 Redux Toolkit Selector Optimization</h1>

      <p className="subtitle">
        Memoized Selectors using createSelector()
      </p>

      <FilterButtons />

      <RenderCounter />

      <PostsList />
    </div>
  );
}

export default App;