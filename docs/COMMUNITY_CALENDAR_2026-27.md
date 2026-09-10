# Community calendar integration — review checkpoint

Status (September 10, 2026): **deployed successfully** at https://dlwyatt-eng.github.io/equity-hub/ from source commit `824c594dc28411356ace0a09c6a53db510fb3cab`. GitHub Pages workflow 34536634817 passed its build, all 27 tests and deployment. All 28 calendar source URLs passed the final link check. The user authorised deployment followed by live visual testing after the earlier browser infrastructure failures; the browser recovered and the checks below were completed.

## Existing material audited and preserved

- The ten core lessons already cover belonging, Indigenous responsibilities, rights, accessibility, multilingual wayfinding, anti-racism, overlapping barriers, student voice and community action.
- Year plan contains seven complete calendar provocations, including BC Black futures and Orange Shirt Day. These remain intact below the new cards.
- Resource library already links Surrey's district calendar and Canadian/BC learning sources. The new calendar uses these existing pathways rather than a disconnected route.
- Recent Earth, Stuff & Fairness commits and K–7 build boundaries remain unchanged. Existing printables and assets are retained.
- Legacy K–12/Grade 8–12 navigation was inconsistent with the current school scope. Visible entry points and adaptations now stop at Grade 7; the underlying substantial lessons are retained. Third-party resource titles retain their actual published grade ranges.

## Integration and equity review

39 cards are embedded in Year plan; the home screen shows current observances only within the reviewed 2026–27 window. On quiet days it shows a calendar link without inventing an occasion. Modal cards provide Canadian connections, misconception checks, source links, K–3 / 4–5 / 6–7 choices, short activities and related existing lessons. Projection separates the introduction, fact and activity into three screens. Large Print and scrollable cards were verified in the published experience.

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

## Live visual and interaction checks completed

- Inspected desktop home and calendar at 1363 × 936. The illustration is a contemporary school wayfinding scene; text and controls remain legible.
- All 13 month choices work, including the quiet July state and all 39 cards in the whole-year view.
- Diwali card: readable standard text, Large Print increases body type from 17.92 px to 30 px, all three projection screens, next/previous controls, Escape exits projection before closing the card, and closing restores focus to its opening control and releases the page scroll lock.
- Holocaust remembrance defaults to Grades 6–7; K–3 opens its distinct belonging alternative and its connected existing lesson works.
- Lessons, Maps & power, Student action, Printables and Start remain accessible. Existing seven Calendar Provocations are preserved in Year plan.
- Tested the published site in real 390 × 844 and 674 × 844 iframe viewports using a temporary local QA wrapper (removed afterwards). Mobile menu, calendar layout, Large Print, card scrolling and projection controls were exercised. No horizontal overflow in the card or any of the 39 teaser cards was found. Keyboard PageDown and wheel scrolling advanced the card independently of the background.
- No new page-origin JavaScript error was observed; browser-extension metadata errors were unrelated to the site.
- Root and `#community-calendar` links were opened and verified on the public deployment.

Limitations: responsive checks used cloud Chrome at phone widths, not physical mobile Safari. Browser zoom shortcuts did not alter this managed browser, so a literal 200% browser-zoom check is not claimed. Large Print and the narrow layouts were directly verified. Large Print projection may require vertical scrolling, with content and navigation remaining reachable.
