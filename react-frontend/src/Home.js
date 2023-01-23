import { useAuth } from "./context/AuthProvider";

export const Home = () => {
    const { value } = useAuth();

    return (
    <>
    <div className="grid">
        <h2>Home (Public)</h2>

        <div className="row">
            <h4>Username</h4>
            <input type="text" id="Username"></input>
        </div>

        <div className="row">
            <h4>Password</h4>
            <input type="password" id="Password"></input>
        </div>

        <div className="row">
        <button type="button" onClick={value.onLogin}>
            Sign In
        </button>
        </div>
    </div>
    </>
);
};