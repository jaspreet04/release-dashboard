import { CodeBuildClient, ListBuildsForProjectCommand } from "@aws-sdk/client-codebuild"; 
export default defineEventHandler(async (event) => {
    const client = new CodeBuildClient({ profile: "admin"} );
    const command = new ListBuildsForProjectCommand({projectName: "onelaunch-app-codebuild-master-v2"});
    const response = await client.send(command);
    console.log(response)
    return {
      response
    }
  })

  