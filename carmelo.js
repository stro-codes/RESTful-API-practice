var url = "https://www.basketball-reference.com/players/a/anthoca01.html";

const cheerio = require('cheerio');
const axios = require('axios');

// make a request to get html data from a url using axios 
axios.get(url)
    // receive a response
    .then( response => {
        // log response data into console
        console.log(response.data);
        // function to scrape specific data(basketball stats) from the html using cheerio
        let getData = html => {
            data = [];
            const $ = cheerio.load(html);
            // loop through each year of stats for a player, year of play is a row in a table which is our root
            $('tbody tr').each( (i, elem) => {
                // parameters for the keys/values for each JSON object (requested stats for a basketabll player)
                var year, age, pos, team_id, lg_id, g, mp_per_g, fg_pct;
                
                year = $(elem).find('th.left a').text();

                // loop through each column, scrape specfic stats from each
                // center
                $(elem).find('td.center').each( (j, center) => {
                    if( $(center).data('stat') == 'age' )
                        age = $(center).html();
                    else if( $(center).data('stat') == 'pos' )
                        pos = $(center).html();
                });
                // left
                $(elem).find('td.left').each( (j, left) => {
                    if( $(left).data('stat') == 'team_id')
                        team_id = $(left).text();
                    if( $(left).data('stat') == 'lg_id')
                        lg_id = $(left).find('a').html();
                });
                // right
                $(elem).find('td.right').each( (j, right) => {
                    if( $(right).data('stat') == 'g')
                        g = $(right).html();
                    if( $(right).data('stat') == 'mp_per_g')
                        mp_per_g = $(right).text();
                    if( $(right).data('stat') == 'fg_per_g')
                        fg_per_g = $(right).html();
                    if( $(right).data('stat') == 'fga_per_g')
                        fga_per_g = $(right).html();
                    if( $(right).data('stat') == 'fg_pct')
                        fg_pct = $(right).html();
                });
                // push json object with a basketball players yearly averagess in array
                data.push({
                    year: year,
                    age: age,
                    pos: pos,
                    team_id: team_id,
                    lg_id: lg_id,
                    g: g,
                    mp_per_g: mp_per_g,
                    fg_per_g: fg_per_g,
                    fga_per_g: fga_per_g,
                    fg_pct: fg_pct
                    
                });

            });
            // log yearly averages into the console
            console.log(data);
        };
        // run data scraping function
        getData(response.data);
    })
    // catch errors
    .catch( error => {
        console.log(error);
    });

