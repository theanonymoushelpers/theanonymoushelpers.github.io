
# TAH-Practice - Contributing

We use contributions from our team to power the content on our website. Please note at this time, you will need to be a part of The Anonymous Helpers, we are not accepting contributions from outside our organization. If you're an IB student and interested in joining, fill out this form: https://forms.gle/7rYhdNx1Rcqzn7t59



There are 4 main types of contributions that you can make: videos, review sheets, flashcard decks, and quizzes. We support the following formats:

Videos - MP4

Flashcard Decks - JSON (internal format), Anki (export as .txt, we will convert the sets for you automatically)

Quizzes - JSON (internal format)

Review Sheets - HTML (internal format), Google Docs, PDF


**Links**

Our Google Drive link contains all our templates, media content, and signup links. It is locked to our organization only, and can be accessed here: 
https://drive.google.com/drive/folders/1EkiEx92rXFPG_iFEWhaekFAoQXYhZNyk?usp=share_link



**Videos**

You will need to use our standardized intro at the beginning of your video. Please download this from our shared folder, and submit it using our form.



**Flashcards**

You can use our format to create quizzes. Each card follows this general format:

```
{
"term": "Add a short term within the quotations here",
"definition": "Add a longer definition for the term here within the quote"
}
```

You can download our sample JSON fiie which you can edit in Visual Studio Code using this link.

Alternatively, you can submit Anki files by choosing to export them as .txt files, and we will automatically convert these for you, using a Python file.

**Quizzes**

For our quizzes, we have two formats.

This is the format for multiple choice questions:

```
{
"qu": "In quotation marks, type the question."
"a1": "In quotation marks, type Option 1 for the question."
"a2": "In quotation marks, type Option 2 for the question."
"a3": "In quotation marks, type Option 3 for the question."
"a4": "In quotation marks, type Option 4 for the question."
"ans": Without quotation marks, type the number of the right answer. For example if the right answer is option 2, simply write 2.
"marks": Type any number without quotation marks, this corresponds to the amount of time allowed per question. 1 mark is worth 1 minute.
"solution": "In quotation marks, type why the answer is correct for the quuestion"
}
```

This is the format for short answer questions:

```
{
"qu": "In quotation marks, type the question."
"ans": "In quotation marks, type the answer as a number or a word. Make sure to include information on how to format your answer in the question."
"marks": Type any number without quotation marks, this corresponds to the amount of time allowed per question. 1 mark is worth 1 minute.
"solution": "In quotation marks, type why the answer is correct for the quuestion"
}
```
Please note that the user's answer and your answer for short answer questions is converted to lower case, to prevent issues with scoring. You do not need to worry about upper and lower case, but make sure there are no extra spaces in your answer.

We have sample templates available for both formats at this link.
