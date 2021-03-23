import { combineReducers } from 'redux';
import auth from './auth.reducer';
import projects from './projects.reducer';
import projectTeam from './projectTeam.reducer';
import productBacklog from './productBacklog.reducer';
import sprint from './sprint.reducer';
import userStory from './userStory.reducer';
import task from './task.reducer';
import retrospective from './sprintRetrospective.reducer';
import history from './history.reducer';

export default combineReducers({
  auth,
  productBacklog,
  projects,
  projectTeam,
  sprint,
  userStory,
  task,
  retrospective,
  history
});
