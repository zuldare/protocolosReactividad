let eoloPlantId = null;

function getEoloPlants() {
    fetch("/api/eoloplants/", { method: "GET", headers: { "Content-Type": "application/json" }})
        .then(res => res.json())
        .then(fillEoloPlantsLists)
        .catch(e => console.log(e));
}

function fillEoloPlantsLists(eoloPlants) {
    fillInProgress(eoloPlants.filter(eoloPlant => !eoloPlant.completed));
    fillCompleted(eoloPlants.filter(eoloPlant => eoloPlant.completed));
}

function fillInProgress(inProgressEoloPlants) {
    document.getElementById("inProgressEoloPlants").innerHTML = '<h1>In progress</h1>';
    if (inProgressEoloPlants.length === 0) {
        document.getElementById("inProgressEoloPlants").innerHTML += '<p>No eolo plants in progress</p>';
    } else {
        let list = createList("inProgressEoloPlants", "inProgressEoloPlantsList");
        inProgressEoloPlants.forEach(eoloPlant => { addElementToList(list, eoloPlant.id, eoloPlant.city + ": " + eoloPlant.progress + "%"); });
    }
}

function fillCompleted(completedEoloPlants) {
    document.getElementById("eoloPlants").innerHTML = '<h1>Completed eolo plants</h1>';
    if (completedEoloPlants.length === 0) {
        document.getElementById("eoloPlants").innerHTML += '<p>No eolo plants created</p>';
    } else {
        let list = createList("eoloPlants", "eoloPlantsList");
        completedEoloPlants.forEach(eoloPlant => { addElementToList(list, eoloPlant.id, eoloPlant.city + ": " + eoloPlant.planning); });
    }
}

function createList(divId, listId) {
    const list = document.createElement("ul");
    list.setAttribute("id", listId);
    document.getElementById(divId).appendChild(list);
    return list;
}

function addElementToList(list, id, text) {
    let node = document.createElement("li");
    node.setAttribute("id", list.id + "-" + id)
    let textNode = document.createTextNode(text);
    node.appendChild(textNode);
    list.appendChild(node);
}

window.onload = getEoloPlants();

function addEoloPlant(e) {
    e.preventDefault();
    document.getElementById("addEoloPlantButton").disabled = true;
    const city = document.querySelector("#city").value;

    fetch("/api/eoloplants/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "clientId": clientId
        },
        body: JSON.stringify({
            "city": city
        })
    }).then(res => {
        if (!res.ok) {
            if (res.status == 409) {
                alert("Plant already exists");
            } else {
                alert("An error has occurred");
            }
            document.getElementById("addEoloPlantButton").disabled = false;
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
        .then(addEoloPlantResponse => {
            eoloPlantId = addEoloPlantResponse.id;
            fillEoloPlantProgress(addEoloPlantResponse);
        }).catch(err => console.log(err));
}

function fillEoloPlantProgress(eoloPlantProgressResponse) {
    let list = document.getElementById("inProgressEoloPlantsList");
    if (!list) {
        notInProgressParagraph = document.getElementById("inProgressEoloPlants").getElementsByTagName("p");
        if (notInProgressParagraph.length > 0) {
            notInProgressParagraph[0].remove;
        }
        list = createList("inProgressEoloPlants", "inProgressEoloPlantsList");
    }
    eoloPlantInProgress = document.getElementById("inProgressEoloPlantsList-" + eoloPlantProgressResponse.id);
    if (!eoloPlantInProgress) {
        addElementToList(list, eoloPlantProgressResponse.id, eoloPlantProgressResponse.city + ": " + eoloPlantProgressResponse.progress + "%");
    } else {
        eoloPlantInProgress.innerHTML = "<li>" + eoloPlantProgressResponse.city + ": " + eoloPlantProgressResponse.progress + "%</li>";
    }
}

document.addEventListener("submit", addEoloPlant);