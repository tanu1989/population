import React from 'react';
import {Well} from 'react-bootstrap';

class About extends React.Component {
    render(){


        return (
            <div style={{alignContent:'center'}}>
                <h2 style={{textAlign: 'center'}}>Problem Statement</h2>
                <Well style={{margin: '10% 20%',marginTop:'12px', paddingLeft: '10%', paddingRight: '10%', fontSize: '15px'}}>
                    <div>Use React, any other libraries you'd like (i.e. Redux), and the API at
                        <a href="http://api.population.io/" target="_blank"> http://api.population.io/ </a>
                        to build a React application whose purpose is to give statistics on the world population. The application should be similar to the one outlined in the attached mockups.
                    </div>
                    <hr/>
                    <h5>The application will be broken down into three parts:</h5>
                    <div>1) World and USA Population
                        When the page first loads, hit the API, and show the World population and USA population as of the current date.
                    </div>
                    <br/>
                    <div>2) Countries with the short names and their populations
                    When the user clicks the 'Fetch' button in this section, the application will hit the API, get all the country names, choose the countries tied for the shortest name (ie Cuba) and display them as React components. When the user clicks on any of these country widgets, use the API to find the overall, male, and female population of current (ie as of 2017) 18 year olds and display within the country component.
                    </div>
                    <br/>
                    <div>
                    You should also keep track of and display on the page:
                    a)The number of countries being displayed
                    b)The total population of those countries which the user has clicked on to obtain their individual populations
                    </div>
                    <br/>
                    <div>
                    3) Let a user check their ranking
                    Provide a place for users to enter their date of birth and gender. When they submit this information, please render a React component showing their rank within the world.
                    </div>
                </Well>
            </div>
        )
    }
}

export default About;