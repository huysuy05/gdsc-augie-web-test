// This is a function to handle admin login. It will extract information (username, password) form the user input and send
// it back to the backend server to authorize.
// It will returns back a 

export async function adminLogin(username: string, password: string) {
    const body = new URLSearchParams();
    body.append("username", username)
    body.append("password", password);
    const res = await fetch("http://127.0.0.1:8000/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    });

    if (!res.ok) {
        throw new Error("Error fetching log in info!")
    }
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    return data;

}