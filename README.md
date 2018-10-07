# DrawTheNet 

DrawTheNet support for Visual Studio Code.

[DrawTheNet fork](https://github.com/malys/drawthe.net) forked from [DrawTheNet](https://github.com/cidrblock/drawthe.net)

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

- Preview Diagram, Press `Alt-D` to start DrawTheNet preview.
    - Auto update.
    - Zoom & scroll support.
    - Multi-Page Diagram support.

## Supported Formats

`*.yaml`

## How to install

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

`ext install drawthenet`

## Extension Settings

This extension contributes the following settings:

- `drawthenet.previewAutoUpdate`: Dedecides if automatically update the preview window.
- `drawthenet.server`: DrawTheNet server to generate UML diagrams on-the-fly.

## Known Issues

We accept merge request to improve featuring or fix some issues.

## Thanks

- @qjebbs and his vscode plantuml plugin [https://github.com/qjebbs/vscode-plantuml]

