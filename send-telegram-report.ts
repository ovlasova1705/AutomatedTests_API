import fs from "fs";
import axios from "axios";
import path from "path";

const resultsDir = "./allure-results";

async function sendTelegramNotification() {
  const reportFiles = fs
    .readdirSync(resultsDir)
    .filter((file) => file.endsWith("-result.json"));
  const totalScenarios = reportFiles.length;
  let totalPassed = 0;
  let totalFailed = 0;
  let totalDuration = 0;

  let testNames = [];

  for (const file of reportFiles) {
    const filePath = path.join(resultsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    totalDuration += content.stop - content.start;

    testNames.push({
      name: content.name,
      status: content.status,
    });

    if (content.status === "passed") {
      totalPassed += 1;
    } else if (content.status === "failed") {
      totalFailed += 1;
    }
  }

  const durationInSeconds = (totalDuration / 1000).toFixed(2);
  const passedPercentage = ((totalPassed / totalScenarios) * 100).toFixed(2);

  const successMessage = fs.existsSync("success_message.txt")
    ? fs.readFileSync("success_message.txt", "utf-8")
    : "";
  const failureMessage = fs.existsSync("failure_message.txt")
    ? fs.readFileSync("failure_message.txt", "utf-8")
    : "";
  const messagePrefix = successMessage || failureMessage;

  const testDetails = testNames
    .map(
      (test) =>
        `- *${test.name}*: ${
          test.status === "passed" ? "✅ Passed" : "❌ Failed"
        }`
    )
    .join("\n");

  const message = `
    ${messagePrefix}
    📝 *Test Report*:
    - Total scenarios: ${totalScenarios}
    - Passed: ${totalPassed} (${passedPercentage}%)
    - Failed: ${totalFailed}
    - Duration: ${durationInSeconds} seconds
     ${testDetails}

    [View Full Report](https://ovlasova1705.github.io/AutomatedTests_API/)
  `;

  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }
  );
}

sendTelegramNotification().catch(console.error);
