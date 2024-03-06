When a form should be submitted by pressing enter, you need at least one `<input type="submit">` in it. You can hide it using the `hidden` boolean attribute: `<input type="submit" hidden>`.

Extract resources like strings and css classes in a _Resource Object_ and use it consistently across your code. This avoids typos and makes it easier to change resource names later. You also get code suggestions in your IDE.

Provide variables for static UI controls in your page instead of querying these controls repeatingly. It increases performance and makes the code easier to read.

For event handlers use a name of the format `onEvent` where _Event_ describes the event. Use prefixes and suffixes like `before` and `after`, gerundium (`-ing`) and past tense. This helps to understand whether the event can be prevented or not. Example: `onSubmitting`, `onSubmitted`, `onBeforeSubmit`, `onAfterSubmit`.

Sometimes a block's style is a bit dependent of its surrounding block. For example if a block is part of a flex container and should take remaining space. I think it's okay to use a descendant combinator in this case.

# Steps

We use a very simple implementation which is mainly procedural. Presentation logic, business logic and data layer are tightly coupled making testing and reusability of this code harder. We work on raw data directly and don't use any entity classes. The code won't scale well if new features get implemented.

1. Create HTML. Use BEM for class names. Identify blocks, their elements and potential modifiers.
2. Create CSS. Use BEM for class names. Get the Layout right.
3. Create Resource file for CSS classes and other resource strings.
4. Create a data model and implement simple database operations for reading and writing this data model. Use a database module.
5. Create an app module.
6. Create variables for static ui controls.
7. Add event handlers to static ui controls.
8. Define a variable to hold the current page data.
9. Implement the navigateTo method which loads the data from the database and saves the current data if requested. If no data could be loaded use default data.
10. Create a method to create new model records.
11. Create a method to create and append a new item.
12. Implement a synchronize method which updates the controls from the model.

# Todo

- Don't insert multiple self study entries.
- Ensure there are no records for a day when absent.