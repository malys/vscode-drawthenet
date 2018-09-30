# DrawTheNet README

Rich DrawTheNet support for Visual Studio Code.

[Donate by Paypal](https://paypal.me/qjebbs "If you like this plugin, you can buy me a coffee. Feel free if you don't want to, since it's free!")
|
[Donate by AliPay](https://github.com/qjebbs/vscode-drawthenet/blob/master/images/alipay.png?raw=true)
|
[DrawTheNet Document](http://drawthenet.com/sitemap-language-specification)

## Notice

1. DrawTheNet formatter is disabled (since v2.8.3) if `editor.formatOnSave` is on. 
Because the formatter is not reliable enough according to user feedbacks.

1. Newly designed preview provides various zoom/pan actions and snap feature:

    - Zoom operations (since version 2.7.0): 
      - Zoom to select area
      - Pinch to zoom (TouchPad)
      - Click to zoom in, alt + click to zoom out
      - Ctrl + mouse scroll to zoom in/out
      - Middle mouse button click to toggle zoom
      - Zoom in / zoom out / toggle buttons of the controls bar.
    - Pan operations (since version 2.7.0):
      - Right mouse button drag
      - Two-finger move to pan (TouchPad)
      - Mouse scroll
    - Snap to border (since v2.8.0):
      - Scroll to most bottom/right/top/left, preview will snap to that border. 
      > e.g. Snap to Bottom is useful while writing long activity diagrams, which helps you keep focus in the latest part in the bottom.  

## Features

> Get **15X times faster export** by utilizing DrawTheNet Server as render. [How to?](#about-render)

- Preview Diagram, Press `Alt-D` to start DrawTheNet preview.
    - Auto update.
    - Zoom & scroll support.
    - Multi-Page Diagram support.
    - Instant preview, if diagram's been exported.
    - From local or server.
    - Snap to Border **NEW!!**
- Export Diagrams
    - At cursor, in current file, in whole workspace, in workspace selected.
    - Concurrent export.
    - Generate URLs.
    - Multi-Page Diagram support.
    - From local or server.
    - Image map (cmapx) support.
- Editing Supports
    - Format DrawTheNet code.
    - All type syntax highlight.
    - All type snippets.
    - Auto Include.
    - Symbol List support.
- Others
    - Multi-root Workspace Support.
    - MarkDown integrating support. [View Demo](#markdown-integrating)
    - Extracting source from images support.

> Notice: If you use customize `drawthenet.jar`, please update to the latest version to enable `Multi-Page Diagram support`. (Later than `V1.2017.15`)


## Supported Formats

`*.yaml`

## How to install

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

`ext install drawthenet`

## Requirements

Depend on which render you choose, plugin has diffrerent requirements.

### Requirements for DrawTheNetServer render

A drawthenet server.  See [Use DrawTheNet Server as render](#use-drawthenet-server-as-render).

### Requirements for Local render

It's necessary to have following installed:

- [Java][Java] : Platform for DrawTheNet running.
- [Graphviz][Graphviz] : DrawTheNet requires it to calculate positions in diagram.

[Java]: http://java.com/en/download/ "Download Java"
[Graphviz]: http://www.graphviz.org/download/ "Download Graphviz"

> Plugin has integrated a copy of "drawthenet.jar", you are good to go now. But if you want to use your own jar (maybe a newer version, or with many dependent jars), specify the jar location with setting `drawthenet.jar`.

> If you've installed java, but still prompts "java not installed", please add java bin path to `PATH` environment variable.

For windows user, [majkinetor](https://github.com/majkinetor) introduced a way to install drawthenet and its dependencies easily. Run `cmd.exe` as Administrator, and run two commands as follow

```cmd
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

choco install drawthenet
```

## Preview and Export Demos

Auto update:

![audo update demo](images/auto_update_demo.gif)

zoom & scroll:

![zoom demo](images/zoom_demo.gif)

Multi-Page View:

![Multi-Page demo](images/newpage_demo.png)

Export diagram:

![export demo](images/export_demo.gif)

Generate URLs:

![url demo](images/url_demo.gif)

## Extract Diagram Source

![extract demo](images/extract_demo.png)

## About Format

![format demo](images/format_demo.gif "demo")

## About Snippets

![snippet demo](images/snippet_demo.gif "demo")

This plugin integrates all type diagram snippets. They are splitted into 9 sections:

- `;diagram`: snippets for general diagrams elements.
- `;activity`: snippets for activity diagrams.
- `;class`: snippets for class diagrams.
- `;component`: snippets for component diagrams.
- `;state`: snippets for state diagrams.
- `;usecase`: snippets for usecase diagrams.
- `;sequence`: snippets for sequence diagrams.
- `;ui`: snippets for salt diagrams.
- `;egg`: snippets for some funny diagrams, like sudoku, earth.

For exsample, type `;activity if else condition` or `;acif` (short version) to trigge following snippet:

```drawthenetcode
if (cond1?) then (val1)

else (val2)

endif
```

## About Symbol List (List diagrams of file)

![list_symbol_demo.png](images/list_symbol_demo.png)

Press `Ctrl+Shift+O` to list all diagrams in the file. You can name the diagram when diagram starts.

> @startuml diagram name
> sudoku
> @enduml

## About Render

Plugin supports two renders: `Local` and `DrawTheNetServer`.

Local is the default and traditional way. If you care more about export speed, you should try DrawTheNetServer.

```text
Local: 6 documents, 9 digrams, 14 files exported in 24.149 seconds
DrawTheNetServer: 6 documents, 9 digrams, 14 files exported in 1.564 seconds
```

## Advantages and disadvantages of DrawTheNetServer render

Advantages:

- 15X times faster export and much quicker preview response.
- Don't have to set local enviroments if you have a server in your team.
- You don't need `drawthenet.exportConcurrency`, because it's unlimited in concurrency.

Disadvantages:

- Cannot render very-large diagrams (HTTP 413 error).
- Cannot render diagrams with `!include` in it.
- Less format support: png, svg, txt.
- Some settings are not applicable: `drawthenet.jar`, `drawthenet.commandArgs`, `drawthenet.jarArgs`.

## Use DrawTheNet Server as render

- You may already have a DrawTheNet server in your team, find the server address, like: `http://192.168.1.100:8080/drawthenet`.

- If don't have one, you can set up on you own ([follow the instructions](https://github.com/drawthenet/drawthenet-server)). Find the server address, like: `http://localhost:8080/drawthenet`, or `http://192.168.1.100:8080/drawthenet` which is ready for sharing to your team.

- Open user setting, and configure like:

```text
"drawthenet.server": "http://192.168.1.100:8080/drawthenet",
"drawthenet.render": "DrawTheNetServer",
```

## About Auto Include

> Notice: People who don't use `!include` could ignore this chapter.

![include demo](images/include_demo.gif "demo")

Auto Include liberates you from writing "!include path/to/include.wsd" everywhere. which is bother & hard to manage.

Suppose we have 2 files to include: `defines.wsd` and `myStyles.wsd`, and they are organized as follow:

```text
├── includes
│   ├── defines.wsd
│   └── myStyles.wsd
├── sources
│   ├── sourceA.wsd
│   └── sourceB.wsd
├── out
```

In the past, we have to include them manually in every single diagram:

```drawthenetcode
@startuml
!include ../includes/defines.wsd
!include ../includes/myStyles.wsd
'contents goes here...
@enduml
```

Now, you can just replace them with a placehold `'autoinclude`,

```drawthenetcode
@startuml
'AutoInclude
'contents goes here...
@enduml
```

and open workspace setting and config:

```text
"drawthenet.includes": [
    "includes"
]
```

### About integrated theme

Plugin shipped with a blue diagram theme, to enable it, config like:

```text
"drawthenet.includes": [
    "styles/blue"
]
```

## Multiple languages support

Translations are welcome. [lang.nls.json](https://github.com/qjebbs/vscode-drawthenet/blob/develop/langs/lang.nls.json), [package.nls.json](https://github.com/qjebbs/vscode-drawthenet/blob/develop/package.nls.json)

![languages demo](images/langs_demo.png)

## MarkDown integrating

![markdown demo](images/markdown_demo.png)

`@startuml / @enduml` is still recommended, so that DrawTheNet code in Markdown can be managed by other function of this plugin.

## Extension Settings

This extension contributes the following settings:

- `drawthenet.java`: Java executable location.
- `drawthenet.jar`: Alternate drawthenet.jar location. Leave it blank to use integrated jar.
- `drawthenet.fileExtensions`: File extensions that find to export. Especially in workspace settings, you may add your own extensions so as to export diagrams in source code files, like ".java".
- `drawthenet.exportFormat`: format to export. default is not set, user may pick one format everytime exports. You can still set a format for it if you don't want to pick.
- `drawthenet.exportSubFolder`: export diagrams to a folder which has same name with host file.
- `drawthenet.exportConcurrency`: decides concurrency count when export multiple diagrams.
- `drawthenet.exportOutDirName`: export workspace diagrams will be organized in a directory named with value specified here.
- `drawthenet.exportMapFile`: Determine whether export image map (.cmapx) file when export.
- `drawthenet.previewAutoUpdate`: Dedecides if automatically update the preview window.
- `drawthenet.server`: DrawTheNet server to generate UML diagrams on-the-fly.
- `drawthenet.render`: Select diagram render for both export and preview.
- `drawthenet.urlFormat`: URL format. Leave it blank to pick format everytime you generate a URL.
- `drawthenet.urlResult`: URL result type. Simple URL or ready for MarkDown use.
- `drawthenet.includes`: Files or folders to include before preview/export diagrams. You don't have to write "!include path/to/include.wsd" for every single diagram any more.
- `drawthenet.commandArgs`: commandArgs allows you add command arguments to java command, such as `-DPLANTUML_LIMIT_SIZE=8192`.
- `drawthenet.jarArgs`: jarArgs allows you add arguments to drawthenet.jar, such as `-config drawthenet.config`.

## Known Issues

Please post and view issues on [GitHub][issues]

[issues]: https://github.com/qjebbs/vscode-drawthenet/issues "Post issues"

## Thanks

- [Kohei Arao](https://github.com/koara-local)
- [zhleonix](https://github.com/zhleonix/vscode-drawthenet-ext/blob/r1.0.0/snippets/snippets.json)
- [Eward Song](https://github.com/shepherdwind)
- [Martin Riedel](https://github.com/rado0x54)

## Translators

- Japanese: [Kohei Arao](https://github.com/koara-local)
- Tranditional Chinese: [Alan Tsai](https://github.com/alantsai)
- German: [Fabian F.](https://github.com/fur6y)

## Donators

Thanks for your encouragements!

    Claus Appel, 三島木​一磨, 富吉​佑季

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
