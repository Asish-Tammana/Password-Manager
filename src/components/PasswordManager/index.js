/* eslint-disable no-alert */
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    searchInput: '',
    showPassword: false,
  }

  getFormData = event => {
    event.preventDefault()

    const websiteGiven = document.getElementById('websiteGiven').value
    const usernameGiven = document.getElementById('usernameGiven').value
    const passwordGiven = document.getElementById('passwordGiven').value

    if (websiteGiven === '') {
      alert('No Website Given')
    } else if (usernameGiven === '') {
      alert('No Username GIven')
    } else if (passwordGiven === '') {
      alert('No Password Given')
    } else {
      const newPasswordItem = {
        id: uuidv4(),
        websiteGiven,
        usernameGiven,
        passwordGiven,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPasswordItem],
      }))

      document.getElementById('websiteGiven').value = ''
      document.getElementById('usernameGiven').value = ''
      document.getElementById('passwordGiven').value = ''
    }
  }

  searchPassword = event => {
    const givenInput = event.target.value
    this.setState({
      searchInput: givenInput,
    })
  }

  deleteItem = id => {
    const {passwordsList} = this.state

    const filteredList = passwordsList.filter(eachItem => eachItem.id !== id)

    this.setState({
      passwordsList: filteredList,
    })
  }

  checkBoxShow = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {passwordsList, searchInput, showPassword} = this.state

    const searchResults = passwordsList.filter(eachItem =>
      eachItem.passwordGiven.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const passwordsContainer =
      searchResults.length === 0 ? (
        <div className="no-passwords-container">
          <img
            className="no-password-img"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
          />
          <h1>No Passwords</h1>
        </div>
      ) : (
        <ul type="none" className="passwords-container">
          {searchResults.map(eachPasswordItem => (
            <PasswordItem
              key={eachPasswordItem.id}
              passwordItemDetails={eachPasswordItem}
              deleteItem={this.deleteItem}
              showPassword={showPassword}
            />
          ))}
        </ul>
      )

    return (
      <div className="bg-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-container">
          <form onSubmit={this.getFormData}>
            <h1 className="form-title">Add New Password</h1>
            <div className="input-container">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                id="websiteGiven"
              />
            </div>
            <div className="input-container">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                id="usernameGiven"
              />
            </div>
            <div className="input-container">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                id="passwordGiven"
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            className="top-container-image large-size-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
          <img
            className="top-container-image small-size-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
        </div>
        <div className="bottom-container">
          <div className="nav-bar">
            <div className="horizontal">
              <h1 className="form-title">Your Passwords</h1>
              <p className="password-count">{passwordsList.length}</p>
            </div>
            <div className="bottom-container-search">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search Password"
                onChange={this.searchPassword}
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="horizontal show-password-container">
              <input
                type="checkbox"
                id="showPassword"
                className="checkbox-input"
                onChange={this.checkBoxShow}
                value="checkbox"
              />
              <label htmlFor="showPassword">Show passwords</label>
            </div>
            {passwordsContainer}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
