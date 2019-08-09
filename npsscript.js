function displayParkInfo(inpt) {
    console.log(inpt);
    console.log(inpt.data[0].fullName)
    console.log(inpt.data[0].description)
    console.log(inpt.data[0].url)
    console.log(inpt.data[0].addresses)

    console.log(inpt.data.length)
    $('body').html(`
        <button>Search Again</button>

        <div>
            
        </div>
    `)

    for (i=0;i<inpt.data.length;i++){
        
        $('div').append(`
            <ul>
                <li>${inpt.data[i].fullName}</li>
                <li>${inpt.data[i].description}</li>
                <li>${inpt.data[i].url}</li>
            </ul>
            
        `)
    }

    $('body').append(`
        <button>Search Again</button>
    `)
    
    $('button').click(function(e){
        renderLanding();
    })
}

function getParkInfo(state, maxresults) {
//API request
    console.log(state);
    console.log(maxresults);
    const testFetch = `https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=${state}&limit=${maxresults}&fields=addresses%2C%20fullName%2C%20description%2C%20url&api_key=OPcnXqwV45xQURa8zFefB3ObMd57v5Id3jQfA8BP`;
    const realFetch = `https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=${state}&limit=${maxresults}&api_key=OPcnXqwV45xQURa8zFefB3ObMd57v5Id3jQfA8BP`
    fetch(testFetch)
    .then(x => x.json())
    .then(y => displayParkInfo(y))
    .catch(error => alert('Something went wrong. Try again.'));
}

function watchForm() {
    $('form').submit(function(e) {
        e.preventDefault();
        const state = $('.stateinput').val();
        const maximumresults = $('.maxresults').val();
        console.log(state);
        console.log(`Form has been submitted with ${state} and ${maximumresults}`)

        getParkInfo(state, maximumresults);
    });
}


function renderLanding() {
    $('body').html(`
    <div class="container">
        <form action="">
            <h1>Find a National Park</h1>
            <label for="stateinput">Select a state</label>
            <input type="text" name="stateinput" id="" class = "stateinput"></input>

            <label for="maxresults">Max Results</label>
            <input type="text" name="maxresults" id="" class = "maxresults" value="10"></input>
            
            <button type="submit">Show me the parks</button>

        </form>
    </div>
    `)
    watchForm();

}

$(renderLanding);