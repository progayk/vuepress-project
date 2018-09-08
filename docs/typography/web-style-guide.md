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

### Vertical Rhythm

Vertical rhythm is the concept of keeping vertical spaces between elements consistent. It is incredibly important as it helps to create a visually relaxing experience, and evokes a feeling of familiarity to users.

![vertical-rhythm](http://typographyhandbook.com/assets/images/vertical-rhythm.png)

Establishing a vertical rhythm is simple. First, decide on a base whitespace value that you will use for vertical margins and vertical padding. Then, apply this value as a single-direction margin (or padding) to your containers, textual elements, and other relevant elements. For larger gaps, use a multiple of the base value.

Setting the base vertical spacing to be the same size as the `line-height` will allow every line to fit in an imaginary baseline grid. This is often done to imitate the uniformity of print design. This is not a requirement of vertical rhythm; any value works for base vertical spacing as long as a multiple of it is repeated consistently.

```css
body { 
  line-height: 1.4; // Base line height
}

p { 
  font-size: 1.25em; // Base font size
  margin-bottom: 1.75rem; // Base vertical spacing: (1.4 * 1.25) = 1.75
}

h1 {
  font-size: 3em;
  margin-bottom: 3.5rem; // Double the base value for a larger gap (1.75 * 2) = 3.5
}

h2 {
  font-size: 2em;
  margin-bottom: 1.75rem;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 1.75rem;
}

.page-container {
  padding: 3.5rem 2rem; // 3.5 is double the base value
}
```

```scss
/* Simple Sass Implementation */

$base-line-height: 1.4;
$base-font-size: 1.25rem;
$vertical-rhythm: $base-line-height * $base-font-size;

body { 
  line-height: $base-line-height;
}

p { 
  font-size: $base-font-size;
  margin-bottom: $vertical-rhythm;
}

h1 {
  font-size: 3em;
  margin-bottom: $vertical-rhythm * 2;
}

h2 {
  font-size: 2em;
  margin-bottom: $vertical-rhythm;
}

h3 {
  font-size: 1.5em;
  margin-bottom: $vertical-rhythm;
}

.page-container {
  padding: ($vertical-rhythm * 2) 2rem;
}
```

Note that `rem` is used for spacing as it is not influenced by the font-size of the element.

### Bottom Aligned Baseline Grid

The bottom aligned baseline grid is a stricter implementation of vertical rhythm. In web, text is vertically aligned to the center of the `line-height`. This can be troublesome for large text as there will be excessive space on the top and the bottom. In print, this issue is avoided as text is aligned to the bottom of the baseline grid.

It's also possible to fix the issue without a baseline grid by applying a negative `margin-top` and a smaller `margin-bottom` to large texts.

![bottom-aligned](http://typographyhandbook.com/assets/images/baseline-grid.png)

There is no easy way to apply a bottom aligned baseline grid that works for different typefaces, `font-size`, and resolutions. It is highly recommended to use a typographic baseline library such as [Sassline](https://sassline.com/) or [MegaType](http://megatype.studiothick.com/).

Remember that vertical rhythm is just a guideline, and that the baseline grid is imaginary. It does not need to be pixel perfect for every element, nor does it need to be followed at every instance.

> FURTHER READINGS:

* [Why is Vertical Rhythm an Important Typography Practice?](http://zellwk.com/blog/why-vertical-rhythms/)
* [Aligning type to baseline the right way using SASS](https://medium.com/written-in-code/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b#.6e9d62xnq)
* [Is Web Typography Completely Broken?](http://zellwk.com/blog/web-typography-broken/)
* [Single-direction Margin Declarations](http://csswizardry.com/2012/06/single-direction-margin-declarations/)
* [Web Typography is broken: here's how we can fix it](http://www.studiothick.com/essays/web-typography-is-broken)

## Color

Color provides a huge visual distinction and is an important part of typography.

* Don't pick colors arbitrarily; use a color palette instead. [Material Design](http://www.materialui.co/colors) colors and [Flat UI colors](http://www.materialui.co/flatuicolors) are good palettes to start with.

* Do not overuse a color too many times, or else they may lose their unique distinction. Do not use too many completely different colors either.

* Adhere to the [Law of Similarity](/typography/typographic-design.html#gestalt-laws-in-typography).

* It is recommended to not use pitch black `#000` as your body text color. Instead, use a very dark gray such as `#333`.

* Sometimes, it is better to use an alpha value or opacity instead of a lighter color. [Click here](http://adamschwartz.co/magic-of-css/chapters/4-color/) for an in-depth explanation.

* Make sure that there is enough contrast between the text and the background. Use this [contrast checker tool](https://contrastchecker.com/) to help you.

> FURTHER READINGS:

* [Magic Of CSS: Color](http://adamschwartz.co/magic-of-css/chapters/4-color/)
* [Google Style - Color](https://www.google.com/design/spec/style/color.html)

## Underlining

:::tip
In a printed document, don’t underline. Ever. It’s ugly and it makes text harder to read.

*- [Practical Typography](http://practicaltypography.com/underlining.html)*
:::

By default, underlines don't look great in the web either. Fortunately, there is a method involving `background-image` to style underlines to make them look appealing. Here is a Sass implementation of the original underline gist by [Adam Schwartz](http://adamschwartz.co/):

```scss
@mixin text-underline-crop($background) {
  text-shadow:  .03em 0 $background, 
                  -.03em 0 $background,
                  0 .03em $background,
                  0 -.03em $background,
                  .06em 0 $background,
                  -.06em 0 $background,
                  .09em 0 $background,
                  -.09em 0 $background,
                  .12em 0 $background,
                  -.12em 0 $background,
                  .15em 0 $background,
                  -.15em 0 $background;
}

@mixin text-background($color-bg, $color-text) {
  background-image: linear-gradient($color-text, $color-text);
  background-size: 1px 1px;
  background-repeat: repeat-x;
  background-position:  0% 95%;
}

@mixin text-selection($selection) {
  &::selection {
    @include text-underline-crop($selection);
    background: $selection;
  }

  &::-moz-selection {
  @include text-underline-crop($selection);
  background: $selection;
  }
}

@mixin link-underline($background, $text, $selection){
  @include text-underline-crop($background);
  @include text-background($background, $text);
  @include text-selection($selection);

  color: $text;
  text-decoration: none;

  *,
  *:after,
  &:after,
  *:before,
  &:before {
    text-shadow: none;
  }

  &:visited {
    color: $text;
  }
}

/* Example usage */
a {
  @include link-underline(#fff, #333, #0BF);
}
```

![](http://typographyhandbook.com/assets/images/smartunderline.png)

[SmartUnderline](https://eager.io/showcase/SmartUnderline/) is a library that simplifies the process.

It is highly recommended to reserve underlines only for hyperlinks. This is a trend that the majority of websites follow, and deviating from it may cause confusion.

> FURTHER READINGS:
* [Crafting Link Underlines On Medium](https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9)
* [Smarter Link Underlines For Every Website](https://eager.io/blog/smarter-link-underlines/)

