
class userFetch{

    addUser = (bodyData) => {
        console.log(bodyData);
        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch(`/users`, {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((res) => res.text())
            .then((data) => {
                console.log(data);

                //this.setState({ items: data });
                //console.log(this.state.user);

                return true;
            })
            .catch((err) => {
                console.log(err);

                return false;
            });
    }

    deleteUser = (id) => {
    // setup automatic proxy in package.json.
    // thus eliminating the need to type "http://localhost:7000"
    // "proxy" : "http://localhost:7000"
    fetch(`/users/${id}`, {
        method: "DELETE"
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //alert(`Deleted user ${id}`);
            //this.setState({ items: data });
            //console.log(this.state.user);
            return true;
        })
        .catch((err) => {
            console.log(err);
            alert(`Fail to delete user ${id}`);
            return false;
        });
    }
}

const apiFetch = new userFetch();

export default apiFetch;