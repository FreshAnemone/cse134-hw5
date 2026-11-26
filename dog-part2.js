
class randomDogGenerator extends HTMLElement {

    constructor() {
        super();
        this.STATUS = {
            idle: "",
            loading: "Fetching a dog...",
            loaded: "Dog Loaded",
            error: "Couldn't load a dog. Press Generate to try again.",
        };

        this.shown = new Set();
    }

    static observedAttributes = ["compact"];

    attributeChangedCallback() {
        if (this.hasAttribute("compact")) {
            this.dogImage.style.display = "none";   
        } else {
            this.dogImage.style.display = "";      
        }
    }


    connectedCallback() {

        this.build();

        console.log("random dog generator element added to page");
    }


    build(){

        // header 
        const header = document.createElement("header");
        // main 
        const main = document.createElement("main");
        // footer
        const footer = document.createElement("footer");

        this.appendChild(header); // header added
        this.appendChild(main);   // main added
        this.appendChild(footer)  // footer added

        // heading
        const heading = document.createElement("h3");
        heading.textContent = "Suprise me with a dog!";

        // status
        this.status = document.createElement("p");
        this.status.setAttribute("role", "status");

        // button
        this.button = document.createElement("button");
        // button.id = "generate-button"
        this.button.type = "submit";
        this.button.textContent = "Generate";
    

        header.appendChild(heading);     // heading added to header 
        header.appendChild(this.button); // button added to header
        header.appendChild(this.status); // status added to header


        // dog name
        this.dogName = document.createElement("h4");

        // dog image
        // const dogImage = document.createElement("picture");
        this.dogImage = document.createElement("img");
        this.dogImage.alt = "Placeholder dog"
        this.dogImage.src = "assets/dog.gif";
        // dogImage.width = 100;

        main.appendChild(this.dogName);  // dog name added to main
        main.appendChild(this.dogImage); // dog image added to main
      

        // dog history (details)
        const dogHistory = document.createElement("details");
        
        // history heading (summary)
        const historySummary = document.createElement("summary");

        // history heading (h4)
        const historyHeading = document.createElement("h4");
        historyHeading.textContent = "Dog History";

        // history list (ul)
        this.historyList = document.createElement("ul");
            

        footer.appendChild(dogHistory); // details added to footer    
        dogHistory.appendChild(historySummary); // summary added to details
        historySummary.appendChild(historyHeading); // h4 added to summary
        dogHistory.appendChild(this.historyList); // ul added to details

        this.button.addEventListener("click", this.generate.bind(this));

        this.dogImage.addEventListener("error", () => {
            this.status.textContent = this.STATUS.error;
            this.status.className = "error";
        });


        // reset button (far right of the footer, next to the history dropdown)
        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        footer.appendChild(resetButton);
        resetButton.addEventListener("click", this.reset.bind(this));
        
        // restore the history list from local storage
        const saved = JSON.parse(localStorage.getItem("dogHistory")) || {};
        for (const name in saved) {
            this.addToHistory(name);
        }

        // restore the dog that was on screen
        const current = localStorage.getItem("currentDog");
        if (saved[current]) {
            this.showDog(current, saved[current]);
        }
    }

