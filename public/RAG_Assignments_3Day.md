# SkillCred — RAG Build Assignment (Post-Workshop)

**Issued:** 18 August 2026, 9:00 AM IST
**Due:** 21 August 2026, 11:59 PM IST — **3 days**
**Effort:** 5–7 hours
**Submission:** GitHub repo link via the submission form

**Your corpus is supplied.** Download the zip linked in your email and unpack it as `data/` inside
your repo. Do not go hunting for documents — that is deliberately not part of this assignment. The
whole 3 days is for retrieval.

Every participant has a **different corpus and a different constraint**. Two submissions that look
alike are not a coincidence. Discuss approach freely; do not share code.

---

## 1. What you are building

The six-block pipeline from the workshop — **Load → Chunk → Embed → Cosine Similarity → Retrieve →
Ask** — pointed at a new corpus, with one constraint that breaks the naive version.

**Each corpus contains a planted difficulty.** Something in your documents is designed to defeat a
straightforward implementation. Finding it is most of the assignment. If your system answers
everything perfectly on the first try, you have not found it yet.

## 2. Stack (fixed — do not substitute)

| Layer | What to use |
|---|---|
| Embeddings | `fastembed` with `BAAI/bge-small-en-v1.5` |
| Similarity | `numpy` cosine similarity, hand-written |
| Chat | `aicredits.in/v1`, model `gpt-4o-mini` |
| Everything else | Standard library, `numpy`, `pandas` |

**Not allowed:** LangChain, LlamaIndex, Haystack, Chroma, FAISS, Pinecone. If you can't see the dot
product, you can't debug it. Frameworks come in the cohort; this is the layer underneath them.

## 3. Deliverables — four files

1. **`rag.ipynb`** — runs top to bottom on a fresh kernel. No hardcoded API keys.
2. **`eval.md`** — **6 gold questions** with expected answers, written **before** you tune anything.
   **2 of the 6 must be questions your system should refuse** (answer genuinely not in the corpus).
   Report how many of the 6 you got right.
3. **`README.md`** — under 300 words: your chunking decision and why, your parameter table, your
   score, and one line naming the planted difficulty you found.
4. **`FAILURES.md`** — 150 words on your worst retrieval failure, what you tried, and whether you
   fixed it or worked around it. **An honest unfixed failure scores higher than an unexplained fix.**

Do not commit your API key. A key in git history is an automatic resubmission.

## 4. Rubric (100)

| Criterion | Marks |
|---|---|
| Retrieval works on the gold set | 30 |
| Your constraint implemented, not skipped | 25 |
| Eval set written before tuning + honest failure analysis | 20 |
| Code quality, README, reproducibility | 15 |
| Refusal behaviour | 10 |

Automatic marks lost: hallucinated answers presented as grounded, an eval set clearly written after
tuning, or a chunk size chosen with no stated reason.

## 5. The rule that outranks everything

**If the answer is not in the retrieved chunks, the system says so.** Never let the model fill the
gap from its own knowledge. Every assignment is graded on this, and your two out-of-corpus
questions are where you demonstrate it.

## 6. Suggested 3-day shape

- **Day 1 (2h):** Load and inspect the corpus. Write `eval.md` — all 6 questions, before any tuning.
  Get the workshop pipeline running unchanged. Note what it gets wrong.
- **Day 2 (2–3h):** Implement your constraint. Re-run the 6 questions. This is where the real work is.
- **Day 3 (1–2h):** Refusal behaviour, README, FAILURES, clean the notebook, submit.

If you are stuck at the end of Day 1, post in the group. Do not spend Day 2 stuck silently.

---

# The 20 assignments

Your number is in your email. Corpus is supplied for all of them.

---

**01 — Rental / PG agreement assistant**
*Corpus:* 3 agreements. *Ask:* "Can my landlord keep the deposit if I leave in month 4?"
*Constraint:* Clause-boundary chunking — never split a numbered clause. Every answer cites its
clause number. top-k = 3.

**02 — Chennai public transport helper**
*Corpus:* Metro fares and routes + MTC bus routes (Govt. of India / Govt. of Tamil Nadu, GODL-India).
*Ask:* "I'm at Guindy, how do I reach Thiruvanmiyur and what will it cost?"
*Constraint:* Tag every chunk with its source document; the answer must name which document it used.
Compare top-k = 1, 3, 5 and state which wins.

**03 — Medicine leaflet assistant (safety-critical)**
*Corpus:* 5 patient information leaflets. *Ask:* "Can I take this with paracetamol?"
*Constraint:* Fixed safety footer on every answer. Must **refuse personalised dosage advice** even
when the dosage is in the corpus — it may only report what the leaflet says, framed as such.
Section-based chunking; prefer Warnings on interaction queries.

**04 — College regulations bot**
*Corpus:* Regulations + 2 syllabi, heavily tabular. *Ask:* "How many credits to enter semester 5?"
*Constraint:* Tables must survive chunking intact — half a table in a chunk is a failure.
Chunk ≤ 400 characters, 15% overlap.

**05 — Restaurant menu and allergen bot**
*Corpus:* 4 menus, ~40 dishes with ingredients. *Ask:* "What can I eat if I'm allergic to peanuts?"
*Constraint:* One dish per chunk with metadata (restaurant, veg/non-veg, price). Hard metadata
filter **before** similarity. top-k = 8, because the answer is a list.

