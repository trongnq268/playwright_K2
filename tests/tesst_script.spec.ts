/// <reference types="node" />

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('test', async ({ page }) => {
  

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.once('dialog', async dialog => {
    // expect(dialog.type());
    // expect(dialog.message())

    await dialog.dismiss();
});

  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  await page.close();


});
test('test1', async ({ page }) => {
  

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

   page.once('dialog', async dialog => {
        expect(dialog.type());
        expect(dialog.message());

        await dialog.dismiss();
    });

  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();


});
test('test2', async ({ page }) => {
  
await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

await page.once('dialog', async dialog => {
    

    await dialog.accept("Nguyen An");
});

await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

});
test('test3', async ({ page }) => {
  
await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

const a = await page.locator('#column-a');
const b = await page.locator('#column-b');

await page.waitForTimeout(2000);

await a.dragTo(b);



});
test('test4', async ({ page }) => {
  
await page.goto('https://the-internet.herokuapp.com/windows');

await page.getByRole('link', { name: 'Click Here' }).click();
const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    
]);
await expect(newPage.getByRole('heading', { name: 'New Window', level: 3 })).toBeVisible();
await newPage.waitForTimeout(2000);
await newPage.close();
await page.close();

});
test('test5', async ({ page }) => {
  
await page.goto('https://the-internet.herokuapp.com/download');

const downloadPromise = page.waitForEvent('download');

await page.getByRole('link', { name: 'Download' }).click();

const download = await downloadPromise;


});