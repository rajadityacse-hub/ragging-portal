function toggleContact() {
    let anonymous = document.getElementById("anonymous").checked;

    document.getElementById("contact").style.display =
        anonymous ? "none" : "block";
}

function submitComplaint() {

    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;
    let anonymous = document.getElementById("anonymous").checked;

    if (description.trim() === "") {
        alert("Please describe your complaint!");
        return;
    }

    let name = anonymous ? "Anonymous" :
        document.getElementById("name").value;

    let email = anonymous ? "" :
        document.getElementById("email").value;

    let token = "CMP" + Math.floor(100000 + Math.random() * 900000);

    let complaint = {
        token: token,
        category: category,
        description: description,
        name: name,
        email: email,
        status: "Under Review"
    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(complaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    document.getElementById("result").innerHTML =
        "Complaint Submitted Successfully!<br>Your Tracking Token: " + token;

    document.getElementById("description").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}

function trackComplaint() {

    let token = document.getElementById("token").value.trim();

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let complaint = complaints.find(c => c.token === token);

    if (complaint) {
        document.getElementById("status").innerHTML =
            "Complaint Found!<br>" +
            "Category: " + complaint.category + "<br>" +
            "Status: " + complaint.status;
    }
    else {
        document.getElementById("status").innerHTML =
            "Invalid Token! Complaint Not Found.";
    }
}