**06 — Tamil Nadu scheme eligibility helper**
*Corpus:* 4 TN government scheme documents (Govt. of Tamil Nadu, GODL-India).
*Ask:* "I'm 22, a student, family income ₹2L/year — what am I eligible for?"
*Constraint:* The answer must compare all four schemes, so enforce diversity in top-k: maximum
2 chunks from any one document.

**07 — Insurance claim assistant**
*Corpus:* 2 policy documents. *Ask:* "Is two-wheeler theft covered if the key was in the ignition?"
*Constraint:* Chunk-size study — run your 6 gold questions at 200 / 500 / 1000 characters, overlap
fixed at 20%. Report the score for each and explain the winner.

**08 — SkillCred Premier League rules bot**
*Corpus:* A fictional league's playing conditions, dense with abbreviations.
*Ask:* "Is the batter out if the ball hits the helmet and is caught?"
*Constraint:* Query expansion — build an abbreviation dictionary and expand the query before
embedding. Report your score with and without expansion.

**09 — Codebase documentation assistant**
*Corpus:* Docs of a permissively-licensed Python library. *Ask:* "How do I configure retries?"
*Constraint:* Fenced code blocks are atomic and must never be split, even past your chunk size.
Code in answers must be returned verbatim from the corpus, never regenerated by the model.

**10 — Bank loan FAQ bot, Tanglish queries**
*Corpus:* Loan FAQs for 3 fictional banks. *Ask:* "Home loan ku salary slip evlo months venum?"
*Constraint:* Queries in Tanglish, corpus in English, answers in English. Normalise the query before
embedding — LLM translation or your own term map, pick one and justify. Score the 6 gold questions
in Tanglish and in English; report both.

**11 — HR leave policy bot**
*Corpus:* 3 company HR policies. *Ask:* "How many casual leave days carry over?"
*Constraint:* Numbers are the answer. Post-retrieval guard: any number in the generated answer must
appear verbatim in a retrieved chunk, else suppress the answer and say you aren't sure.
Demonstrate it catching one real hallucination.

**12 — Lecture transcript search**
*Corpus:* ~90 minutes of transcript, no punctuation, no paragraph breaks.
*Ask:* "Where did they talk about attention masks?"
*Constraint:* Chunk on ~90-second windows, not character counts. Every chunk carries its start time;
every answer returns a timestamp.

**13 — Research paper assistant**
*Corpus:* 5 arXiv papers, CC-BY licensed. *Ask:* "Which ran a human evaluation, and at what sample size?"
*Constraint:* Section-aware chunking (Abstract / Method / Results / Limitations). Classify the query
to choose the section: "what did they do" prefers Method, "how well did it work" prefers Results.

**14 — Product review question-answering**
*Corpus:* 300 short reviews for one product. *Ask:* "Do people complain about battery life?"
*Constraint:* One review per chunk, never split. The answer must be a synthesis with counts
("14 of the top 20 mention battery drain"), not a single quote. top-k = 20. Report supporting
vs. contradicting reviews.

**15 — RTI Act clause finder**
*Corpus:* The Right to Information Act, 2005 (Govt. of India).
*Ask:* "How long does a Public Information Officer have to respond?"
*Constraint:* Hierarchical citation — every chunk keeps its Section and sub-section number, and no
answer is valid without one. Numbering must survive your chunker. Quote the Act's wording for the
operative clause rather than paraphrasing it.

**16 — Recipe assistant with dietary constraints**
*Corpus:* 60 recipes with ingredients, cook time, veg/non-veg tags.
*Ask:* "Something vegetarian in 20 minutes with what's in my fridge."
*Constraint:* Hard metadata filter before similarity; similarity only ranks the survivors. The
constraints are buried in natural language, so extract them from the query first — rules or LLM,
justify your choice.

**17 — Multi-retailer return policy bot**
*Corpus:* Return and warranty policies for 5 fictional retailers.
*Ask:* "I bought shoes 20 days ago and they don't fit — can I return them?"
*Constraint:* Identify which retailer the question concerns; if unstated, **ask rather than guess**.
Cross-retailer contamination is the graded failure — show one case where the naive version did it.

**18 — Textbook chapter tutor**
*Corpus:* 3 school-level science chapters. *Ask:* a doubt, then "test me on it".
*Constraint:* Two modes. Answer mode is standard RAG. Quiz mode generates 5 MCQs whose correct
answers you **programmatically verify** appear in the source chunks, regenerating on failure.
Report your failure rate.

**19 — DevOps runbook assistant**
*Corpus:* 3 operational runbooks. *Ask:* "The deploy failed at the migration step — what now?"
*Constraint:* Order matters — returning step 7 alone is dangerous. When a chunk belongs to a
numbered procedure, return its contiguous neighbours in order. Implement chunk-adjacency expansion
after retrieval.

**20 — Audio drama scene search**
*Corpus:* `.srt` subtitle files for 3 episodes of an original audio drama.
*Ask:* "Which scene has the conversation about the missing letter?"
*Constraint:* Merge consecutive subtitle lines into scene-level chunks using timing gaps as
boundaries — choose and justify your gap threshold. Every answer returns episode + timestamp.
Dialogue quoted exactly.

---

## Questions

Post in the group, not DMs — if you're stuck, three others are stuck on the same thing. Debugging
questions welcome. "Please send code" is not.

— **Ganesan M**, Co-Founder & CTO, SkillCred

*Government documents in these corpora are reproduced under the Government Open Data License –
India, with attribution to the originating department. They do not imply endorsement of SkillCred.*
