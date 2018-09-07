---
title: Fonts
sidebarDepth: 3
---

# Fonts

## Credits

* [typographyhandbook](http://typographyhandbook.com/)


## Content

[[toc]]

## Choosing Fonts

Choosing fonts is a creative and emotional process. Different fonts convey different feelings, and you want a font that complements the tone of your text.

* Start by finding a good font for your body text. When combining multiple fonts, keep your body font constant, and try to find other fonts that go well with it.

* Use tools such as [TypeTester](https://www.typetester.org/) and [TypeCast](http://typecast.com/) to help you experiment.

* Get inspired by others! [Fonts In Use](http://fontsinuse.com/) features a large collection of great font choices.

* Some fonts were designed to be used as large-size headings, while others were designed to be used in small-density screens. Use fonts in their intended roles. [WebType](http://www.webtype.com/catalog/) is a great resource for finding the “intended size” of different fonts. In addition, [TypeKit](https://typekit.com/fonts/) labels its font as either Heading or Paragraph.

> FURTHER READINGS:

* [Selecting Typefaces For Body Text](http://practice.typekit.com/lesson/selecting-typefaces-for-body-text/)
* [Five Principles For Choosing And Using Typefaces](https://www.smashingmagazine.com/2010/12/what-font-should-i-use-five-principles-for-choosing-and-using-typefaces/)
* [Best Practices For Combining Typefaces](https://www.smashingmagazine.com/2010/11/best-practices-of-combining-typefaces/)

## Using Web Fonts

To declare custom web fonts, use the following syntax:

```css
@font-face {
  font-family: 'Helvetica Neue';
  src: url('/assets/fonts/HelveticaNeue-Light.eot');
  src: url('/assets/fonts/HelveticaNeue-Light.eot?#iefix') format('embedded-opentype'),
    url('/assets/fonts/HelveticaNeue-Light.woff2') format('woff2'),
    url('/assets/fonts/HelveticaNeue-Light.woff') format('woff'),
    url('/assets/fonts/HelveticaNeue-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Helvetica Neue';
  src: url('/assets/fonts/HelveticaNeue-Bold.eot');
  src: url('/assets/fonts/HelveticaNeue-Bold.eot?#iefix') format('embedded-opentype'),
    url('/assets/fonts/HelveticaNeue-Bold.woff2') format('woff2'),
    url('/assets/fonts/HelveticaNeue-Bold.woff') format('woff'),
    url('/assets/fonts/HelveticaNeue-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Helvetica Neue';
  src: url('/assets/fonts/HelveticaNeue.eot');
  src: url('/assets/fonts/HelveticaNeue.eot?#iefix') format('embedded-opentype'),
    url('/assets/fonts/HelveticaNeue.woff2') format('woff2'),
    url('/assets/fonts/HelveticaNeue.woff') format('woff'),
    url('/assets/fonts/HelveticaNeue.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

* It is recommended to use all of the listed formats above for maximum compatibility. Otherwise, simply using woff2 and woff will support most modern browsers.

* You must have a font file for each listed format. Use [Transfonter](http://transfonter.org/) or FontSquirrel’s Web Font Generator to generate all file formats from a single one.

* Compress your fonts when possible. [See here](http://www.phpied.com/gzip-your-font-face-files/) for more information.

* Combine multiple type-families (light, regular, semibold, bold, etc) into one `font-family`, instead of having a different `font-family` name for each type-family.

Alternatively, you can also import fonts using an online web font service, such as [Google Fonts](https://www.google.com/fonts) or [Typekit](https://typekit.com/fonts).

> FURTHER READINGS:

* [Further Hardening Of The Bulletproof Syntax](http://blog.fontspring.com/2011/02/further-hardening-of-the-bulletproof-syntax/)
* [FontSquirrel: How To Use The Generator](https://www.fontsquirrel.com/blog/2010/12/how-to-use-the-generator)

## Font Loading

Before custom fonts are displayed, they need to be loaded first. There are three possible scenarios for font loading:
1. The font family is not recognised and a fallback font is applied.
2. The font family is recognised but not yet loaded, and will be applied when it has finished downloading.
3. The font family is recognised and has already been loaded and will be applied immediately.

Scenario 1 only happens when you try to use a nonexisting font, or a declaration with a bad `src`. This can and should be avoided entirely. Jumping to Scenario 3, it is the best case scenario and can usually be achieved through proper font caching. Scenario 2 is the scenario that involves font loading. Font loading is mostly unavoidable (at least for the first request instance). There are several ways to deal with it:

1. *Flash of Unstyled Text* (FOUT). A FOUT is an instance where a web page uses default and fallback fonts before switching to the proper web font. It happens because font requests do not happen until both HTML and CSS are downloaded. This means that there is a period of time where HTML is displayed before fonts are fully downloaded. **The FOUT is the optimal approach for most websites**, mainly because the alternatives are a lot worse. When done correctly, a FOUT is hardly noticeable.

2. *Flash of Invisible Text* (FOIT). A number of years ago, some modern browsers started to implement a new technique of dealing with font loading — the FOIT. A FOIT is an instance when the browser detects that a font is currently loading, and hides the text until font loading is complete. There is usually a maximum wait time before the browser switches to a fallback. **This approach should always be avoided**. Although it might sound good in theory, it can provide an awful user experience for people with slower internet. It can cause a FOUT after the initial FOIT, and at worst can even lead to permanent invisible content.

3. *The Whitescreen Approach*. The entire web page does not display until fonts are loaded. Alternatively, a loading progress bar can be displayed. **This approach is ONLY recommended if a FOUT is going to heavily detract from the user experience of your audience**. This is usually the case if the web page heavily relies on very distinct fonts in large sizes. Otherwise, a FOUT is preferred because content is king. This approach is similar to FOIT, but superior because you control when to start showing content instead of the browser. In FOIT, invisible text might also confuse the audience, whereas a completely white screen (or a progress bar) is an obvious sign of loading.

Whether you plan on going with the FOUT approach or the Whitescreen approach, you will want to use a JavaScript library called Web Font Loader. [Web Font Loader](https://github.com/typekit/webfontloader) gives you added control over `@font-face`, and adds events for you can control the font loading experience.

Note: There is a W3C [Font Loading API](https://caniuse.com/#search=font%20loading) that achieves similar goals, but **its support is still poor**.

### FOUT Approach

Here is an example of using Web Font Loader with the FOUT approach:

```html
<script type="text/javascript">
  WebFontConfig = {
    google: { families: [ 'Lora:400,700,400italic,700italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
</script>

<noscript>
  <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
</noscript>

<style>
  p {
    /* use fallback fonts */
  }

  .wf-active p {
    /* styles for custom fonts */
  }
</style>
```

* It is important to use Web Font Loader asynchronously so it does not delay the render of the rest of the page.

* Style your fallback fonts to appear as close as possible to your actual fonts to minimize the effects of the FOUT. [See here](http://www.ampsoft.net/webdesign-l/WindowsMacFonts.html) for a list of usable fallback fonts. Use [this tool](http://ffffallback.com/) to easily compare your fallback font to your custom font.

### Whitescreen Approach

Here is an example of using Web Font Loader with the whitescreen approach:

```html
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
<script>
  WebFont.load({
    google: {
      families: ['Raleway', 'Oswald']
    }
  });
</script>

<noscript>
  <link href='https://fonts.googleapis.com/css?family=Raleway|Oswald' rel='stylesheet' type='text/css'>
</noscript>

<style>
  .wf-loading {
    display: none;
  }

  .wf-active p {
    /* styles for custom fonts */
  }

  p {
    /* use fallback fonts */
  }
</style>
```

* In this case, the fallback does not need to appear similar to your custom font since there is no FOUT. Style the fallback as you see fit.

* Use [Pace](https://github.com/HubSpot/pace) if you want to include a progress bar instead of a white screen. This is significantly better for UX, especially if the font files are large.

> FURTHER READINGS:

* [Type Study: Choosing Fallback Fonts](http://blog.typekit.com/2011/03/24/type-study-choosing-fallback-fonts/)
* [FOUT, FOIT, FOFT](https://css-tricks.com/fout-foit-foft/)
* [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization?hl=en#optimizing-loading-and-rendering)

### OpenType Features

OpenType features can be thought of as typographic options for the font. They can be used to enhance the legibility and appearance of text.

```css
p {
  font-kerning: normal;
  font-variant-ligatures: common-ligatures contextual;
  font-feature-settings: "kern", "liga", "clig", "calt";
}
```

1. OpenType features are built in the font. This means that different features will be available to different fonts. Check which features are availabe to the fonts that you are using.

2. Use `font-feature-settings` to enable OpenType features.

3. Kerning `kern`, ligatures `liga`, contextual ligatures `clig`, and contextual alternatives `calt` should always be enabled for all texts.

> FURTHER READINGS:

* [Caring About OpenType Features](http://practice.typekit.com/lesson/caring-about-opentype-features/)
* [Death To Typewriters](https://medium.com/designing-medium/death-to-typewriters-9b7712847639)
* [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization?hl=en#optimizing-loading-and-rendering)

