import {createRequire} from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminder = serve(async (context) => {

})