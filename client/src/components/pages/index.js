import NotFound from './NotFound';
import Login from './Auth/Logins';
import Home from './Home';
import AdmNewProject from './AdmNewProject';
import AdmEditMember from './AdmEditMember';
import EditMember from '../Form/editProjectMember';
import MainBoard from './MainBoard';
import ProductBacklog from './POListProductBacklog';
import Register from './Auth/Register';
import SprintPlanning from './SprintPlanning';
import Retrospective from './Retrospective';
import HistoryProject from './History';
import DetailProject from './ProjectDetail'

const pages = {
  Login,
  Register,
  Home,
  AdmNewProject,
  AdmEditMember,
  EditMember,
  MainBoard,
  NotFound,
  ProductBacklog,
  SprintPlanning,
  Retrospective,
  HistoryProject,
  DetailProject
};

export default pages;
