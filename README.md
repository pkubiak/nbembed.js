# nbembed.js

Self-contained JavaScript script for embedding Jupyter Notebooks into websites.

## 🕵️‍♀️ Security 
Package use `Iframe Sandboxing` technique to separate notebook content from outer website.
This makes it possible to execute scripts (like interactive plots) nested in the notebook without security risks.


## ⛑&#xFE0F; USAGE:

1. Include recent version of the script into your website:
    ```html
    <script src="https://pawelkubiak.me/nbembed.js/dist/nbembed.js"></script>
    ```
    or download it and use your local copy.

2. Insert `notebook` tag in place where you would like to render your notebook. Place url to your notebook raw `.ipynb` file as a `src` attribute:
    ```html
    <notebook src="<notebook-url>"></notebook>
    ```
    Check common usage scenarios at the end of the section.
    

3. (Optional) You can adjust rendering properties using `config` attribute:
    ```html
    <notebook src="..." config="<config-options>"></notebook>
    ```
    Allowed options are described in the the [next section](#-options).  Multiple options can be provided by separating them using `,` (comma).


<details>
    <summary><b>Scenario: Embedding Notebook from GitHub:</b></summary> 
    <p>To use a notebook hosted on the GitHub platform, you must use its raw-link. To get it, open the notebook in the GitHub file browser, then click on the "Raw" or "Download" button visible on the right side above the Notebook preview.
    You should see the Notebook's source code, copy and use the link to this page.<br>
    <img src="" /><br>Your obtained link should look like: <code>https://raw.githubusercontent.com/{username}/{repo}/{branch}/{file}</code>.</p>
    <p>For example, to embed file:<br><code>https://github.com/empet/Math/blob/master/DomainColoring.ipynb</code><br>
    You should use url:<br><code>https://raw.githubusercontent.com/empet/Math/master/DomainColoring.ipynb</code>
    </p>
</details>
<br>

<details>
    <summary><b>Scenario: Embedding on Confluence page:</b></summary>
    TBA
</details>

## 🖼&#xFE0F; MINIMAL EXAMPLE:

Below you can check minimal code demonstrating `nbembed.js` usage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://pawelkubiak.me/nbembed.js/dist/nbembed.js"></script>
</head>

<body>
    <notebook 
        src="https://raw.githubusercontent.com/empet/Math/master/DomainColoring.ipynb"
        config="hide-prompts"
        style="max-width: 1000px; margin:0 auto"></notebook>
</body>
</html>
```

Live version can be previewed here: https://pawelkubiak.me/nbembed.js/docs/example.html


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
<tr><td>Google Chrome</td><td>✔&#xfe0f; 109.0.5414.120</td></tr>
<tr><td>Microsoft Edge</td><td>✔&#xfe0f; 80.0 and newer</td></tr>
<tr><td>Mozilla Firefox</td><td>✔&#xfe0f; 107.0</td></tr>
<tr><td>Safari on MacOS</td><td>✔&#xfe0f; 16</td></tr>
<tr><td>Internet Explorer</td><td>❌ 11</td></tr>

<tr><td colspan="2"><b>Mobile</b></td></tr>
<tr><td>Chrome for Android</td><td>✔&#xfe0f; 108.0.5195.136</td></tr>
<tr><td>Safari for iOS</td><td>✔&#xfe0f; 16.0</td></tr>
<tr><td>Samsung Internet</td><td>✔&#xfe0f; 17.0.9.34</td></tr>
<tr><td>Mozilla Firefox</td><td>✔&#xfe0f; 108.1.1</td></tr>
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