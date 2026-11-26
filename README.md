# cse134-hw5

## Part 4: SSG Exercise

The static site generator exercise (Eleventy) is in the `ssg-exercise/` folder.

Pages to preview:

- `ssg-exercise/index.html` (Home), built to `_site/index.html`
- `ssg-exercise/about.html` (About), built to `_site/about.html`

Both pages share one footer, which is in `ssg-exercise/_includes/footer.njk`.

Install, build and preview commands are in `ssg-exercise/README.md`.



## Tracing using the web component

### Goal: Generate dog image and test web comonent features.


1. Inside the site root at /index.html, croll down to the Random Dog Generator section.
   
2. Click the generate button. You should see the status message update and say "Fetching a dog ...", and then you will see the component update with the loaded status and the dog breed name and dog image displayed. 
   
3. Click the "Collapse" button. You will see the web component get smaller while still displaying the status and dog breed name. 
4. CLick the Dog history expand button. You should be able to see a history of all the dogs you generated. 
5. Click the "Expand" button again to make the web component bigger. 
6. Click "Generate" if there is only one dog in the dog history. 
7. Click on a dog inside of the dog history and that dog will load from local storage. 
8. Click on the "dark theme" button at the bottom right of the page. You will see the page change to dark mode. You can repeat these steps if you want to see the component work with a different theme. 
9. Refresh the page in both a different theme and in Collapsed and Expanded mode to see that the changes persist via the local storage.
10. Cick the reset button. THe dog history from local storage is deleted and the component is back to the original state. 