import { Sequence } from "../../utils/types";
import { agenda } from "../../config/agenda";
import { ListModel } from "../../models/list";
import { Job } from "agenda";
import { EmailSchemaType } from "../../utils/validation/emailTemplate";
import { injectVariables } from "../../utils/helpers/emailVriableInjector";
import { sendMail } from "./mailService";

export async function scheduleASequence(sequence: Sequence, attempt = 1, maxRetries = 5) {
  try {

    let delay = 0

    sequence.nodes.forEach((node) => {
      if (node.type === "EMAIL") {

      } else {
        delay += node.delayTimeInMilleseconds!
      }
    })

    const lists = await ListModel.find({
      _id: { $in: sequence.leadsList }
    }).populate("listData");

    // making a single list of all lead from different list
    const allLeads = lists
      // @ts-ignore
      .map(list => list.listData.data || [])
      .flat();

    const plainLeads = allLeads.map(leadMap => Object.fromEntries(leadMap));

    console.log("allLeads: ", plainLeads)

    for (const lead of allLeads) {
      let delay = 0;

      for (const node of sequence.nodes) {
        if (node.type === "DELAY") {
          delay += node.delayTimeInMilleseconds!
        }

        console.log("dalay: ", delay)

        if (node.type === "EMAIL" && node.emailTemplate) {
          const jobTime = new Date(sequence.scheduledAt.getTime() + delay);
          console.log("Node: ", node, "jobTime:", jobTime)
          agenda.schedule(jobTime, "send-email", {
            emailTemplate: node.emailTemplate,
            lead
          });
        }
      }
    }

  } catch (error) {
    console.error(`Error scheduling sequence on attempt ${attempt}:`, error);

    if (attempt < maxRetries) {
      setTimeout(() => {
        scheduleASequence(sequence, attempt + 1, maxRetries);
      }, 1000 * attempt);
    } else {
      console.error("Max retry attempts reached. Failed to schedule sequence.");
    }
  }
}



export function initiateAdendaJob() {
  agenda.define("send-email", async (job: Job) => {
    try {
      const { emailTemplate, lead } = job.attrs.data as {
        emailTemplate: EmailSchemaType,
        lead: any
      };



      if (!lead.email && !lead.Email) {
        console.log("Lead data does not contain email")
        return
      }

      const finalTemplateWithMergeTags = injectVariables({
        body: emailTemplate.html!,
        values: lead
      })

      await sendMail({ to: lead?.email || lead?.Email, subject: emailTemplate.subject, html: finalTemplateWithMergeTags })

      // Add your email sending logic here
      console.log("Sending email to:", lead.email);
    } catch (e: any) {
      await job.remove()
      console.log("error:", e.message)
    }
  });
  console.log("agenda jobs initiated")

}

export async function startAgenda() {
  await agenda.start()
  console.log("agenda started")
}
