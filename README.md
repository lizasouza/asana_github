# GITHUB-ASANA INTEGRATION
## DESCRIPTION
In this project we will see how to integrate Github and Asana, specifically when a Github issue is created a corresponding task will be created in Asana for the issue.

## SOFTWARES USED
1. Github
2. Asana
3. Jenkins
- Additional to these, NGROK is also used.

## SETUP
### 1. GITHUB
1. Create a Public Repository.
2. Generate a Personal Access Token for your Account and store it somewhere safe.
   - For steps, the link for it is here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic
### 2. Jenkins
1. Install Jenkins on your PC.
   - Link: https://www.jenkins.io/download/
2. After setting up Jenkins
   - Open Jenkins console via http://localhost:8080/
   - Set UserName and PassWord
   - On the left side, click **Manage Jenkins** the select **Plugins**.
   - In Plugins, go to **Available Plugins** and install these two plugins
     - Generic Webhook Trigger Plugin Version2.2.2
     - NodeJS Plugin Version1.6.2
3. Needed security settings for Generic Webhook Trigger.
   - Go to **Manage Jenkins** and then **Settings**.
   - Scroll down to **Generic Webhook Trigger Whitelist**
   - Click Add, tick **Verify with HMAC** . Leave the IP, CIDR or IP range empty.
   - Under HMAC Header write: x-hub-signature-256
   - For HMAC Secret, click **Add** and then select **Jenkins**.
   - Under Kind choose Secret Text and create a Secret ID. Please make note of this Secret ID we will use this in Github Webhook Setting.
### 3. ASANA
1. Install Asana App.
2. Create an Account.
3. Go to Developer page via this link https://developers.asana.com/docs/manage-and-share-your-app after opening this link click on developer console and that should open Asana App Developer Console.
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
1. Open Jenkins on your browser via http://localhost:8080/
2. Select **New Item** from left side section
3. Enter Item name as per your wish and select **Free Style Project**. Then click **OK**.
4. Under **Source Code Management** select **Git**.
   - Enter the Github Repository link which will used in the project.
   - In Branch select the branch which will be used as for me it will me /main.
5. Under **Build Triggers** choose Generic Webhook Trigger
   - For token, create a random token eg. abc123
6. Under **Build Steps**
   - Add Execute Windows Batch Command open 3 tabs for it, Add all these commands one in one tab and save and run the project by using build now.
   - npm i @octokit/rest
   - npm install asana --save
   - npm i @octokit/core
7. Now you delete all the above three tabs and create a new tab of **Execute Windows Batch Command**, the final command for all your projects will be
   - node integration.js
### 2. Setting up Github Webhook
1. Open the Public Repository which you will be using, go to **Settings** and then select **Webhooks** from left side list.
2. Select **Add Webhook**, for the payload URL
   - You will need the URL generated by NGROK as we had setup in [Other Important Installations and Versions](#4-other-important-installations-and-versions)
   - All will add **/generic-webhook-trigger/invoke** and **token ** which was set up in Generic Webhook Trigger Plugin on Jenkins.
   - The Payload URL will look like:
       - https://41e7-103-178-207-40.ngrok-free.app/generic-webhook-trigger/invoke?token=abc123
       - Please note it will be different for everyone.
   - Content Type set to : **application/JSON**
   - For Secret use the Secret ID created here [Jenkins](#2-jenkins).
   - Choose Let me select individual events and within it select Issues
   - Make sure the Webhook, Active is ticked and Update/Save.
### 3. Setting up the code integration.js
1. Open the file in local and make the changes required according to your Github Repository PAT , Asana PAT and GID and Local URL.
2. Changes are highlighted in the code for convenience.
3. Once all changes are done, save the file as integration.js to this path in your local :  C:\ProgramData\Jenkins\.jenkins\workspace\webhook

### 4. Finally Create an Issue on Github Repository and you will see a task created in Asana.
