
import { Octokit } from "@octokit/core";                        //importing library for Octokit for calling Github REST API
import Asana from 'asana';                                      //importing library for asana for calling Asana REST API
const octokit = new Octokit({
  auth: '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'
})                                                             //<Your-Token> Use your Personal Access Token of Github


//Sending GET request to recieve information/payload of all issues existing for the repository
const response = await octokit.request('GET /repos/lizasouza/New_Project/issues?creator', {   //GET /repos/{owner}/{repo}/issues?creator add owner and repo for your github project
    owner: 'lizasouza',       // Change to your repo owner
    repo: 'New_Project',      // Change to your repo name
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
})

const string_data= JSON.stringify(response);
const task_name=response.data[0].title;                         //Extracting Issue Title for task name
const task_gid=response.data[0].url;                            //Extracting the Github Issue URL which will be used for Task GID
const github_desc=response.data[0].body;                        //Extracting the description of the issue
let s1="<body>";
let github_descc=s1.concat(" "+ github_desc+ "</body>");        //As asana expects description within <body> tags, hence concatenated the string
var date=new Date(response.data[0].created_at);                 //As no due date is provided in payload or Github Issue, have set the due date after 
date.setDate(date.getDate() + 3);                               //three days of task creation


let client = Asana.ApiClient.instance;
let token = client.authentications['token'];
token.accessToken = '2/1208127672532675/1208128280472858:7a66d86c798fd23940119d2f060f5d94';    //<Your-Token> Add you own Asana Personal Access Token

let tasksApiInstance = new Asana.TasksApi();
let body = {
    "data": {
        "name": task_name,                                                                    //values mapped according to Github payload
        "approval_status": "pending",
        "assignee_status": "upcoming",
        "completed": false,
        "external": {
            "gid": task_gid,
            "data": 'no comments',
        },
        "due_at":date,
        "html_notes": github_descc ,
        "is_rendered_as_separator": false,
        "liked": true,
        "assignee": "me",                                                            //As no mail-ID or GID available in GitHub response payload, I have assigned it to me
        "projects": ["1208132488022018"],                                            // Add your Project ID of Asana
    },
};
let opts = {};

// POST - REST API for creating a task in Asana
tasksApiInstance.createTask(body, opts).then((result) => {
    console.log('API called successfully. Returned data: ' + JSON.stringify(result.data, null, 2));
}, (error) => {
    console.error(error.response.body);
});

