
// const rottweiler = "https://images.dog.ceo/breeds/rottweiler/n02106550_9348.jpg";
// const rottweilerName = "Rottweiler";
// const shihtzu = "https://images.dog.ceo/breeds/shihtzu/n02086240_5696.jpg";
// const shihtzuName = "Shihtzu";
// const lhasa = "https://images.dog.ceo/breeds/lhasa/n02098413_7916.jpg";
// const lhasaName = "Lhasa";

const dogs = [
    { name: "Rottweiler", image: "https://images.dog.ceo/breeds/rottweiler/n02106550_9348.jpg" },
    { name: "Shihtzu", image: "https://images.dog.ceo/breeds/shihtzu/n02086240_5696.jpg" },
    { name: "Lhasa", image: "https://images.dog.ceo/breeds/lhasa/n02098413_7916.jpg" },
];

class randomDogGenerator extends HTMLElement {

    constructor() {
        super();
        this.STATUS = {
            idle: "",
            loading: "Fetching a dog...",
            loaded: "Dog Loaded",
            error: "Couldn't load a dog",
        };

        this.dogIndex = 0;
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

        // this.button.addEventListener("click", this.generate);
    }

    // sample data
    // {
    // "message": "https://images.dog.ceo/breeds/rottweiler/n02106550_9348.jpg",
    // "status": "success"
    // }


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

        this.status = document.createElement("p");
        // status.textContent = ""
        // status.textContent = "Dog Loaded"


        // button
        const button = document.createElement("button");
        // button.id = "generate-button"
        button.type = "submit";
        button.textContent = "Generate";

        header.appendChild(heading); // heading added to header 
        
        header.appendChild(button);  // button added to header

        header.appendChild(this.status);


        // dog name
        this.dogName = document.createElement("h4");
        // dogName.textContent = "No dog yet";

        // dog image
        // const dogImage = document.createElement("picture");
        this.dogImage = document.createElement("img");
        this.dogImage.textContent = "<dog img>";
        // dogImage.src = shihtzu;
        // dogImage.src = rottweiler;
        this.dogImage.src = "assets/dog.gif";


        // dogImage.width = 100;
    
        main.appendChild(this.dogName);  // dog name added to main
        main.appendChild(this.dogImage); // dog image added to main
      

        // dog history (details)
        const dogHistory = document.createElement("details");
        
        // history heading (summary)
        const historySummary = document.createElement("summary");

        const historyHeading = document.createElement("h4");

        historyHeading.textContent = "Dog History";

        // history list
        this.historyList = document.createElement("ul");
        
    
        // const historyItem = document.createElement("li");
        // const historyItemButton = document.createElement("button");
        // historyItemButton.textContent = "Shihtzu"
                

        footer.appendChild(dogHistory);     
        dogHistory.appendChild(historySummary); 
        historySummary.appendChild(historyHeading);
        dogHistory.appendChild(this.historyList);
        // historyList.appendChild(historyItem);
        // historyItem.appendChild(historyItemButton);

        
        button.addEventListener("click", this.generate.bind(this));

    }

    generate(){
        const dog = dogs[this.dogIndex++ % dogs.length];

        // save to local storage
        const saved = JSON.parse(localStorage.getItem("dogHistory")) || {};
        saved[dog.name] = dog.image;
        localStorage.setItem("dogHistory", JSON.stringify(saved));

        this.status.textContent = dog.name + " loaded";
        this.dogName.textContent = dog.name;
        this.dogImage.src = dog.image;

        if (!this.shown.has(dog.name)) {

            this.shown.add(dog.name);
            const generatedDogLI = document.createElement("li");
            const generatedDog = document.createElement("button");
            generatedDog.textContent = dog.name;
            generatedDog.addEventListener("click", this.loadFromHistory.bind(this));
            generatedDogLI.appendChild(generatedDog);
            this.historyList.appendChild(generatedDogLI);
        }
    }

    loadFromHistory(event){
        const name = event.target.textContent;
        const saved = JSON.parse(localStorage.getItem("dogHistory"));
        this.dogName.textContent = name;
        this.dogImage.src = saved[name];
        this.status.textContent = name + " loaded";
    }


    
}


customElements.define("random-dog-generator", randomDogGenerator);



const dogGenerator = document.querySelector("random-dog-generator");
const collapseButton = document.querySelector(".section-header button");

function toggleCompact() {
    const compact = dogGenerator.toggleAttribute("compact");
    collapseButton.textContent = compact ? "Expand" : "Collapse";
}

collapseButton.addEventListener("click", toggleCompact);