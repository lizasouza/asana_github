# GITHUB-ASANA INTEGRATION
## DESCRIPTION
In this project you will be to integrate Github and Asana, specifically when a Github Issue is create a corresponding task will be created in Asana for the issue.

## SOFTWARES USED
1. Github
2. Asana
3. Jenkins
- Aditional to these, NGROK is also used.

## SETUP
### 1. GITHUB
1. Create a Public Repository.
2. Generate a Personal Access Token and store it somewhere safe.
   - The link for it is here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic
### 2. Jenkins
1. Install Jenkins on your PC.
   - Link: https://www.jenkins.io/download/
2. After setting up Jenkins
   - Open Jenkins console via http://localhost:8080/
   - Set UserName and PassWord
   - On the left side, click Manage Jenkins the select Plugins.
   - In Plugins, go to Available Plugins and install these two plugins
     - Generic Webhook Trigger Plugin Version2.2.2
     - NodeJS Plugin Version1.6.2
### 3. ASANA
1. Install Asana App.
2. Create an Account.
3. Go to Developer page via this link https://developers.asana.com/docs/manage-and-share-your-app after opening the link click on developer console and that should open.
4. Generate PAT for yourself and store it somewhere safe.
### 4. Other Important Installations and Versions
1. Install Node.js 22.7.0
   - Use Link and select the correct version : https://nodejs.org/en/download/package-manager
2. Install NGROK
   - Use Link https://ngrok.com/download
   - After running all 4 commands on CMD, make note of the URL which is for forwarding
   - Example : Forwarding                    https://41e7-103-178-207-40.ngrok-free.app -> http://localhost:8080
     - Here for example : https://41e7-103-178-207-40.ngrok-free.app is our local server link.
3. Install npm version 10.8.2
   
## STEPS
### 1. Setting up Jenkins.
* Open Jenkins on your browser via http://localhost:8080/
* Select New Item from left side section
* Enter Item name as per your wish and select Free Style Project. Then click OK.
* Under SOURCE CODE MANAGEMENT select Git.
  - Enter the Github Repository link which will used in the project.
  - In Branch select the branch which will be used as for me it will me /main.
* Under Build Triggers choose Generic Webhook Trigger
  - For token, create a random token eg. abc123
* Under Build Steps
  - Add Execute Windows Batch Command open .
  - Add all these commands one by one and save and run the project 3 times by using build now.
  - npm i @octokit/rest
  - npm install asana --save
  - npm i @octokit/core
* Once all these commands are executed, the final command for all your projects will be
  - node integration.js
    
