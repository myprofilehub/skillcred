# External Corpora — Download Guide (Assignments 02, 06, 09, 13, 15)

Fifteen corpora are supplied as zips. These five you download yourself, because the source is
authoritative and redistributing a stale copy would be worse than pointing at the original.

Budget about 90 minutes for all five. Assignment 15 takes five minutes; assignment 02 takes longest.

---

## 15 — RTI Act clause finder — EASIEST, DO THIS FIRST

**Download:** https://www.indiacode.nic.in/bitstream/123456789/2065/1/aa2005.pdf

India Code is the authoritative repository maintained by the Legislative Department. Two mirrors if
that link moves: `https://rti.gov.in/rti-act.pdf` and `https://cic.gov.in/sites/default/files/RTI-Act_English.pdf`
(the CIC copy is a diglot English–Hindi edition — extract the English text only, or the Hindi will
pollute your chunks).

**Licence:** Section 52(1)(q) of the Copyright Act, 1957 permits reproduction of any Act of
Parliament. No attribution obligation, though `SOURCE.md` should still name the source.

**Prep:** Extract text, keep Section and sub-section numbers intact. Do not strip the provisos —
they are the assignment.

**Trap confirmed present:** Section 7(1) sets the general period at 30 days. A proviso in the same
sub-section sets 48 hours where the information concerns the life or liberty of a person. A student
whose chunker splits the proviso off the main clause will answer "30 days" to every question.
Note also Section 24's second proviso, which sets 45 days for human rights violation information —
a third figure to complicate naive retrieval.

---

## 02 — Chennai public transport helper — MOST WORK

**Metro fares:** https://chennaimetrorail.org/cmrl-fare-table/ — CMRL's own fare table page.
Save the fare matrix as text or CSV. Also grab the route map and station list from the same site.

**MTC bus routes:** MTC's route information is scattered. Practical approach — take the route lists
from the Wikipedia articles for the specific metro stations on your path (each station article
carries the MTC routes serving it, e.g. `https://en.wikipedia.org/wiki/Teynampet_metro_station`),
and cross-check against `mtcbus.tn.gov.in`. Wikipedia text is CC BY-SA — if you use it, ship the
attribution and licence notice.

**Licence:** CMRL and MTC data falls under GODL-India: royalty-free, adaptable, publishable,
commercial use permitted, conditional on attributing the originating department and not implying
endorsement. Put the attribution line in `SOURCE.md`.

**Prep:** Two clearly separated documents — one metro, one bus. Do not merge them. The whole
assignment is source-attribution across documents.

**Trap to preserve:** Guindy is on the metro Blue Line; Thiruvanmiyur is not on the metro network
at all. The answer necessarily requires both documents. Verify this still holds when you build the
corpus — if a Phase 2 extension has since changed it, pick a different origin–destination pair
where the metro genuinely does not reach the destination.

---

## 06 — Tamil Nadu scheme eligibility helper

**Download:** https://www.tn.gov.in/scheme — browse Department Wise or Beneficiary Wise.

Pick four schemes with **explicit numeric eligibility criteria** across different departments.
Good candidates: an education scheme (Higher Education Department), an agriculture scheme
(Agriculture – Farmers Welfare), a housing scheme (Rural Development), and a women's welfare
scheme (Social Welfare). Avoid schemes whose criteria read "as decided by the committee" — they
give the retriever nothing to match on.

**Licence:** GODL-India. Attribute the department, do not imply endorsement.

**Prep:** One document per scheme. Keep eligibility criteria as a distinct section.

**Trap to construct:** Choose your four so that the profile in the assignment (22, student,
₹2L family income) qualifies for exactly two, with one near-miss failing on a single criterion —
an age band, an income ceiling, or a district restriction. Write the answer key when you pick the
schemes, not afterwards.

---

## 09 — Codebase documentation assistant

**Pick one** and clone its docs directory:

| Library | Repo | Licence |
|---|---|---|
| `httpx` | https://github.com/encode/httpx | BSD-3-Clause |
| `requests` | https://github.com/psf/requests | Apache-2.0 |
| `pydantic` | https://github.com/pydantic/pydantic | MIT |
| `tenacity` | https://github.com/jd/tenacity | Apache-2.0 |

`httpx` is the best fit — its docs have substantial prose *and* dense code examples, and it has a
genuine retries/transport configuration section for the gold question.

**Licence:** All permissive. **Ship the upstream LICENSE file inside `data/`** — this is a
condition of every one of these licences, not optional.

**Prep:** Take the `docs/` markdown only. Do not include source code files.

**Trap to check for:** Docs drift — a place where prose and code example disagree, or where a
documented default no longer matches the example. These exist in every real project. Find one
before you issue the assignment; if you can't find one in your chosen library, plant one by using
a slightly older docs tag than the code it describes.

---

## 13 — Research paper assistant

**Source:** arXiv listing pages, e.g. `https://arxiv.org/list/cs.CL/recent`

**Critical:** arXiv papers are **not** uniformly openly licensed. Most use arXiv's non-exclusive
distribution licence, which does **not** permit redistribution. Only CC-BY, CC-BY-SA and CC0
papers may go in a zip you hand out. The licence is shown on each paper's abstract page under the
submission history. Check all five individually — do not assume.

If you can't find five CC-BY papers on one topic, the fallback is to have the student download the
five PDFs themselves from links you supply. Slower for them, but legally unambiguous.

**Prep:** Extract text with section headings preserved. Abstract, Method, Results and Limitations
must remain identifiable — the assignment's whole constraint is section-aware chunking.

**Trap to construct:** Choose at least one paper whose Limitations section materially qualifies a
claim made in its Abstract. Common in empirical NLP papers; you'll find one quickly. Note the page
and paper in your answer key.

---

## Attribution block

Paste into `SOURCE.md` for assignments 02 and 06:

> Contains information from the Government of Tamil Nadu / Government of India, licensed under the
> Government Open Data License – India (GODL). Source: [department, URL, date accessed].
> This use does not imply endorsement by the originating department.

For assignment 09, ship the upstream LICENSE file unmodified alongside the docs.
For assignment 15, cite India Code and the Legislative Department.

---

## Before you send

- [ ] All five downloaded and text-extracted cleanly
- [ ] Each arXiv paper's licence checked individually on its abstract page
- [ ] LICENSE file present in the assignment 09 zip
- [ ] GODL attribution present in 02 and 06
- [ ] Guindy→Thiruvanmiyur still requires both documents (re-verify against current network)
- [ ] Answer key written for 06 and 13 at the time you pick the documents
