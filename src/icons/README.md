# Create a new icon

1. Create a new file file in this directory with the name of the icon you want to add. For exemple `cube.ts` :

```ts
// cube.ts

const cube: [string, string, number?, number?] = [
  'cube',
  '<path d="M 12 17 l -9 -7 L 3 14.07 l 9 7 l 9 -7 l -0 -4.07 z M 12 16 l 7.36 -5.73 L 21 9 l -9 -7 l -9 7 l 1.63 1.27 L 12 16 z"></path>'
]

export default cube;
```

The default exports must follow the following type `[string, string, number?, number?]` where the first element is the icon name and second element the SVG icon path. The two number elements are `width` and `height` of the icon. They are optional and defaults to `24`.

2. Export this icon from the `.index.ts` file in this directory. Exemple:

```ts
// add a line such as:
export { default as Cube } from './cube';
```

# Use some icons from this directory in projects

Inside a page or custom element that needs the icon you must:

1. Import the `UxIconMap` class from `@aurelia-ux/icons`
2. Import the icon (or icons) that you need from `aurelia-resources`
3. Register the icon (or icons) in the map

Here is an exemple:

```ts
// custom-element.ts
import { UxIconMap } from 'aurelia-ux/icons';
import { Cube /*, you can import more icon here ...*/ } from 'aurelia-resources';
// ... other imports and stuff


@inject(/* ... , */ UxIconMap)
export class CustomElement {

  constructor(/* ..., */ private iconMap: UxIconMap) {
    this.iconMap.registerIcons([Cube /*, you can add more icons here ... */]);
  }

}
```


