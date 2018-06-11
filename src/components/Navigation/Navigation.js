import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { navContainer, link, active } from './styles.css'
import { ModalContainer } from 'containers'

Navigation.propTypes = NavLinks.propTypes = ActionLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

function NavLinks({ isAuthed }) {
  return isAuthed === true ? (
    <ul>
      <li>
        <NavLink exact={true} className={link} activeClassName={active} to="/">
          {'Home'}
        </NavLink>
      </li>
    </ul>
  ) : null
}

function ActionLinks({ isAuthed }) {
  return isAuthed === true ? (
    <ul>
      <li>
        <ModalContainer />
      </li>
      <li>
        <NavLink className={link} to="/logout">
          {'Logout'}
        </NavLink>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <NavLink exact={true} className={link} activeClassName={active} to="/">
          {'Home'}
        </NavLink>
      </li>
      <li>
        <NavLink className={link} activeClassName={active} to="/auth">
          {'Authenticate'}
        </NavLink>
      </li>
    </ul>
  )
}

export default function Navigation({ isAuthed }) {
  return (
    <div>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}
