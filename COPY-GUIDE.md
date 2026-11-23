# Copy guide

How TakealotBack is written. Read this before you write or edit any public text on the site: homepage
copy, email templates, deep-dive pages, citation pages, page titles, meta descriptions, RSS, `llms.txt`.

Written 2026-11-23, after readers of a widely viewed review of the site said it looked like AI slop.
Two scripts enforce the mechanical parts: `npm run check:copy` (part of `check:all`, so CI and the pre-push
hook block a failure) and `npm run check:copy-facts` (run it after any rewrite).

---

## 1. Who we are writing for

Someone in South Africa who bought something on Takealot, has a problem with it, and is annoyed. They want
to know what the law says and what to do next. They are not a lawyer and don't want to read like one.

Write the way a well-read friend would explain it over coffee: plain, direct, specific, a little dry. Say
what the law says, who said it, and what to do. Then stop.

- South African English: *organise*, *colour*, *licence* (noun), *cheque*. Rands as `R30,000`.
- "You" for the reader. "We" for the site, sparingly.
- Name things. "The CGSO" after the first full mention. "Takealot", not "the retailer" or "the platform".

## 2. Punctuation

- **No em dashes (—). None.** Not even one. They are the best-known sign of machine writing and readers now
  look for them.
- **No spaced en dashes ( – )** as a stand-in. An unspaced en dash in a range (`2025–26`, `(i)–(ii)`) is fine.
- **Don't just swap the dash for a comma.** "You have 6 months — not 30 days" becomes "You have 6 months,
  not 30 days", and the sentence still has the same machine shape. Rewrite it. Usually the answer is two
  sentences, or brackets, or a colon that introduces something specific.
- **Titles:** use a colon or a pipe. `Clause 01: Time limits`, `Who has to prove what | TakealotBack`.
- **Straight quotes** (`"` and `'`) in our own text. Quoted source text keeps whatever the source used.
- **Headings in sentence case:** "Where to file", not "Where To File".
- **Exclamation marks:** no. The only one on the site should be inside a quote from Takealot.
- **Bold:** for the one thing on a card the reader must not miss. Not as a label at the start of a paragraph.

## 3. Words and phrases we don't use

`check:copy` fails on these. The list comes from Wikipedia's "Signs of AI writing" (WikiProject AI Cleanup,
as of October 2026), which tracks the words each generation of models overuses.

| Don't write | Write instead |
|---|---|
| crucial, pivotal, vital, key role | say what it does |
| delve, dive into, unpack | look at, explain, or just start |
| navigate (a dispute, the process) | deal with, handle, get through |
| landscape (legal, consumer) | the law, the rules |
| robust, comprehensive, meticulous | say what makes it thorough, or cut |
| leverage, empower, foster, elevate | use, help, let |
| underscore, highlight, showcase (as verbs) | show, say |
| serves as, stands as, functions as | is |
| a testament to | shows |
| weaponise(d) | use against you |
| moreover, furthermore, additionally, notably | and, also, or nothing |
| it's worth noting, it's important to note | just say it |
| in short, in summary, in conclusion, the takeaway, the bottom line, lesson: | cut the label and keep the point |
| the single most useful / most powerful fact | say why it matters once, plainly |
| here's the thing, let's dive in, whether you're… | cut |

Words Wikipedia's mid-2026 list flags for newer models: *matters, quietly, practical, clearer, steady,
dependable, foster, leverage, prioritise, multifaceted, universally*. One on its own is fine. Three in a
paragraph is a rewrite.

## 4. Sentence shapes that give it away

These matter more than any single word. Each example is real text from this site before the 2026-11 rewrite.

**"Not X, it's Y" and "Y rather than X".** Defining something by what it isn't, to correct a mistake nobody
made. Use it only when the reader really does believe X (a Takealot agent told them so, say).

> Before: "Inspection ≠ damage" … "not a defence it can simply assert"
> After: say what the rule is. "Takealot has to prove each of these. Saying it isn't enough."

**Groups of three by reflex.** Three adjectives, three short phrases, three examples, because three sounds
complete. Use the number of items there actually are.

