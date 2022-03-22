import { useDispatch, useSelector } from "react-redux";
import { authActions, RootState } from "../../redux/index";
import classes from "./Home.module.css";

const Home = () => {
  const userData = useSelector((state: RootState) => state.userDetails);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <>
      <header className={classes.header}>
        <h1>PROFILE PAGE</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className={classes.home_page}>
        <div>
          <img src={userData.userAvatar} alt="user_image" />
        </div>
        <div>
          <h3>
            <div className={classes.card}>
              Hello, <span className={classes.name}>{userData.userName}</span>,
              you are registered with the
              <div className={classes.email}>{userData.userEmail}</div>
              <div> mobile no. {userData.userPhone}</div>
            </div>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Home;
