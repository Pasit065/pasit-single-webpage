import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Profile } from './components/Profile';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { Projects } from './components/Projects';
import { QuestionForm } from './components/QuestionForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const imgParrentPath = process.env.PUBLIC_URL + '/assets/img/';

  return (
    <div className="App">
      <NavBar imgParrentPath={imgParrentPath} />
      <Banner imgParrentPath={imgParrentPath}  />
      <Profile imgParrentPath={imgParrentPath}  />
      <Skills />
      <Projects imgParrentPath={imgParrentPath} />
      <QuestionForm imgParrentPath={imgParrentPath} />
      <Footer imgParrentPath={imgParrentPath}  /> 
    </div>
  );
}

export default App;