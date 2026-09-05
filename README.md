# Equity Learning & Action Hub

A public, standalone K–12 teaching hub with preparation guidance, projector-ready student screens, printable resources, direct public sources, and grade-band adaptations. It does not require access to the Teacher Hub or Learn Hub.

## Canonical inquiry content

`content/master-inquiry-pack-v1.json` is the shared source for:

- the **Who Gets to Represent the World?** Mercator/Equal Earth inquiry;
- the reusable **Claim → Evidence → Care** protocol; and
- all seven Calendar Provocations.

The two map SVGs are generated locally with:

```sh
npm run generate:maps
```

Source-data and licence details are recorded in `THIRD_PARTY_NOTICES.md`.

## Release gate

Before publishing, always run:

```sh
npm ci
npm test
git diff --check
```

`npm test` type-checks the app, builds the exact GitHub Pages artifact, validates required public assets, and runs the regression suite. The Pages workflow runs the same gate.

To prevent an older checkpoint from replacing newer work:

1. Fetch and compare local `HEAD`, `origin/main`, and the live Pages deployment.
2. Forward-port missing improvements onto the newest commit; never replace the branch with an older generated copy.
3. Confirm `git status` is clean after committing.
4. Push only after `npm test` and `git diff --check` pass.
5. Confirm the Pages workflow is green and visually check the live Map inquiry, Calendar Provocations, lesson projection, large text, and print output.
