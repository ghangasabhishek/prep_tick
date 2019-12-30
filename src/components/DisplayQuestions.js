import React, { Component } from 'react';
import 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomPaginationActionsTable from "./TablePaginationActions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const styles = {
  center:{
    position: 'absolute',
    top: '10%',
  },
  root: {
    width: 500,
  },
}

class DisplayQuestions extends Component {

  state = {
    loading: true,
    questionList: null,
    searchText: '',
    pageNumber : 1
  }
  async componentDidMount(){
    const url = "https://staging-api.preptick.com/questions.json"
    const response = await fetch(url)
    const jsonData = await response.json()
    this.setState({
      loading: false,
      questionList: jsonData
    })
  }

  fetch = () => {
    return new Promise(resolve => setTimeout(() => resolve(42), 1000));
  }

  fetchAPI = (param, text) => {
    // console.log(`https://staging-api.preptick.com/questions.json?${param}=${text}`)
    return fetch(`https://staging-api.preptick.com/questions.json?${param}=${text}`);
  }

  handleChange = e => {
    this.setState({ searchText: e.target.value})
  }

  searchRole = () => {
    this.fetchAPI("role", this.state.searchText).then(result => {
      this.setState({ questionList: result });
    });
  }
  
  searchCompany = () => {
    this.fetchAPI("company", this.state.searchText).then(result => {
      this.setState({ questionList: result });
    });
  }

  goToNextPage = () => {
    let newPage = this.state.pageNumber + 1
    this.fetchAPI("page", newPage).then(result => {
      this.setState({ questionList: result, pageNumber: newPage });
    });
  }

  goToPrevPage = () => {
    let newPage = this.state.pageNumber - 1
    this.fetchAPI("page", newPage).then(result => {
      this.setState({ questionList: result, pageNumber: newPage });
    });
  }

  goToFirstPage = () => {
    let newPage = 1
    this.fetchAPI("page", newPage).then(result => {
      this.setState({ questionList: result, pageNumber: newPage });
    });
  }

  goToLastPage = () => {
    let newPage = 5 // assuming this to be page limit
    this.fetchAPI("page", newPage).then(result => {
      this.setState({ questionList: result, pageNumber: newPage });
    });
  }

  render() {
    const displayCenter = styles.center
    return (
      <div style = {{...displayCenter}}>
        {this.state.loading ? 
          <CircularProgress />
        :
          <div>
            <div style = {{textAlign:"left", display: "inline-block"}}>
              <TextField 
                id="standard-basic" 
                label="Search for" 
                onChange={this.handleChange}
              />

              <Button 
                variant="contained"
                onClick={this.searchRole}
              >
                Search Role
              </Button>

              <Button 
                variant="contained"
                onClick = {this.searchCompany}
              >
                Search Company
              </Button>
            </div>

            
            <CustomPaginationActionsTable
              questions = {this.state.questionList.data}
            />

            <BottomNavigation  className={styles.root}>
              <BottomNavigationAction 
                label="First Page"   
                icon={<ArrowBackIcon />} 
                onClick = {this.goToFirstPage}
                disabled = {this.state.pageNumber == 1 ? true : false}
              />
              <BottomNavigationAction 
                label="Prev Page" 
                icon={<ArrowBackIosIcon />} 
                onClick = {this.goToPrevPage}
                disabled = {this.state.pageNumber == 1 ? true : false}
              />
              <BottomNavigationAction 
                label="Next Page" 
                icon={<ArrowForwardIosIcon />} 
                onClick = {this.goToNextPage}
                disabled = {this.state.pageNumber == 5 ? true : false}
              />
              <BottomNavigationAction 
                label="Last Page" 
                icon={<ArrowForwardIcon />} 
                onClick = {this.goToLastPage}
                disabled = {this.state.pageNumber == 5 ? true : false}
              />
            </BottomNavigation>
          </div>
          
        }
      </div>
    )
  }
}

export default DisplayQuestions
