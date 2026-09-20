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

    //click event
    list.addEventListener("click", event => {
        //if the target is not an img, return
        if (event.target.tagName !== "IMG") {
            return;
        }
        //find the painting that was clicked by its dataset id
        const painting = paintings.find(p => p.id === event.target.dataset.id);
        if (!painting) {
            return;
        }
        //show the large painting
        showPainting(painting);
    });

    //showPainting function
    function showPainting(painting) {
        //clear the figure
        figure.innerHTML = "";

        const full = document.createElement("img");
        //set the id to full
        full.id = "full";
        //set the src to the large image
        full.src = `images/large/${painting.id}.jpg`;
        //set the alt to the title
        full.alt = painting.title;
        figure.appendChild(full);

        //set the title
        titleEl.textContent = painting.title;
        //set the artist
        artistEl.textContent = painting.artist;

        //loop through the features of each painting
        painting.features.forEach(feature => {
            //get the upper left and lower right coordinates of the feature
            const [left, top] = feature.upperLeft;
            const [right, bottom] = feature.lowerRight;

            //create the box
            const box = document.createElement("div");
            //set the class to box
            box.className = "box";
            //set the position to absolute
            box.style.position = "absolute";
            //set the position coordinates of the feature box
            box.style.left = left + "px";
            box.style.top = top + "px";
            box.style.width = (right - left) + "px";
            box.style.height = (bottom - top) + "px";

            //add a mouseover event to the box to show the description
            box.addEventListener("mouseover", () => {
                descriptionEl.textContent = feature.description;
            });

            //add a mouseout event to the box to clear the description
            box.addEventListener("mouseout", () => {
                descriptionEl.textContent = "";
            });
            //append the box to the figure
            figure.appendChild(box);
        });
    }
});
