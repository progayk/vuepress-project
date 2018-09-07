---
title: Web Style Guide
sidebarDepth: 3
---

# Web Style Guide

## Credits

* [typographyhandbook](http://typographyhandbook.com/)

## Content

[[toc]]

## Relative Units

Use relative units whenever possible.

```css
html { font-size: 100% }
p { font-size: 1em }

@media (min-width: 64em) {
  html {
    font-size: 112.5%;
  }
}
```

* `font-size: 100%` listens to the browser’s font size settings instead of overwriting it. By default in most browsers, this would place `1em` at `16px`.

* Changing the value of the `font-size` of the html will also affect every `em` and `rem` element. This can be useful for implementing responsive web design.

* User preference is important, so do not stray too far from `font-size: 100%` and `1em`.

* Use `rem` and `em` for font-size.

* Use `rem`, `em`, or `%` for element positioning (`margin`, `padding`, etc).

* Use `em` for media query dimensions.

* For large headings or when text is grouped with an image, use [FitText](http://fittextjs.com/) to achieve scalable headlines. Stray away from `vw` and `vh` due to incomplete support, difficulty in precise configuration, and that it does not listen to browser font or zoom settings.

> FURTHER READINGS:

* [Type Study: Sizing The Legible Letter](http://blog.typekit.com/2011/11/09/type-study-sizing-the-legible-letter/)
* [5 Useful CSS Tricks for Responsive Design](http://webdesignerwall.com/tutorials/5-useful-css-tricks-for-responsive-design)
* [REM vs EM - The Great Debate](http://zellwk.com/blog/rem-vs-em/)
* [PX, EM or REM Media Queries?](http://zellwk.com/blog/media-query-units/)

## Containers

The container, also known as the wrapper, is an HTML element that encloses one or more other elements. It allows for grouping elements semantically, cosmetically, or in layout.

```css
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.container {
  max-width: 67rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
```

* It is strongly recommended to use box-sizing: border-box. [Click here](http://www.paulirish.com/2012/box-sizing-border-box-ftw/) for more information about it.

* Using `max-width` with left and right `padding` is an easy way to create a mobile-friendly container.

* Choose a suitable width that isn't too long (*causes visitor's eye to have a hard time focusing*) or short (*causes visitor's eye to travel back too often*). In web typography, there is no line length rule that works for every font, size, leading, and resolution. Use your own best judgment.

> FURTHER READINGS:

* [* { Box-sizing: Border-box } FTW](http://www.paulirish.com/2012/box-sizing-border-box-ftw/)
* [StackOverflow: Ideal Column Width For Paragraphs Online](http://ux.stackexchange.com/questions/3618/ideal-column-width-for-paragraphs-online)

## Font Sizing

Use a [modular scale](http://www.modularscale.com/) to help you decide on the font-size of your elements. Modular scale refers to a series of harmonious numbers that relate to one another in a meaningful way.

![modular-scale](http://typographyhandbook.com/assets/images/modular-mockup.jpg)

* The modular scale is only a *guideline* and can be thought of as just a starting point.

* Keep in mind that different fonts have different `cap heights` and `x-heights`, and that most modular scale tools do not account for that.

* In your stylesheets, provide a reference back to what modular scale you used in comments.

## Responsive Modular Scale

A single modular scale will rarely look good on all resolutions. To remedy this, different scales can be used depending on the resolution of the viewer's device.

```scss
//Sass responsive modular scale


/* 
 * Modular scale
 * http://www.modularscale.com/?1.25&em&1.33&web&text
*/

$type-scale-large: (
  h1: 3.911rem,
  h2: 2.941rem,
  h3: 2.211rem,
  h4: 1.663rem,
  p: 1.25rem
);

/* 
 * Modular scale
 * http://www.modularscale.com/?1.25&em&1.25&web&text
*/

$type-scale-medium: (
  h1: 3.052rem,
  h2: 2.441rem,
  h3: 1.953em,
  h4: 1.563rem,
  p: 1.25rem,
);


/* 
 * Modular scale
 * http://www.modularscale.com/?1.1&em&1.25&web&text
*/

$type-scale-small: (
  h1: 2.686rem,
  h2: 2.148rem,
  h3: 1.719rem,
  h4: 1.375rem,
  p: 1.1rem
);


$breakpoint-medium: 75em;
$breakpoint-small: 45em;

@mixin size($level) {
  font-size: map-get($type-scale-large, $level);
  @media (max-width: $breakpoint-medium) {
     font-size: map-get($type-scale-medium, $level);
  }
  @media (max-width: $breakpoint-small) {
     font-size: map-get($type-scale-small, $level);
  }
}

// Example

.title {
  @include size(h1);
}
```

> FURTHER READINGS:

* [More Meaningful Typography](https://alistapart.com/article/more-meaningful-typography)

* [The Typographic Scale](http://retinart.net/typography/typographicscale/)

## Vertical Spacing

Vertical spacing is created by `line-height`, `margin`, and `padding`.

* `line-height` should be unitless. Wide containers should have text with a larger `line-height`, while narrow containers look better with text with a smaller `line-height`.

* Try to only apply margins in a single direction on textual elements, preferably `margin-bottom`.

* Adhere to the [Law of Proximity](/typography/typographic-design.html#gestalt-laws-in-typography).

## Vertical Rhythm

Vertical rhythm is the concept of keeping vertical spaces between elements consistent. It is incredibly important as it helps to create a visually relaxing experience, and evokes a feeling of familiarity to users.

![vertical-rhythm](http://typographyhandbook.com/assets/images/vertical-rhythm.png)