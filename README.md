<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / layouts

_pre release_

**common components for documents and tools**

[![GitHub][github-badge]][github]
[![Build Status]][actions]
![MIT License][]
![NPM Version][]

[github]: https://github.com/carbonplan/layouts
[github-badge]: https://badgen.net/badge/-/github?icon=github&label
[build status]: https://github.com/carbonplan/layouts/actions/workflows/main.yml/badge.svg
[actions]: https://github.com/carbonplan/layouts/actions/workflows/main.yml
[mit license]: https://badgen.net/badge/license/MIT/blue
[npm version]: https://badgen.net/npm/v/@carbonplan/layouts

Reusable [`react`](https://github.com/facebook/react) components for common layouts, such as those used in our articles, tools, blog posts, and maps. Similar to those in the [`@carbonplan/components`](https://github.com/carbonplan/components) package, these components assume and make extensive use of [`theme-ui`](https://github.com/system-ui/theme-ui) and [`next`](https://github.com/vercel/next.js), and are meant to be composed with our [`theme`](https://github.com/carbonplan/theme). These components also work particularly well with MDX, which we use for authoring lots of our content.

## usage

To use, install the package with

```
npm i @carbonplan/layouts
```

and then import the component(s) you want into your `next` project.

## examples

The easiest way to understand these components is to see them in use across our sites.

- Visit [carbonplan.org/research](https://carbonplan.org/research) or [github.com/carbonplan/research](https://github.com/carbonplan/research) to see the use of `Article` and `Tool`.
- Visit [carbonplan.org/blog](https://carbonplan.org/blog) or [github.com/carbonplan/blog](https://github.com/carbonplan/blog) to see the use of `Post`.
- Visit [carbonplan.org/design](https://carbonplan.org/design) or [github.com/carbonplan/design](https://github.com/carbonplan/design) to see the use of `NavSection` and `NavMenu`.

## api

Here are all the components currently available, grouped by where we tend to use them (some components appear in multiple groups)

### research articles

`Article`
`Supplement`
`QuickLook`
`FigureCaption`
`Cite`
`SectionDivider`
`ExternalLinks`
`Endnote`
`PullQuote`
`ReadMore`

### interactive tools

`Tool`
`QuickLook`

### blog posts

`Post`
`AuthorIcons`
`FigureCaption`
`ReadMore`

### documentation sites

`NavSection`
`NavMenu`

### map sites

[coming soon]