    async generate(){
        let data = "";

        // loading
        this.status.textContent = this.STATUS.loading;
        this.status.className = "loading";

        // disable generate button while loading
        this.button.disabled = true;

        // Run these steps in order. If one throws an error, jump to catch.
        try {
        
            // Send a GET request for the random dog
            // Wait for the server to return a response before continuing.
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            
            // Even an HTTP error such as 404 returns a response. Check its status.
            if (!response.ok) {
                
                // Stop here and pass the status code to the catch block.
                throw new Error(`HTTP status ${response.status}`);
            }

            // Read the response body and parse the JSON into a JavaScript value.
            data = await response.json();

            
            // Check that message contains text. The ?. lets us check safely
            // even if the parsed response is null.
            if (typeof data?.message !== "string") {
                
                // Send an unexpected response to the same error handler.
                throw new Error("Expected a message in the response.");
            }

            // The message is going into an img src, so it must be an HTTPS URL.
            // new URL() throws if the text isn't a valid URL at all.
            if (new URL(data.message).protocol !== "https:") {
                throw new Error("Expected an HTTPS image URL.");
            }
            
            // The response passed both checks. Show the message in the Console.
            console.log(data.message);

        } catch (error) {
            
            // Report the failure and its cause, such as a network error or invalid JSON.
            console.error("Could not load the message.", error);

            this.status.textContent = this.STATUS.error;
            this.status.className = "error";

            return;

        } finally {
 
            // runs after success or failure, so the button always comes back
            this.button.disabled = false;
        }

        // get the image from the data response
        const image = data.message;
        
        // get the  dog breed from the data response
        const breed = image.split("/")[4];
        
        if (!breed) {
            throw new Error("Couldn't find a breed name in the image URL.");
        }
        
        // make the dog entry and capitalize the first letter
        const dog = { name: breed.charAt(0).toUpperCase() + breed.slice(1), image: image };


        // save to local storage
        const saved = JSON.parse(localStorage.getItem("dogHistory")) || {};
        saved[dog.name] = dog.image;
        localStorage.setItem("dogHistory", JSON.stringify(saved));

        // display the status, dog name, and dog image
        this.showDog(dog.name, dog.image);

        // add the dog to the history list
        this.addToHistory(dog.name);
        
    }

    showDog(name, image){
        this.dogName.textContent = name;
        this.dogImage.src = image;
        this.dogImage.alt = "Photo of a " + name + " dog";
        this.status.textContent = name + " loaded";
        this.status.className = "";
        localStorage.setItem("currentDog", name); // so a refresh shows the same dog
    }

    loadFromHistory(event){

        const name = event.target.textContent;
        const saved = JSON.parse(localStorage.getItem("dogHistory"));

        this.showDog(name, saved[name]);

    }

    addToHistory(name){
        // if the dog does not exist in the show set
        if (this.shown.has(name)){
            return;
        } 

        this.shown.add(name);
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = name;
        button.addEventListener("click", this.loadFromHistory.bind(this));
        li.appendChild(button);
        this.historyList.appendChild(li);
    }

    reset(){

        localStorage.removeItem("dogHistory");
        localStorage.removeItem("currentDog");

        this.shown.clear();

        this.historyList.replaceChildren();

        this.dogName.textContent = "";
        this.dogImage.src = "assets/dog.gif";
        this.dogImage.alt = "Placeholder dog";
        this.status.textContent = this.STATUS.idle;
        this.status.className = "";
    }


    
}


customElements.define("random-dog-generator", randomDogGenerator);



const dogGenerator = document.querySelector("random-dog-generator");
const collapseButton = document.querySelector(".section-header button");



const MODE_KEY = "hw5-dog-generator-mode";
const MODES = ["expanded", "compact"];  
const DEFAULT_MODE = "expanded";

function loadMode() {
    try {
        const saved = localStorage.getItem(MODE_KEY);

        // missing or unrecognized
        return MODES.includes(saved) ? saved : DEFAULT_MODE; 

    } catch (error) {

        console.error("Could not read the saved mode.", error);
        return DEFAULT_MODE;
    }
}

function saveMode(mode) {
    try {
        localStorage.setItem(MODE_KEY, mode);

    } catch (error) {

        // the choice is already applied; it just won't be remembered
        console.error("Could not save the mode.", error);

    }
}

// the one place that applies a mode (used by the button and on page load)
function setMode(mode) {
    dogGenerator.toggleAttribute("compact", mode === "compact");
    collapseButton.textContent = mode === "compact" ? "Expand" : "Collapse";
}



function toggleCompact() {
    const scrollBefore = window.scrollY;

    document.body.style.minHeight = "";

    const mode = dogGenerator.hasAttribute("compact") ? "expanded" : "compact";

    // apply it right away
    setMode(mode);   
    // apply it right away
    saveMode(mode);  

    const shortfall = scrollBefore + window.innerHeight - document.documentElement.scrollHeight;
    if (shortfall > 0) {

        document.body.style.minHeight = (scrollBefore + window.innerHeight) + "px";
        window.scrollTo(0, scrollBefore);
    }
}

collapseButton.addEventListener("click", toggleCompact);
collapseButton.hidden = false;

setMode(loadMode());

