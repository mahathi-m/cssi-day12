let googleUser;
let userName;

window.onload = (event) => {
    //retain user state between html pages 

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            googleUser = user;
            console.log(googleUser)
            userName = googleUser.displayName;
            getNotes(googleUser.uid);
        } else {
            window.location = 'index.html';
        }
    })
};

const getNotes = (userId) => {
    console.log("logged in as user:" + userId);
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value',(snapshot) => {
        renderData(snapshot.val());
    });
};

const renderData = (data) => {
    console.log(data);
    for(let key in data) {
        const note = data[key];
        const destination = document.querySelector("#app");

        destination.innerHTML += createCard(note);
    };
};



const createCard = (note) => {


    return `<div class = "column is-one-quarter">
                <div class = "card">
                    <header class = "card-header">
                        <p class = "card-header-title"> ${note.title} <p>
                    </header>
                    <div class = "card-content">
                        <div class = "content"> 
                            ${note.text} 
                        </div>
                    </div>
                    <div class = "has-text-right"> 
                            <p class="has-text-right">
                            ${userName} &nbsp
                            </p>
                        
                    </div>
                </div>
            </div>';
    `
}