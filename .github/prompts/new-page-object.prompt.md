---
mode: "agent"
---

# Generate a New Page Object

Create a new Playwright Page Object class for the page at: ${input:pageUrl}
Page name: ${input:pageName} (e.g., "HomePage", "VenueDetailPage")

Requirements:
- Extend `BasePage` from `./BasePage`
- Identify all key interactive elements on the page (buttons, inputs, links, headings)
- Define locators as `private readonly` properties using `data-testid` first, then ARIA roles
- Implement navigation method (`navigate()`) using the correct path
- Implement action methods for each user interaction
- Implement getter methods for assertions
- Follow the POM structure in `.github/instructions/page-objects.instructions.md`
- Save the file to `pages/${input:pageName}Page.ts`
