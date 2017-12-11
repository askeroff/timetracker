import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getTasks, clearTasks } from '../../actions/tasks';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import NotLoggedIn from '../NotLoggedIn';
import NotFound from '../NotFound';
import TasksList from '../tasks/TasksList';

class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {},
      userLoaded: false,
      projectsLoaded: false,
      tasksLoaded: false,
      notFound: false,
    };
    this.onUpdateProjects = this.onUpdateProjects.bind(this);
    this.onUpdateTasks = this.onUpdateTasks.bind(this);
  }

  componentDidMount() {
    this.props.clearTasksList();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user &&
      nextProps.user.loggedIn === true &&
      !this.state.userLoaded
    ) {
      this.props.handleProjects(nextProps.user._id);
      this.setState({ userLoaded: true });
    }
  }

  componentDidUpdate() {
    this.onUpdateProjects();
    this.onUpdateTasks();
  }

  onUpdateProjects() {
    if (this.props.projects.length !== 0 && !this.state.projectsLoaded) {
      this.props.projects.forEach(item => {
        if (item._id === this.props.match.params.id) {
          this.setState({ currentProject: item, projectsLoaded: true });
        }
        return item;
      });
      this.setState({ projectsLoaded: true });
    }
  }

  onUpdateTasks() {
    if (
      this.state.projectsLoaded &&
      this.state.currentProject.name === undefined &&
      this.state.notFound === false
    ) {
      this.setState({ notFound: true });
    }

    if (
      this.state.projectsLoaded &&
      this.state.currentProject.name !== undefined &&
      !this.state.tasksLoaded
    ) {
      this.props.handleTasks(this.props.match.params.id);
      this.setState({ tasksLoaded: true });
    }
  }

  render() {
    if (this.props.user && this.props.user.loggedIn === false) {
      return <NotLoggedIn />;
    }
    if (!this.state.projectsLoaded) {
      return (
        <Layout>
          <Spinner />
        </Layout>
      );
    }
    if (this.state.notFound) {
      return <NotFound />;
    }
    return (
      <Layout>
        <h1 className="page-title">
          {this.state.currentProject.name || '...'}
        </h1>
        <p>Archive of your finished tasks!</p>
        <TasksList
          filter
          projectId={this.props.match.params.id}
          tasks={this.props.tasks}
          tasksLoaded={this.state.tasksLoaded}
        />
      </Layout>
    );
  }
}

Archive.defaultProps = {
  projects: [],
  tasks: [],
  user: {},
};

Archive.propTypes = {
  match: PropTypes.object.isRequired,
  projects: PropTypes.array,
  tasks: PropTypes.array,
  user: PropTypes.object,
  handleProjects: PropTypes.func.isRequired,
  handleTasks: PropTypes.func.isRequired,
  clearTasksList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
  handleTasks(projectId) {
    dispatch(getTasks(projectId));
  },
  clearTasksList() {
    dispatch(clearTasks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
