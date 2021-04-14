export const MaxSize = 30;           // Max number of nodes
export const NormalNodeSize = 10;    // Normal node size
export const EnlargedNodeSize = 13;  // Size of node when hovered over

export const bodies = [
    ['Introduction', `<p>Have you ever looked up at a skyscraper and wondered how anyone could possibly organize the resources and materials to build something that touches the clouds? Your wonder is not misplaced, and the answer is much simpler than you would imagine. Touching the clouds was made possible not by massive cranes, diesel fuel, steel framing or any other recent development, but by effective communication. Effective communication is the most important tool in a construction team’s arsenal. The way a firm constructs its communication network is the driving factor behind the ease in which structures are erected. Architects, Engineers, Managers, Owners, and all other stakeholders need to find a delicate balance between an overloaded email inbox and information slipping through the cracks.</p>
    <p>We at the Construction Management Program at Michigan State University have developed a game in order to demonstrate what productive communication looks like within a construction team using data we have gathered over years from projects on campus. You will be tasked with building your own communication network using a matrix of stakeholders, choosing who communicates to who and the frequency of interactions. The goal of this game will be to earn 3 stars in each of three levels, which will increase in difficulty as you progress. Stars will be earned based on the degree to which you meet the algorithmic model of communication we derived from actual construction projects.</p>
    <p>While navigating the game, keep in mind the roles of each stakeholder. Architects are responsible for the design of the building and structure both aesthetically and functionally. Engineers are responsible for ensuring the building meets building code standards, along with doing all of the calculations that prove the building is safe for occupancy. Construction managers are the bridge between the field and the office, facilitating communication, tracking financial information and fact checking every document to safeguard from any mistakes. Owners are the financers of the project, and the party that makes final decisions, but are usually not involved with the day to day operations. It is important to make sure not to overload owners with inapplicable information, but equally important to double-check that relevant information crosses their desk in a timely manner. The owner to construction manager relationship and the owner to architect/engineer relationships are the most difficult and important to optimize.</p>
    <p>Good luck with your journey through the world of communication in the built environment and keep in mind all of the relationships and their roles when selecting direction and frequency of communication.</p>`],

    ['Pre-survey', '<iframe width="640px" height= "480px" src= "https://forms.office.com/Pages/ResponsePage.aspx?id=MHEXIi9k2UGSEXQjetVoff2jcQ8yxdhOssU2XZZ-NH1UNDBVSjVYSU5aU0pVNVo2Q1MxMFc3MldTVy4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>'],

    ['Graph', `
<div>
    <p>
        Enter a size between 2 and ${MaxSize} to create a matrix and a graph.<br>
        Then enter a number between 0 and 1 in any entry of the matrix to update the graph.
    </p>
</div>
<div id="size-form" width="100px">
  <form>
    <p>
      <label for="size-entry" style="color: white">Size: </label>
      <input type="text" id="size-entry" size="3">
      <span id="size-error" style="color: red;"></span>
    </p>
    <input type="submit" id="size-submit" value="Create Graph">
  </form>
</div>
<div id="matrix-space" class="flex">
  <div id="matrix"></div>
</div>
<div id="graph-space" class="flex"></div>`
  ],

  ['Post-survey', '<iframe width="640px" height= "480px" src= "https://forms.office.com/Pages/ResponsePage.aspx?id=MHEXIi9k2UGSEXQjetVoff2jcQ8yxdhOssU2XZZ-NH1UQ1o5V1QySFVDQ1M2RUUzQ01aVzJFUUJIUS4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>']
];