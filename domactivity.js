/* add your code here */
//Logan Pinel
//DOM-Activity-002
//09-17-26

//DOM Content Loader
document.addEventListener("DOMContentLoaded", function () {
    //parse the json file for the paintings
    const paintings = JSON.parse(content);

    //get html elements and store them as variables
    const list        = document.querySelector("#paintings ul");
    const figure      = document.querySelector("#details figure");
    const titleEl     = document.querySelector("#title");
    const artistEl    = document.querySelector("#artist");
    const descriptionEl = document.querySelector("#description");

    //populate the list of paintings
    paintings.forEach(painting => {
        //create the html elements
        const li = document.createElement("li");
        const img = document.createElement("img");

        //get the images setup from the json file
        img.src = `images/small/${painting.id}.jpg`;
        img.alt = painting.title;
        //setup the image id so click event can know which painting was selected
        img.dataset.id = painting.id;

        //append the html elements to dom
        li.appendChild(img);
        list.appendChild(li);
    });
});
