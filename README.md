# nbembed.js

Self-contained JavaScript script for embedding Jupyter Notebooks into websites.

## 🕵️‍♀️ Security 
Package use `Iframe Sandboxing` technique to separate notebook content from outer website.
This makes it possible to execute scripts (like interactive plots) nested in the notebook without security risks.


## ⛑&#xFE0F; USAGE:

1. Include recent version of the script into your website:
    ```html
    <script src="sadsad"></script>
    ```

2. sad
    ```html
    <notebook src="<notebook-url>"></notebook>
    ```

3. (Optional) You can adjust rendering properties using `config` attribute:
    ```html
    <notebook src="..." config="<config-options>"></notebook>
    ```
    Allowed options are described in the next section.  Multiple options can be provided by separating them using `,` (comma).

## 🖼&#xFE0F; MINIMAL EXAMPLE:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../dist/nbembed.js"></script>
</head>

<body>
    <notebook 
        src="https://raw.githubusercontent.com/empet/Math/master/DomainColoring.ipynb"
        config="hide-prompts"
        style="max-width: 1000px; margin:0 auto"></notebook>
</body>
</html>
```

## 🔧 OPTIONS:

| option | description |
|--------|-------------|
| `hide-prompts` | ... |
| `hide-stdout` | ... |
| `hide-stderr` | ... |
| `hide-code` | ... |
| `hide-markdown` | ... |


## 💻 COMPATIBILITY:

<table>
<tr><th>Browser</th><th>Tested Versions</th></tr>
<tr><td colspan="2"><b>Desktop</b></td></tr>
<tr><td>Google Chrome</td><td>✔&#xfe0f; ❌ </td></tr>
<tr><td>Microsoft Edge</td><td>?</td></tr>
<tr><td>Mozilla Firefox</td><td>?</td></tr>
<tr><td>Safari</td><td>?</td></tr>
<tr><td colspan="2"><b>Mobile</b></td></tr>
<tr><td>Chrome for Android</td><td>?</td></tr>
<tr><td>Safari for iOS</td><td>?</td></tr>
<tr><td>Samsung Internet</td><td>?</td></tr>
</table>


<!-- 
## TODO:
- [ ] Click image to zoom
- [ ] Themes support
- [ ] Add link to original file (download link?)
- [ ] Display load time (somewhere)
- [ ] Displaying multiple notebooks
- [ ] Better Errors Handling
    - [ ] 404 Error
    - [ ] CORS Error
    - [ ] Wrong format
- [ ] Create Google Action for building javascript source
- [ ] Fix Latex Rendering Problems
- [ ] Create external TOC
- [] z jakimi prawami dostepu odpala sie kod wewnątrz sendbox'a? czy ma prawa usera? czy anonimowe?
- [ ] Collapsible sections
- [ ] Update renderer script dependencies
-->