**Stacked fragments.** Short punchy non-sentences in a row.

> Before: "20 clauses dismantled. 20 ready-to-send templates. One ladder to escalate."
> After: "We go through Takealot's returns policy clause by clause, with an email template for each problem
> and the order to escalate in."

**Labels that announce the point.** "Lesson:", "The takeaway:", "Practical advice:", "Why it matters:". Cut
the label. If the point is good it doesn't need a sign on it.

> Before: "Lesson: open deliveries promptly and photograph them, but a defect found later is still inside s 56."
> After: "Open deliveries quickly and take photos. If a defect only shows up later, s 56 still covers it."

**Closing lines that repeat the paragraph.** If the last sentence says what the paragraph already said, delete it.

**Trailing "-ing" clauses that add significance.** "…, ensuring consumers are protected", "…, highlighting
the importance of…". End the sentence at the fact.

**Puffing up importance.** "This is probably the most useful single page on the site." Let the reader decide.

**Hedges that hedge nothing.** "does not by itself establish", "it should be noted". A legal hedge that
carries real uncertainty ("courts haven't decided this yet") stays. Filler hedges go.

**Talking to the reader about the writing.** "Credibility section", "Honest account of…". Show it, don't
label it.

## 5. Rhythm

Wikipedia's newest note on model writing: sentences that all sit between 8 and 20 words, with lots of
commas. Real writing varies. A long sentence that sets out a rule, then a short one. Then a medium one with
the example.

Read it aloud. If you'd run out of breath, split it. If it sounds like a telegram, join it.

**Don't overcorrect.** Cutting every list of three or every long sentence makes copy stiff, and stiff copy
reads as machine-made too. The aim is copy a person would write, not copy that dodges a checklist.

## 6. Email templates

They have to sound like a real person who is fed up but polite, and who has read the law. Short paragraphs.
One ask per email. Cite the section once, where it does work. No "I trust this email finds you well", no
"I hope this helps", no "please do not hesitate".

## 7. Accuracy comes first

A sentence that sounds human and is legally wrong is worse than one that sounds stiff and is right.

- **Never change what a sentence says about the law.** Every section number, amount, date, case and quote
  survives a rewrite. `npm run check:copy-facts` compares against `main` and fails if one goes missing.
- **Never edit quoted text.** Judgments, statutes, Takealot's policy wording and press quotes are verbatim.
  `check:copy` skips anything in quotation marks and markdown blockquotes.
- **Keep hedges that carry real legal uncertainty.** "In our reading", "courts haven't ruled on this" are
  accurate, not filler.
- **Every count comes from the data.** Write `{TEMPLATES.length}`, never "20". `check:counts` guards it.

## 8. Before you commit

1. `npm run check:copy` passes (and look at the warnings: they're judgment calls, not noise).
2. `npm run check:copy-facts` passes if you rewrote existing text.
3. Read the changed text aloud once.
4. `npm run check:all`.

A deliberate exception (a heading that has to quote a policy term, say) gets a `copy-ok` comment on the line,
with a reason.

## Sources

- Wikipedia: [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), WikiProject AI Cleanup (read 2026-11-23; "as of October 2026").
- Fast Company: [the sentence structure that gives AI away](https://www.fastcompany.com/91469729/structure-sentence-dead-giveaway-that-ai-wrote-it) ("not X, it's Y").
- ruben.substack.com: [It's not X, it's Y](https://ruben.substack.com/p/its-not-x-its-y).
- PRSA: [Which signs of AI writing disengage people most?](https://www.prsa.org/article/which-signs-of-ai-writing-disengage-people-most-APRIL26)
- Search Engine Land: [AI writing tics and engagement](https://searchengineland.com/ai-writing-tics-engagement-study-470051).
- Raptive: [The "AI stink" is real](https://raptive.com/blog/the-ai-stink-is-real-and-its-costing-brands/) (reader trust drops when content is suspected to be AI; vendor figures, treat as directional).
- Leon Furze: [AI;DR: when readers stop trusting writers](https://leonfurze.com/2026/07/05/aidr-when-readers-stop-trusting-writers/).
