import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedUser, setLoggedUser] = useContext(userContext)

    let email = sessionStorage.getItem("user");

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedUser.email || email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;