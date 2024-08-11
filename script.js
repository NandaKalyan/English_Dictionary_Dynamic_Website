const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
examples = wrapper.querySelector(".example span"),
removeIcon = wrapper.querySelector(".search span");
let audio;

function data(result, word){
    // console.log(result)
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, search for another word.`;
    }else{
        wrapper.classList.add("active");
        console.log(result)
        let definitions = result[0].meanings[0].definitions[0];
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        // document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);
//         // console.log(audio);

        if(definitions.example == undefined)
        {
            examples.parentElement.style.display = "none";
            document.querySelector(".wrapper ul li.example").style.borderBottom = "none";
        }else{
            examples.parentElement.style.display = "block";
            document.querySelector(".example span").innerText = definitions.example;
            document.querySelector(".wrapper ul li.example").style.borderBottom = "1px solid #D9D9D9";
        }

        if(definitions.synonyms[0] == undefined || definitions.example == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 2; i++) {
                let tag = `<span>${definitions.synonyms[i]},</span>`;
                // tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}

function search(word){
    searchInput.value = word;
    fetchApi(word);
    wrapper.classList.remove("active");
}

function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>..`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
    // .catch(() =>{
        // infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    // });
}

searchInput.addEventListener("keyup", e =>{
    // let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key === "Enter" && e.target.value){
        // console.log(e.target.value)
        fetchApi(e.target.value);
    }
});

volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 900);
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active"); 
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});