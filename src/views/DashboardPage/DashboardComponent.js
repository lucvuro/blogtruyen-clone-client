import { useEffect, useState } from "react";
import "./scss/Dashboard.scss";
import { useDispatch } from "react-redux";
import HomeComponent from "./HomeComponent";
import ProfileComponent from "./ProfileComponent";
import { BrowserRouter, Switch, Route, NavLink, Link } from "react-router-dom";
import { logoutUser } from "../../api/authAPI";
import { createAxios } from "../../api/axiosClient";
import AddMangaPage from "./AddManga/AddMangaPage";
import ListAuthorPage from "./ListAuthor/ListAuthorPage";
import MangaPostedFromUserPage from "./MangaPostedFromUser/MangaPostedFromUserPage";
import MangaInfoPage from "./MangaInfo/MangaInfoPage";
import AddChapterPage from "./AddChapter/AddChapterPage";
const DashboardComponent = (props) => {
  const dispatch = useDispatch();
  const { user, path, url } = props;
  const axiosClient = createAxios(user, dispatch);
  const [showMenu, setShowMenu] = useState(true);
  const [showMangaMenu, setShowMangaMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const handleLogout = async () => {
    const success = await logoutUser(user, dispatch, axiosClient);
  };
  return (
    <>
      <div className={showMenu ? "dashboard" : "dashboard dashboard-compact"}>
        <div
          className={showMenu ? "dashboard-nav mobile-show" : "dashboard-nav"}
        >
          <header>
            <div className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
              <i className="fas fa-bars"></i>
            </div>
            <Link to="/" className="brand-logo">
              <i className="fas fa-anchor"></i> <span>TRUYENCC.VN</span>
            </Link>
          </header>
          <nav className="dashboard-nav-list">
            <NavLink exact to={path} className="dashboard-nav-item">
              <i className="fas fa-home"></i>
              Home{" "}
            </NavLink>
            <NavLink to={`${url}/profile`} className="dashboard-nav-item">
              <i className="fas fa-user"></i> Profile{" "}
            </NavLink>
            <NavLink to={`${url}/themtruyen`} className="dashboard-nav-item">
              <i className="fa-solid fa-file-pen"></i> Thêm mới truyện{" "}
            </NavLink>
            <NavLink to={`${url}/tacgia`} className="dashboard-nav-item">
              <i className="fa-solid fa-file-pen"></i> Danh sách tác giả{" "}
            </NavLink>
            <NavLink to={`${url}/theloai`} className="dashboard-nav-item">
              <i className="fa-solid fa-file-pen"></i> Danh sách thể loại{" "}
            </NavLink>
            <NavLink to={`${url}/nhomdich`} className="dashboard-nav-item">
              <i className="fa-solid fa-file-pen"></i> Danh sách nhóm dịch{" "}
            </NavLink>
            <div
              className={
                showMangaMenu
                  ? "dashboard-nav-dropdown show"
                  : "dashboard-nav-dropdown"
              }
              onClick={() => setShowMangaMenu(!showMangaMenu)}
            >
              <div className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                <i className="fa-solid fa-book"></i> Quản lý truyện{" "}
              </div>
              <div className="dashboard-nav-dropdown-menu">
                <NavLink
                  to={`${url}/truyendadang`}
                  className="dashboard-nav-dropdown-item"
                >
                  Truyện đã đăng
                </NavLink>
              </div>
            </div>
            <div
              className={
                showUserMenu
                  ? "dashboard-nav-dropdown show"
                  : "dashboard-nav-dropdown"
              }
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                <i className="fa-solid fa-book"></i> Quản lý user{" "}
              </div>
              <div className="dashboard-nav-dropdown-menu">
                <NavLink
                  to={`${url}/userAll`}
                  className="dashboard-nav-dropdown-item"
                >
                  Danh sách user
                </NavLink>
                <NavLink
                  to={`${url}/addUser`}
                  className="dashboard-nav-dropdown-item"
                >
                  Thêm mới user
                </NavLink>
              </div>
            </div>

            <div className="nav-item-divider"></div>
            <div className="dashboard-nav-item" onClick={() => handleLogout()}>
              <i className="fas fa-sign-out-alt"></i> Logout{" "}
            </div>
          </nav>
        </div>
        <div className="dashboard-app">
          <header className="dashboard-toolbar">
            <div className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
              <i className="fas fa-bars"></i>
            </div>
          </header>
          <div className="dashboard-content">
            <Switch>
              <Route exact path={path}>
                <HomeComponent user={user} />
              </Route>
              <Route path={`${path}/profile`}>
                <ProfileComponent user={user} />
              </Route>
              <Route path={`${path}/themtruyen`}>
                <AddMangaPage user={user} path={path} />
              </Route>
              <Route path={`${path}/tacgia`}>
                <ListAuthorPage user={user} path={path} />
              </Route>
              <Route path={`${path}/truyendadang/themchuongmoi`}>
                <AddChapterPage user={user}/>
              </Route>
              <Route path={`${path}/truyendadang/:manga_id`}>
                <MangaInfoPage path={path} user={user}/>
              </Route>
              <Route exact path={`${path}/truyendadang`}>
                <MangaPostedFromUserPage user={user} />
              </Route>
              
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
