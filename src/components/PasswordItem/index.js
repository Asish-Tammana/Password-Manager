/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unknown-property */
import './index.css'

const PasswordItem = props => {
  const {passwordItemDetails, deleteItem, showPassword} = props
  const {id, websiteGiven, usernameGiven, passwordGiven} = passwordItemDetails
  console.log(websiteGiven)

  const passwordItem = !showPassword ? (
    <img
      className="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  ) : (
    <p>{passwordGiven}</p>
  )

  const clickDeleteButton = () => {
    deleteItem(id)
  }

  return (
    <li className="password-item-container">
      <h1 className="password-item-letter">{websiteGiven[0].toUpperCase()}</h1>
      <div className="password-item-content">
        <p>{websiteGiven}</p>
        <p>{usernameGiven}</p>
        {passwordItem}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={clickDeleteButton}
        testid="delete"
      >
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
