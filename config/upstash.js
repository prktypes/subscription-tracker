//this file is for configuring upstash client and exporting it to be used 
//in other files which will interact with upstash workflow

import { Client as WorkflowClient } from "@upstash/workflow";
import { QSTASH_URL, QSTASH_TOKEN } from "./env";

export const workflowClient = new WorkflowClient({
    url: QSTASH_URL,
    token: QSTASH_TOKEN
})