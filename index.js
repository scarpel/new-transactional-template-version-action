const core = require('@actions/core');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

try {
  const htmlFilePath = core.getInput('html-file-path');
  const name = core.getInput('name');
  const subject = core.getInput('subject');
  const apiKey = core.getInput('api-key');
  const active = core.getInput('active');
  let template_id = core.getInput('template_id');

  const html = fs.readFileSync(htmlFilePath, { encoding: 'utf-8', flag: 'r' });

  if (!template_id) {
    const lookupTablePath = core.getInput('lookup-table-file-path');
    if (lookupTablePath) {
      const filename = path.basename(htmlFilePath).split('.')[0];
      const lookupTable = JSON.parse(
        fs.readFileSync(lookupTablePath, { flag: 'r' })
      );
      template_id = lookupTable[filename];
    } else {
      core.setFailed(
        'Neither template_id nor lookup-table-file-path were informed!'
      );
    }
  }

  axios
    .post(
      `https://api.sendgrid.com/v3/templates/${template_id}/versions`,
      {
        name,
        subject,
        active: parseInt(active),
        html_content: html,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    .then(() => {
      console.log(
        `New transactional template version was added to template ${template_id}`
      );
      core.setOutput('status', 200);
    })
    .catch((err) => {
      console.error(err);
      core.setFailed('Something went wrong!', err);
    });
} catch (err) {
  core.setFailed('Something went wrong!', err);
}
