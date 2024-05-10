import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import Profile from '../Profile'
import FailureView from '../FailureView'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      userData: null,
      status: 'START',
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({status: 'INPROGRESS'})
    const {username} = this.state
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`,
    )
    if (response.ok) {
      const data = await response.json()
      sessionStorage.setItem('username', username)
      const userDetails = {
        avatarUrl: data.avatar_url,
        name: data.name,
        login: data.login,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        company: data.company,
        companyUrl: data.blog,
        location: data.location,
      }
      this.setState({userData: userDetails, status: 'SUCCESS'})
      document.getElementById('ErrorMsg').style.display = 'none'
      document.getElementById('SearchInput').style.border = '0px'
    } else {
      sessionStorage.setItem('username', '')
      document.getElementById('ErrorMsg').style.display = 'block'
      document.getElementById('SearchInput').style.border = 'red solid 1px'
      this.setState({userData: '', status: 'FAILURE'})
    }
  }

  render() {
    const {username, status, userData} = this.state
    return (
      <div className="homeContainer">
        <div>
          <form onSubmit={this.handleSubmit} className="searchContainer">
            <input
              id="SearchInput"
              type="search"
              value={username}
              className="searchInput"
              placeholder="Enter github username"
              onChange={e => this.setState({username: e.target.value})}
            />
            <button
              type="button"
              className="searchIcon"
              data-testid="searchButton"
              onClick={this.handleSubmit}
            >
              .<HiOutlineSearch style={{backgroundColor: '#4f4e4c'}} />
            </button>
          </form>
        </div>
        <p className="error-msg" id="ErrorMsg">
          Enter the valid github username
        </p>
        <div>
          {status === 'START' && (
            <div>
              <h1>GitHub Profile Visualizer</h1>
              <img
                src="https://res.cloudinary.com/drw030kab/image/upload/v1710399568/mmsigxjvvuiqvqsew0dx.png"
                alt="gitHub profile visualizer home page"
              />
            </div>
          )}
          {status === 'INPROGRESS' && (
            <div className="loader-container" data-testid="loader">
              <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
            </div>
          )}
          {status === 'SUCCESS' && <Profile userDetails={userData} />}
          {status === 'FAILURE' && (
            <FailureView handleSubmit={this.handleSubmit} />
          )}
        </div>
      </div>
    )
  }
}

export default Home
