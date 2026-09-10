# Community calendar integration — review checkpoint

Status (September 10, 2026): implementation complete; production build and 27 automated tests pass. All 28 calendar source URLs returned HTTP 200 in the final check with the standard browser user agent. The user explicitly authorised deployment followed by live visual testing on September 10, 2026 after earlier browser infrastructure timeouts. Publishing this reviewed source for the requested live check; visual findings will be recorded after deployment.

## Existing material audited and preserved

- The ten core lessons already cover belonging, Indigenous responsibilities, rights, accessibility, multilingual wayfinding, anti-racism, overlapping barriers, student voice and community action.
- Year plan contains seven complete calendar provocations, including BC Black futures and Orange Shirt Day. These remain intact below the new cards.
- Resource library already links Surrey's district calendar and Canadian/BC learning sources. The new calendar uses these existing pathways rather than a disconnected route.
- Recent Earth, Stuff & Fairness commits and K–7 build boundaries remain unchanged. Existing printables and assets are retained.
- Legacy K–12/Grade 8–12 navigation was inconsistent with the current school scope. Visible entry points and adaptations now stop at Grade 7; the underlying substantial lessons are retained. Third-party resource titles retain their actual published grade ranges.

## Integration and equity review

39 cards are embedded in Year plan; the home screen shows current observances only within the reviewed 2026–27 window. On quiet days it shows a calendar link without inventing an occasion. Modal cards provide Canadian connections, misconception checks, source links, K–3 / 4–5 / 6–7 choices, short activities and related existing lessons. Projection separates the introduction, fact and activity into three screens. Large Print and a scrollable modal are implemented, awaiting browser verification.

| Lens | Representation and care |
| --- | --- |
| Indigenous peoples | September 30, languages, history month, June 21; Katzie, Kwantlen and Semiahmoo sources; rights and ongoing relationships, no generic festival framing |
| South Asian | Sikh and Hindu heritage months, Vaisakhi, Diwali/Deepavali, Tamil heritage; distinct language/religion labels; Telugu and Punjabi explicitly recognised in language learning |
| Muslim | Canadian Islamic history, Ramadan, both Eids; ethnic diversity, optional sharing and anticipated dates |
| East / Southeast Asian | Named Chinese, Korean and Vietnamese traditions; Asian and Filipino heritage; Tagalog distinguished from other Filipino languages |
| Black / African | Canadian Black history and Emancipation Day; BC Black historians, Nigeria-Canada and Yoruba associations; contemporary community goals |
| Jewish | Living BC community histories, heritage month and major observances; non-graphic Holocaust card defaulting to Grades 6–7 with separate younger belonging alternatives |
| Disability / neurodiversity | December 3, AccessAbility Week, autism acceptance; participation choices and barriers, not pity or diagnosis disclosure |
| LGBTQ+ | May 17 and Pride; families, safety, rights; no forced disclosure or debate about classmates' identities |
| Migration / languages | Mother Language Day, Francophonie and Refugee Day; no demands for personal migration stories |

Calendar sources are primarily Canadian; international UN/UNESCO and an explicitly labelled autistic-led US source supplement Canadian resources. Korean community archive was removed after redirect failures; Korean names remain represented with Canadian Heritage context. No US commemorative dates were imported. The calendar is curated, not exhaustive. It does not presume any community is represented in every class.

## Maintenance

Annual data: `content/community-calendar-2026-27.json`. Update reviewed dates, validity window and source evidence together. Never carry lunar/religious dates forward by changing only the year. Keep sunset and community-variation notes. The current archive remains readable after expiration, but daily suggestions stop. `content/community-dates.mjs` uses the runtime's America/Vancouver time-zone database, without a hard-coded UTC offset.

Date tests cover civil-date boundaries, quiet days, expired years, month/range endpoints, valid ISO dates, linked sources, real lesson destinations and religious uncertainty notes. The existing 24 tests plus 3 new tests pass.

## Required next release checks

1. Recheck remote HEAD and local changes before editing.
2. Resume the supervised preview; prior browser failure was infrastructure, not a known app rendering result.
3. Inspect home, Year plan, all month filters and card open/close with keyboard focus; test modal and page scrolling at desktop and phone widths, standard/large text and 200% enlargement.
4. Check all three projection screens, Escape/exit, younger Holocaust alternatives, connected lesson buttons and continued access to the seven existing provocations, Maps, Lessons, Student action and Printables.
5. Visually inspect the reused illustration for cultural respect and readability.
6. Under the updated user instruction, deploy and verify GitHub Pages, perform these checks on the live result, then fix and recheck any findings.
