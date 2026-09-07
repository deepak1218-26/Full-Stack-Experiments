import "./App.css";

import PlatformSelector from "./components/PlatformSelector";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="App">

      <h1>📱 Redux Toolkit Social Dashboard</h1>

      <PlatformSelector />

      <PostForm />

      <PostList />

    </div>
  );
}

export default App;