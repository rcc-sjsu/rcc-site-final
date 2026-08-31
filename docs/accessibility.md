# Accessibility

## Automated Accessibility Testing

Accessibility testing is done via a custom script of ours which uses [IBM's Equal Access Toolkit][IBM-equal-access] under the hood.

[IBM-equal-access]: https://github.com/IBMa/equal-access

### Using It

First, make sure you have a local, up-to-date build of the site.

```bash
npm run build
```

Then, run

```
npm run a11y
```

> [!NOTE]
> If the above command fails due to `fetch failed`, try setting the `NODE_OPTIONS` environment variable to `--no-network-family-autoselection`

#### Automated/CI use case

For CI-style runs (i.e. where you want a non-interactive run that just prints results),
just use the following flags:

```bash
npm run a11y -- --ci
```

#### Manual/human use case

Use the following flags:

```bash
npm run a11y -- --pause-on-fail --print-full-failures
```

The script will try each route and run an accessibility test on that page.

If the page succeeds testing, you will see something like this, and you can stop reading these instructions here as
everything is fine.

> ```
> index
>   PASS
> ```

If there was an issue though, you'll see something like this:

> ```
> index
>   FAIL
>   Scan: index
>   - Message: Verify color is not used as the only visual means of conveying information
>     Level: potentialviolation
>     XPath: /html[1]/head[1]/link[9]
>     Snippet: <link data-precedence="next" href="/_next/static/chunks/02lp3m.2ha0d2.css" rel="stylesheet">
>     Help: https://able.ibm.com/rules/archives/2026.07.13/doc/en-US/style_color_misuse.html
>   (... additional messages skipped for brevity in these docs ...)
>
>   find report at achecker/output/index.html or achecker/output/index.json
>   no baseline.
>   Pausing for manual check. Failed page available at: http://[::]:35613/
> ```

For each of those bullet points, you'll need to check out the problem, and either fix it or mark it as dealt with / irrelevant.

1. First, open up the url (after `Failed page available at: ` right at the bottom there) in your browser.
   Open up your browser devtools and navigate to the "Inspector" (firefox) or "Elements" (chromium) tab.
1. Next, to review each issue in the bulleted list printed out for that page:
   1. Copy its `XPath` (the thing that looks like `/html[1]/head[1]/link[9]`)
   1. With the DOM view in that devtools tab selected, hit Ctrl-F to focus/open the search bar, paste that xpath in, and hit enter
   1. This will navigate you to the offending element which was flagged. Read the message and the provided
      help/documentation link for the item over and evaluate whether the issue should be fixed, or whether this is a
      false positive and can be ignored.
      - If it should be fixed, fix it! (Don't forget to rebuild the site before re-running the script once you've fixed the issue, too!)
      - If not, make a mental note of that and continue going thru all the other issues.
1. At this stage, you should be at a point where all the _actual_ issues with this particular page are fixed.

   If there weren't any false positives, you don't need to do anything further as the accessibility tests are now passing!

   If there were false positives, you'll need to create/update a _baseline_.
   Read the section below for instructions/explanation on that.

#### Baselines

Baselines are outputs from prior, known-good runs, which are used as reference in future checks to know which reported
violations we have already ruled out as containing nothing but false positives.

In the script output for each page, you should see some line like this

```
find report at achecker/output/index.html or achecker/output/index.json
```

Once you're absolutely sure that run is A-okay, copy the `json` file mentioned from `./achecker/output/` to
`./achecker/baselines/`.
