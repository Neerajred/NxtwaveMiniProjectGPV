import {Link} from 'react-router-dom'

import './index.css'

const Header = () => {
  const active = 'home'
  return (
    <div>
      <nav className="header-container">
        <div className="logo-and-title-container">
          <Link className="route-link" to="/">
            <h1 className="title">Github Profile Visualizer</h1>
          </Link>
        </div>
        <ul className="nav-items-list">
          <li className="link-item">
            <Link
              className={`${active === 'home' ? 'active-link' : 'route-link'}`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="link-item">
            <Link
              className={`${active === 'repos' ? 'active-link' : 'route-link'}`}
              to="/repositories"
            >
              Repositories
            </Link>
          </li>
          <li className="link-item">
            <Link
              className={`${
                active === 'analysis' ? 'active-link' : 'route-link'
              }`}
              to="/analysis"
            >
              Analysis
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
