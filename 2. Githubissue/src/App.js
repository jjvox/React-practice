import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.js";
import Header from "./Header.js";

import Issue from "./pages/Issue.js";
import CreateIssue from "./pages/CreateIssue.js";
import Projects from "./pages/Projects.js";
import PullRequest from "./pages/PullRequest.js";
import Code from "./pages/Code.js";
import Security from "./pages/Security.js";
import Actions from "./pages/Actions.js";
import { QueryClientProvider, QueryClient } from "react-query";

// 캐시 - 쉽게 변하지 않는 데이터(유저정보)를 임시적으로 저장해두는 부분.
// 커스텀 hook을 만들어서 user정보를 불러왔는데 매번 필요할때마다 api를 불러 오기보단
// 한번 불러오고 캐시를 이용해 저장해 둔 뒤 사용 하면 중복된 api호출을 피할 수 있다.
//  --> react-query를 이용 한다.

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Issue />}></Route>
        <Route path="/issues" element={<Issue />}></Route>
        <Route path="/new" element={<CreateIssue />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/pulls" element={<PullRequest />}></Route>
        <Route path="/code" element={<Code />}></Route>
        <Route path="/security" element={<Security />}></Route>
        <Route path="/actions" element={<Actions />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
