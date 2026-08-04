import { expect, Locator, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export const downloadFile = async (page: Page, downloadBtnLocator: Locator) => {
  //create a path of download folder via path joining of current project folder
  const downloadDir = path.join(process.cwd(), "downloads");

  //check existence of download folder
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  //create download promise before clicking download button
  const downloadPromise = page.waitForEvent("download");
  await downloadBtnLocator.click();

  //resolve download promise
  const downloadedFile = await downloadPromise;

  //name downloaded file with default suggested name by browser and define filePath
  const fileName = downloadedFile.suggestedFilename();
  const customName = `${Date.now()}_${fileName}`;
  const filePath = path.join(downloadDir, customName);

  //save file to project
  await downloadedFile.saveAs(filePath);

  return { downloadedFile, filePath, customName };
};

export const verifyDownloadedFile = async (
  download: Awaited<ReturnType<typeof downloadFile>>,
) => {
  const failureReason = await download.downloadedFile.failure();
  expect(
    failureReason,
    `File download failed due to ${failureReason}`,
  ).toBeNull();

  const isFileExists = fs.existsSync(download.filePath);
  expect(isFileExists, `File not found at ${download.filePath}`).toBeTruthy();

  const fileSize = fs.statSync(download.filePath).size;
  expect(fileSize, "File size is 0 bytes").toBeGreaterThan(0);
};

export const deleteDownloadedFileAfterRun = (
  download: Awaited<ReturnType<typeof downloadFile>>,
) => {
  const isFileExists = fs.existsSync(download.filePath);
  if (isFileExists === true) {
    fs.unlinkSync(download.filePath);
  }
  const isFileStillPresent = fs.existsSync(download.filePath); 

  expect(isFileStillPresent, `File still exists at ${download.filePath}`).toBeFalsy();
};
