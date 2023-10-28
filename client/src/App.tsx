import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./pages/borrow/BookList";
import Home from "./pages/home/Home";
import "./App.css";
import MemberList from "./pages/return/MemberList";

const App = () => {
  return (
    <div className="App align-center">
      <BrowserRouter>
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/booklist/:valueMember" Component={BookList} />
            <Route path="/member" Component={MemberList} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
